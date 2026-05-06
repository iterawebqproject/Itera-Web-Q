import crypto from "node:crypto";
import {
  type GenerationConfig,
  GoogleGenerativeAI,
} from "@google/generative-ai";
import { type NextRequest, NextResponse } from "next/server";
import { parse as parseHtml } from "node-html-parser";
import { escapeHtml } from "@/lib/strings";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3-flash-preview";
const UPLOADED_LOGO_PLACEHOLDER = "img://uploaded/logo.webp";
const SAFE_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><rect width='100%' height='100%' fill='%23f1f5f9'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='32' font-family='system-ui'>Image Loading...</text></svg>";

type LlmSection = { title: string; html: string };

type GeneratedFile = {
  path: string;
  content: string;
  encoding?: "utf8" | "base64";
  mimeType?: string;
};

type LlmPageSpec = {
  title: string;
  slug: string;
  sections: LlmSection[];
};

type LlmSiteResponse = {
  siteIdentity: { brandName: string; title: string; tagline: string };
  globalCss: string;
  globalJavascript: string;
  indexSections: LlmSection[];
  pages: LlmPageSpec[];
};

type ExistingHtmlFile = GeneratedFile;
type ExistingAssetFile = GeneratedFile;

function extractRefinementHtmlPages(
  currentCode?: { files?: unknown[] } | null,
): ExistingHtmlFile[] {
  if (!currentCode?.files || !Array.isArray(currentCode.files)) return [];

  const NON_PAGE_SLUGS = new Set([
    "index",
    "robots",
    "robots.txt",
    "sitemap",
    "sitemap.xml",
  ]);

  return (currentCode.files as Array<GeneratedFile>)
    .filter(
      (file): file is ExistingHtmlFile =>
        typeof file.path === "string" &&
        typeof file.content === "string" &&
        /\.html$/i.test(file.path),
    )
    .filter((file) => {
      const slug = file.path.replace(/\.html$/i, "").toLowerCase();
      return !NON_PAGE_SLUGS.has(slug);
    })
    .map((file) => ({
      path: file.path,
      content: file.content,
      encoding: file.encoding,
      mimeType: file.mimeType,
    }));
}

function extractRefinementAssetFiles(
  currentCode?: { files?: unknown[] } | null,
): ExistingAssetFile[] {
  if (!currentCode?.files || !Array.isArray(currentCode.files)) return [];

  return (currentCode.files as Array<GeneratedFile>)
    .filter(
      (file): file is ExistingAssetFile =>
        typeof file.path === "string" &&
        typeof file.content === "string" &&
        !/\.html$/i.test(file.path) &&
        /^\/?assets\//i.test(file.path),
    )
    .map((file) => ({
      path: file.path.replace(/^\/+/, ""),
      content: file.content,
      encoding: file.encoding,
      mimeType: file.mimeType,
    }));
}

function normalizeAssetPath(path: string): string {
  return path.replace(/^\/+/, "");
}

function isReusableAssetSrc(src: string): boolean {
  return /^\/?assets\//i.test(src);
}

function mimeToExtension(mime: string): string {
  if (mime.includes("webp")) return "webp";
  if (mime.includes("png")) return "png";
  if (mime.includes("jpeg") || mime.includes("jpg")) return "jpg";
  if (mime.includes("svg")) return "svg";
  if (mime.includes("gif")) return "gif";
  return "bin";
}

function parseDataUri(
  dataUri: string,
): { mime: string; base64: string } | null {
  const match = dataUri.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return null;

  return {
    mime: match[1].toLowerCase(),
    base64: match[2],
  };
}

function buildAssetFile(options: {
  base64: string;
  mime: string;
  prefix: string;
  preferredPath?: string;
}): GeneratedFile {
  const { base64, mime, prefix, preferredPath } = options;
  const hash = crypto
    .createHash("sha1")
    .update(base64)
    .digest("hex")
    .slice(0, 12);
  const ext = mimeToExtension(mime);
  const path = preferredPath
    ? normalizeAssetPath(preferredPath)
    : `assets/${prefix}-${hash}.${ext}`;

  return {
    path,
    content: base64,
    encoding: "base64",
    mimeType: mime,
  };
}

