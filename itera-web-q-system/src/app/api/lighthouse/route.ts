export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { type NextRequest, NextResponse } from "next/server";
import { parseLighthouseReport } from "@/lib/models/lighthouse-parser";

const pexec = promisify(execFile);

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function toPct(x: unknown): number {
  return Math.round((typeof x === "number" ? x : 0) * 100);
}
async function runPsi(url: string, strategy: "mobile" | "desktop" = "desktop") {
  const key = process.env.GOOGLE_PSI_KEY;
  const u = new URL(
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed",
  );
  u.searchParams.set("url", url);
  u.searchParams.set("strategy", strategy);
  for (const c of ["PERFORMANCE", "ACCESSIBILITY", "SEO", "BEST_PRACTICES"]) {
    u.searchParams.append("category", c);
  }
  if (key) u.searchParams.set("key", key);

  const res = await fetch(u.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error(`PSI ${res.status}: ${await res.text()}`);
  const j: unknown = await res.json();
  const cats =
    (
      j as {
        lighthouseResult?: { categories?: Record<string, { score?: number }> };
      }
    )?.lighthouseResult?.categories ?? {};
  const lh =
    (j as { lighthouseResult?: Record<string, unknown> }).lighthouseResult ??
    null;

  return {
    performance: toPct(cats.performance?.score),
    accessibility: toPct(cats.accessibility?.score),
    seo: toPct(cats.seo?.score),
    best: toPct(
      (cats as Record<string, { score?: number }>)["best-practices"]?.score,
    ),
    raw: lh || j,
  };
}

async function runLH(url: string) {
  if (process.env.VERCEL || process.env.USE_PSI === "1") {
    return runPsi(url, "desktop");
  }

  const { stdout } = await pexec(
    "npx",
    [
      "lighthouse",
      url,
      "--quiet",
      "--preset=desktop",
      "--screenEmulation.width=1350",
      "--screenEmulation.height=940",
      "--screenEmulation.deviceScaleFactor=1",
      "--chrome-flags=--no-sandbox --window-size=1350,940",
      "--output=json",
      "--output-path=stdout",
    ],
    { shell: true, maxBuffer: 1024 * 1024 * 50 },
  );

  const j = JSON.parse(stdout) as {
    categories?: {
      performance?: { score?: number };
      accessibility?: { score?: number };
      seo?: { score?: number };
      ["best-practices"]?: { score?: number };
    };
  };

  return {
    performance: toPct(j?.categories?.performance?.score),
    accessibility: toPct(j?.categories?.accessibility?.score),
    seo: toPct(j?.categories?.seo?.score),
    best: toPct(j?.categories?.["best-practices"]?.score),
    raw: j,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url: string = body?.url;
    if (!url)
      return NextResponse.json({ error: "missing url" }, { status: 400 });

    await sleep(1200);
    try {
      await fetch(url, { cache: "no-store" });
    } catch {}

    const wantFull = !!body?.full;

    const lh = await runLH(url).catch((e) => {
      console.error("[LH] error", e);
      return null;
    });

    if (!lh) {
      return NextResponse.json(
        { error: "Lighthouse scan failed" },
        { status: 500 },
      );
    }

    const lighthouseMetrics = parseLighthouseReport(
      lh.raw as Record<string, unknown>,
    );

    return NextResponse.json(
      {
        meta: { url, scannedAt: new Date().toISOString() },
        lighthouse: wantFull
          ? { ...lighthouseMetrics, raw: lh.raw }
          : lighthouseMetrics,
        lighthouseMetrics,
      },
      { status: 200 },
    );
  } catch (e: unknown) {
    return NextResponse.json(
      {
        error:
          e && typeof e === "object" && "message" in e
            ? (e as { message?: string }).message
            : "scan error",
      },
      { status: 500 },
    );
  }
}
