import * as cheerio from "cheerio";
import type { AnyNode, Element } from "domhandler";
import {
  describeElement,
  getElementContext,
  getFullSelectorPath,
} from "./heuristic-checker-utils";
import type { HeuristicIssue } from "./heuristic-parser";

interface CheckResult {
  passed: boolean;
  issues: HeuristicIssue[];
}

interface HeuristicChecker {
  id: string;
  name: string;
  heuristic: string;
  severity: "essential" | "pragmatic" | "hedonic";
  check: (
    $: cheerio.CheerioAPI,
    html: string,
    fileName?: string,
  ) => CheckResult;
}

const parseColor = (
  colorStr: string,
): { r: number; g: number; b: number } | null => {
  if (!colorStr) return null;
  const str = colorStr.trim().toLowerCase();

  const hexMatch = str.match(/#([0-9a-f]{3}|[0-9a-f]{6})/i);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => `${c}${c}`)
        .join("");
    }
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16),
    };
  }

  const rgbMatch = str.match(
    /rgba?\(\s*([\d.]+)\s*(?:,|\s)\s*([\d.]+)\s*(?:,|\s)\s*([\d.]+)/,
  );
  if (rgbMatch) {
    return {
      r: Math.round(+rgbMatch[1]),
      g: Math.round(+rgbMatch[2]),
      b: Math.round(+rgbMatch[3]),
    };
  }

  const hslMatch = str.match(
    /hsla?\(\s*([\d.]+)(?:deg)?\s*(?:,|\s)\s*([\d.]+)%\s*(?:,|\s)\s*([\d.]+)%/,
  );
  if (hslMatch) {
    let h = parseFloat(hslMatch[1]) % 360;
    if (h < 0) h += 360;
    h /= 360;
    const s = parseFloat(hslMatch[2]) / 100;
    const l = parseFloat(hslMatch[3]) / 100;

    let r: number, g: number, b: number;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  }

  if (str === "white") return { r: 255, g: 255, b: 255 };
  if (str === "black") return { r: 0, g: 0, b: 0 };
  if (str === "transparent") return null;

  return null;
};


const getLuminance = (rgb: { r: number; g: number; b: number }): number => {
  const rsRGB = rgb.r / 255;
  const gsRGB = rgb.g / 255;
  const bsRGB = rgb.b / 255;

  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : ((rsRGB + 0.055) / 1.055) ** 2.4;
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : ((gsRGB + 0.055) / 1.055) ** 2.4;
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : ((bsRGB + 0.055) / 1.055) ** 2.4;

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};


const getContrastRatio = (color1: string, color2: string): number | null => {
  const rgb1 = parseColor(color1);
  const rgb2 = parseColor(color2);
  if (!rgb1 || !rgb2) return null;

  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
};


const findSearchInputs = (
  $: cheerio.CheerioAPI,
): Array<{ element: Element; type: "search" | "textWithSearchHint" }> => {
  const searchInputs: Array<{
    element: Element;
    type: "search" | "textWithSearchHint";
  }> = [];


  $('input[type="search"]').each((_, element) => {
    searchInputs.push({ element: element as Element, type: "search" });
  });

  $('input[type="text"], input:not([type])').each((_, element) => {
    const $input = $(element);
    const className = ($input.attr("class") || "").toLowerCase();
    const placeholder = ($input.attr("placeholder") || "").toLowerCase();
    const name = ($input.attr("name") || "").toLowerCase();
    const id = ($input.attr("id") || "").toLowerCase();

    const nameWordMatch = (val: string) =>
      /(?:^|[_-])search(?:[_-]|$)/.test(val);

    const placeholderMatch = (val: string) => /^\s*search\b/i.test(val);

    const classMatch = (val: string) =>
      val.split(/\s+/).some((c) => /^search$|^search[-_]|[-_]search$/.test(c));

    if (
      classMatch(className) ||
      placeholderMatch(placeholder) ||
      nameWordMatch(name) ||
      nameWordMatch(id)
    ) {
      searchInputs.push({
        element: element as Element,
        type: "textWithSearchHint",
      });
    }
  });

  return searchInputs;
};

interface PageStructure {
  fileName: string;
  hasNav: boolean;
  hasAside: boolean;
  hasFooter: boolean;
}

const pageStructures: Map<string, PageStructure> = new Map();


export function resetCrossPageState(): void {
  pageStructures.clear();
}


function recordPageStructure(structure: PageStructure): void {
  pageStructures.set(structure.fileName, structure);
}


function analyzeCrossPageConsistency(): HeuristicIssue[] {
  const issues: HeuristicIssue[] = [];

  if (pageStructures.size < 2) {
    return issues;
  }

  const normalPages = Array.from(pageStructures.values());

  if (normalPages.length < 2) {
    return issues;
  }


  const pagesWithNav = normalPages.filter((p) => p.hasNav && !p.hasAside);
  const pagesWithAside = normalPages.filter((p) => p.hasAside && !p.hasNav);
  const pagesWithBoth = normalPages.filter((p) => p.hasNav && p.hasAside);


  if (pagesWithNav.length > 0 && pagesWithAside.length > 0) {
    issues.push({
      checklistId: "H04-02",
      checklistItem:
        "Cross-page consistency: mixed <nav>/<aside> navigation elements across pages",
      heuristic: "Consistency and standards",
      severity: "hedonic",
      recommendation: `Mixed navigation structure detected: ${pagesWithNav.length} page(s) use <nav> while ${pagesWithAside.length} page(s) use <aside>. Standardize to use <nav> across all pages for consistency.\n\nPages with <nav>:\n${pagesWithNav.map((p) => `  - ${p.fileName}`).join("\n")}\n\nPages with <aside>:\n${pagesWithAside.map((p) => `  - ${p.fileName}`).join("\n")}`,
      affectedSelectors: "multiple pages",
      fileName: "cross-page-analysis",
    });
    return issues;
  }

  const totalPagesWithNav = pagesWithNav.length + pagesWithBoth.length;
  const totalPagesWithAside = pagesWithAside.length + pagesWithBoth.length;

  if (totalPagesWithNav > 0 && totalPagesWithNav < normalPages.length) {
    const pagesWithoutAnyNav = normalPages.filter(
      (p) => !p.hasNav && !p.hasAside,
    );
    if (pagesWithoutAnyNav.length > 0) {
      issues.push({
        checklistId: "H04-02",
        checklistItem:
          "Cross-page consistency: <nav> element present on some pages but absent on others",
        heuristic: "Consistency and standards",
        severity: "hedonic",
        recommendation: `Navigation inconsistency: ${totalPagesWithNav} page(s) have <nav> but ${pagesWithoutAnyNav.length} page(s) don't. Add <nav> to all pages:\n${pagesWithoutAnyNav.map((p) => `  - ${p.fileName}`).join("\n")}`,
        affectedSelectors: "multiple pages",
        fileName: "cross-page-analysis",
      });
    }
  }

  if (totalPagesWithAside > 0 && totalPagesWithAside < normalPages.length) {
    const pagesWithoutAnyAside = normalPages.filter(
      (p) => !p.hasAside && !p.hasNav,
    );
    if (pagesWithoutAnyAside.length > 0) {
      issues.push({
        checklistId: "H04-02",
        checklistItem:
          "Cross-page consistency: <aside> element present on some pages but absent on others",
        heuristic: "Consistency and standards",
        severity: "hedonic",
        recommendation: `Sidebar inconsistency: ${totalPagesWithAside} page(s) have <aside> but ${pagesWithoutAnyAside.length} page(s) don't. Add <aside> to all pages:\n${pagesWithoutAnyAside.map((p) => `  - ${p.fileName}`).join("\n")}`,
        affectedSelectors: "multiple pages",
        fileName: "cross-page-analysis",
      });
    }
  }

  return issues;
}

const H01_01_Checker: HeuristicChecker = {
  id: "H01-01",
  name: "Expose required fields by default. Provide visual cues to indicate hidden content.",
  heuristic: "Visibility of system status",
  severity: "pragmatic",
  check: ($, _html, fileName) => {
    const issues: HeuristicIssue[] = [];

    $("input[required], textarea[required], select[required]").each(
      (_, element) => {
        const $element = $(element);
        const el = element as Element;

        if ($element.attr("type") === "hidden") return;

        const fullPath = getFullSelectorPath($, el);
        const context = getElementContext($, el);
        const description = describeElement($, el);

        const name = $element.attr("name") || "";
        const id = $element.attr("id") || "";

        const ariaHidden = $element.attr("aria-hidden");
        const isHiddenByAria = ariaHidden === "true";

        const style = $element.attr("style") || "";
        const isHiddenByCSS =
          style.includes("display: none") ||
          style.includes("display:none") ||
          style.includes("visibility: hidden") ||
          style.includes("visibility:hidden");

        let hasRequiredIndicator = false;

        if (id) {
          const $label = $(`label[for="${id}"]`);
          if ($label.length > 0) {
            const labelText = $label.text();
            hasRequiredIndicator =
              labelText.includes("*") ||
              labelText.toLowerCase().includes("required") ||
              $label.hasClass("required") ||
              $label.find(".required-marker, .required-indicator").length > 0;
          }
        }

        if (!hasRequiredIndicator) {
          const $parentLabel = $element.closest("label");
          if ($parentLabel.length > 0) {
            const labelText = $parentLabel.text();
            hasRequiredIndicator =
              labelText.includes("*") ||
              labelText.toLowerCase().includes("required") ||
              $parentLabel.hasClass("required");
          }
        }

        if (!hasRequiredIndicator) {
          const ariaLabel = $element.attr("aria-label") || "";
          hasRequiredIndicator =
            ariaLabel.includes("*") ||
            ariaLabel.toLowerCase().includes("required");
        }
        if (!hasRequiredIndicator) {
          const labelledById = $element.attr("aria-labelledby");
          if (labelledById) {
            const ids = labelledById.trim().split(/\s+/);
            for (const id of ids) {
              const labelledText = $(`#${CSS.escape(id)}`).text();
              if (
                labelledText.includes("*") ||
                labelledText.toLowerCase().includes("required")
              ) {
                hasRequiredIndicator = true;
                break;
              }
            }
          }
        }

        if (!hasRequiredIndicator) {
          const placeholder = $element.attr("placeholder") || "";
          hasRequiredIndicator =
            placeholder.includes("*") || /\brequired\b/i.test(placeholder);
        }

        if (!hasRequiredIndicator) {
          hasRequiredIndicator =
            $element.hasClass("required") || $element.hasClass("is-required");
        }

        const problems: string[] = [];

        const isVisuallyHiddenForCustomUI =
          $element.attr("tabindex") === "-1" ||
          $element.closest(
            '[role="combobox"], [role="listbox"], [role="switch"], [role="radiogroup"], ' +
              ".custom-select, .custom-checkbox, .custom-radio, [data-radix-collection-item], " +
              "[data-headlessui-state]",
          ).length > 0;

        if (isHiddenByAria && !isVisuallyHiddenForCustomUI) {
          problems.push(
            'Hidden by aria-hidden="true", must be visible and accessible',
          );
        }

        if (isHiddenByCSS && !isVisuallyHiddenForCustomUI) {
          problems.push(
            "Hidden by CSS (display:none or visibility:hidden), must be visible",
          );
        }

        if (!isHiddenByAria && !isHiddenByCSS && !hasRequiredIndicator) {
          const labelRecommendation = id
            ? `Add "*" or "(required)" text to <label for="${id}">`
            : `Add <label id="${name || "field"}-label"> with "*" or "(required)" text`;
          problems.push(labelRecommendation);
        }

        if (problems.length > 0) {
          const problemList = problems
            .map((p, i) => `${i + 1}. ${p}`)
            .join("\n");

          issues.push({
            checklistId: "H01-01",
            checklistItem:
              "Required input field is hidden (aria-hidden/CSS) or lacks a visual required indicator (* or label)",
            heuristic: "Visibility of system status",
            severity: "pragmatic",
            recommendation: `${description} ${context} has ${problems.length} issue${problems.length > 1 ? "s" : ""}:\n${problemList}`,
            affectedSelectors: fullPath,
            fileName,
          });
        }
      },
    );

    return {
      passed: issues.length === 0,
      issues,
    };
  },
};


const H01_02_Checker: HeuristicChecker = {
  id: "H01-02",
  name: "Avoid the use of meta refresh redirection for redirects and provide ample time to read information.",
  heuristic: "Visibility of system status",
  severity: "essential",
  check: ($, _html, fileName) => {
    const issues: HeuristicIssue[] = [];

    $('meta[http-equiv="refresh"]').each((_, element) => {
      const $element = $(element);
      const el = element as Element;
      const content = $element.attr("content") || "";
      const fullPath = getFullSelectorPath($, el);

      const delayMatch = content.match(/^\s*(\d+)/);
      const delaySeconds = delayMatch ? parseInt(delayMatch[1], 10) : 0;
      const hasUrl = content.includes("url=");

      const minRecommendedDelay = 20;

      if (delaySeconds === 0 && hasUrl) {
        issues.push({
          checklistId: "H01-02",
          checklistItem:
            "Meta refresh performs instant (0-second) redirect without user control",
          heuristic: "Visibility of system status",
          severity: "essential",
          recommendation: `Remove the <meta http-equiv="refresh" content="${content}"> tag that redirects immediately (0 seconds). Replace with server-side redirect (HTTP 301/302) or use JavaScript with user control: <button onclick="window.location.href='...'">Continue</button>`,
          affectedSelectors: fullPath,
          fileName,
        });
      }
      else if (
        delaySeconds > 0 &&
        delaySeconds < minRecommendedDelay &&
        hasUrl
      ) {
        issues.push({
          checklistId: "H01-02",
          checklistItem:
            "Meta refresh redirect delay is below 20 seconds (WCAG minimum)",
          heuristic: "Visibility of system status",
          severity: "essential",
          recommendation: `Meta refresh with ${delaySeconds} seconds delay is too short (minimum: ${minRecommendedDelay} seconds recommended by WCAG). Either increase delay to ${minRecommendedDelay}+ seconds or better: remove meta refresh and provide a manual "Continue" link: <a href="...">Click here to continue</a>`,
          affectedSelectors: fullPath,
          fileName,
        });
      }
      else if (delaySeconds >= minRecommendedDelay && hasUrl) {
        issues.push({
          checklistId: "H01-02",
          checklistItem:
            "Meta refresh performs redirect without providing a manual override link",
          heuristic: "Visibility of system status",
          severity: "essential",
          recommendation: `Meta refresh with ${delaySeconds} seconds delay found. While the delay is acceptable, it's better to give users full control. Replace with: <p>You will be redirected in ${delaySeconds} seconds. <a href="...">Click here to continue now</a></p>`,
          affectedSelectors: fullPath,
          fileName,
        });
      }
      else if (!hasUrl) {
        issues.push({
          checklistId: "H01-02",
          checklistItem:
            "Meta refresh auto-reloads the current page, disrupting reading and screen readers",
          heuristic: "Visibility of system status",
          severity: "essential",
          recommendation: `Remove auto-refresh <meta http-equiv="refresh" content="${content}"> that refreshes the current page every ${delaySeconds} seconds. This disrupts user reading and screen readers. If updates are needed, use AJAX to update specific sections or provide a manual "Refresh" button.`,
          affectedSelectors: fullPath,
          fileName,
        });
      }
    });

    return {
      passed: issues.length === 0,
      issues,
    };
  },
};


const H01_03_Checker: HeuristicChecker = {
  id: "H01-03",
  name: "If there is a link in the page, it should appear in a different color and be underscored so that the user knows that he/she can click on it.",
  heuristic: "Visibility of system status",
  severity: "pragmatic",
  check: ($, _html, fileName) => {
    const issues: HeuristicIssue[] = [];
    const links = $("a[href]");

    if (links.length === 0) {
      return { passed: true, issues: [] };
    }

    const styleContent = $("style").text();

    const hasCSSColor =
      /a\s*\{[^}]*color\s*:/i.test(styleContent) ||
      /a\[[^\]]*\]\s*\{[^}]*color\s*:/i.test(styleContent) ||
      /a:[a-z-]+\s*\{[^}]*color\s*:/i.test(styleContent) ||
      /nav\s+a\s*\{[^}]*color\s*:/i.test(styleContent) ||
      /header\s+a\s*\{[^}]*color\s*:/i.test(styleContent) ||
      /\.[\w-]+\s+a\s*\{[^}]*color\s*:/i.test(styleContent);

    const hasCSSUnderline =
      /a\s*\{[^}]*(text-decoration\s*:[^;}]*underline|border-bottom\s*:)/i.test(
        styleContent,
      ) ||
      /a\[[^\]]*\]\s*\{[^}]*(text-decoration\s*:[^;}]*underline|border-bottom\s*:)/i.test(
        styleContent,
      );

    const tailwindColorPrefixes = [
      "text-red-",
      "text-blue-",
      "text-green-",
      "text-yellow-",
      "text-purple-",
      "text-pink-",
      "text-indigo-",
      "text-gray-",
      "text-grey-",
      "text-orange-",
      "text-teal-",
      "text-cyan-",
      "text-lime-",
      "text-amber-",
      "text-emerald-",
      "text-violet-",
      "text-fuchsia-",
      "text-rose-",
      "text-sky-",
      "text-slate-",
      "text-stone-",
      "text-zinc-",
      "text-neutral-",
      "text-primary",
      "text-secondary",
      "text-accent",
      "text-white",
      "text-black",
    ];

    const hasExternalStylesheet = $('link[rel="stylesheet"]').length > 0;

    links.each((_, element) => {
      const $link = $(element);
      const el = element as Element;
      const style = $link.attr("style") || "";
      const linkClasses = ($link.attr("class") || "")
        .split(" ")
        .filter(Boolean);

      const fullPath = getFullSelectorPath($, el);
      const context = getElementContext($, el);
      const description = describeElement($, el);

      const isInNav =
        $link.closest(
          "nav, header, aside, footer, .navbar, .nav, .footer, [role='navigation'], [role='contentinfo']",
        ).length > 0;

      const hasRoleButton = $link.attr("role") === "button";
      const isExplicitButton = linkClasses.some(
        (c) =>
          /^btn($|[-_])/.test(c) ||
          c === "button" ||
          c.includes("-btn") ||
          c.includes("-button") ||
          c.includes("cta"),
      );

      const hasSvgOrIcon =
        $link.children("svg, img, i, [class*='icon']").length > 0;
      const isComponentLink = linkClasses.some(
        (c) =>
          c.includes("-link") ||
          c.includes("-item") ||
          c.includes("card") ||
          c.includes("media"),
      );

      const hasBg = linkClasses.some(
        (c) =>
          c.startsWith("bg-") &&
          !c.includes("transparent") &&
          !c.includes("none"),
      );
      const hasBorder = linkClasses.some(
        (c) =>
          c.startsWith("border") && c !== "border-none" && c !== "border-0",
      );
      const hasShadow = linkClasses.some(
        (c) => c.startsWith("shadow") && c !== "shadow-none",
      );
      const hasPadding = linkClasses.some(
        (c) => /^p[xy]?-/.test(c) || /^p-/.test(c),
      );
      const hasDisplay = linkClasses.some((c) =>
        [
          "block",
          "inline-block",
          "flex",
          "inline-flex",
          "grid",
          "inline-grid",
        ].includes(c),
      );

      const isTailwindButton = hasPadding && (hasBg || hasBorder) && hasDisplay;

      const hasInlinePadding = /\bpadding\s*:/i.test(style);
      const hasInlineBorder =
        /\bborder\s*:/i.test(style) || /\bborder-[trblxy]?\s*:/i.test(style);
      const hasInlineBackground = /\bbackground(-color)?\s*:/i.test(style);
      const hasInlineBorderRadius = /\bborder-radius\s*:/i.test(style);
      const isInlineStyledButton =
        hasInlinePadding &&
        (hasInlineBorder || hasInlineBackground) &&
        (hasInlineBackground || hasInlineBorderRadius);

      const hasMeaningfulBg = linkClasses.some(
        (c) =>
          c.startsWith("bg-") &&
          !c.includes("transparent") &&
          !c.includes("white") &&
          !c.includes("none"),
      );

      const isSelfCard =
        linkClasses.some((c) => c.includes("card")) ||
        (hasPadding && (hasMeaningfulBg || hasBorder || hasShadow));

      const hasBlockChildren =
        $link.children("div, article, section, figure").length > 0;
      const $firstChild = $link.children().first();
      const firstChildClasses = ($firstChild.attr("class") || "")
        .split(" ")
        .filter(Boolean);
      const firstChildHasCardStyling = firstChildClasses.some(
        (c) =>
          c.includes("border") ||
          c.includes("shadow") ||
          c.startsWith("bg-") ||
          c.includes("card"),
      );

      const isWrapperCard =
        hasBlockChildren && (isSelfCard || firstChildHasCardStyling);

      const isInsideCard =
        $link.closest(
          '[class*="card"], [class*="tile"], [class*="media"], [class*="item"]',
        ).length > 0;

      const isInteractiveBlock =
        isInsideCard ||
        hasRoleButton ||
        isExplicitButton ||
        isTailwindButton ||
        isInlineStyledButton ||
        isSelfCard ||
        isWrapperCard ||
        (hasSvgOrIcon && isComponentLink) ||
        (linkClasses.length > 0 &&
          hasSvgOrIcon &&
          $link.css("display")?.includes("flex"));

      const hasInlineColor = /color\s*:/i.test(style);
      let hasColorFromClass = false;
      linkClasses.forEach((className) => {

        const safeClassName = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const classPattern = new RegExp(
          `\\.${safeClassName}\\s*\\{[^}]*color\\s*:`,
          "i",
        );
        if (classPattern.test(styleContent)) hasColorFromClass = true;
      });

      const hasTailwindColor = linkClasses.some((c) =>
        tailwindColorPrefixes.some((prefix) => c.startsWith(prefix)),
      );
      const hasColorStyling =
        hasInlineColor || hasCSSColor || hasColorFromClass || hasTailwindColor;

      let hasUnderline = true;

      if (!isInNav && !isInteractiveBlock) {
        let isUnderlineRemoved = false;


        if (
          /a\s*\{[^}]*text-decoration\s*:\s*(none|inherit|transparent)/i.test(
            styleContent,
          )
        ) {
          isUnderlineRemoved = true;
        }

        if (linkClasses.includes("no-underline")) isUnderlineRemoved = true;
        linkClasses.forEach((className) => {
          const noUnderlinePattern = new RegExp(
            `\\.${className}\\s*\\{[^}]*text-decoration\\s*:\\s*(none|inherit|transparent)`,
            "i",
          );
          if (noUnderlinePattern.test(styleContent)) {
            isUnderlineRemoved = true;
          }
        });

        if (/text-decoration\s*:\s*(none|inherit|transparent)/i.test(style)) {
          isUnderlineRemoved = true;
        }

        if (isUnderlineRemoved) {
          const hasInlineUnderline =
            /text-decoration\s*:\s*[^;]*underline/i.test(style) ||
            /text-decoration-line\s*:\s*underline/i.test(style) ||
            /border-bottom\s*:/i.test(style);

          let hasUnderlineFromClass = false;
          linkClasses.forEach((className) => {
            const underlinePattern = new RegExp(
              `\\.${className}\\s*\\{[^}]*(text-decoration\\s*:[^;}]*underline|border-bottom\\s*:)`,
              "i",
            );
            if (underlinePattern.test(styleContent)) {
              hasUnderlineFromClass = true;
            }
          });

          const hasTailwindUnderline =
            linkClasses.some((c) => c.includes("underline")) ||
            linkClasses.some(
              (c) => c === "border-b" || c.startsWith("border-b-"),
            );

          hasUnderline =
            hasInlineUnderline ||
            hasCSSUnderline ||
            hasUnderlineFromClass ||
            hasTailwindUnderline;
        }
      }

      const problems: string[] = [];

      const linkText = $link.text().trim();
      const hasOnlyMedia =
        linkText === "" &&
        $link.children("img, svg, picture, canvas").length > 0;
      if (hasOnlyMedia) return;

      const isUnstyled = linkClasses.length === 0 && !style;
      if (isUnstyled) return;

      const isSrOnly =
        linkClasses.some(
          (c) =>
            [
              "sr-only",
              "visually-hidden",
              "screen-reader-text",
              "a11y-text",
              "visually-hidden-focusable",
            ].includes(c) || c.includes("sr-only"),
        ) ||
        /clip\s*:\s*rect\s*\(\s*0|position\s*:\s*absolute[^;]*;\s*width\s*:\s*1px/i.test(
          style,
        );
      if (isSrOnly) return;

      if (isInNav && hasExternalStylesheet) return;

      if (!isInteractiveBlock && !hasColorStyling && !hasExternalStylesheet) {
        problems.push(
          'Missing color styling - content links must have a distinct color. Add via CSS, or use Tailwind classes like "text-blue-600" or "text-primary".',
        );
      }

      if (
        !isInNav &&
        !isInteractiveBlock &&
        !hasUnderline &&
        !hasExternalStylesheet
      ) {
        problems.push(
          'Missing underline - content links should be underlined for accessibility. Add via CSS or use Tailwind "underline" class. (Note: Buttons and Navigation links don\'t require underlines)',
        );
      }

      if (problems.length > 0) {
        const problemList = problems.map((p, i) => `${i + 1}. ${p}`).join(" ");

        const contextNote = isInNav
          ? "This link is in a navigation/footer context, so underline is optional but distinct color is required."
          : "This link is in a content area, so BOTH distinct color AND underline are required for accessibility.";
        const fixExample = isInNav
          ? "/* Navigation links - color only */ nav a { color: #0066cc; } nav a:hover { color: #004499; }"
          : "/* Content links - color + underline */ a { color: #0066cc; text-decoration: underline; } a:hover { color: #004499; }";
        issues.push({
          checklistId: "H01-03",
          checklistItem:
            "Hyperlink lacks distinct color and underline styling to identify it as interactive",
          heuristic: "Visibility of system status",
          severity: "pragmatic",
          recommendation: `${description} ${context} has ${problems.length} styling issue${problems.length > 1 ? "s" : ""}: ${problemList} Context: ${contextNote} Example fix: ${fixExample}`,
          affectedSelectors: fullPath,
          fileName,
        });
      }
    });

    return {
      passed: issues.length === 0,
      issues,
    };
  },
};