function stripBase64FromFiles(
  files: Array<{ path: string; content: string }>,
): {
  stripped: Array<{ path: string; content: string }>;
  imageMap: string[];
} {
  const imageMap: string[] = [];

  const stripped = files.map((f) => {
    const content = f.content.replace(
      /src="(data:image\/(?!svg\+xml)[^"]+)"/g,
      (_match, dataUri: string) => {
        const idx = imageMap.length;
        imageMap.push(dataUri);
        return `src="img://preserved/${idx}"`;
      },
    );
    return { path: f.path, content };
  });

  return { stripped, imageMap };
}

async function processImages(
  htmlContent: string,
  origin: string,
  assetRegistry: Map<string, GeneratedFile>,
  existingAssetsByPath: Map<string, ExistingAssetFile>,
  preservedImages?: string[],
  uploadedLogoWebp?: string,
  customAssets?: Record<string, string>,
  brandName?: string,
  imagePromptCache?: Map<string, Promise<string | null>>,
): Promise<string> {
  const root = parseHtml(htmlContent);
  const imgEls = root.querySelectorAll("img");
  let heroImageCount = 0;
  let contentImageCount = 0;
  let heroImagegenCallCount = 0;
  let contentImagegenCallCount = 0;
  let firstContentImageDone = false;

  const detectImageRole = (img: {
    getAttribute: (name: string) => string | undefined;
    setAttribute: (name: string, value: string) => void;
  }): "logo" | "hero" | "content" => {
    const alt = img.getAttribute("alt")?.toLowerCase() || "";
    const className = img.getAttribute("class")?.toLowerCase() || "";
    const isLogo =
      alt.includes("logo") ||
      className.includes("logo") ||
      className.includes("brand");
    if (isLogo) return "logo";

    const isHeroLike =
      alt.includes("hero") ||
      alt.includes("banner") ||
      alt.includes("main visual") ||
      className.includes("hero-img") ||
      className.includes("hero");
    if (isHeroLike) return "hero";

    return "content";
  };

  const applyImageLoadingStrategy = (img: {
    getAttribute: (name: string) => string | undefined;
    setAttribute: (name: string, value: string) => void;
  }) => {
    const role = detectImageRole(img);
    const isLogo = role === "logo";
    const isHeroLike = role === "hero";

    const isFirstContent = !isLogo && !isHeroLike && !firstContentImageDone;
    if (isFirstContent) firstContentImageDone = true;

    img.setAttribute("decoding", "async");

    if (!img.getAttribute("width") || !img.getAttribute("height")) {
      const inlineStyle = img.getAttribute("style") ?? "";
      const sw = inlineStyle.match(/(?:^|;)\s*width\s*:\s*(\d+)px/)?.[1];
      const sh = inlineStyle.match(/(?:^|;)\s*height\s*:\s*(\d+)px/)?.[1];
      if (sw && sh) {
        img.setAttribute("width", sw);
        img.setAttribute("height", sh);
      } else if (role === "logo") {
        img.setAttribute("width", "180");
        img.setAttribute("height", "56");
      } else if (role === "hero") {
        img.setAttribute("width", "1280");
        img.setAttribute("height", "720");
      } else {
        img.setAttribute("width", "640");
        img.setAttribute("height", "480");
      }
    }

    if (isLogo || isHeroLike || isFirstContent) {
      img.setAttribute("loading", "eager");
      img.setAttribute("fetchpriority", "high");
      return;
    }

    img.setAttribute("loading", "lazy");
    img.setAttribute("fetchpriority", "low");
  };

  const registerAsset = (assetFile: GeneratedFile) => {
    assetRegistry.set(assetFile.path, assetFile);
    return assetFile.path;
  };

  const canUseRealImageAsset = (role: "logo" | "hero" | "content") => {
    if (role === "logo") return true;

    if (role === "hero") {
      if (heroImageCount >= 1) return false;
      heroImageCount += 1;
      return true;
    }

    if (contentImageCount >= 10) return false;
    contentImageCount += 1;
    return true;
  };

  const canCallImagegen = (role: "logo" | "hero" | "content") => {
    if (role === "logo") return false;

    if (role === "hero") {
      if (heroImagegenCallCount >= 1) return false;
      heroImagegenCallCount += 1;
      return true;
    }

    if (contentImagegenCallCount >= 10) return false;
    contentImagegenCallCount += 1;
    return true;
  };

  for (const img of imgEls) {
    const currentSrc = img.getAttribute("src") || "";
    const role = detectImageRole(img);

    if (!canUseRealImageAsset(role)) {
      img.setAttribute("src", SAFE_IMAGE);
      applyImageLoadingStrategy(img);
      continue;
    }

    if (
      currentSrc.startsWith("data:image/") &&
      !currentSrc.includes("svg+xml")
    ) {
      const parsed = parseDataUri(currentSrc);
      if (parsed) {
        const assetPath = registerAsset(
          buildAssetFile({
            base64: parsed.base64,
            mime: parsed.mime,
            prefix: "preserved",
          }),
        );
        img.setAttribute("src", assetPath);
        applyImageLoadingStrategy(img);
        continue;
      }
    }

    if (isReusableAssetSrc(currentSrc)) {
      const normalizedPath = normalizeAssetPath(currentSrc);
      const existingAsset = existingAssetsByPath.get(normalizedPath);
      if (existingAsset) {
        registerAsset(existingAsset);
        img.setAttribute("src", existingAsset.path);
        applyImageLoadingStrategy(img);
        continue;
      }
    }

    if (currentSrc.startsWith("img://uploaded/")) {
      if (currentSrc === UPLOADED_LOGO_PLACEHOLDER) {
        let replacedWithText = false;
        if (uploadedLogoWebp?.startsWith("data:image/webp")) {
          const parsedLogo = parseDataUri(uploadedLogoWebp);
          if (parsedLogo) {
            const assetPath = registerAsset(
              buildAssetFile({
                base64: parsedLogo.base64,
                mime: parsedLogo.mime,
                prefix: "uploaded-logo",
                preferredPath: "assets/uploaded-logo.webp",
              }),
            );
            img.setAttribute("src", assetPath);
          } else {
            img.setAttribute("src", SAFE_IMAGE);
          }
        } else if (brandName) {
          const brandNode = parseHtml(
            `<span class="brand-text">${escapeHtml(brandName)}</span>`,
          ).firstChild;
          if (brandNode && img.parentNode) {
            type ParentWithReplace = {
              replaceChild: (newNode: unknown, oldNode: unknown) => void;
            };
            const parent = img.parentNode as unknown as ParentWithReplace;
            parent.replaceChild(brandNode, img);
            replacedWithText = true;
          }
        } else {
          img.setAttribute("src", SAFE_IMAGE);
        }

        if (!replacedWithText) applyImageLoadingStrategy(img);
        continue;
      } else {
        const assetName = currentSrc
          .replace("img://uploaded/", "")
          .replace(".webp", "");
        const assetDataUri = customAssets?.[assetName];
        if (assetDataUri?.startsWith("data:image/webp")) {
          const parsedAsset = parseDataUri(assetDataUri);
          if (parsedAsset) {
            const assetPath = registerAsset(
              buildAssetFile({
                base64: parsedAsset.base64,
                mime: parsedAsset.mime,
                prefix: assetName,
                preferredPath: `assets/${assetName}.webp`,
              }),
            );
            img.setAttribute("src", assetPath);
            applyImageLoadingStrategy(img);
            continue;
          }
        }
        img.setAttribute("src", SAFE_IMAGE);
        applyImageLoadingStrategy(img);
        continue;
      }
    }

    const preservedMatch = currentSrc.match(/^img:\/\/preserved\/(\d+)$/);
    if (preservedMatch && preservedImages) {
      const idx = parseInt(preservedMatch[1], 10);
      if (idx < preservedImages.length) {
        const parsedPreserved = parseDataUri(preservedImages[idx]);
        if (parsedPreserved) {
          const assetPath = registerAsset(
            buildAssetFile({
              base64: parsedPreserved.base64,
              mime: parsedPreserved.mime,
              prefix: "preserved",
            }),
          );
          img.setAttribute("src", assetPath);
        }
        applyImageLoadingStrategy(img);
        continue;
      }
    }

    const alt = img.getAttribute("alt")?.trim();
    if (!alt) {
      img.setAttribute("src", SAFE_IMAGE);
      applyImageLoadingStrategy(img);
      continue;
    }

    const concise = alt.slice(0, 200);

    if (!canCallImagegen(role)) {
      img.setAttribute("src", SAFE_IMAGE);
      applyImageLoadingStrategy(img);
      continue;
    }

    const cacheKey = `${role}:${concise}`;

    if (imagePromptCache?.has(cacheKey)) {
      const cachedPath = await imagePromptCache.get(cacheKey);
      if (cachedPath) {
        img.setAttribute("src", cachedPath);
      } else {
        img.setAttribute("src", SAFE_IMAGE);
      }
      applyImageLoadingStrategy(img);
      continue;
    }

    const fetchImageLogic = async (): Promise<string | null> => {
      try {
        const imgRes = await fetch(`${origin}/api/imagegen`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: concise, role }),
        });
        const imgJson = await imgRes.json().catch(() => ({}));

        if (imgRes.status === 429 || imgJson?.error === "quota_exceeded") {
          const retryAfter =
            imgRes.headers?.get?.("retry-after") || imgJson?.retryAfter;
          console.warn("[codegen] imagegen quota exceeded — using SAFE_IMAGE", {
            retryAfter,
          });
          return null;
        }

        if (imgJson?.imageBase64 && imgJson?.mime) {
          const assetPath = registerAsset(
            buildAssetFile({
              base64: imgJson.imageBase64,
              mime: imgJson.mime,
              prefix: "generated",
            }),
          );
          return assetPath;
        } else {
          console.warn(
            "[codegen] imagegen returned no image — using SAFE_IMAGE",
          );
          return null;
        }
      } catch (e) {
        console.error("[codegen] per-img imagegen failed:", String(e));
        return null;
      }
    };

    const imageFetchPromise = fetchImageLogic();
    if (imagePromptCache) {
      imagePromptCache.set(cacheKey, imageFetchPromise);
    }

    const finalAssetPath = await imageFetchPromise;
    if (finalAssetPath) {
      img.setAttribute("src", finalAssetPath);
    } else {
      img.setAttribute("src", SAFE_IMAGE);
    }
    applyImageLoadingStrategy(img);
  }

  return root.toString();
}

