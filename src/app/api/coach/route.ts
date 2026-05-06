import { GoogleGenerativeAI } from "@google/generative-ai";
import { type NextRequest, NextResponse } from "next/server";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3-flash-preview";


const SYSTEM_INSTRUCTION = `
1. Profile
You are an expert Web Frontend QA Coach and Prompt Engineer. Your role is to analyze Current Frontend Code (JSON) alongside multi-dimensional audit reports to produce surgical fix instructions that a code-generation LLM can execute directly.

2. Directive
Analyze the 'Quality Gap' for issues selected by the user. Synthesize a 'Refined User Prompt' that references existing CSS selectors and file paths in the Current Frontend Code, focusing exclusively on user-selected items.

3. Context
Input data:
- Audit Reports: Findings from Heuristics, Pa11y, Lighthouse, and Green Software.
- User Selection: IDs, CSS selectors, or issue types chosen by the user.
- Previous User Prompt: Read-only context.
- Current Frontend Code: Contains siteIdentity + files array. Primary reference for mapping.

4. Workflows
4.1 Parse & Map: Map each selected issue to its corresponding CSS selector/HTML element in the files array.
4.2 Consolidate: Group identical issue types (e.g., same Lighthouse ID, WCAG code, or Heuristic rule) across multiple pages into a SINGLE numbered instruction. 
4.3 Verify: Ensure EVERY user-selected issue is covered. If N selected issues group into M distinct types, output exactly M numbered instructions.
4.4 Detail: For each distinct issue, provide a "Why, What, How" entry in the suggestions array.

5. Output Format
Return ONLY a valid JSON object:
{
  "summary": "Technical overview of fixes based on user selection.",
  "refinedUserPrompt": "Must follow the EXACT structure defined in 5.1.",
  "suggestions": [
    {
      "area": "heuristic" | "lighthouse" | "pa11y" | "green software" | "design",
      "why": "Impact of the issue based on audit data or design goals.",
      "whatToChange": "Specific requirement to be addressed.",
      "howToChange": "Technical instruction referencing CSS selectors or Audit IDs."
    }
  ]
}

5.1 refinedUserPrompt Exact Structure:
You MUST construct the "refinedUserPrompt" string exactly as follows:

--- START OF REFINED PROMPT STRUCTURE ---
Analyze the audit findings below and apply the following fixes:
- Identify the specific components and CSS classes mentioned in selectors.
- Apply technical fixes to resolve every reported issue globally across ALL affected pages.

Audit Logs to Process:
1. [Issue Name] Description of the fix. Affected elements:
  - filename.html: .selector (current state) -> instruction
  - filename2.html: .selector (current state) -> instruction
[2. Next Grouped Issue...]

STABILITY GUARD: Preserve existing DOM tree structure, grid/flex layouts, and untouched elements. Do NOT remove or shorten descriptive anchor text, alt attributes, ARIA attributes, <meta> tags, or semantic landmarks unless explicitly instructed to fix them.
--- END OF REFINED PROMPT STRUCTURE ---

6. Constraints
- Strict Scope: Focus ONLY on user-selected audit issues AND the user design notes. Never hallucinate fixes that are not requested.
- Evidence-Based Mapping: Instructions must reference actual file paths and CSS selectors found in the Current Frontend Code.
- Map iframe Optimization (Lighthouse): If a selected issue involves high network requests AND a Google Maps <iframe> exists, instruct to implement a lazy-load facade: (1) Replace <iframe> with a placeholder <div data-map-src="[url]"> styling a map card. (2) Add JS to swap placeholder for <iframe> on click.
- Accessibility (Label in Name): Never overwrite visible text with a conflicting 'aria-label'. If fixing contrast/context on an element with text, instruct to REMOVE the 'aria-label' and append a visually hidden <span class="sr-only"> instead.
`.trim();


type QualityItem = {
  source: string;
  key: string;
  score: number | string;
  message: string;
};

type CoachInput = {
  originalUserPrompt?: string;
  previousUserPrompt?: string;
  userDesignNotes?: string;
  generatedCode?: Array<{
    path: string;
    content: string;
    encoding?: "utf8" | "base64";
    mimeType?: string;
  }>;
  selectedIssues?: Array<{
    id: string;
    title: string;
    description: string;
    severity: string;
    source: string;
    category?: string;
    recommendation?: string;
    affectedElements?: string[];
    fileName?: string;
  }>;
  qualityGateResult?: {
    status: "FAIL" | "WARN" | "PASS";
    critical: QualityItem[];
    warning: QualityItem[];
    riskBreakdown?: Record<string, string>;
  };
};


