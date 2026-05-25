import crypto from "node:crypto";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const PROJECT = process.env.CLOUDFLARE_PAGES_PROJECT;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const DEBUG = process.env.DEBUG_DEPLOY === "1";

type DeployFile = {
  path: string;
  content: string;
  encoding?: "utf8" | "base64";
  mimeType?: string;
};

function guessType(p: string) {
  if (p.endsWith(".html")) return "text/html; charset=utf-8";
  if (p.endsWith(".css")) return "text/css";
  if (p.endsWith(".js")) return "application/javascript";
  if (p.endsWith(".svg")) return "image/svg+xml";
  if (p.endsWith(".webp")) return "image/webp";
  if (p.endsWith(".png")) return "image/png";
  if (p.endsWith(".jpg") || p.endsWith(".jpeg")) return "image/jpeg";
  if (p.endsWith(".gif")) return "image/gif";
  return "application/octet-stream";
}

const toUploadBase64 = (file: DeployFile) =>
  file.encoding === "base64"
    ? file.content
    : Buffer.from(file.content, "utf8").toString("base64");

function md5ContentPlusPath(content: string, path: string) {
  return crypto.createHash("md5").update(content).update(path).digest("hex");
}

async function safeText(res: Response) {
  try {
    return await res.text();
  } catch {
    return "";
  }
}

async function safeJSON<T = unknown>(txt: string): Promise<T | null> {
  try {
    return JSON.parse(txt) as T;
  } catch {
    return null;
  }
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function listProjectNames(): Promise<string[]> {
  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects?per_page=100`,
      { headers: { Authorization: `Bearer ${API_TOKEN}` }, cache: "no-store" },
    );
    const body = await safeText(res);
    const json = await safeJSON<{ result?: Array<{ name: string }> }>(body);
    return json?.result?.map((p) => p.name) ?? [];
  } catch {
    return [];
  }
}

function deriveNextProjectName(baseProject: string, webName?: string): string {
  const suffix = crypto.randomBytes(3).toString("hex");
  if (webName) {
    const cleanName = webName
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .substring(0, 30);
    return `${baseProject}-${cleanName}-${suffix}`;
  }
  return `${baseProject}-${suffix}`;
}

async function createPagesProject(
  name: string,
  knownNames: string[] = [],
  webName?: string,
): Promise<{ ok: boolean; name?: string; error?: string }> {
  const tried = new Set(knownNames);
  let candidateName = name;

  for (let attempt = 0; attempt < 10; attempt++) {
    while (tried.has(candidateName)) {
      candidateName = deriveNextProjectName(candidateName, webName);
    }

    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: candidateName,
          production_branch: "main",
        }),
      },
    );
    if (res.ok) {
      const body = await safeText(res);
      const json = await safeJSON<{ result?: { name?: string } }>(body);
      return { ok: true, name: json?.result?.name ?? candidateName };
    }
    const errText = await safeText(res);
    const errJson = await safeJSON<{ errors?: Array<{ code?: number }> }>(
      errText,
    );
    const nameAlreadyExists = errJson?.errors?.some((e) => e.code === 8000002);
    if (!nameAlreadyExists) {
      return { ok: false, error: errText };
    }
    if (DEBUG)
      console.log(`[deploy] name "${candidateName}" taken, retrying...`);
    tried.add(candidateName);
    candidateName = deriveNextProjectName(candidateName, webName);
  }
  return { ok: false, error: "all candidate project names are taken" };
}

async function getProductionBranch(project: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${project}`,
      { headers: { Authorization: `Bearer ${API_TOKEN}` }, cache: "no-store" },
    );
    const body = await safeText(res);
    const json = await safeJSON<{ result?: { production_branch?: string } }>(
      body,
    );
    return json?.result?.production_branch || null;
  } catch {
    return null;
  }
}