const H01_04_Checker: HeuristicChecker = {
  id: "H01-04",
  name: "The title of each page lets them know in which part of the system they are.",
  heuristic: "Visibility of system status",
  severity: "pragmatic",
  check: ($, _html, fileName) => {
    const issues: HeuristicIssue[] = [];

    const genericTitles = [
      "welcome",
      "home",
      "homepage",
      "page",
      "content",
      "main",
      "index",
      "untitled",
    ];

    const genericH1s = [
      "welcome",
      "home",
      "homepage",
      "page",
      "content",
      "main",
      "index",
      "untitled",
    ];

    const $title = $("title");
    const title = $title.text().trim();
    const titleElement = $title.get(0);
    const fullPath = titleElement
      ? getFullSelectorPath($, titleElement as Element)
      : "html > head > title";

    const normalizedTitle = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim();

    if (!title) {
      issues.push({
        checklistId: "H01-04",
        checklistItem: "Page is missing a <title> tag or the title is empty",
        heuristic: "Visibility of system status",
        severity: "pragmatic",
        recommendation:
          "Add a <title> tag inside <head> section with descriptive text. Example: <title>Homepage - Restaurant Name</title>. This helps users understand their current location when they see browser tabs.",
        affectedSelectors: fullPath,
        fileName,
      });
    }
    else if (genericTitles.includes(normalizedTitle)) {
      issues.push({
        checklistId: "H01-04",
        checklistItem:
          "Page <title> contains a generic placeholder (e.g. 'Untitled', 'Document', 'Home')",
        heuristic: "Visibility of system status",
        severity: "pragmatic",
        recommendation: `Change the generic title "${title}" to a more descriptive one. Update <title>${title}</title> to <title>[Page Name] - [Site Name]</title>. Example: <title>About Us - Restaurant Name</title>.`,
        affectedSelectors: fullPath,
        fileName,
      });
    }

    const $h1 = $("h1");
    const h1Count = $h1.length;

    if (h1Count === 0) {
      issues.push({
        checklistId: "H01-04",
        checklistItem:
          "Page is missing a <h1> heading to describe its main content",
        heuristic: "Visibility of system status",
        severity: "pragmatic",
        recommendation:
          "Page lacks a <h1> heading. Add a descriptive <h1> tag to indicate the main content of the page. Example: <h1>About Our Restaurant</h1> or <h1>Product Details</h1>. The <h1> should describe what users will find on this page.",
        affectedSelectors: "html > body",
        fileName,
      });
    }

    else if (h1Count > 1) {
      const h1Selectors = $h1
        .map((_, el) => getFullSelectorPath($, el as Element))
        .get()
        .join(", ");

      issues.push({
        checklistId: "H01-04",
        checklistItem:
          "Page has multiple <h1> headings — only one <h1> should appear per page",
        heuristic: "Visibility of system status",
        severity: "pragmatic",
        recommendation: `Page has ${h1Count} <h1> headings but should have only one main heading. Multiple <h1> tags can confuse users and screen readers about the page's main topic. Keep the most important <h1> and change others to <h2> or appropriate heading levels.`,
        affectedSelectors: h1Selectors,
        fileName,
      });
    }
    else {
      const h1Text = $h1.first().text().trim();
      const normalizedH1 = h1Text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .trim();

      if (normalizedH1 === "" || genericH1s.includes(normalizedH1)) {
        const h1Element = $h1.get(0) as Element;
        const h1Path = getFullSelectorPath($, h1Element);

        issues.push({
          checklistId: "H01-04",
          checklistItem:
            "Page's <h1> text is too generic (e.g. 'Welcome', 'Home', 'Content')",
          heuristic: "Visibility of system status",
          severity: "pragmatic",
          recommendation: `The <h1> heading "${h1Text}" is too generic. Change it to clearly describe the page content. Example: <h1>Our Menu</h1>, <h1>Contact Information</h1>, or <h1>About Our Company</h1>.`,
          affectedSelectors: h1Path,
          fileName,
        });
      }
    }

    return {
      passed: issues.length === 0,
      issues,
    };
  },
};

