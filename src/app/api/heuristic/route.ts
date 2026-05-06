export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { type NextRequest, NextResponse } from "next/server";
import { runHeuristicChecks } from "@/lib/models/heuristic-checker";
import { parseHeuristicReport } from "@/lib/models/heuristic-parser";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.files || !Array.isArray(body.files)) {
      return NextResponse.json(
        {
          error:
            "missing files array. Expected format: { files: [{ path: string, content: string }] }",
        },
        { status: 400 },
      );
    }

    const result = runHeuristicChecks(body.files);
    const { issues, perPageTimings } = result;

    let documentTitle = "Untitled Page";
    const firstHtmlFile = body.files.find((f: { path: string }) =>
      f.path.endsWith(".html"),
    );
    if (firstHtmlFile) {
      documentTitle = extractTitle(firstHtmlFile.content);
    }

    const metrics = parseHeuristicReport({
      documentTitle,
      issues,
    });

    return NextResponse.json({
      success: true,
      metrics,
      issues,
      perPageTimings,
    });
  } catch (error: unknown) {
    console.error("Heuristic evaluation error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Heuristic evaluation failed",
        details: errorMessage,
      },
      { status: 500 },
    );
  }
}

function extractTitle(html: string): string {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return titleMatch ? titleMatch[1].trim() : "Untitled Page";
}
