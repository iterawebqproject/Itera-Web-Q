export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { execFile } from "node:child_process";
import { unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { type NextRequest, NextResponse } from "next/server";
import { type Pa11yIssue, parsePa11yReport } from "@/lib/models/pa11y-parser";

const pexec = promisify(execFile);

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type ChromiumShim = {
  executablePath: (remoteUrl?: string) => Promise<string | null>;
  args: string[];
};

const CHROMIUM_REMOTE_URL =
  "https://github.com/Sparticuz/chromium/releases/download/v141.0.0/chromium-v141.0.0-pack.x64.tar";

async function loadChromium(): Promise<ChromiumShim | null> {
  try {
    const mod: unknown = await import("@sparticuz/chromium-min");
    const chromium =
      mod && typeof mod === "object" && "default" in mod
        ? (mod as { default: ChromiumShim }).default
        : (mod as ChromiumShim);
    if (
      chromium &&
      typeof chromium.executablePath === "function" &&
      Array.isArray(chromium.args)
    ) {
      return chromium;
    }
    return null;
  } catch {
    return null;
  }
}

type Pa11yOpts = {
  includeNotices?: boolean;
  includeWarnings?: boolean;
  standard?: "WCAG2A" | "WCAG2AA" | "WCAG2AAA";
  timeoutMs?: number;
  waitMs?: number;
  retries?: number;
};

type RawPa11yIssue = {
  code?: string;
  message?: string;
  type: "error" | "warning" | "notice";
  context?: string;
  selector?: string;
  runner?: string;
  [key: string]: unknown;
};

function summarizePa11yIssues(issues: RawPa11yIssue[]) {
  const errors = issues.filter((x) => x.type === "error");
  const warnings = issues.filter((x) => x.type === "warning");
  const notices = issues.filter((x) => x.type === "notice");

  const topByCode = (list: RawPa11yIssue[]) => {
    const map = new Map<string, { count: number; message: string }>();
    for (const it of list) {
      const key = it.code || it.message || "unknown";
      const prev = map.get(key) || { count: 0, message: it.message || key };
      prev.count += 1;
      map.set(key, prev);
    }
    return [...map.entries()]
      .map(([code, v]) => ({ code, count: v.count, message: v.message }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  };

  return {
    errors: errors.length,
    warnings: warnings.length,
    notices: notices.length,
    topErrors: topByCode(errors),
    topWarnings: topByCode(warnings),
    topNotices: topByCode(notices),
  };
}

function parsePa11yJson(text: string) {
  const obj = JSON.parse(text);
  const issues: RawPa11yIssue[] = Array.isArray(obj)
    ? obj.flatMap((r: { issues?: RawPa11yIssue[] }) => r.issues || [])
    : obj?.issues || [];
  return { ...summarizePa11yIssues(issues), raw: obj };
}

async function runPa11y(url: string, opts: Pa11yOpts = {}) {
  const timeoutMs = Math.max(10000, opts.timeoutMs ?? 60000);
  const waitMs = Math.min(10000, opts.waitMs ?? 1000);
  const retries = Math.max(0, opts.retries ?? 1);

  if (process.env.VERCEL || process.env.USE_PA11Y_PROG === "1") {
    try {
      const chromium = await loadChromium();
      const pa11yMod: unknown = await import("pa11y");
      const pa11y =
        (
          pa11yMod as {
            default?: (
              url: string,
              o: Record<string, unknown>,
            ) => Promise<{ issues?: RawPa11yIssue[] }>;
          }
        ).default ??
        (pa11yMod as (
          url: string,
          o: Record<string, unknown>,
        ) => Promise<{ issues?: RawPa11yIssue[] }>);

      const execPath =
        (chromium && (await chromium.executablePath(CHROMIUM_REMOTE_URL))) ||
        process.env.CHROME_EXECUTABLE_PATH ||
        process.env.PUPPETEER_EXECUTABLE_PATH ||
        null;
      const chromeArgs = chromium
        ? chromium.args
        : ["--no-sandbox", "--disable-dev-shm-usage", "--window-size=1350,940"];

      const pa11yConfig = {
        standard: opts.standard ?? "WCAG2AA",
        includeNotices: opts.includeNotices ?? false,
        includeWarnings: opts.includeWarnings ?? true,
        timeout: timeoutMs,
        wait: waitMs,
        chromeLaunchConfig: {
          headless: true,
          executablePath: execPath || undefined,
          args: chromeArgs,
          defaultViewport: {
            width: 1350,
            height: 940,
            deviceScaleFactor: 1,
            isMobile: false,
            hasTouch: false,
          },
        },
      } as Record<string, unknown>;

      const result = await pa11y(url, pa11yConfig);

      const issues = Array.isArray(result?.issues) ? result.issues : [];
      const summary = summarizePa11yIssues(issues);
      return { ...summary, raw: result };
    } catch (err) {
      console.error("[Pa11y prog] failed", err);
      return null;
    }
  }

  const baseArgs = [
    "pa11y",
    url,
    "--reporter",
    "json",
    "--timeout",
    String(timeoutMs),
    "--standard",
    opts.standard ?? "WCAG2AA",
    "--wait",
    String(waitMs),
  ];
  if (opts.includeNotices) baseArgs.push("--include-notices");
  if (opts.includeWarnings) baseArgs.push("--include-warnings");

  const runOnce = async (extraEnv?: Record<string, string>) => {
    const configPath = join(tmpdir(), `pa11y-${Date.now()}.json`);
    const config = {
      viewport: {
        width: 1350,
        height: 940,
        deviceScaleFactor: 1,
        isMobile: false,
      },
      chromeLaunchConfig: {
        args: ["--no-sandbox", "--window-size=1350,940"],
      },
    };
    writeFileSync(configPath, JSON.stringify(config));
    try {
      const { stdout } = await pexec(
        "npx",
        [...baseArgs, "--config", configPath],
        {
          shell: true,
          maxBuffer: 1024 * 1024 * 50,
          env: { ...process.env, ...(extraEnv || {}) },
        },
      );
      return parsePa11yJson(stdout);
    } finally {
      try {
        unlinkSync(configPath);
      } catch {}
    }
  };

  for (let i = 0; i <= retries; i++) {
    try {
      const env =
        i === 0 ? undefined : { PA11Y_CHROME_CLI_FLAGS: "--no-sandbox" };
      return await runOnce(env);
    } catch (err: unknown) {
      const out =
        typeof err === "object" && err !== null && "stdout" in err
          ? (err as { stdout?: string; output?: unknown[] }).stdout ||
            (Array.isArray((err as { output?: unknown[] }).output)
              ? (err as unknown as { output: unknown[] }).output?.[1]
              : "")
          : "";
      if (out && typeof out === "string") {
        try {
          return parsePa11yJson(out);
        } catch {}
      }
      if (i < retries) await sleep(1500 * (i + 1));
      else {
        console.error("[Pa11y] failed", {
          code:
            typeof err === "object" && err !== null && "code" in err
              ? (err as { code?: unknown }).code
              : undefined,
          message:
            typeof err === "object" && err !== null && "message" in err
              ? (err as { message?: unknown }).message
              : undefined,
          stderr:
            typeof err === "object" &&
            err !== null &&
            "stderr" in err &&
            typeof (err as { stderr?: string }).stderr === "string"
              ? ((err as { stderr?: string }).stderr as string).slice?.(0, 500)
              : undefined,
        });
        return null;
      }
    }
  }
  return null;
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

    const pa11yOpts: Pa11yOpts = {
      includeNotices: !!body?.includeNotices,
      includeWarnings: !!body?.includeWarnings,
      standard: body?.standard || "WCAG2AA",
      timeoutMs: typeof body?.timeoutMs === "number" ? body.timeoutMs : 60000,
      waitMs: typeof body?.waitMs === "number" ? body.waitMs : 1000,
      retries: typeof body?.retries === "number" ? body.retries : 1,
    };

    const wantFull = !!body?.full;

    const pa11yRaw = await runPa11y(url, pa11yOpts).catch((e) => {
      console.error("[Pa11y] error", e);
      return null;
    });

    if (!pa11yRaw) {
      return NextResponse.json({ error: "Pa11y scan failed" }, { status: 500 });
    }

    const rawResult = pa11yRaw.raw || { issues: [] };

    if (Array.isArray(rawResult) && rawResult.length > 0) {
      console.log(
        "[Pa11y POST] First element:",
        JSON.stringify(rawResult[0], null, 2).slice(0, 500),
      );
    }

    let allIssues: unknown[] = [];
    if (Array.isArray(rawResult.issues)) {
      allIssues = rawResult.issues;
    } else if (Array.isArray(rawResult)) {
      if (rawResult.length > 0 && (rawResult[0]?.code || rawResult[0]?.type)) {
        allIssues = rawResult;
      } else {
        allIssues = rawResult.flatMap(
          (r) => (r as { issues?: unknown[] }).issues || [],
        );
      }
    }

    const pa11yMetrics = parsePa11yReport({
      documentTitle: rawResult.documentTitle || "Untitled",
      pageUrl: url,
      issues: allIssues as Pa11yIssue[],
    });

    return NextResponse.json(
      {
        meta: { url, scannedAt: new Date().toISOString(), pa11yOpts },
        pa11y: wantFull ? { ...pa11yMetrics, raw: pa11yRaw.raw } : pa11yMetrics,
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