const H01_05_Checker: HeuristicChecker = {
  id: "H01-05",
  name: "The navigation bar lets them know where they are in relation to other parts of the system.",
  heuristic: "Visibility of system status",
  severity: "pragmatic",
  check: ($, _html, fileName) => {
    const issues: HeuristicIssue[] = [];

    const navElements = $('nav, [role="navigation"]');

    if (navElements.length === 0) {
      issues.push({
        checklistId: "H01-05",
        checklistItem:
          "Page has no navigation bar (<nav> element or role=navigation)",
        heuristic: "Visibility of system status",
        severity: "pragmatic",
        recommendation:
          "Page lacks a navigation bar. Add a <nav> element with links and an active indicator to show the current page. Example: <nav><a href='/'>Home</a><a href='/about' aria-current='page'>About</a><a href='/contact'>Contact</a></nav>",
        affectedSelectors: "html > body",
        fileName,
      });
    } else if (navElements.length > 0) {

      navElements.each((_, element) => {
        const $nav = $(element);
        const el = element as Element;


        const ariaLabel = ($nav.attr("aria-label") || "").toLowerCase();
        const navClass = ($nav.attr("class") || "").toLowerCase();
        const isInFooter = $nav.closest("footer").length > 0;

        const isSecondaryNav =
          isInFooter ||
          ariaLabel.includes("social") ||
          ariaLabel.includes("pagination") ||
          ariaLabel.includes("breadcrumb") ||
          navClass.includes("social") ||
          navClass.includes("pagination") ||
          navClass.includes("breadcrumb");


        if (isSecondaryNav) return;

        const links = $nav.find("a");

        const validLinks = links.filter((_, a) => {
          const href = $(a).attr("href") || "";
          return href !== "" && !href.startsWith("#");
        });

        const hasExplicitActiveIndicator =
          $nav.find(
            ".active, .current, .selected, .is-active, [aria-current], .router-link-active, .exact-active, [data-state='active'], [aria-selected='true']",
          ).length > 0;

        const linkClassSigs = validLinks
          .map((_, a) =>
            ($(a).attr("class") || "")
              .split(/\s+/)
              .filter(Boolean)
              .sort()
              .join(" "),
          )
          .get();
        const hasClassDivergence =
          linkClassSigs.length >= 2 &&
          !linkClassSigs.every((sig) => sig === linkClassSigs[0]);

        const hasActiveIndicator =
          hasExplicitActiveIndicator || hasClassDivergence;

        if (!hasActiveIndicator && validLinks.length > 1) {
          const fullPath = getFullSelectorPath($, el);
          const context = getElementContext($, el);

          issues.push({
            checklistId: "H01-05",
            checklistItem:
              "Navigation bar lacks current page indicator (e.g. aria-current, .active, .current class)",
            heuristic: "Visibility of system status",
            severity: "pragmatic",
            recommendation: `The navigation menu ${context} lacks an active page indicator. Add aria-current="page" attribute to the current page link. Example: <a href="/about" aria-current="page">About</a> or add class="active" with CSS styling to highlight it.`,
            affectedSelectors: fullPath,
            fileName,
          });
        }
      });
    }

    return {
      passed: issues.length === 0,
      issues,
    };
  },
};

const H02_01_Checker: HeuristicChecker = {
  id: "H02-01",
  name: "The appropriateness also depends on the target audience of the system",
  heuristic: "Match between the system and the real world",
  severity: "pragmatic",
  check: ($, _html, fileName) => {
    const issues: HeuristicIssue[] = [];

    const lang = $("html").attr("lang");
    const isInvalid = lang !== undefined && lang.trim() === "";

    if (!lang || isInvalid) {
      issues.push({
        checklistId: "H02-01",
        checklistItem: "HTML <html> element is missing the lang attribute",
        heuristic: "Match between the system and the real world",
        severity: "pragmatic",
        recommendation:
          'Add lang attribute to <html> tag to specify the target language. Example: <html lang="en"> for English or <html lang="th"> for Thai. This helps screen readers and search engines understand your content.',
        affectedSelectors: "html",
        fileName,
      });
    }

    return {
      passed: issues.length === 0,
      issues,
    };
  },
};

const H03_01_Checker: HeuristicChecker = {
  id: "H03-01",
  name: "Allow users to pause, play, mute and control the volume for video content or video advertisements",
  heuristic: "User control and freedom",
  severity: "essential",
  check: ($, _html, fileName) => {
    const issues: HeuristicIssue[] = [];

    $("video").each((_, element) => {
      const $video = $(element);
      const el = element as Element;
      const fullPath = getFullSelectorPath($, el);
      const context = getElementContext($, el);
      const description = describeElement($, el);

      const hasControls = $video.attr("controls") !== undefined;
      const autoplay = $video.attr("autoplay") !== undefined;
      const isMuted = $video.attr("muted") !== undefined;
      const isLoop = $video.attr("loop") !== undefined;
      const isAriaHidden = $video.attr("aria-hidden") === "true";

      const isDecorativeVideo = (autoplay && isMuted && isLoop) || isAriaHidden;
      if (isDecorativeVideo) return;

      const problems: string[] = [];

      if (!hasControls) {
        problems.push(
          "Missing controls attribute - add controls attribute to <video> element for native play/pause, volume control, and fullscreen options",
        );

        if (autoplay) {
          problems.push(
            "Has autoplay without controls - this is particularly problematic as users cannot stop the video. Change <video autoplay> to <video autoplay controls>",
          );
        }
      }

      if (problems.length > 0) {
        const problemList = problems.map((p, i) => `${i + 1}. ${p}`).join("\n");

        issues.push({
          checklistId: "H03-01",
          checklistItem:
            "Video element is missing the controls attribute (no play/pause/volume/fullscreen)",
          heuristic: "User control and freedom",
          severity: "essential",
          recommendation: `${description} ${context} has ${problems.length} issue${problems.length > 1 ? "s" : ""}:\n${problemList}\n\nNote: Custom JavaScript controls cannot be verified through static HTML analysis - use native controls attribute for guaranteed accessibility.`,
          affectedSelectors: fullPath,
          fileName,
        });
      }
    });

    $("audio").each((_, element) => {
      const $audio = $(element);
      const el = element as Element;
      const fullPath = getFullSelectorPath($, el);
      const context = getElementContext($, el);
      const description = describeElement($, el);

      const hasControls = $audio.attr("controls") !== undefined;
      const autoplay = $audio.attr("autoplay") !== undefined;

      const isDecorativeAudio = $audio.attr("aria-hidden") === "true";
      if (isDecorativeAudio) return;

      const problems: string[] = [];

      if (!hasControls) {
        problems.push(
          "Missing controls attribute - add controls attribute to <audio> element to allow users to play, pause, and adjust volume",
        );

        if (autoplay) {
          problems.push(
            "Has autoplay without controls - users cannot control the audio playback. Change <audio autoplay> to <audio autoplay controls>",
          );
        }
      }

      if (problems.length > 0) {
        const problemList = problems.map((p, i) => `${i + 1}. ${p}`).join("\n");

        issues.push({
          checklistId: "H03-01",
          checklistItem:
            "Audio element is missing the controls attribute (no play/pause/volume)",
          heuristic: "User control and freedom",
          severity: "essential",
          recommendation: `${description} ${context} has ${problems.length} issue${problems.length > 1 ? "s" : ""}:\n${problemList}`,
          affectedSelectors: fullPath,
          fileName,
        });
      }
    });

    return {
      passed: issues.length === 0,
      issues,
    };
  },
};

const H03_02_Checker: HeuristicChecker = {
  id: "H03-02",
  name: "There should be an easy way out of a situation",
  heuristic: "User control and freedom",
  severity: "essential",
  check: ($, _html, fileName) => {
    const issues: HeuristicIssue[] = [];

    const popupHasCloseControl = (
      $popup: cheerio.Cheerio<AnyNode>,
    ): boolean => {
      const quickMatches =
        $popup.find(
          [
            "button.close",
            ".close-button",
            ".modal-close",
            ".popup-close",
            ".close-modal",
            "[data-dismiss]",
            "[data-bs-dismiss]",
            '[aria-label*="close" i]',
            '[title*="close" i]',
            '[onclick*="close" i]',
            '[onclick*="dismiss" i]',
          ].join(", "),
        ).length > 0;

      if (quickMatches) {
        return true;
      }

      let found = false;
      $popup.find("button, [role='button'], a").each((_, candidate) => {
        if (found) return;
        const $candidate = $(candidate);
        const ariaLabel = ($candidate.attr("aria-label") || "").toLowerCase();
        const title = ($candidate.attr("title") || "").toLowerCase();
        const id = ($candidate.attr("id") || "").toLowerCase();
        const className = ($candidate.attr("class") || "").toLowerCase();
        const text = $candidate.text().trim().toLowerCase();
        const hasDismissAttr =
          $candidate.attr("data-dismiss") !== undefined ||
          $candidate.attr("data-bs-dismiss") !== undefined;

        const looksLikeCloseControl =
          ariaLabel.includes("close") ||
          title.includes("close") ||
          id.includes("close") ||
          /(^|\s)(close|close-modal|modal-close|popup-close|btn-close)(\s|$)/.test(
            className,
          ) ||
          text === "×" ||
          text === "close" ||
          hasDismissAttr;

        if (looksLikeCloseControl) {
          found = true;
        }
      });

      return found;
    };

    const popupSelector =
      'dialog, [role="dialog"], [role="alertdialog"], .modal, .popup';

    $(popupSelector).each((_, element) => {
      const $popup = $(element);
      const el = element as Element;

      const isNested =
        $popup.parents('[role="dialog"], [role="alertdialog"], .modal, .popup')
          .length > 0;
      if (isNested) return;

      const tagName = (el.tagName || "").toLowerCase();
      const role = $popup.attr("role") || "";
      const hasAriaModal = $popup.attr("aria-modal") === "true";

      const isByRole = role === "dialog" || role === "alertdialog";
      const isByClass =
        ($popup.hasClass("modal") || $popup.hasClass("popup")) &&
        (hasAriaModal || isByRole);

      const isTrulyModal = tagName === "dialog" || isByRole || isByClass;
      if (!isTrulyModal) return;

      const fullPath = getFullSelectorPath($, el);
      const context = getElementContext($, el);

      const hasCloseButton = popupHasCloseControl($popup);

      if (!hasCloseButton) {
        issues.push({
          checklistId: "H03-02",
          checklistItem:
            "Dialog/modal/popup does not have a visible close button",
          heuristic: "User control and freedom",
          severity: "essential",
          recommendation: `Dialog/modal ${context} lacks a close button. Add a close button with clear labeling. Example: <button aria-label="Close dialog" class="close-button">×</button> or <button data-dismiss="modal">Close</button>`,
          affectedSelectors: fullPath,
          fileName,
        });
      }
    });

    return {
      passed: issues.length === 0,
      issues,
    };
  },
};