function stripBase64ForCoach(
  files: Array<{ path: string; content: string; encoding?: string }>,
): Array<{ path: string; content: string }> {
  return files
    .filter((f) => /\.html$/i.test(f.path))
    .map((f) => ({
      path: f.path,
      content: f.content.replace(
        /src="(?:data:image\/[^"]+|\/?assets\/[^"]+)"/g,
        'src="[image]"',
      ),
    }));
}

function buildUserMsg(input: CoachInput): string {
  const {
    originalUserPrompt,
    previousUserPrompt,
    qualityGateResult,
    userDesignNotes,
    selectedIssues,
    generatedCode,
  } = input;
  const critical = qualityGateResult?.critical || [];
  const warning = qualityGateResult?.warning || [];

  const lines: string[] = [];

  if (generatedCode && generatedCode.length > 0) {
    const cleanFiles = stripBase64ForCoach(generatedCode);
    lines.push("## CURRENT FRONTEND CODE (JSON)");
    lines.push(
      JSON.stringify(
        {
          siteIdentity: { brandName: "", title: "", tagline: "" },
          files: cleanFiles,
        },
        null,
        0,
      ),
    );
    lines.push("---");
  }

  lines.push("## QUALITY GATE RESULT & ASSESSMENT REPORTS");

  if (critical.length > 0) {
    lines.push("🔴 CRITICAL:");
    critical.forEach((item, idx) => {
      lines.push(
        `${idx + 1}. [${item.source.toUpperCase()}] ${item.key}: ${item.message} (Score: ${item.score})`,
      );
    });
  } else {
    lines.push("✅ No Critical items.");
  }

  lines.push("");

  if (warning.length > 0) {
    lines.push("🟡 WARNING:");
    warning.forEach((item, idx) => {
      lines.push(
        `${idx + 1}. [${item.source.toUpperCase()}] ${item.key}: ${item.message}`,
      );
    });
  } else {
    lines.push("✅ No Warning items.");
  }

  if (selectedIssues && selectedIssues.length > 0) {
    lines.push("---");
    lines.push("## USER SELECTION LIST");
    lines.push(
      `The user has selected ${selectedIssues.length} issue(s) to fix:`,
    );
    selectedIssues.forEach((issue, idx) => {
      lines.push(
        `${idx + 1}. [${issue.source.toUpperCase()}${issue.category ? ` - ${issue.category}` : ""}] (ID: ${issue.id}) ${issue.title}`,
      );
      lines.push(`   Severity: ${issue.severity}`);
      if (issue.fileName) {
        lines.push(`   File: ${issue.fileName}`);
      }
      lines.push(`   Description: ${issue.description}`);
      if (issue.recommendation) {
        lines.push(`   Recommendation: ${issue.recommendation}`);
      }
      if (issue.affectedElements && issue.affectedElements.length > 0) {
        lines.push(
          `   Affected Elements: ${issue.affectedElements.join(", ")}`,
        );
      }
    });
  }

  if (userDesignNotes?.trim()) {
    lines.push("---");
    lines.push("## USER DESIGN IMPROVEMENT NOTES");
    lines.push("The user wants these specific UI/UX improvements:");
    lines.push(`"${userDesignNotes.trim()}"`);
  }

  lines.push("---");
  lines.push("## ORIGINAL USER REQUIREMENT");
  lines.push(`"${originalUserPrompt || "N/A"}"`);
  lines.push("---");
  lines.push("## PREVIOUS USER PROMPT (last iteration)");
  lines.push(`"${previousUserPrompt || originalUserPrompt || "N/A"}"`);

  lines.push("---");
  lines.push(
    "Generate the refined JSON response based on the Current Frontend Code, assessment reports, user selection list, design notes, and previous prompt.",
  );

  return lines.join("\n");
}

async function coachWithGemini(userMsg: string) {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY is not configured");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction: SYSTEM_INSTRUCTION,
  });

  try {
    const resp = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: userMsg }] }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
    });

    const text = resp.response.text();
    const cleanJson = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (e) {
    console.error("Gemini Error:", e);
    return {
      summary: "Error generating coach advice.",
      combined_refine_prompt: "",
      suggestions: [],
    };
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CoachInput;
    const userMsg = buildUserMsg(body);
    const aiResponse = await coachWithGemini(userMsg);

    return NextResponse.json(aiResponse, { status: 200 });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Internal Server Error" },
      { status: 500 },
    );
  }
}