async function generateSiteFromLLM(
  prompt: string,
  currentCode?: { context?: unknown; files?: unknown[] },
  uploadedLogoWebp?: string,
): Promise<{ site: LlmSiteResponse; imageMap: string[] } | null> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_API_KEY is not set");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

  const currentYear = new Date().getFullYear();

  const systemPrompt = `
1. Profile
You are an expert Static Web Developer and Content Strategist. Your goal is to generate or refine a professional, high-conversion web frontend using only HTML5, CSS3 and Vanilla JavaScript.
2. Directive
Goal: Generate or update a complete, fully functional web frontend as a single, valid JSON object. The output must focus on achieving the user's business goals through performance-optimized code and structured data delivery while maintaining visual and structural consistency with existing code when provided.
3. Context
Input data for code generation or refinement:
- User Prompt: The primary requirement document defining the purpose, style, and content of the web frontend. In the initial round, this provides a full-scale requirement set defining the complete architectural baseline. In refinement rounds, this document specifies only the delta-the modifications or additions requested relative to the 'Current Frontend Code'.
- Current Frontend Code (For refinement rounds): The technical state of the project. It must contain a siteIdentity object (including brandName, tagline, and title) and a files array. Each object within the files array must include a path (filename) and content (the actual HTML/CSS/JS code). If the 'Current Frontend Code' is provided, you must act as a 'Surgical Editor' by modifying only the requested parts while preserving the rest of the code integrity.
4. Workflows
4.1 Analyze Identity: Extract or update brandName, title, and tagline from the User Prompt.
4.2 Design System: Define or refine globalCss. (Note: Subject to CSS FREEZE in Refinement Mode).
4.3 Interaction Logic: Implement essential logic in globalJavascript (e.g., <dialog> modals, dynamic toggling). Do NOT wrap code in DOMContentLoaded or window.onload (scripts execute at body end).
4.4 Content Assembly: Assemble indexSections and pages. (Note: Subject to STRUCTURAL FREEZE in Refinement Mode).
4.5 JSON Validation: Ensure HTML characters are properly escaped.

5. Output Format
Return ONLY a single, valid JSON object (no markdown):
{
  "siteIdentity": { "brandName": "string", "title": "string", "tagline": "string" },
  "globalCss": "string",
  "globalJavascript": "string",
  "indexSections": [{"title": "string", "html": "string"}],
  "pages": [
    {
      "title": "string",
      "slug": "string",
      "sections": [{"title": "string", "html": "string"}]
    }
  ]
}

6. Constraints
6.1 Mandatory HTML Structure:
- Output inner-body tags only. All core content MUST be wrapped in <main> with "flex:1" for sticky-footer layout. If a Sidebar layout is requested, wrap the <aside> and <main> inside a flex container (e.g., <div class="layout-wrapper" style="display:flex; flex:1;">) within the "Main" section.
- Sections Array Requirement: indexSections and every page's sections array MUST contain EXACTLY 3 entries in this strict order:
    1. { "title": "Header", "html": "<header>...</header>" }
    2. { "title": "Main",   "html": "<main>...</main>" } (If using a Sidebar layout, this HTML should represent the layout wrapper containing both the <aside> Sidebar and <main> content)
    3. { "title": "Footer", "html": "<footer>...</footer>" }
- Footer Consistency: The footer HTML must be exactly identical across ALL pages and include Copyright: © ${currentYear}.
- Google Maps: If requested, use a lazy-load facade pattern (placeholder <div> with data-map-src and a click listener to replace it with the <iframe>) to prevent initial load penalties. Do NOT embed iframes directly.

6.2 Tech Stack:
- HTML5, CSS3, Vanilla JS only. NO frameworks or external CDNs (except Map/YouTube iframes).
- Use native <dialog> for modals. Fully responsive via Flexbox/Grid.
- STRICT CSS VALIDATION: You must write 100% valid CSS. 
- AVOID HALLUCINATIONS: DO NOT invent non-existent CSS properties or functions like 'min-minmax()'.
- FOR GRID LAYOUTS: Always use standard 'minmax()' inside repeat(), e.g., 'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));'

6.3 Visual Assets:
- DEFAULT to inline <svg> for ALL icons/decorative elements.
- Use <img> ONLY for genuine photos. HARD CAP per page: 1 hero image + max 4 content images.
- Never substitute images with emoji or CSS background-image.

6.4 Pages & Navigation:
- Generate a separate page object for every page listed in the User Prompt's Sitemap.
- All <a href> values must point to valid .html filenames, never "#".
- STRICT COMPREHENSIVENESS: You MUST read the "Page Structure" from the input prompt carefully. For EVERY SINGLE PAGE, you MUST generate ALL the sections requested by the user. 
- DO NOT summarize, skip, or output placeholder sections (e.g., "Content goes here").
- If the prompt asks for multiple sections on a page, your JSON output for that page's "sections" array (between Header and Footer) MUST contain all distinct sections with fully realized, production-ready HTML, CSS classes, and dummy content.

6.5 Refinement Rules (CRITICAL: When 'Current Frontend Code' is provided):
- Act as a SURGICAL EDITOR: Modify ONLY what the User Prompt explicitly requests. Leave everything else unchanged.
- CSS FREEZE: Copy globalCss VERBATIM from the existing code. Do not fix typos or reorder rules unless requested.
- STRUCTURAL FREEZE: Do NOT add, remove, or alter top-level elements (<header>, <nav>, <main>, <footer>), DOM tree hierarchy, grid/flex layouts, or CSS selectors unless explicitly instructed. Keep page inventory stable.
- FOOTER FREEZE: Copy the existing footer HTML VERBATIM.
- SEO Preservation: Preserve all anchor text, <img> alt attributes, <meta> tags, ARIA roles, and structured data.
`.trim();

  try {
    let sanitizedCode = currentCode;
    if (currentCode?.files && Array.isArray(currentCode.files)) {
      sanitizedCode = {
        ...currentCode,
        files: (currentCode.files as Array<GeneratedFile>).filter((f) =>
          /\.html$/i.test(f.path),
        ),
      };
    }

    let imageMap: string[] = [];
    if (sanitizedCode?.files && Array.isArray(sanitizedCode.files)) {
      const stripped = stripBase64FromFiles(
        sanitizedCode.files as Array<{ path: string; content: string }>,
      );
      sanitizedCode = { ...sanitizedCode, files: stripped.stripped };
      imageMap = stripped.imageMap;
    }

    let llmCurrentCode: Record<string, unknown> | null = null;
    if (sanitizedCode) {
      const ctx = (sanitizedCode.context ?? {}) as Record<string, unknown>;
      llmCurrentCode = {
        ...ctx,
        files: sanitizedCode.files,
      };
    }

    const logoContext = uploadedLogoWebp?.startsWith("data:image/webp")
      ? `\n\nUploaded Logo: Available as ${UPLOADED_LOGO_PLACEHOLDER}. Use this exact src for brand logo placement in navbar or sidebar.`
      : "";

    const userMessage = llmCurrentCode
      ? `User Prompt: "${prompt}"${logoContext}\n\nCurrent Frontend Code: ${JSON.stringify(llmCurrentCode)}`
      : `User Prompt: "${prompt}"${logoContext}`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: userMessage }] }],
      generationConfig: {
        temperature: 0.3,
        responseMimeType: "application/json",
        maxOutputTokens: 65536,
        thinkingConfig: { thinkingBudget: 0 },
      } as unknown as GenerationConfig,
      systemInstruction: systemPrompt,
    });

    const rawText = result.response.text();
    let cleanedText = rawText.trim();

    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText
        .replace(/^```json\n?/, "")
        .replace(/\n?```$/, "");
    }

    const startIdx = cleanedText.indexOf("{");
    const endIdx = cleanedText.lastIndexOf("}");
    if (startIdx !== -1 && endIdx !== -1) {
      cleanedText = cleanedText.substring(startIdx, endIdx + 1);
    }

    let site: LlmSiteResponse;
    try {
      site = JSON.parse(cleanedText) as LlmSiteResponse;
    } catch (parseError) {
      console.error(
        "[codegen] JSON parse failed. Raw response tail (last 500 chars):",
        cleanedText.slice(-500),
      );
      throw parseError;
    }
    return { site, imageMap };
  } catch (error) {
    console.error("LLM Error:", error);
    return null;
  }
}