const H04_01_Checker: HeuristicChecker = {
  id: "H04-01",
  name: "Use user interface elements, terms and icons consistently across smartphone UI screens",
  heuristic: "Consistency and standards",
  severity: "hedonic",
  check: ($, _html, fileName) => {
    const issues: HeuristicIssue[] = [];

    const fontFamilies = new Set<string>();
    let fontFamilyFromComputed = false;

    const cssVarMap = new Map<string, string>();

    const collectCssVars = (cssText: string): void => {
      const varDecl = /(--[\w-]+)\s*:\s*([^;{}]+)\s*;/g;
      let m: RegExpExecArray | null;
      for (;;) {
        m = varDecl.exec(cssText);
        if (!m) break;
        const name = m[1].trim();
        const val = m[2].trim();
        if (!cssVarMap.has(name)) cssVarMap.set(name, val);
      }
    };

    const extractPrimaryFont = (rawValue: string): string | null => {
      let v = rawValue.trim();

      if (v.startsWith("var(")) {
        const varMatch = v.match(/^var\(\s*(--[\w-]+)/i);
        if (varMatch) {
          const varName = varMatch[1];
          const resolved = cssVarMap.get(varName);
          if (resolved) {
            v = resolved;
          } else {
            return varName;
          }
        }
      }

      let firstFont = v.split(",")[0].trim();

      firstFont = firstFont.replace(/^['"]+|['"]+$/g, "").toLowerCase();

      const skipValues = new Set([
        "inherit",
        "initial",
        "unset",
        "revert",
        "ui-sans-serif",
        "ui-monospace",
        "ui-serif",
        "system-ui",
        "-apple-system",
        "blinkmacsystemfont",
        "sans-serif",
        "serif",
        "monospace",
        "apple color emoji",
        "segoe ui emoji",
        "segoe ui symbol",
        "noto color emoji",
        "font awesome 5 free",
        "font awesome 5 brands",
        "font awesome 5 pro",
        "font awesome 6 free",
        "font awesome 6 brands",
        "font awesome 6 solid",
        "fontawesome",
        "material icons",
        "material icons outlined",
        "material icons round",
        "material symbols outlined",
        "ionicons",
        "bootstrap icons",
        "glyphicons halflings regular",
        "remixicon",
      ]);

      if (!firstFont || skipValues.has(firstFont)) return null;

      return firstFont;
    };

    const usedClasses = new Set<string>();
    $("[class]").each((_, el) => {
      const clsStr = $(el).attr("class");
      if (clsStr) {
        clsStr.split(/\s+/).forEach((c) => {
          usedClasses.add(c);
        });
      }
    });

    const isSelectorUsed = (selectorStr: string): boolean => {
      const selectors = selectorStr.split(",").map((s) => s.trim());
      for (const sel of selectors) {
        const cleanSel = sel.replace(/:+[\w-]+(\([^)]+\))?/g, "").trim();
        if (!cleanSel) continue;

        if (/^(html|body|:root|\*)$/i.test(cleanSel)) return true;

        try {
          if ($(cleanSel).length > 0) return true;
        } catch {

          const classMatches = cleanSel.match(/\.([^\s.>+~:]+)/g);
          if (classMatches) {
            for (const clsMatch of classMatches) {
              const className = clsMatch.substring(1).replace(/\\/g, ""); // ลบ \ ออก
              if (usedClasses.has(className)) return true;
            }
          } else {
            return true;
          }
        }
      }
      return false;
    };

    const isLikelyInjectedElement = (el: cheerio.Cheerio<AnyNode>): boolean => {
      const id = (el.attr("id") || "").toLowerCase();
      const className = (el.attr("class") || "").toLowerCase();
      const style = (el.attr("style") || "").toLowerCase();
      const markerText = `${id} ${className} ${style}`;

      return (
        markerText.includes("chrome-extension://") ||
        markerText.includes("petcontrol") ||
        markerText.includes("happydog")
      );
    };

    const isLikelyInjectedStyleTag = (
      styleTag: cheerio.Cheerio<AnyNode>,
      cssText: string,
    ): boolean => {
      const id = (styleTag.attr("id") || "").toLowerCase();
      const className = (styleTag.attr("class") || "").toLowerCase();
      const markerText = `${id} ${className} ${cssText.toLowerCase()}`;

      return (
        markerText.includes("chrome-extension://") ||
        markerText.includes("pet-style-tag") ||
        markerText.includes("petcontrol") ||
        markerText.includes("happydog")
      );
    };

    const stripCssComments = (css: string): string =>
      css.replace(/\/\*[\s\S]*?\*\//g, " ");

    const collectFontFamiliesFromBlocks = (cssText: string): void => {
      const blockRegex = /([^{}]+)\{([^{}]+)\}/g;
      let match: RegExpExecArray | null;
      for (;;) {
        match = blockRegex.exec(cssText);
        if (match === null) break;
        const selectorStr = match[1].trim();
        const rulesStr = match[2];
        if (selectorStr.startsWith("@")) continue;
        if (!/font-family\s*:/i.test(rulesStr)) continue;
        if (isSelectorUsed(selectorStr)) {
          const familyMatch = rulesStr.match(/font-family\s*:\s*([^;]+)/i);
          if (familyMatch) {
            const primary = extractPrimaryFont(familyMatch[1]);
            if (primary) fontFamilies.add(primary);
          }
        }
      }
    };

    const computedScript = $(
      'script#playwright-computed-typography[type="application/json"]',
    );
    if (computedScript.length > 0) {
      try {
        const raw = computedScript.html() || computedScript.text();
        const data = JSON.parse(raw.trim()) as { fontFamilies?: unknown };
        if (Array.isArray(data.fontFamilies) && data.fontFamilies.length > 0) {
          for (const family of data.fontFamilies as string[]) {
            const primary = extractPrimaryFont(family);
            if (primary) fontFamilies.add(primary);
          }
          fontFamilyFromComputed = true;
        }
      } catch {
      }
    }

    if (!fontFamilyFromComputed) {
      $('[style*="font-family"]').each((_, element) => {
        const $element = $(element);
        if (isLikelyInjectedElement($element)) return;
        const style = $element.attr("style") || "";
        const familyMatch = style.match(/font-family:\s*([^;]+)/i);
        if (familyMatch) {
          const primary = extractPrimaryFont(familyMatch[1]);
          if (primary) fontFamilies.add(primary);
        }
      });

      $("style").each((_, styleElement) => {
        const $styleTag = $(styleElement);
        const rawCss = $styleTag.html() || $styleTag.text() || "";
        const cssText = stripCssComments(rawCss);
        if (!cssText.trim()) return;
        if (isLikelyInjectedStyleTag($styleTag, cssText)) return;
        collectCssVars(cssText);
        collectFontFamiliesFromBlocks(cssText);
      });
    }

    if (fontFamilies.size > 3) {
      const familyList = Array.from(fontFamilies).join(", ");
      issues.push({
        checklistId: "H04-01",
        checklistItem:
          "UI typography is inconsistent: too many font families (>3) used across the page",
        heuristic: "Consistency and standards",
        severity: "hedonic",
        recommendation: `Found ${fontFamilies.size} font families (limit: 3): [ ${familyList} ]. To fix: (1) Pick 2-3 from the list above as --font-primary and --font-heading; add them to :root {} in the <style> tag. (2) Replace all other font-family occurrences in the <style> block with var(--font-primary) or var(--font-heading).`,
        affectedSelectors:
          "multiple elements with different font-family properties",
        fileName,
      });
    }

    return {
      passed: issues.length === 0,
      issues,
    };
  },
};

const H04_02_Checker: HeuristicChecker = {
  id: "H04-02",
  name: "If one part is organized in a certain way, then the rest of the system should follow the same general organization",
  heuristic: "Consistency and standards",
  severity: "hedonic",
  check: ($, _html, fileName) => {
    const issues: HeuristicIssue[] = [];

    const hasAside =
      $("aside").filter((_, el) => {
        const $el = $(el);
        return $el.find("nav, a[href]").length > 0;
      }).length > 0;

    const hasNav = hasAside
      ? $("nav").filter(function () {
          return $(this).closest("aside").length === 0;
        }).length > 0
      : $("nav").length > 0;
    const hasFooter = $("footer").length > 0;

    if (fileName) {
      recordPageStructure({
        fileName,
        hasNav,
        hasAside,
        hasFooter,
      });
    }

    return {
      passed: issues.length === 0,
      issues,
    };
  },
};


const H05_01_Checker: HeuristicChecker = {
  id: "H05-01",
  name: "There should be instructions next this request to inform the user about what the username and the password should and should not contain",
  heuristic: "Error prevention",
  severity: "essential",
  check: ($, _html, fileName) => {
    const issues: HeuristicIssue[] = [];

    $('input[type="password"]').each((_, element) => {
      const $input = $(element);
      const el = element as Element;
      const fullPath = getFullSelectorPath($, el);
      const context = getElementContext($, el);
      const ariaDescribedby = $input.attr("aria-describedby");
      const hasAriaDescribedby = ariaDescribedby !== undefined;

      const $form = $input.closest("form");
      const formAction = ($form.attr("action") || "").toLowerCase();
      const submitText = $form
        .find('button[type="submit"], input[type="submit"]')
        .text()
        .toLowerCase();
      const formId = ($form.attr("id") || "").toLowerCase();
      const formClass = ($form.attr("class") || "").toLowerCase();
      const isLoginForm =
        /login|log-in|signin|sign-in/.test(formAction) ||
        /login|log-in|signin|sign-in/.test(formId) ||
        /login|log-in|signin|sign-in/.test(formClass) ||
        /^(log in|login|sign in|signin|เข้าสู่ระบบ)$/.test(submitText.trim());

      if (isLoginForm) return;

      const isCurrentPasswordField =
        $input.attr("autocomplete") === "current-password";
      if (isCurrentPasswordField) return;

      let $helperText = $input.next(".helper-text, .form-text, small");
      if ($helperText.length === 0) {
        $helperText = $input.nextAll(".helper-text, .form-text, small").first();
      }
      if ($helperText.length === 0) {
        $helperText = $input.siblings(".helper-text, .form-text, small");
      }
      if ($helperText.length === 0) {
        $helperText = $input.parent().find(".helper-text, .form-text, small");
      }
      const titleAttr = $input.attr("title");
      const hasHelperText = $helperText.length > 0 || !!titleAttr;

      if (!hasAriaDescribedby && !hasHelperText) {
        const inputName =
          $input.attr("name") || $input.attr("id") || "password field";
        issues.push({
          checklistId: "H05-01",
          checklistItem:
            "Password field lacks helper text describing required constraints (length, allowed characters)",
          heuristic: "Error prevention",
          severity: "essential",
          recommendation: `Password input "${inputName}" ${context} lacks instructions. Add helper text with aria-describedby. Example: <input type="password" aria-describedby="pwd-help"><small id="pwd-help">Password must be 8+ characters with numbers and letters</small>`,
          affectedSelectors: fullPath,
          fileName,
        });
      }

      else {
        const $qualityText = ariaDescribedby
          ? ariaDescribedby
              .trim()
              .split(/\s+/)
              .reduce((acc, id) => acc.add($(`#${CSS.escape(id)}`)), $())
          : $input.next(".helper-text, .form-text, small");

        if ($qualityText.length > 0 || titleAttr) {
          const helperContent = (
            $qualityText.length > 0 ? $qualityText.text() : titleAttr || ""
          ).toLowerCase();
          const hasUsefulInfo =
            helperContent.includes("character") ||
            helperContent.includes("length") ||
            helperContent.includes("number") ||
            helperContent.includes("letter") ||
            helperContent.includes("digit") ||
            helperContent.includes("symbol") ||
            helperContent.includes("must") ||
            helperContent.includes("required") ||
            helperContent.includes("minimum") ||
            helperContent.includes("contain") ||
            helperContent.includes("at least") ||
            /\d+/.test(helperContent);

          if (!hasUsefulInfo) {
            const inputName =
              $input.attr("name") || $input.attr("id") || "password field";
            issues.push({
              checklistId: "H05-01",
              checklistItem:
                "Password field helper text is too vague — missing specific requirements (length, character types)",
              heuristic: "Error prevention",
              severity: "essential",
              recommendation: `Password input "${inputName}" ${context} has helper text but lacks specific requirements. Update helper text to include clear criteria. Example: "Password must be 8+ characters, include uppercase, lowercase, numbers, and symbols"`,
              affectedSelectors: fullPath,
              fileName,
            });
          }
        }
      }
    });

    $(
      'input[type="text"][name="username"], ' +
        'input[type="text"][name="user"], ' +
        'input[type="text"][id="username"], ' +
        'input[type="text"][id="user"], ' +
        'input[type="text"][autocomplete="username"]',
    ).each((_, element) => {
      const $input = $(element);
      const el = element as Element;
      const fullPath = getFullSelectorPath($, el);
      const context = getElementContext($, el);
      const ariaDescribedbyUser = $input.attr("aria-describedby");
      const hasAriaDescribedby = ariaDescribedbyUser !== undefined;
      const $formUser = $input.closest("form");
      const formActionUser = ($formUser.attr("action") || "").toLowerCase();
      const submitTextUser = $formUser
        .find('button[type="submit"], input[type="submit"]')
        .text()
        .toLowerCase();
      const formIdUser = ($formUser.attr("id") || "").toLowerCase();
      const formClassUser = ($formUser.attr("class") || "").toLowerCase();
      const isLoginFormUser =
        /login|log-in|signin|sign-in/.test(formActionUser) ||
        /login|log-in|signin|sign-in/.test(formIdUser) ||
        /login|log-in|signin|sign-in/.test(formClassUser) ||
        /^(log in|login|sign in|signin|เข้าสู่ระบบ)$/.test(
          submitTextUser.trim(),
        );

      if (isLoginFormUser) return;
      let $helperText = $input.next(".helper-text, .form-text, small");
      if ($helperText.length === 0) {
        $helperText = $input.nextAll(".helper-text, .form-text, small").first();
      }
      if ($helperText.length === 0) {
        $helperText = $input.siblings(".helper-text, .form-text, small");
      }
      if ($helperText.length === 0) {
        $helperText = $input.parent().find(".helper-text, .form-text, small");
      }
      const titleAttrUser = $input.attr("title");
      const hasHelperText = $helperText.length > 0 || !!titleAttrUser;

      if (!hasAriaDescribedby && !hasHelperText) {
        const inputName =
          $input.attr("name") || $input.attr("id") || "username field";
        issues.push({
          checklistId: "H05-01",
          checklistItem:
            "Username field lacks helper text describing accepted format (length, allowed characters)",
          heuristic: "Error prevention",
          severity: "essential",
          recommendation: `Username input "${inputName}" ${context} lacks instructions. Add helper text with aria-describedby: <input aria-describedby="user-help"><small id="user-help">Enter your username (3-20 characters, letters and numbers only)</small>`,
          affectedSelectors: fullPath,
          fileName,
        });
      }

      else {
        const $qualityText = ariaDescribedbyUser
          ? ariaDescribedbyUser
              .trim()
              .split(/\s+/)
              .reduce((acc, id) => acc.add($(`#${CSS.escape(id)}`)), $())
          : $input.next(".helper-text, .form-text, small");

        if ($qualityText.length > 0 || titleAttrUser) {
          const helperContent = (
            $qualityText.length > 0 ? $qualityText.text() : titleAttrUser || ""
          ).toLowerCase();
          const hasUsefulInfo =
            helperContent.includes("username") ||
            helperContent.includes("character") ||
            helperContent.includes("must") ||
            helperContent.includes("required") ||
            helperContent.includes("minimum") ||
            helperContent.includes("contain") ||
            helperContent.includes("at least") ||
            /\d+/.test(helperContent);

          if (!hasUsefulInfo) {
            const inputName =
              $input.attr("name") || $input.attr("id") || "username field";
            issues.push({
              checklistId: "H05-01",
              checklistItem:
                "Username field helper text is too vague — missing specific format requirements",
              heuristic: "Error prevention",
              severity: "essential",
              recommendation: `Username input "${inputName}" ${context} has helper text but lacks specific format information. Update to clarify accepted formats. Example: "Enter your username (3-20 characters, letters and numbers only)"`,
              affectedSelectors: fullPath,
              fileName,
            });
          }
        }
      }
    });

    return {
      passed: issues.length === 0,
      issues,
    };
  },
};

const H05_02_Checker: HeuristicChecker = {
  id: "H05-02",
  name: "The system should not allow the user to enter certain inputs or use certain elements when the entry or use of those elements will inevitably produce erroneous/undesirable outcomes",
  heuristic: "Error prevention",
  severity: "pragmatic",
  check: ($, _html, fileName) => {
    const issues: HeuristicIssue[] = [];

    $('input[type="text"]').each((_, element) => {
      const $input = $(element);
      const el = element as Element;
      const name = (
        $input.attr("name") ||
        $input.attr("id") ||
        ""
      ).toLowerCase();
      const placeholder = ($input.attr("placeholder") || "").toLowerCase();

      let suggestedType = "";
      let recommendation = "";

      const nameWordMatch = (word: string) =>
        new RegExp(`(?:^|[_\\-])${word}(?:[_\\-]|$)`).test(name) ||
        name === word;
      const placeholderContains = (word: string) =>
        new RegExp(`\\b${word}\\b`).test(placeholder);

      if (nameWordMatch("email") || placeholderContains("email")) {
        suggestedType = "email";
        recommendation = 'Use type="email" for automatic email validation';
      } else if (
        nameWordMatch("phone") ||
        nameWordMatch("tel") ||
        nameWordMatch("mobile") ||
        placeholderContains("phone") ||
        placeholderContains("tel")
      ) {
        suggestedType = "tel";
        recommendation = 'Use type="tel" for telephone number input';
      } else if (
        nameWordMatch("date") ||
        nameWordMatch("birthday") ||
        nameWordMatch("birthdate") ||
        placeholderContains("date")
      ) {
        suggestedType = "date";
        recommendation = 'Use type="date" for date picker';
      } else if (
        nameWordMatch("age") ||
        nameWordMatch("quantity") ||
        nameWordMatch("qty") ||
        nameWordMatch("amount") ||
        nameWordMatch("count")
      ) {
        suggestedType = "number";
        recommendation = 'Use type="number" with min/max attributes';
      }

      if (suggestedType) {
        if (suggestedType === "date") {
          const isCustomDatepicker =
            $input.hasClass("flatpickr-input") ||
            $input.attr("data-datepicker") !== undefined ||
            $input.attr("data-date-picker") !== undefined ||
            $input.attr("readonly") !== undefined;
          if (isCustomDatepicker) return;
        }

        if (suggestedType === "number") {
          const inputMode = $input.attr("inputmode");
          if (inputMode === "numeric" || inputMode === "decimal") return;
        }

        const fullPath = getFullSelectorPath($, el);
        const context = getElementContext($, el);

        issues.push({
          checklistId: "H05-02",
          checklistItem:
            "Input uses type=text instead of a semantic HTML5 type (email, tel, date, or number)",
          heuristic: "Error prevention",
          severity: "pragmatic",
          recommendation: `Input field ${context} uses type="text" but should use type="${suggestedType}". ${recommendation}. Change: <input type="text"> to <input type="${suggestedType}">`,
          affectedSelectors: fullPath,
          fileName,
        });
      }
    });

    return {
      passed: issues.length === 0,
      issues,
    };
  },
};

const H06_01_Checker: HeuristicChecker = {
  id: "H06-01",
  name: "Follow design conventions when presenting a search field",
  heuristic: "Recognition rather than recall",
  severity: "pragmatic",
  check: ($, _html, fileName) => {
    const issues: HeuristicIssue[] = [];

    const searchInputs = findSearchInputs($);

    searchInputs.forEach(({ element }) => {
      const $input = $(element);
      const el = element as Element;
      const fullPath = getFullSelectorPath($, el);
      const context = getElementContext($, el);

      const $form = $input.closest("form");

      const isInHeader = $input.closest("header").length > 0;
      const isInNav = $input.closest("nav").length > 0;
      const isInAside = $input.closest("aside").length > 0;
      const isInModal =
        $input.closest(
          "dialog, [role='dialog'], [role='search'], .modal, [data-radix-popper-content-wrapper], .popover, .dropdown",
        ).length > 0;

      const isMainSearch =
        $input.closest("main").length > 0 && searchInputs.length === 1;
      const isInStandardLocation =
        isInHeader || isInNav || isInAside || isInModal || isMainSearch;


      const hasNearbyHeading = ($target: cheerio.Cheerio<AnyNode>): boolean =>
        $target.prevAll().slice(0, 2).filter("h1, h2, h3").length > 0;

      let isNearHeading = hasNearbyHeading($input);
      if (!isNearHeading && $form.length > 0) {
        isNearHeading = hasNearbyHeading($form);
      }
      if (!isNearHeading && $form.length > 0) {
        isNearHeading = hasNearbyHeading($form.parent());
      }

      const hasGoodLocation = isInStandardLocation || isNearHeading;

      if (!hasGoodLocation) {
        issues.push({
          checklistId: "H06-01",
          checklistItem:
            "Search field is not placed in a conventional, easily recognizable location",
          heuristic: "Recognition rather than recall",
          severity: "pragmatic",
          recommendation: `Search input ${context} is not in a conventional location. Place global search in <header>/<nav>/<aside>, or place contextual search immediately after a heading (h1–h3).`,
          affectedSelectors: fullPath,
          fileName,
        });
      }
    });

    return {
      passed: issues.length === 0,
      issues,
    };
  },
};


const H07_01_Checker: HeuristicChecker = {
  id: "H07-01",
  name: "Design for flexibility of display for different screen sizes",
  heuristic: "Flexibility and efficiency of use",
  severity: "pragmatic",
  check: ($, html, fileName) => {
    const issues: HeuristicIssue[] = [];

    const problems: string[] = [];
    const affectedSelectors: string[] = [];

    const viewport = $('meta[name="viewport"]').attr("content");

    if (!viewport) {
      problems.push(
        'Missing viewport meta tag - add inside <head>: <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      );
      affectedSelectors.push("html > head");
    } else if (!viewport.includes("width=device-width")) {
      problems.push(
        `Viewport meta tag exists but missing width=device-width - change: <meta name="viewport" content="${viewport}"> to <meta name="viewport" content="width=device-width, initial-scale=1.0">`,
      );
      affectedSelectors.push('html > head > meta[name="viewport"]');
    }

    const hasExternalStylesheet = $('link[rel="stylesheet"]').length > 0;
    const hasMediaQuery = html.includes("@media") || hasExternalStylesheet;

    if (!hasMediaQuery) {
      problems.push(
        "No media queries detected - add responsive CSS with media queries. Example: @media (max-width: 768px) { /* mobile styles */ }",
      );
      affectedSelectors.push("html > head > style");
    }

    if (problems.length > 0) {
      const recommendationList = problems
        .map((p, i) => `${i + 1}. ${p}`)
        .join("\n");

      issues.push({
        checklistId: "H07-01",
        checklistItem:
          "Page is not responsive: missing viewport meta tag or CSS media queries",
        heuristic: "Flexibility and efficiency of use",
        severity: "pragmatic",
        recommendation: `Responsive design issues detected (${problems.length} issue${problems.length > 1 ? "s" : ""}):\n${recommendationList}`,
        affectedSelectors: affectedSelectors.join(", "),
        fileName,
      });
    }

    return {
      passed: issues.length === 0,
      issues,
    };
  },
};


const TAILWIND_PALETTE: Record<string, string> = {
  "slate-50": "#f8fafc",
  "slate-100": "#f1f5f9",
  "slate-200": "#e2e8f0",
  "slate-300": "#cbd5e1",
  "slate-400": "#94a3b8",
  "slate-500": "#64748b",
  "slate-600": "#475569",
  "slate-700": "#334155",
  "slate-800": "#1e293b",
  "slate-900": "#0f172a",
  "slate-950": "#020617",
  "gray-50": "#f9fafb",
  "gray-100": "#f3f4f6",
  "gray-200": "#e5e7eb",
  "gray-300": "#d1d5db",
  "gray-400": "#9ca3af",
  "gray-500": "#6b7280",
  "gray-600": "#4b5563",
  "gray-700": "#374151",
  "gray-800": "#1f2937",
  "gray-900": "#111827",
  "gray-950": "#030712",
  "zinc-50": "#fafafa",
  "zinc-100": "#f4f4f5",
  "zinc-200": "#e4e4e7",
  "zinc-300": "#d4d4d8",
  "zinc-400": "#a1a1aa",
  "zinc-500": "#71717a",
  "zinc-600": "#52525b",
  "zinc-700": "#3f3f46",
  "zinc-800": "#27272a",
  "zinc-900": "#18181b",
  "zinc-950": "#09090b",
  "neutral-50": "#fafafa",
  "neutral-100": "#f5f5f5",
  "neutral-200": "#e5e5e5",
  "neutral-300": "#d4d4d4",
  "neutral-400": "#a3a3a3",
  "neutral-500": "#737373",
  "neutral-600": "#525252",
  "neutral-700": "#404040",
  "neutral-800": "#262626",
  "neutral-900": "#171717",
  "neutral-950": "#0a0a0a",
  "stone-50": "#fafaf9",
  "stone-100": "#f5f5f4",
  "stone-200": "#e7e5e4",
  "stone-300": "#d6d3d1",
  "stone-400": "#a8a29e",
  "stone-500": "#78716c",
  "stone-600": "#57534e",
  "stone-700": "#44403c",
  "stone-800": "#292524",
  "stone-900": "#1c1917",
  "stone-950": "#0c0a09",
  "red-50": "#fef2f2",
  "red-100": "#fee2e2",
  "red-200": "#fecaca",
  "red-300": "#fca5a5",
  "red-400": "#f87171",
  "red-500": "#ef4444",
  "red-600": "#dc2626",
  "red-700": "#b91c1c",
  "red-800": "#991b1b",
  "red-900": "#7f1d1d",
  "red-950": "#450a0a",
  "orange-50": "#fff7ed",
  "orange-100": "#ffedd5",
  "orange-200": "#fed7aa",
  "orange-300": "#fdba74",
  "orange-400": "#fb923c",
  "orange-500": "#f97316",
  "orange-600": "#ea580c",
  "orange-700": "#c2410c",
  "orange-800": "#9a3412",
  "orange-900": "#7c2d12",
  "orange-950": "#431407",
  "amber-50": "#fffbeb",
  "amber-100": "#fef3c7",
  "amber-200": "#fde68a",
  "amber-300": "#fcd34d",
  "amber-400": "#fbbf24",
  "amber-500": "#f59e0b",
  "amber-600": "#d97706",
  "amber-700": "#b45309",
  "amber-800": "#92400e",
  "amber-900": "#78350f",
  "amber-950": "#451a03",
  "yellow-50": "#fefce8",
  "yellow-100": "#fef9c3",
  "yellow-200": "#fef08a",
  "yellow-300": "#fde047",
  "yellow-400": "#facc15",
  "yellow-500": "#eab308",
  "yellow-600": "#ca8a04",
  "yellow-700": "#a16207",
  "yellow-800": "#854d0e",
  "yellow-900": "#713f12",
  "yellow-950": "#422006",
  "lime-50": "#f7fee7",
  "lime-100": "#ecfccb",
  "lime-200": "#d9f99d",
  "lime-300": "#bef264",
  "lime-400": "#a3e635",
  "lime-500": "#84cc16",
  "lime-600": "#65a30d",
  "lime-700": "#4d7c0f",
  "lime-800": "#3f6212",
  "lime-900": "#365314",
  "lime-950": "#1a2e05",
  "green-50": "#f0fdf4",
  "green-100": "#dcfce7",
  "green-200": "#bbf7d0",
  "green-300": "#86efac",
  "green-400": "#4ade80",
  "green-500": "#22c55e",
  "green-600": "#16a34a",
  "green-700": "#15803d",
  "green-800": "#166534",
  "green-900": "#14532d",
  "green-950": "#052e16",
  "emerald-50": "#ecfdf5",
  "emerald-100": "#d1fae5",
  "emerald-200": "#a7f3d0",
  "emerald-300": "#6ee7b7",
  "emerald-400": "#34d399",
  "emerald-500": "#10b981",
  "emerald-600": "#059669",
  "emerald-700": "#047857",
  "emerald-800": "#065f46",
  "emerald-900": "#064e3b",
  "emerald-950": "#022c22",
  "teal-50": "#f0fdfa",
  "teal-100": "#ccfbf1",
  "teal-200": "#99f6e4",
  "teal-300": "#5eead4",
  "teal-400": "#2dd4bf",
  "teal-500": "#14b8a6",
  "teal-600": "#0d9488",
  "teal-700": "#0f766e",
  "teal-800": "#115e59",
  "teal-900": "#134e4a",
  "teal-950": "#042f2e",
  "cyan-50": "#ecfeff",
  "cyan-100": "#cffafe",
  "cyan-200": "#a5f3fc",
  "cyan-300": "#67e8f9",
  "cyan-400": "#22d3ee",
  "cyan-500": "#06b6d4",
  "cyan-600": "#0891b2",
  "cyan-700": "#0e7490",
  "cyan-800": "#155e75",
  "cyan-900": "#164e63",
  "cyan-950": "#083344",
  "sky-50": "#f0f9ff",
  "sky-100": "#e0f2fe",
  "sky-200": "#bae6fd",
  "sky-300": "#7dd3fc",
  "sky-400": "#38bdf8",
  "sky-500": "#0ea5e9",
  "sky-600": "#0284c7",
  "sky-700": "#0369a1",
  "sky-800": "#075985",
  "sky-900": "#0c4a6e",
  "sky-950": "#082f49",
  "blue-50": "#eff6ff",
  "blue-100": "#dbeafe",
  "blue-200": "#bfdbfe",
  "blue-300": "#93c5fd",
  "blue-400": "#60a5fa",
  "blue-500": "#3b82f6",
  "blue-600": "#2563eb",
  "blue-700": "#1d4ed8",
  "blue-800": "#1e40af",
  "blue-900": "#1e3a8a",
  "blue-950": "#172554",
  "indigo-50": "#eef2ff",
  "indigo-100": "#e0e7ff",
  "indigo-200": "#c7d2fe",
  "indigo-300": "#a5b4fc",
  "indigo-400": "#818cf8",
  "indigo-500": "#6366f1",
  "indigo-600": "#4f46e5",
  "indigo-700": "#4338ca",
  "indigo-800": "#3730a3",
  "indigo-900": "#312e81",
  "indigo-950": "#1e1b4b",
  "violet-50": "#f5f3ff",
  "violet-100": "#ede9fe",
  "violet-200": "#ddd6fe",
  "violet-300": "#c4b5fd",
  "violet-400": "#a78bfa",
  "violet-500": "#8b5cf6",
  "violet-600": "#7c3aed",
  "violet-700": "#6d28d9",
  "violet-800": "#5b21b6",
  "violet-900": "#4c1d95",
  "violet-950": "#2e1065",
  "purple-50": "#faf5ff",
  "purple-100": "#f3e8ff",
  "purple-200": "#e9d5ff",
  "purple-300": "#d8b4fe",
  "purple-400": "#c084fc",
  "purple-500": "#a855f7",
  "purple-600": "#9333ea",
  "purple-700": "#7e22ce",
  "purple-800": "#6b21a8",
  "purple-900": "#581c87",
  "purple-950": "#3b0764",
  "fuchsia-50": "#fdf4ff",
  "fuchsia-100": "#fae8ff",
  "fuchsia-200": "#f5d0fe",
  "fuchsia-300": "#f0abfc",
  "fuchsia-400": "#e879f9",
  "fuchsia-500": "#d946ef",
  "fuchsia-600": "#c026d3",
  "fuchsia-700": "#a21caf",
  "fuchsia-800": "#86198f",
  "fuchsia-900": "#701a75",
  "fuchsia-950": "#4a044e",
  "pink-50": "#fdf2f8",
  "pink-100": "#fce7f3",
  "pink-200": "#fbcfe8",
  "pink-300": "#f9a8d4",
  "pink-400": "#f472b6",
  "pink-500": "#ec4899",
  "pink-600": "#db2777",
  "pink-700": "#be185d",
  "pink-800": "#9d174d",
  "pink-900": "#831843",
  "pink-950": "#500724",
  "rose-50": "#fff1f2",
  "rose-100": "#ffe4e6",
  "rose-200": "#fecdd3",
  "rose-300": "#fda4af",
  "rose-400": "#fb7185",
  "rose-500": "#f43f5e",
  "rose-600": "#e11d48",
  "rose-700": "#be123c",
  "rose-800": "#9f1239",
  "rose-900": "#881337",
  "rose-950": "#4c0519",
};


const looksLikePlainColor = (val: string): boolean => {
  const v = val.trim().toLowerCase();
  return (
    /^#[0-9a-f]{3,8}$/.test(v) ||
    /^(rgb|rgba|hsl|hsla)\(/.test(v) ||
    /^[a-z]+$/.test(v)
  );
};

const H08_01_Checker: HeuristicChecker = {
  id: "H08-01",
  name: "Avoid the use of animation and fast-moving objects.",
  heuristic: "Aesthetic and minimalist design",
  severity: "hedonic",
  check: (_$, html, fileName) => {
    const issues: HeuristicIssue[] = [];
    const cleanHtml = html.replace(/\/\*[\s\S]*?\*\//g, "");

    const styleContents = [
      ...cleanHtml.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi),
    ]
      .map((m) => m[1])
      .join("\n");

    const htmlWithoutScripts = cleanHtml.replace(
      /<script[^>]*>[\s\S]*?<\/script>/gi,
      "",
    );

    const inlineStyles = [
      ...htmlWithoutScripts.matchAll(/style\s*=\s*["']([^"']+)["']/gi),
    ]
      .map((m) => m[1])
      .join("; ");

    const usedStyleRules: string[] = [];
    const ruleRegex =
      /([^{}]+?)\s*\{([^}]*(?:(?:transition|animation)(?:-[a-z]+)?)\s*:[^}]+)\}/gi;

    for (const matchCSS of styleContents.matchAll(ruleRegex)) {
      const selectorStr = matchCSS[1].trim();
      const rulesStr = matchCSS[2];

      if (
        /^[0-9.]+%$/.test(selectorStr) ||
        /^(?:from|to)$/.test(selectorStr) ||
        /^@|\d/.test(selectorStr)
      ) {
        usedStyleRules.push(rulesStr);
        continue;
      }

      const selectors = selectorStr.split(",").map((s) => s.trim());
      let isUsed = false;
      for (const sel of selectors) {
        if (!sel) continue;
        const baseSelector = sel.replace(/:+[-\w]+(?:\([^)]*\))?/g, "").trim();
        if (!baseSelector) continue;
        if (
          baseSelector === "*" ||
          baseSelector === "html" ||
          baseSelector === "body"
        ) {
          isUsed = true;
          break;
        }
        try {
          if (_$(baseSelector).length > 0) {
            isUsed = true;
            break;
          }
        } catch (_e) {
          isUsed = true;
        }
      }
      if (isUsed) {
        usedStyleRules.push(rulesStr);
      }
    }

    const allStylesToCheck = `${usedStyleRules.join("; ")}; ${inlineStyles}`;

    const hasAnimation =
      /animation\s*:/.test(allStylesToCheck) ||
      /animation-(?:name|duration|delay|iteration-count|direction|fill-mode|play-state)\s*:/.test(
        allStylesToCheck,
      );

    const harmlessTransitions = [
      "color",
      "background-color",
      "background",
      "border",
      "border-color",
      "opacity",
      "box-shadow",
      "fill",
      "stroke",
      "visibility",
      "outline",
      "text-decoration",
      "text-decoration-color",
    ];

    let hasMotionTransition = false;
    const transitionProps: string[] = [];

    const transitionMatches = allStylesToCheck.match(
      /transition(?:-property)?:\s*([^;{]+)/g,
    );
    if (transitionMatches) {
      transitionMatches.forEach((m) => {
        const val = m
          .replace(/transition(?:-property)?:\s*/, "")
          .trim()
          .toLowerCase();

        const parts = val.split(",").map((p) => p.trim());

        for (const part of parts) {
          const propName = part.split(/\s+/)[0];

          if (!propName || propName === "none") continue;

          if (
            [
              "all",
              "transform",
              "translate",
              "scale",
              "margin",
              "padding",
              "left",
              "top",
              "right",
              "bottom",
              "width",
              "height",
            ].includes(propName)
          ) {
            hasMotionTransition = true;
            if (!transitionProps.includes(propName))
              transitionProps.push(propName);
          }

          else if (
            !harmlessTransitions.includes(propName) &&
            !propName.match(/^[\d.]/)
          ) {
            hasMotionTransition = true;
            if (!transitionProps.includes(propName))
              transitionProps.push(propName);
          }
        }
      });
    }

    const hasReducedMotionSupport =
      /prefers-reduced-motion/.test(cleanHtml) ||
      /motion-reduce:/.test(cleanHtml);

    const hasMotion = hasAnimation || hasMotionTransition;

    if (hasMotion && !hasReducedMotionSupport) {
      const keyframeNames: string[] = [];
      const keyframeMatches = styleContents.match(/@keyframes\s+([\w-]+)/g);
      if (keyframeMatches) {
        keyframeMatches.forEach((m) => {
          const name = m.replace(/@keyframes\s+/, "").trim();
          if (!keyframeNames.includes(name)) keyframeNames.push(name);
        });
      }

      const motionDetail: string[] = [];
      if (keyframeNames.length > 0)
        motionDetail.push(`@keyframes found: [ ${keyframeNames.join(", ")} ]`);
      if (transitionProps.length > 0)
        motionDetail.push(
          `motion transitions found: [ ${transitionProps.join(", ")} ]`,
        );

      issues.push({
        checklistId: "H08-01",
        checklistItem:
          "Page uses CSS animations or fast-moving transitions without a prefers-reduced-motion media query or utility",
        heuristic: "Aesthetic and minimalist design",
        severity: "hedonic",
        recommendation: `Page uses motion effects without prefers-reduced-motion support. ${motionDetail.join(" ")} To fix: add the following block at the END of your <style> tag — @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; } } — Or if using Tailwind, add 'motion-reduce:' variants. This disables animations for users who have enabled reduced motion in their OS settings. DO NOT change any HTML, layout, or color properties.`,
        affectedSelectors: "html",
        fileName,
      });
    }

    return {
      passed: issues.length === 0,
      issues,
    };
  },
};

const H08_02_Checker: HeuristicChecker = {
  id: "H08-02",
  name: "Use color conservatively (Limit brand/accent colors to 4, with grayscale counted as one group)",
  heuristic: "Aesthetic and minimalist design",
  severity: "hedonic",
  check: ($, _html, fileName) => {
    const issues: HeuristicIssue[] = [];

    const skipValues = new Set([
      "transparent",
      "inherit",
      "initial",
      "unset",
      "currentcolor",
      "currentColor",
      "none",
    ]);

    const systemVarRegex =
      /^(?:color-)?(gray|success|warning|error|info|danger|muted|border|input|ring|tw-|destructive|popover|card|background|foreground|normal|bg|focus|badge|sidebar)/i;
    const namedColorToHex: Record<string, string> = {
      white: "#ffffff",
      black: "#000000",
      red: "#ff0000",
      green: "#008000",
      blue: "#0000ff",
      yellow: "#ffff00",
      orange: "#ffa500",
      purple: "#800080",
      pink: "#ffc0cb",
      gray: "#808080",
      grey: "#808080",
      silver: "#c0c0c0",
      navy: "#000080",
      teal: "#008080",
      cyan: "#00ffff",
      magenta: "#ff00ff",
    };

    const GRAYSCALE_GROUP_KEY = "grayscale-group";
    const normalizedColors = new Map<string, string>();
    const cssVarRawMap = new Map<string, string>();

    function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
      const m = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/);
      if (!m) return null;
      return {
        r: parseInt(m[1], 16),
        g: parseInt(m[2], 16),
        b: parseInt(m[3], 16),
      };
    }

    function isGrayscale(hex: string): boolean {
      const rgb = hexToRgb(hex);
      if (!rgb) return false;
      return isRgbGrayscale(rgb.r, rgb.g, rgb.b);
    }

    function isRgbGrayscale(r: number, g: number, b: number): boolean {
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      return max - min < 20;
    }

    function parseRgbChannel(raw: string): number | null {
      const v = raw.trim();
      if (!v) return null;

      if (v.endsWith("%")) {
        const pct = Number.parseFloat(v.slice(0, -1));
        if (Number.isNaN(pct)) return null;
        return Math.max(0, Math.min(255, (pct / 100) * 255));
      }

      const num = Number.parseFloat(v);
      if (Number.isNaN(num)) return null;
      return Math.max(0, Math.min(255, num));
    }

    function getRgbFromFunctionalColor(
      value: string,
    ): { r: number; g: number; b: number } | null {
      const rgbMatch = value.match(/^rgba?\((.*)\)$/i);
      if (!rgbMatch) return null;

      let inner = rgbMatch[1].trim();
      if (!inner) return null;

      inner = inner.replace(/\s*\/\s*[^)]+$/, "").trim();

      const parts = inner.includes(",")
        ? inner.split(",").map((p) => p.trim())
        : inner.split(/\s+/).map((p) => p.trim());

      if (parts.length < 3) return null;

      const r = parseRgbChannel(parts[0]);
      const g = parseRgbChannel(parts[1]);
      const b = parseRgbChannel(parts[2]);
      if (r === null || g === null || b === null) return null;

      return { r, g, b };
    }

    function getHslSaturation(value: string): number | null {
      const hslMatch = value.match(/^hsla?\((.*)\)$/i);
      if (!hslMatch) return null;

      let inner = hslMatch[1].trim();
      if (!inner) return null;
      inner = inner.replace(/\s*\/\s*[^)]+$/, "").trim();

      const parts = inner.includes(",")
        ? inner.split(",").map((p) => p.trim())
        : inner.split(/\s+/).map((p) => p.trim());

      if (parts.length < 2) return null;
      const satRaw = parts[1].replace("%", "").trim();
      const sat = Number.parseFloat(satRaw);
      if (Number.isNaN(sat)) return null;
      return sat;
    }

    function hasBalancedParentheses(str: string): boolean {
      const open = (str.match(/\(/g) || []).length;
      const close = (str.match(/\)/g) || []).length;
      return open === close;
    }

    function addColor(val: string, origin: string): void {
      if (!normalizedColors.has(val)) normalizedColors.set(val, origin);
    }

    function extractVarNames(value: string): string[] {
      const names: string[] = [];
      const varRegex = /var\(\s*(--[\w-]+)/gi;
      let m: RegExpExecArray | null;
      for (;;) {
        m = varRegex.exec(value);
        if (m === null) break;
        names.push(m[1]);
      }
      return names;
    }

    function resolveCssVars(value: string, depth = 0): string {
      if (depth > 8) return value;

      return value.replace(
        /var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\)/gi,
        (_full, varName: string, fallback?: string) => {
          const mapped = cssVarRawMap.get(varName);
          if (mapped) return resolveCssVars(mapped, depth + 1);
          if (fallback) return resolveCssVars(fallback.trim(), depth + 1);
          return `var(${varName})`;
        },
      );
    }

    function splitCssValueTokens(value: string): string[] {
      const tokens: string[] = [];
      let current = "";
      let depth = 0;

      for (const char of value) {
        if (char === "(") {
          depth += 1;
          current += char;
          continue;
        }
        if (char === ")") {
          depth = Math.max(0, depth - 1);
          current += char;
          continue;
        }
        if (/\s/.test(char) && depth === 0) {
          if (current.trim()) tokens.push(current.trim());
          current = "";
          continue;
        }
        current += char;
      }

      if (current.trim()) tokens.push(current.trim());
      return tokens;
    }

    function normalizeColorValue(raw: string): string | null {
      const source = raw.trim().replace(/;.*$/, "");

      const varNames = extractVarNames(source);
      if (
        varNames.some((name) => systemVarRegex.test(name.replace(/^--/, "")))
      ) {
        return null;
      }

      const v = resolveCssVars(source).trim().toLowerCase();

      if (!v || skipValues.has(v)) return null;
      if (!hasBalancedParentheses(v)) return null;

      if (v.includes("var(")) {
        const varMatch = v.match(/var\(\s*--([^),]+)/);
        if (varMatch) {
          const varName = varMatch[1];
          if (
            !/(color|bg|background|border|text|fill|stroke|primary|accent)/i.test(
              varName,
            )
          ) {
            return null;
          }
          return `var(--${varName})`;
        }
      }

      if (namedColorToHex[v]) {
        if (isGrayscale(namedColorToHex[v])) return GRAYSCALE_GROUP_KEY;
        return namedColorToHex[v];
      }

      if (/^#[0-9a-f]{6}$/.test(v)) {
        if (isGrayscale(v)) return GRAYSCALE_GROUP_KEY;
        return v;
      }

      if (/^#[0-9a-f]{8}$/.test(v)) {
        const hex6 = v.slice(0, 7);
        if (isGrayscale(hex6)) return GRAYSCALE_GROUP_KEY;
        return hex6;
      }

      if (/^#[0-9a-f]{3}$/.test(v)) {
        const hex6 = `#${v[1]}${v[1]}${v[2]}${v[2]}${v[3]}${v[3]}`;
        if (isGrayscale(hex6)) return GRAYSCALE_GROUP_KEY;
        return hex6;
      }

      if (/^rgba?\(/.test(v)) {
        const rgb = getRgbFromFunctionalColor(v);
        if (rgb && isRgbGrayscale(rgb.r, rgb.g, rgb.b)) {
          return GRAYSCALE_GROUP_KEY;
        }
        if (rgb) {
          const toHex = (n: number) =>
            Math.round(n).toString(16).padStart(2, "0");
          return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
        }
        return v.replace(/\s*[/,]\s*[\d.]+%?\s*\)/, ")");
      }


      if (/^hsla?\(/.test(v)) {
        const sat = getHslSaturation(v);
        if (sat !== null && sat <= 25) return GRAYSCALE_GROUP_KEY;
        return v.replace(/\s*[/,]\s*[\d.]+%?\s*\)/, ")");
      }

      return null;
    }

    const styleContent = $("style").text();

    const cssVarDeclAll = /(--[\w-]+)\s*:\s*([^;{}]+);/g;
    let allVarMatch: RegExpExecArray | null;
    for (;;) {
      allVarMatch = cssVarDeclAll.exec(styleContent);
      if (allVarMatch === null) break;
      cssVarRawMap.set(allVarMatch[1].trim(), allVarMatch[2].trim());
    }


    const displayCss = styleContent.replace(
      /[^{}]*:(?:hover|focus|active|visited|checked|disabled|placeholder-shown)[^{]*\{[^}]*\}/gi,
      "",
    );


    const usedClassesH08 = new Set<string>();
    $("[class]").each((_, el) => {
      ($(el).attr("class") || "").split(/\s+/).forEach((c) => {
        if (c) usedClassesH08.add(c);
      });
    });

    const isSelectorUsedH08 = (selectorStr: string): boolean => {
      const selectors = selectorStr.split(",").map((s) => s.trim());
      for (const sel of selectors) {
        const cleanSel = sel.replace(/:+[\w-]+(\([^)]+\))?/g, "").trim();
        if (!cleanSel) continue;
        if (/^(:root|html|body|\*)$/i.test(cleanSel)) return true;
        try {
          if ($(cleanSel).length > 0) return true;
        } catch {
          const classMatches = cleanSel.match(/\.([^\s.>+~:[\]]+)/g);
          if (classMatches) {
            for (const clsMatch of classMatches) {
              const cls = clsMatch.substring(1).replace(/\\/g, "");
              if (usedClassesH08.has(cls)) return true;
            }
          } else {
            return true;
          }
        }
      }
      return false;
    };

    const referencedVarNames = new Set<string>();

    const blockRegex = /([^{}]+)\{([^{}]+)\}/g;
    let blockMatch: RegExpExecArray | null;
    for (;;) {
      blockMatch = blockRegex.exec(displayCss);
      if (blockMatch === null) break;

      const selectorStr = blockMatch[1].trim();
      const rulesStr = blockMatch[2];

      if (selectorStr.startsWith("@")) continue;

      const isRoot = /^:root$/i.test(selectorStr);

      if (!isRoot && !isSelectorUsedH08(selectorStr)) continue;

      const varRefRegex = /var\(\s*(--[\w-]+)/g;
      let varRef: RegExpExecArray | null;
      for (;;) {
        varRef = varRefRegex.exec(rulesStr);
        if (varRef === null) break;
        referencedVarNames.add(varRef[1]);
      }

      if (isRoot) continue;

      const colorProps = [
        "background-color",
        "background",
        "color",
        "border-color",
        "fill",
        "stroke",
      ];
      for (const prop of colorProps) {
        const propRegex = new RegExp(
          `(?:^|;)\\s*${prop}\\s*:\\s*([^;]+)`,
          "gi",
        );
        let propMatch: RegExpExecArray | null;
        for (;;) {
          propMatch = propRegex.exec(rulesStr);
          if (propMatch === null) break;
          const rawPropVal = propMatch[1].trim();
          const tokens = splitCssValueTokens(rawPropVal);
          for (const token of tokens) {
            const normalized = normalizeColorValue(token);
            if (normalized) addColor(normalized, `${prop}: ${token}`);
          }

          if (/gradient\s*\(/i.test(rawPropVal)) {
            const gradientColorRgx =
              /(?:rgba?|hsla?)\([^()]+\)|#[0-9a-fA-F]{3,8}/gi;
            let gc: RegExpExecArray | null;
            for (;;) {
              gc = gradientColorRgx.exec(rawPropVal);
              if (gc === null) break;
              const n = normalizeColorValue(gc[0]);
              if (n) addColor(n, `${prop} gradient: ${gc[0]}`);
            }
          }
        }
      }
    }

    for (const varName of referencedVarNames) {
      if (systemVarRegex.test(varName.replace(/^--/, ""))) continue;
      const rawVal = cssVarRawMap.get(varName);
      if (!rawVal) continue;
      const normalized = normalizeColorValue(rawVal);
      if (normalized) addColor(normalized, `CSS var ${varName}`);
    }

    const colorPropertyNames = [
      "color",
      "background-color",
      "background",
      "border-color",
      "fill",
      "stroke",
    ];
    $("[style]").each((_, el) => {
      const style = $(el).attr("style") || "";
      const styleProps = Object.fromEntries(
        style
          .split(";")
          .map((s) =>
            s
              .trim()
              .split(":")
              .map((p) => p.trim()),
          )
          .filter(([k]) => k && k.length > 0)
          .map(([k, ...v]) => [k.toLowerCase(), v.join(":").trim()]),
      );
      for (const prop of colorPropertyNames) {
        const val = styleProps[prop];
        if (!val) continue;
        const normalized = normalizeColorValue(val);
        if (normalized) addColor(normalized, `inline ${prop}: ${val}`);
      }
    });

    const twGradStopRgx = /^(from|via|to)-([a-z]+-\d+)(?:\/\d+)?$/;
    const twSolidRgx =
      /^(?:bg|text|border|fill|stroke)-([a-z]+-\d+)(?:\/\d+)?$/;
    const seenTwSolidClasses = new Set<string>();
    $("[class]").each((_, el) => {
      const classes = ($(el).attr("class") || "").split(/\s+/).filter(Boolean);


      let gradRepHex: string | null = null;
      let gradRepLabel = "";
      for (const priority of ["from", "via", "to"] as const) {
        if (gradRepHex) break;
        for (const cls of classes) {
          const m = twGradStopRgx.exec(cls);
          if (!m || m[1] !== priority) continue;
          const hex = TAILWIND_PALETTE?.[m[2]];
          if (hex) {
            gradRepHex = hex;
            gradRepLabel = cls;
            break;
          }
        }
      }
      if (gradRepHex) {
        const normalized = normalizeColorValue(gradRepHex);
        if (normalized)
          addColor(normalized, `Tailwind gradient: ${gradRepLabel}`);
      }

      for (const cls of classes) {
        if (seenTwSolidClasses.has(cls)) continue;
        seenTwSolidClasses.add(cls);
        const m = twSolidRgx.exec(cls);
        if (!m) continue;
        const hex = TAILWIND_PALETTE?.[m[1]];
        if (!hex) continue;
        const normalized = normalizeColorValue(hex);
        if (normalized) addColor(normalized, `Tailwind class: ${cls}`);
      }
    });

   
    $("script:not([src])").each((_, scriptEl) => {
      const scriptText = $(scriptEl).html() || "";
      const propRgx = /(?:background(?:-color)?|color|fill|stroke)\s*:/gi;
      const colorRgx = /#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\)/gi;
      const guardRgx =
        /querySelector(?:All)?\s*\(\s*["'`]([^"'`\n]+)["'`]|getElementById\s*\(\s*["'`]([^"'`\n]+)["'`]/gi;

      let propMatch: RegExpExecArray | null;
      for (;;) {
        propMatch = propRgx.exec(scriptText);
        if (propMatch === null) break;

        const lookback = scriptText.slice(
          Math.max(0, propMatch.index - 500),
          propMatch.index,
        );
        guardRgx.lastIndex = 0;
        let nearestGuardSel: string | null = null;
        let gm: RegExpExecArray | null;
        for (;;) {
          gm = guardRgx.exec(lookback);
          if (gm === null) break;
          nearestGuardSel = gm[1] ? gm[1].trim() : `#${(gm[2] ?? "").trim()}`;
        }

        if (nearestGuardSel !== null) {
          let guardExists = false;
          try {
            guardExists = $(nearestGuardSel).length > 0;
          } catch {
            guardExists = true;
          }
          if (!guardExists) continue;
        }

        const win = scriptText.slice(propMatch.index, propMatch.index + 200);
        colorRgx.lastIndex = 0;
        let colorMatch: RegExpExecArray | null;
        for (;;) {
          colorMatch = colorRgx.exec(win);
          if (colorMatch === null) break;
          const normalized = normalizeColorValue(colorMatch[0]);
          if (normalized)
            addColor(normalized, `script inline style: ${colorMatch[0]}`);
        }
      }
    });


    if (normalizedColors.size > 4) {
      const colorEntries = Array.from(normalizedColors.entries());
      const colorList = colorEntries
        .map(([color, origin]) => {
          const label =
            color === GRAYSCALE_GROUP_KEY
              ? "grayscale group (white/black/gray + opacity variants)"
              : color;
          return `${label} (from: ${origin})`;
        })
        .join(", ");
      const fileLabel = fileName ? ` in ${fileName}` : "";

      issues.push({
        checklistId: "H08-02",
        checklistItem:
          "Use color conservatively (limit brand/accent colors to 4)",
        heuristic: "Aesthetic and minimalist design",
        severity: "hedonic",
        recommendation: `Found ${normalizedColors.size} distinct color groups${fileLabel} (limit: 4). \nColors found: [ ${colorList} ]. \nNote: All grayscale shades (including white/black/gray and opacity variants) are counted as ONE group. Semantic UI states (success, error, warning, info) and system tokens were excluded. To fix: Consolidate accent colors to maintain a clean aesthetic design.`,
        affectedSelectors: "multiple elements",
        fileName,
      });
    }

    return {
      passed: normalizedColors.size <= 4,
      issues,
    };
  },
};

const H09_01_Checker: HeuristicChecker = {
  id: "H09-01",
  name: "Avoid using a reset button in most forms",
  heuristic: "Help users recognize, diagnose, and recover from errors",
  severity: "pragmatic",
  check: ($, _html, fileName) => {
    const issues: HeuristicIssue[] = [];

    $('input[type="reset"], button[type="reset"]').each((_, element) => {
      const el = element as Element;
      const fullPath = getFullSelectorPath($, el);
      const context = getElementContext($, el);

      issues.push({
        checklistId: "H09-01",
        checklistItem:
          "Form contains a reset button that may cause accidental loss of entered data",
        heuristic: "Help users recognize, diagnose, and recover from errors",
        severity: "pragmatic",
        recommendation: `Reset button ${context} should be avoided as users may accidentally click it and lose all form data. Remove: <input type="reset"> or <button type="reset">. If reset is necessary, use a confirmation dialog.`,
        affectedSelectors: fullPath,
        fileName,
      });
    });

    return {
      passed: issues.length === 0,
      issues,
    };
  },
};

const H09_02_Checker: HeuristicChecker = {
  id: "H09-02",
  name: "The system should notify the user that something has gone wrong",
  heuristic: "Help users recognize, diagnose, and recover from errors",
  severity: "essential",
  check: ($, _html, fileName) => {
    const issues: HeuristicIssue[] = [];

    const globalErrorSelectors = [
      '[role="alert"]',
      '[aria-live="assertive"]',
      '[aria-live="polite"]',
      ".toast-container",
      ".notification-container",
      "#toast",
      '[id*="toast"]',
      '[id*="notification"]',
      '[class*="toast"]',
      '[class*="snackbar"]',
      '[class*="alert"]',
      "[data-sonner-toaster]",
      ".Toastify",
    ].join(", ");

    const hasGlobalErrorSystem = $(globalErrorSelectors).length > 0;

    const formErrorSelectors = [
      '[role="alert"]',
      "[aria-live]",
      "output",
      '[class*="error"]',
      '[class*="invalid"]',
      '[class*="danger"]',
      '[class*="warning"]',
      '[id*="error"]',
      ".text-red-500",
      ".text-red-600",
      ".text-red-700",
      ".invalid-feedback",
      ".valid-feedback",
      ".alert-danger",
      ".alert-warning",
      ".help-block",
      ".MuiFormHelperText-root",
      ".ant-form-item-explain-error",
      "[data-error]",
      "[data-validation]",
    ].join(", ");

    $("form").each((_, element) => {
      const formElement = $(element);
      const el = element as Element;
      const fullPath = getFullSelectorPath($, el);
      const context = getElementContext($, el);

      if (hasGlobalErrorSystem) return;

      const hasErrorInForm = formElement.find(formErrorSelectors).length > 0;

      const hasErrorAsSibling =
        formElement.siblings(formErrorSelectors).length > 0 ||
        formElement.next(formErrorSelectors).length > 0 ||
        formElement.prev(formErrorSelectors).length > 0;

      const hasErrorInParent =
        formElement.parent().children(formErrorSelectors).length > 0;

      let hasAriaDescribedError = false;
      formElement.find("[aria-describedby]").each((_, input) => {
        const describedById = $(input).attr("aria-describedby");
        if (describedById) {
          const described = $(`#${describedById}`);
          if (described.length > 0) {
            hasAriaDescribedError = true;
          }
        }
      });

      const hasErrorHandling =
        hasErrorInForm ||
        hasErrorAsSibling ||
        hasErrorInParent ||
        hasAriaDescribedError;

      const hasNoValidate = formElement.attr("novalidate") !== undefined;
      if (!hasErrorHandling && hasNoValidate) {
        issues.push({
          checklistId: "H09-02",
          checklistItem:
            "Form lacks an error notification mechanism for displaying validation errors",
          heuristic: "Help users recognize, diagnose, and recover from errors",
          severity: "essential",
          recommendation: `Form ${context} has no detectable error container (checked inside form, siblings, parent wrapper, and aria-describedby references). Add an error container such as: <div role="alert" class="error-message" style="display:none;"></div> — or use a global toast/notification system consistently.`,
          affectedSelectors: fullPath,
          fileName,
        });
      }
    });

    return {
      passed: issues.length === 0,
      issues,
    };
  },
};


const H10_01_Checker: HeuristicChecker = {
  id: "H10-01",
  name: "Supplement UI with tooltips",
  heuristic: "Help and documentation",
  severity: "pragmatic",
  check: ($, _html, fileName) => {
    const issues: HeuristicIssue[] = [];

    const interactiveSelector = [
      "button",
      'a[role="button"]',
      '[role="button"]',
    ].join(", ");

    $(interactiveSelector).each((_, element) => {
      const elementSelected = $(element);

      const text = elementSelected.text().trim();
      const el = element as Element;

      const hasIcon = elementSelected.find("svg, i, img").length > 0;
      if (!hasIcon || text) return;


      const hasTitle = !!elementSelected.attr("title");
      const hasAriaLabel = !!elementSelected.attr("aria-label");
      const hasAriaLabelledBy = !!elementSelected.attr("aria-labelledby");
      const hasAriaDescribedBy = !!elementSelected.attr("aria-describedby");

      const hasImgAlt =
        elementSelected.find("img[alt]").filter((_, img) => {
          return !!$(img).attr("alt")?.trim();
        }).length > 0;

      const hasSvgAriaLabel =
        elementSelected.find("svg[aria-label]").length > 0;
      const hasSvgTitle = elementSelected.find("svg title").length > 0;

      const tooltipDataAttrs = [
        "data-tooltip",
        "data-tippy-content",
        "data-bs-toggle",
        "data-original-title",
        "data-placement",
      ];
      const hasCustomTooltip = tooltipDataAttrs.some(
        (attr) => elementSelected.attr(attr) !== undefined,
      );

      const hasTooltip =
        hasTitle ||
        hasAriaLabel ||
        hasAriaLabelledBy ||
        hasAriaDescribedBy ||
        hasImgAlt ||
        hasSvgAriaLabel ||
        hasSvgTitle ||
        hasCustomTooltip;

      if (!hasTooltip) {
        const fullPath = getFullSelectorPath($, el);
        const context = getElementContext($, el);

        issues.push({
          checklistId: "H10-01",
          checklistItem:
            "Icon-only button is missing a tooltip (title or aria-label attribute)",
          heuristic: "Help and documentation",
          severity: "pragmatic",
          recommendation: `Icon button ${context} lacks descriptive text or tooltip. Add title and aria-label attributes: <button title="Delete item" aria-label="Delete item"><svg>...</svg></button>`,
          affectedSelectors: fullPath,
          fileName,
        });
      }
    });

    return {
      passed: issues.length === 0,
      issues,
    };
  },
};


export const HEURISTIC_CHECKERS: HeuristicChecker[] = [
  H01_01_Checker,
  H01_02_Checker,
  H01_03_Checker,
  H01_04_Checker,
  H01_05_Checker,
  H02_01_Checker,
  H03_01_Checker,
  H03_02_Checker,
  H04_01_Checker,
  H04_02_Checker,
  H05_01_Checker,
  H05_02_Checker,
  H06_01_Checker,
  H07_01_Checker,
  H08_01_Checker,
  H08_02_Checker,
  H09_01_Checker,
  H09_02_Checker,
  H10_01_Checker,
];


export interface HeuristicPageTiming {
  pageName: string;
  heuristicMs: number;
}

export interface HeuristicCheckResult {
  issues: HeuristicIssue[];
  perPageTimings: HeuristicPageTiming[];
}

export function runHeuristicChecks(
  html: string,
  fileName?: string,
): HeuristicCheckResult;
export function runHeuristicChecks(
  files: Array<{ path: string; content: string }>,
): HeuristicCheckResult;
export function runHeuristicChecks(
  input: string | Array<{ path: string; content: string }>,
  fileName?: string,
): HeuristicCheckResult {
  const allIssues: HeuristicIssue[] = [];
  const perPageTimings: HeuristicPageTiming[] = [];

  resetCrossPageState();

  if (Array.isArray(input)) {
    const htmlFiles = input.filter((f) => f.path.endsWith(".html"));

    for (const file of htmlFiles) {
      const pageStart = Date.now();
      const $ = cheerio.load(file.content);
      const fileNameOnly = file.path.split("/").pop() || file.path;

      for (const checker of HEURISTIC_CHECKERS) {
        try {
          const result = checker.check($, file.content, fileNameOnly);
          if (!result.passed) {
            allIssues.push(...result.issues);
          }
        } catch (error) {
          console.error(
            `Error running checker ${checker.id} on ${fileNameOnly}:`,
            error,
          );
        }
      }

      perPageTimings.push({
        pageName: fileNameOnly,
        heuristicMs: Date.now() - pageStart,
      });
    }

    const crossPageIssues = analyzeCrossPageConsistency();
    allIssues.push(...crossPageIssues);
  }

  else {
    const pageStart = Date.now();
    const $ = cheerio.load(input);

    for (const checker of HEURISTIC_CHECKERS) {
      try {
        const result = checker.check($, input, fileName);
        if (!result.passed) {
          allIssues.push(...result.issues);
        }
      } catch (error) {
        console.error(`Error running checker ${checker.id}:`, error);
      }
    }

    perPageTimings.push({
      pageName: fileName || "unknown",
      heuristicMs: Date.now() - pageStart,
    });
  }

  return { issues: allIssues, perPageTimings };
}