async function waitUntilReady(
  url: string,
  deployId: string | undefined,
  project: string,
  maxMs = 45_000,
) {
  const start = Date.now();
  let lastHttp: number | undefined;

  while (Date.now() - start < maxMs) {
    if (deployId) {
      const stRes = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${project}/deployments/${deployId}`,
        {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
          cache: "no-store",
        },
      );
      const stBody = await safeText(stRes);
      const st = await safeJSON<{
        result?: { latest_stage?: { status?: string } };
      }>(stBody);
      const status = st?.result?.latest_stage?.status;

      if (status === "success")
        return { ready: true, http: 200, status: "success" };
    }

    try {
      const head = await fetch(url, { method: "HEAD", cache: "no-store" });
      lastHttp = head.status;
      if (head.ok) return { ready: true, http: head.status, status: "ok" };
    } catch (error) {
      console.warn("[deploy] HEAD request failed:", error);
    }

    await sleep(1500);
  }

  return { ready: false, http: lastHttp, status: "timeout" as const };
}

export async function POST(req: NextRequest) {
  try {
    if (!ACCOUNT_ID || !PROJECT || !API_TOKEN) {
      return NextResponse.json(
        {
          error: "missing env",
          details: {
            ACCOUNT_ID: !!ACCOUNT_ID,
            PROJECT: !!PROJECT,
            API_TOKEN: !!API_TOKEN,
          },
        },
        { status: 500 },
      );
    }

    const {
      files,
      iteration = 1,
      project: projectParam,
      previousUrl,
      webName,
    }: {
      files: DeployFile[];
      iteration?: number;
      project?: string;
      previousUrl?: string;
      webName?: string;
    } = await req.json();

    if (!files?.length)
      return NextResponse.json({ error: "no files" }, { status: 400 });

    if (!files.find((f) => f.path === "index.html")) {
      return NextResponse.json(
        { error: "missing index.html at root" },
        { status: 400 },
      );
    }

    let targetProject = projectParam ?? PROJECT ?? "";

    if (!projectParam) {
      if (previousUrl) {
        const m = previousUrl.match(/^https?:\/\/([^.]+)\.pages\.dev/);
        if (m?.[1]) {
          targetProject = m[1];
          if (DEBUG)
            console.log(
              "[deploy] derived project from previousUrl:",
              targetProject,
            );
        }
      } else if (iteration === 1) {
        const existingNames = await listProjectNames();
        const newProjectName = deriveNextProjectName(PROJECT ?? "", webName);
        const createResult = await createPagesProject(
          newProjectName,
          existingNames,
          webName,
        );
        if (createResult.ok) {
          targetProject = createResult.name ?? newProjectName;
          if (DEBUG)
            console.log("[deploy] new project created:", targetProject);
          await sleep(2000);
        } else {
          console.error(
            "[deploy] project creation failed:",
            createResult.error,
          );
          return NextResponse.json(
            {
              step: "create-project",
              error: "failed to create new CF Pages project",
              details: createResult.error,
            },
            { status: 502 },
          );
        }
      }
    }

    const prodBranch = await getProductionBranch(targetProject);
    if (DEBUG) console.log("[deploy] current production branch:", prodBranch);

    if (prodBranch !== null && prodBranch !== "main") {
      if (DEBUG) console.log("[deploy] setting production branch to main");

      const updateRes = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${targetProject}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ production_branch: "main" }),
        },
      );

      const updateBody = await safeText(updateRes);
      if (!updateRes.ok) {
        console.error(
          "[deploy] failed to set production branch",
          updateRes.status,
          updateBody,
        );
        return NextResponse.json(
          {
            error: "failed to set production branch",
            status: updateRes.status,
            details: updateBody,
          },
          { status: 502 },
        );
      }

      if (DEBUG) console.log("[deploy] production branch set to main");
      await sleep(2000);
    }

    if (DEBUG) console.log("[deploy] step1: get upload-token");

    const tokRes = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${targetProject}/upload-token`,
      { headers: { Authorization: `Bearer ${API_TOKEN}` } },
    );
    const tokBody = await safeText(tokRes);
    const tokJson = (() => {
      try {
        return JSON.parse(tokBody);
      } catch {
        return {};
      }
    })();

    if (!tokRes.ok) {
      if (DEBUG)
        console.error("[deploy] upload-token failed", tokRes.status, tokBody);
      return NextResponse.json(
        {
          step: "upload-token",
          error: "failed",
          status: tokRes.status,
          details: tokJson || tokBody,
        },
        { status: 502 },
      );
    }

    const uploadToken: string =
      tokJson?.result?.jwt || tokJson?.result?.upload_token || tokJson?.result;

    if (!uploadToken) {
      return NextResponse.json(
        {
          error: "upload-token missing in response",
          details: tokJson,
        },
        { status: 502 },
      );
    }

    const items = files.map((f) => {
      const key = md5ContentPlusPath(f.content, f.path);
      return {
        key,
        path: f.path,
        contentType: f.mimeType || guessType(f.path),
        valueB64: toUploadBase64(f),
      };
    });

    if (DEBUG) console.log("[deploy] step2: upload assets", items.length);

    const uploadRes = await fetch(
      "https://api.cloudflare.com/client/v4/pages/assets/upload",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${uploadToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          items.map((it) => ({
            key: it.key,
            value: it.valueB64,
            metadata: { contentType: it.contentType },
            base64: true,
          })),
        ),
      },
    );

    const uploadBody = await safeText(uploadRes);
    const uploadJson = (() => {
      try {
        return JSON.parse(uploadBody);
      } catch {
        return {};
      }
    })();

    if (!uploadRes.ok) {
      if (DEBUG)
        console.error(
          "[deploy] upload failed",
          uploadRes.status,
          uploadBody?.slice?.(0, 500),
        );
      return NextResponse.json(
        {
          step: "upload",
          error: "failed",
          status: uploadRes.status,
          details: uploadJson || uploadBody,
        },
        { status: 502 },
      );
    }

    if (DEBUG) console.log("[deploy] step2.5: upsert hashes");

    const upsertRes = await fetch(
      "https://api.cloudflare.com/client/v4/pages/assets/upsert-hashes",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${uploadToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hashes: items.map((it) => it.key) }),
      },
    );

    const upsertBody = await safeText(upsertRes);

    if (!upsertRes.ok && DEBUG) {
      console.warn(
        "[deploy] upsert-hashes failed but continuing",
        upsertRes.status,
        upsertBody?.slice?.(0, 500),
      );
    }

    const branch = "main";

    if (DEBUG)
      console.log(
        "[deploy] step3: create deployment on branch:",
        branch,
        "iteration:",
        iteration,
      );

    const manifestObj: Record<string, string> = {};
    for (const it of items) {
      const normalized = it.path.startsWith("/") ? it.path : `/${it.path}`;
      manifestObj[normalized] = it.key;
    }

    const form = new FormData();
    form.append("branch", branch);
    form.append("manifest", JSON.stringify(manifestObj));

    const depRes = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${targetProject}/deployments`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${API_TOKEN}` },
        body: form,
      },
    );

    const depBody = await safeText(depRes);
    const depJson = await safeJSON<{
      result?: {
        id?: string;
        url?: string;
        aliases?: string[];
      };
    }>(depBody);

    if (!depRes.ok) {
      if (DEBUG)
        console.error(
          "[deploy] create deployment failed",
          depRes.status,
          depBody?.slice?.(0, 500),
        );
      return NextResponse.json(
        {
          step: "deploy",
          error: "failed",
          status: depRes.status,
          details: depJson || depBody,
        },
        { status: 502 },
      );
    }

    const deployId = depJson?.result?.id;
    const productionUrl =
      depJson?.result?.aliases?.[0] || `https://${targetProject}.pages.dev`;
    console.log(
      "[deploy] deployment created with ID:",
      deployId,
      "production URL:",
      productionUrl,
    );
    const deployUrl = depJson?.result?.url;

    let readiness:
      | { ready: boolean; http?: number; status: string }
      | undefined;
    if (productionUrl) {
      readiness = await waitUntilReady(
        productionUrl,
        deployId,
        targetProject,
        45_000,
      );
    }

    return NextResponse.json(
      {
        url: productionUrl,
        deployUrl,
        branch,
        iteration,
        project: targetProject,
        uploaded: files.map((f) => f.path),
        manifestKeys: Object.keys(manifestObj).length,
        deployId,
        ready: readiness?.ready ?? false,
        readyHttp: readiness?.http,
        readyStatus: readiness?.status,
      },
      { status: 200 },
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "deploy error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