function stripHtmlExtensions(html: string): string {
  return html.replace(
    /href="([^"#?:]+)\.html([#?][^"]*)?"(?=\s|>)/g,
    (_, path, suffix) => `href="${path}${suffix ?? ""}"`,
  );
}

function renderShell(
  data: LlmSiteResponse,
  bodyContent: string,
  pageTitle?: string,
) {
  const brand = data.siteIdentity.brandName || data.siteIdentity.title;
  const titleText =
    pageTitle &&
    pageTitle.toLowerCase() !== "home" &&
    pageTitle.toLowerCase() !== "index"
      ? `${pageTitle} | ${brand}`
      : data.siteIdentity.title;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="index, follow">
    <meta name="description" content="${escapeHtml(data.siteIdentity.tagline)}">
    <title>${escapeHtml(titleText)}</title>
    <style>
        body { margin: 0; font-family: system-ui, sans-serif; line-height: 1.5; display: flex; flex-direction: column; min-height: 100vh; }
        body > *:not(header):not(nav):not(footer):not(script):not(style) { flex: 1; }
        img { max-width: 100%; height: auto; }
        
        ${data.globalCss}
    </style>
</head>
<body>
    ${bodyContent}
    
    <script>
        ${data.globalJavascript}
    </script>
</body>
</html>`.trim();
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, currentCode, uploadedLogoWebp, customAssets } =
      await req.json();
    const origin = new URL(req.url).origin;
    const refinementPages = extractRefinementHtmlPages(currentCode);
    const refinementPageSet = new Set(refinementPages.map((p) => p.path));
    const refinementAssets = extractRefinementAssetFiles(currentCode);
    const existingAssetsByPath = new Map(
      refinementAssets.map((asset) => [normalizeAssetPath(asset.path), asset]),
    );
    const assetRegistry = new Map<string, GeneratedFile>();
    const imagePromptCache = new Map<string, Promise<string | null>>();

    const llmResult = await generateSiteFromLLM(
      prompt,
      currentCode,
      uploadedLogoWebp,
    );

    if (!llmResult) throw new Error("LLM generation failed");
    const { site: siteData, imageMap } = llmResult;

    let indexHtml = siteData.indexSections.map((s) => s.html).join("");
    indexHtml = await processImages(
      indexHtml,
      origin,
      assetRegistry,
      existingAssetsByPath,
      imageMap,
      uploadedLogoWebp,
      customAssets,
      siteData.siteIdentity?.brandName,
      imagePromptCache,
    );
    indexHtml = stripHtmlExtensions(indexHtml);

    const processedPages = await Promise.all(
      siteData.pages.map(async (page) => {
        const pageHtml = page.sections.map((s) => s.html).join("");
        let processedHtml = await processImages(
          pageHtml,
          origin,
          assetRegistry,
          existingAssetsByPath,
          imageMap,
          uploadedLogoWebp,
          customAssets,
          siteData.siteIdentity?.brandName,
          imagePromptCache,
        );
        processedHtml = stripHtmlExtensions(processedHtml);

        return {
          title: page.title,
          slug: page.slug,
          path: `${page.slug.replace(/\.html$/i, "")}.html`,
          sections: page.sections,
          html: processedHtml,
        };
      }),
    );

    const NON_PAGE_SLUGS = new Set([
      "index",
      "robots",
      "robots.txt",
      "sitemap",
      "sitemap.xml",
    ]);
    const generatedPageFiles: GeneratedFile[] = processedPages
      .filter((p) => {
        const cleanSlug = p.slug.replace(/\.html$/i, "").toLowerCase();
        return !NON_PAGE_SLUGS.has(cleanSlug);
      })
      .map((p) => {
        const cleanSlug = p.slug.replace(/\.html$/i, "");
        return {
          path: `${cleanSlug}.html`,
          content: renderShell(siteData, p.html, p.title),
        };
      });

    const pageFiles: GeneratedFile[] =
      refinementPageSet.size > 0
        ? [
            ...generatedPageFiles.filter((f) => refinementPageSet.has(f.path)),
            ...refinementPages
              .filter(
                (existing) =>
                  !generatedPageFiles.some(
                    (generated) => generated.path === existing.path,
                  ),
              )
              .map((existing) => ({
                path: existing.path,
                content: existing.content,
                encoding: existing.encoding,
                mimeType: existing.mimeType,
              })),
          ]
        : generatedPageFiles;

    const assetFiles: GeneratedFile[] =
      refinementAssets.length > 0
        ? [
            ...Array.from(assetRegistry.values()),
            ...refinementAssets.filter(
              (existing) =>
                !assetRegistry.has(normalizeAssetPath(existing.path)),
            ),
          ]
        : Array.from(assetRegistry.values());

    const htmlFiles: GeneratedFile[] = [
      {
        path: "index.html",
        content: renderShell(siteData, indexHtml, "Home"),
      },
      ...pageFiles,
    ];

    const robotsFile: GeneratedFile = {
      path: "robots.txt",
      content: `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml`,
    };

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${origin}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${htmlFiles
  .filter((f) => f.path !== "index.html")
  .map(
    (f) => `  <url>
    <loc>${origin}/${f.path}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

    const files: GeneratedFile[] = [
      ...htmlFiles,
      ...assetFiles,
      robotsFile,
      {
        path: "sitemap.xml",
        content: sitemapContent,
      },
    ];

    return NextResponse.json({
      context: {
        siteIdentity: siteData.siteIdentity,
        globalCss: siteData.globalCss,
      },
      files,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === "string"
          ? error
          : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
