"use client";

import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, Clock, Code, Search, Terminal } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { idbGet, idbRemove } from "@/lib/idb-storage";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type CodegenResponse = {
  files?: Array<{
    path: string;
    content: string;
    encoding?: "utf8" | "base64";
    mimeType?: string;
  }>;
  context?: {
    siteIdentity?: { brandName: string; title: string; tagline: string };
    globalCss?: string;
  };
  error?: string;
  details?: string;
};

type DeployResponse = {
  url?: string;
  deployUrl?: string;
  branch?: string;
  project?: string;
  ready?: boolean;
  error?: string;
};

type HeuristicResponse = {
  success?: boolean;
  metrics?: unknown;
  issues?: unknown[];
  perPageTimings?: Array<{ pageName: string; heuristicMs: number }>;
  error?: string;
  details?: string;
};

type Pa11yResponse = {
  meta?: { url: string; scannedAt: string };
  pa11y?: {
    summary: {
      errors: number;
      warnings: number;
      totalIssues: number;
    };
    pageInfo: {
      url: string;
      documentTitle?: string;
      scannedAt: string;
    };
    errorIssues: Array<{
      code: string;
      type: "error" | "warning";
      message: string;
      context: string;
      selector: string;
      runner: string;
    }>;
    warningIssues: Array<{
      code: string;
      type: "error" | "warning";
      message: string;
      context: string;
      selector: string;
      runner: string;
    }>;
    raw?: unknown;
  };
  error?: string;
};

type LighthouseResponse = {
  meta?: { url: string; scannedAt: string };
  lighthouse?: {
    summaryScores: {
      performance: number;
      accessibility: number;
      bestPractices: number;
      seo: number;
    };
    pageInfo: {
      url: string;
      finalUrl?: string;
      scannedAt: string;
    };
    failedAudits: Array<{
      id: string;
      title: string;
      description: string;
      score: number | null;
      displayValue?: string;
      affectedElements: string[];
    }>;
    raw?: unknown;
  };
  error?: string;
};

type GreenSoftwareResponse = {
  success?: boolean;
  metrics?: {
    summary: {
      totalIssues: number;
      critical: number;
      warnings: number;
      info: number;
      passed: number;
      totalChecks: number;
    };
    issues: Array<{
      category: string;
      checkId: string;
      title: string;
      severity: string;
      description: string;
      recommendation: string;
    }>;
  };
  error?: string;
};

export default function ProcessMonitor() {
  const [userPrompt, setUserPrompt] = useState("");
  const [webName, setWebName] = useState("");
  const [logs, setLogs] = useState<
    Array<{ id: string; time: string; type: string; msg: string }>
  >([]);
  const hasStartedRef = useRef(false);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const [codeGenerationFinished, setCodeGenerationFinished] = useState(false);
  const [iteration, setIteration] = useState(1);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [generatedFiles, setGeneratedFiles] = useState<
    Array<{ path: string; content: string }>
  >([]);
  const [totalAudits, setTotalAudits] = useState(0);
  const [allAuditsFinished, setAllAuditsFinished] = useState(false);

  const [allHeuristicIssues, setAllHeuristicIssues] = useState<unknown[]>([]);
  const heuristicPageTimingsRef = useRef<Map<string, number>>(new Map());
  const router = useRouter();

  interface PageTimingEntry {
    pageName: string;
    heuristicMs: number;
    lighthouseMs: number;
    pa11yMs: number;
    greenSoftwareMs: number;
    totalMs: number;
  }
  interface TimingsData {
    codeGenMs: number;
    codeGenStart: number;
    deployMs: number;
    deployStart: number;
    heuristicMs: number;
    heuristicStart: number;
    lighthouseMs: number;
    pa11yMs: number;
    greenSoftwareMs: number;
    assessmentTotalMs: number;
    qualityGateMs: number;
    qualityGateStart: number;
    pageCount: number;
    perPageTimings: PageTimingEntry[];
  }

 
  const timingsRef = useRef<TimingsData>({
    codeGenMs: 0,
    codeGenStart: 0,
    deployMs: 0,
    deployStart: 0,
    heuristicMs: 0,
    heuristicStart: 0,
    lighthouseMs: 0,
    pa11yMs: 0,
    greenSoftwareMs: 0,
    assessmentTotalMs: 0,
    qualityGateMs: 0,
    qualityGateStart: 0,
    pageCount: 0,
    perPageTimings: [],
  });

  const addLog = useCallback((type: string, msg: string) => {
    const now = new Date();
    const time = `${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
    const id = `${Date.now()}-${Math.random()}`;
    setLogs((prev) => [...prev, { id, time, type, msg }]);
  }, []);

  const waitForPreview = async (
    url: string,
    delayMs: number,
  ): Promise<boolean> => {
    let attempt = 1;
    while (true) {
      try {
        const res = await fetch(`/api/ping?url=${encodeURIComponent(url)}`);
        const data = (await res.json()) as { ok?: boolean };
        if (data.ok) return true;
      } catch {
        console.log(`Preview check attempt ${attempt} failed`);
      }
      await sleep(delayMs);
      attempt++;
    }
  };

  const codegenMutation = useMutation<
    CodegenResponse,
    Error,
    {
      prompt: string;
      currentCode: { context?: unknown; files?: unknown[] } | null;
      uploadedLogoWebp?: string;
      customAssets?: Record<string, string>;
    }
  >({
    mutationFn: async ({
      prompt: promptValue,
      currentCode: codeValue,
      uploadedLogoWebp,
      customAssets,
    }) => {
      addLog(
        "info",
        codeValue
          ? "Initializing Gemini context (Refinement mode)..."
          : "Initializing Gemini context...",
      );
      timingsRef.current.codeGenStart = Date.now();
      const response = await fetch("/api/codegen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptValue,
          ...(uploadedLogoWebp ? { uploadedLogoWebp } : {}),
          ...(customAssets ? { customAssets } : {}),
          ...(codeValue ? { currentCode: codeValue } : { context: {} }),
        }),
      });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.error) {
        addLog("error", `Generation error: ${data.error}`);
        return;
      }

      if (data.files) {
        timingsRef.current.codeGenMs =
          Date.now() - (timingsRef.current.codeGenStart || Date.now());
        addLog(
          "success",
          `Draft ${iteration} HTML/CSS generation complete. (${(timingsRef.current.codeGenMs / 1000).toFixed(1)}s)`,
        );
        setCodeGenerationFinished(true);
        setGeneratedFiles(data.files);

        addLog("info", "Running heuristic evaluation...");
        heuristicMutation.mutate(data.files);

        addLog("info", "Starting deployment process...");
        deployMutation.mutate(data.files);
      }
    },
    onError: (error) => {
      addLog("error", `Generation failed: ${error.message}`);
    },
  });

  const heuristicMutation = useMutation<
    HeuristicResponse,
    Error,
    Array<{ path: string; content: string }>
  >({
    mutationFn: async (files) => {
      const response = await fetch("/api/heuristic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files }),
      });
      return response.json();
    },
    onSuccess: (data) => {
      if (data.error) {
        addLog("error", `Heuristic evaluation failed: ${data.error}`);
        return;
      }

      if (data.success && data.issues) {
        const issueCount = data.issues.length;

        if (data.perPageTimings) {
          heuristicPageTimingsRef.current.clear();
          for (const entry of data.perPageTimings) {
            heuristicPageTimingsRef.current.set(
              entry.pageName,
              entry.heuristicMs,
            );
          }
        }

        setAllHeuristicIssues(data.issues);

        if (issueCount === 0) {
          addLog("success", "Heuristic evaluation passed! No issues found.");
        } else {
          addLog("warn", `Heuristic evaluation found ${issueCount} issue(s).`);
          data.issues.slice(0, 3).forEach((issue) => {
            const fileInfo = (issue as { fileName?: string }).fileName
              ? `[${(issue as { fileName?: string }).fileName}] `
              : "";
            const selectorInfo = (issue as { affectedSelectors?: string })
              .affectedSelectors
              ? ` in ${(issue as { affectedSelectors?: string }).affectedSelectors}`
              : "";
            addLog(
              "warn",
              `  ${fileInfo}${(issue as { checklistId?: string }).checklistId}: ${(issue as { recommendation?: string }).recommendation}${selectorInfo}`,
            );
          });
          if (issueCount > 3) {
            addLog("info", `  ... and ${issueCount - 3} more issue(s)`);
          }
        }
      }
    },
    onError: (error) => {
      addLog("error", `Heuristic evaluation error: ${error.message}`);
    },
  });

  const deployMutation = useMutation<
    DeployResponse,
    Error,
    Array<{ path: string; content: string }>
  >({
    mutationFn: async (files) => {
      timingsRef.current.deployStart = Date.now();

      const prevUrl = localStorage.getItem("deployProductionUrl");
      const deployProject = localStorage.getItem("deployProject");

      const body: Record<string, unknown> = {
        files,
        iteration,
        ...(webName ? { webName } : {}),
        ...(deployProject ? { project: deployProject } : {}),
      };
      if (prevUrl && (iteration > 1 || deployProject)) {
        body.previousUrl = prevUrl;
      }

      const response = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      return response.json();
    },
    onSuccess: async (data) => {
      if (!data?.url) {
        addLog("error", `Deployment failed: ${data.error ?? "No URL"}`);
        return;
      }

      if (data.deployUrl) {
        localStorage.setItem("deploymentUrl", data.deployUrl);
      }
      if (data.url) {
        localStorage.setItem("deployProductionUrl", data.url);
      }
      if (data.project) {
        localStorage.setItem("deployProject", data.project);
      }
      const pollUrl = data.deployUrl ?? data.url;

      addLog("info", "Waiting for preview to be ready...");
      const ok = data.ready || (await waitForPreview(pollUrl, 3000));
      if (!ok) {
        addLog("error", "Preview not reachable.");
        return;
      }
      timingsRef.current.deployMs =
        Date.now() - (timingsRef.current.deployStart || Date.now());
      addLog(
        "success",
        `Deployed to: ${data.url} (${(timingsRef.current.deployMs / 1000).toFixed(1)}s)`,
      );
      await sleep(10000);
      addLog(
        "success",
        "Preview is ready! Starting Assessment (Lighthouse, Pa11y, Green Software)...",
      );

      const htmlFiles = generatedFiles.filter((f) => f.path.endsWith(".html"));

      if (htmlFiles.length === 0) {
        addLog("error", "No HTML files found to audit");
        return;
      }

      setTotalAudits(htmlFiles.length * 3);

      addLog("info", `Found ${htmlFiles.length} HTML file(s) to audit...`);
      await runAuditsSequentially(data.url, htmlFiles);
    },
    onError: (error) => {
      addLog("error", `Deployment failed: ${error.message}`);
    },
  });

  const runAuditsSequentially = async (
    baseUrl: string,
    htmlFiles: Array<{ path: string; content: string }>,
  ) => {
    const tempPa11yResults: Pa11yResponse[] = [];
    const tempLighthouseResults: LighthouseResponse[] = [];
    const tempGreenSoftwareResults: GreenSoftwareResponse[] = [];
    const pageAuditSummaries: Array<{
      pageName: string;
      pa11y: { errors: number; warnings: number };
      lighthouse: {
        performance: number;
        accessibility: number;
        seo: number;
        bestPractices: number;
      };
      greenSoftware: {
        passed: number;
        totalChecks: number;
        critical: number;
        warnings: number;
      };
    }> = [];

    for (const file of htmlFiles) {
      const fileName = (file.path.split("/").pop() || file.path).replace(
        /\.html\.html$/i,
        ".html",
      );
      const fileUrl =
        fileName === "index.html" ? baseUrl : `${baseUrl}/${fileName}`;

      let pagePa11y = { errors: 0, warnings: 0 };
      let pageLighthouse = {
        performance: 0,
        accessibility: 0,
        seo: 0,
        bestPractices: 0,
      };
      let pageGreenSoftware = {
        passed: 0,
        totalChecks: 0,
        critical: 0,
        warnings: 0,
      };
      let pageLhMs = 0;
      let pagePa11yMs = 0;
      let pageGsMs = 0;

      try {
        addLog("info", `Running Pa11y accessibility scan for ${fileName}...`);
        const pa11yStart = Date.now();
        const pa11yResult = await runPa11yAudit(fileUrl, fileName);
        pagePa11yMs = Date.now() - pa11yStart;
        timingsRef.current.pa11yMs =
          (timingsRef.current.pa11yMs || 0) + pagePa11yMs;
        if (pa11yResult) {
          tempPa11yResults.push(pa11yResult);
          if (pa11yResult.pa11y?.summary) {
            pagePa11y = {
              errors: pa11yResult.pa11y.summary.errors,
              warnings: pa11yResult.pa11y.summary.warnings,
            };
          }
        }

        await sleep(1000);

        addLog("info", `Running Lighthouse audit for ${fileName}...`);
        const lhStart = Date.now();
        const lighthouseResult = await runLighthouseAudit(fileUrl, fileName);
        pageLhMs = Date.now() - lhStart;
        timingsRef.current.lighthouseMs =
          (timingsRef.current.lighthouseMs || 0) + pageLhMs;
        if (lighthouseResult) {
          tempLighthouseResults.push(lighthouseResult);
          if (lighthouseResult.lighthouse?.summaryScores) {
            const s = lighthouseResult.lighthouse.summaryScores;
            pageLighthouse = {
              performance: s.performance,
              accessibility: s.accessibility,
              seo: s.seo,
              bestPractices: s.bestPractices,
            };
          }
        }

        await sleep(1500);

        if (lighthouseResult?.lighthouse?.raw) {
          addLog("info", `Analyzing Green Software metrics for ${fileName}...`);
          const gsStart = Date.now();
          const greenSoftwareResult = await runGreenSoftwareAnalysis(
            lighthouseResult.lighthouse.raw,
            fileName,
          );
          if (greenSoftwareResult) {
            tempGreenSoftwareResults.push(greenSoftwareResult);
            pageGsMs = Date.now() - gsStart;
            timingsRef.current.greenSoftwareMs =
              (timingsRef.current.greenSoftwareMs || 0) + pageGsMs;
            if (greenSoftwareResult.metrics?.summary) {
              const gs = greenSoftwareResult.metrics.summary;
              pageGreenSoftware = {
                passed: gs.passed,
                totalChecks: gs.totalChecks,
                critical: gs.critical,
                warnings: gs.warnings,
              };
            }
          }
        }
      } catch (error) {
        addLog("error", `Audit failed for ${fileName}: ${error}`);
      }

      pageAuditSummaries.push({
        pageName: fileName,
        pa11y: pagePa11y,
        lighthouse: pageLighthouse,
        greenSoftware: pageGreenSoftware,
      });

      const pageHeuristicMs =
        heuristicPageTimingsRef.current.get(fileName) || 0;

      timingsRef.current.perPageTimings.push({
        pageName: fileName,
        heuristicMs: pageHeuristicMs,
        lighthouseMs: pageLhMs,
        pa11yMs: pagePa11yMs,
        greenSoftwareMs: pageGsMs,
        totalMs: pageHeuristicMs + pageLhMs + pagePa11yMs + pageGsMs,
      });
    }

    localStorage.setItem(
      "pageAuditSummaries",
      JSON.stringify(pageAuditSummaries),
    );

    addLog("success", "All audits completed!");
    setAllAuditsFinished(true);

    timingsRef.current.heuristicMs = timingsRef.current.perPageTimings.reduce(
      (sum, p) => sum + (p.heuristicMs || 0),
      0,
    );

    timingsRef.current.assessmentTotalMs =
      (timingsRef.current.heuristicMs || 0) +
      (timingsRef.current.lighthouseMs || 0) +
      (timingsRef.current.pa11yMs || 0) +
      (timingsRef.current.greenSoftwareMs || 0);
    timingsRef.current.pageCount = htmlFiles.length;

    addLog("info", "Running Quality Gate evaluation...");
    timingsRef.current.qualityGateStart = Date.now();
    await runQualityGate(
      allHeuristicIssues,
      tempPa11yResults,
      tempLighthouseResults,
      tempGreenSoftwareResults,
      baseUrl,
    );
  };

  const runLighthouseAudit = async (
    url: string,
    fileName: string,
  ): Promise<LighthouseResponse | null> => {
    const auditUrl = url.replace(/\.html$/, "");
    const response = await fetch("/api/lighthouse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: auditUrl, full: true }),
    });

    const data: LighthouseResponse = await response.json();

    if (data.error) {
      addLog("error", `Lighthouse scan failed for ${fileName}: ${data.error}`);
      return null;
    }

    if (data.lighthouse) {
      const { summaryScores } = data.lighthouse;
      addLog("success", `Lighthouse Results - ${fileName} (${auditUrl}):`);
      addLog("info", `  Performance: ${summaryScores.performance}/100`);
      addLog("info", `  Accessibility: ${summaryScores.accessibility}/100`);
      addLog("info", `  SEO: ${summaryScores.seo}/100`);
      addLog("info", `  Best Practices: ${summaryScores.bestPractices}/100`);
    }

    return data;
  };

  const runPa11yAudit = async (
    url: string,
    fileName: string,
  ): Promise<Pa11yResponse | null> => {
    const auditUrl = url.replace(/\.html$/, "");
    const response = await fetch("/api/pally", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: auditUrl,
        includeWarnings: true,
        standard: "WCAG2AA",
        timeoutMs: 60000,
        waitMs: 2000,
      }),
    });

    const data: Pa11yResponse = await response.json();

    if (data.error) {
      addLog("error", `Pa11y scan failed for ${fileName}: ${data.error}`);
      return null;
    }

    if (data.pa11y) {
      const { summary, errorIssues } = data.pa11y;
      if (summary.errors === 0 && summary.warnings === 0) {
        addLog(
          "success",
          `Pa11y Results - ${fileName} (${url}): No accessibility issues found!`,
        );
      } else {
        addLog("warning", `⚠ Pa11y Results - ${fileName} (${url}):`);
        addLog(
          "warning",
          `  Errors: ${summary.errors}, Warnings: ${summary.warnings}`,
        );

        if (errorIssues && errorIssues.length > 0) {
          errorIssues.slice(0, 3).forEach((err) => {
            addLog("error", `  - ${err.message}`);
          });
        }
      }
    }

    return data;
  };

  const runGreenSoftwareAnalysis = async (
    lighthouseResult: unknown,
    fileName: string,
  ): Promise<GreenSoftwareResponse | null> => {
    const response = await fetch("/api/greensoftware", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lighthouseResult }),
    });

    const data: GreenSoftwareResponse = await response.json();

    if (data.error) {
      addLog("error", `Green Software analysis failed: ${data.error}`);
      return null;
    }

    if (data.metrics) {
      const { summary } = data.metrics;
      addLog(
        "success",
        `Green Software - ${fileName}: ${summary.passed}/13 checks passed`,
      );

      if (summary.critical > 0) {
        addLog("error", `  - ${summary.critical} critical issues`);
      }
      if (summary.warnings > 0) {
        addLog("warning", `  - ${summary.warnings} warnings`);
      }

      if (data.metrics.issues && data.metrics.issues.length > 0) {
        data.metrics.issues.slice(0, 5).forEach((issue) => {
          const type =
            (issue as { severity?: string }).severity === "critical"
              ? "error"
              : "warn";
          addLog(type, `  - ${issue.title}: ${issue.recommendation}`);
        });
      }
    }

    return data;
  };

  const runQualityGate = async (
    heuristicIssues: unknown[],
    pa11yResults: Pa11yResponse[],
    lighthouseResults: LighthouseResponse[],
    greenSoftwareResults: GreenSoftwareResponse[],
    deployUrl: string,
  ) => {
    try {

      const combinedPa11y = {
        summary: {
          errors: pa11yResults.reduce(
            (sum, r) => sum + (r.pa11y?.summary.errors || 0),
            0,
          ),
          warnings: pa11yResults.reduce(
            (sum, r) => sum + (r.pa11y?.summary.warnings || 0),
            0,
          ),
          totalIssues: 0,
        },
        pageInfo: {
          url: pa11yResults[0]?.pa11y?.pageInfo.url || "",
          scannedAt: new Date().toISOString(),
        },
        errorIssues: pa11yResults.flatMap((r) => {
          const url = r.pa11y?.pageInfo.url || "";
          const pageName =
            url
              .split("/")
              .pop()
              ?.replace(/\.html$/i, "") || "index";
          const label = pageName === "" ? "index.html" : `${pageName}.html`;
          return (r.pa11y?.errorIssues || []).map((issue) => ({
            ...issue,
            fileName: label,
          }));
        }),
        warningIssues: pa11yResults.flatMap((r) => {
          const url = r.pa11y?.pageInfo.url || "";
          const pageName =
            url
              .split("/")
              .pop()
              ?.replace(/\.html$/i, "") || "index";
          const label = pageName === "" ? "index.html" : `${pageName}.html`;
          return (r.pa11y?.warningIssues || []).map((issue) => ({
            ...issue,
            fileName: label,
          }));
        }),
      };
      combinedPa11y.summary.totalIssues =
        combinedPa11y.summary.errors + combinedPa11y.summary.warnings;

      const allPageScores = lighthouseResults.map((r) => ({
        performance: r.lighthouse?.summaryScores.performance || 0,
        accessibility: r.lighthouse?.summaryScores.accessibility || 0,
        seo: r.lighthouse?.summaryScores.seo || 0,
        bestPractices: r.lighthouse?.summaryScores.bestPractices || 0,
      }));

      const combinedLighthouse = {
        allPageScores,
        pageInfo: {
          url: lighthouseResults[0]?.lighthouse?.pageInfo.url || "",
          scannedAt: new Date().toISOString(),
        },
        failedAudits: lighthouseResults.flatMap(
          (r) => r.lighthouse?.failedAudits || [],
        ),
      };

      const allGreenSoftwareIssues = greenSoftwareResults.flatMap(
        (r) => r.metrics?.issues || [],
      );
      const calculateMetricIssues = allGreenSoftwareIssues.filter(
        (i) => i.category === "Calculate Metric",
      );

      const combinedGreenSoftware = {
        summary: {
          totalIssues: calculateMetricIssues.length,
          critical: calculateMetricIssues.filter(
            (i) => i.severity === "critical",
          ).length,
          warnings: calculateMetricIssues.filter(
            (i) => i.severity === "warning",
          ).length,
          info: allGreenSoftwareIssues.filter(
            (i) => i.category === "Direct Audit",
          ).length,
          passed: greenSoftwareResults.reduce(
            (sum, r) => sum + (r.metrics?.summary.passed || 0),
            0,
          ),
          totalChecks: greenSoftwareResults.reduce(
            (sum, r) => sum + (r.metrics?.summary.totalChecks || 0),
            0,
          ),
        },
        issues: allGreenSoftwareIssues,
      };

      const response = await fetch("/api/qualitygate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heuristic: heuristicIssues,
          pa11y: combinedPa11y,
          lighthouse: combinedLighthouse,
          greenSoftware: {
            summary: combinedGreenSoftware.summary,
            issues: combinedGreenSoftware.issues,
          },
        }),
      });

      const qualityGateResult = await response.json();

      if (qualityGateResult.error) {
        addLog("error", `Quality Gate failed: ${qualityGateResult.error}`);
        return;
      }

      const status = qualityGateResult.overallStatus;
      const statusColor =
        status === "fail" ? "error" : status === "warning" ? "warn" : "success";

      addLog(statusColor, `Quality Gate: ${status.toUpperCase()}`);

      if (qualityGateResult.details.heuristic) {
        const h = qualityGateResult.details.heuristic;
        addLog(
          h.status === "fail"
            ? "error"
            : h.status === "warning"
              ? "warn"
              : "success",
          `  Heuristic: ${h.status.toUpperCase()} (Essential:${h.essential} Pragmatic:${h.pragmatic} Hedonic:${h.hedonic})`,
        );
      }

      if (qualityGateResult.details.pa11y) {
        const p = qualityGateResult.details.pa11y;
        addLog(
          p.status === "fail"
            ? "error"
            : p.status === "warning"
              ? "warn"
              : "success",
          `  Pa11y: ${p.status.toUpperCase()} (Errors:${p.errors} Warnings:${p.warnings})`,
        );
      }

      if (qualityGateResult.details.lighthouse) {
        const l = qualityGateResult.details.lighthouse;
        addLog("info", "  Lighthouse:");
        addLog(
          l.performance.status === "fail"
            ? "error"
            : l.performance.status === "warning"
              ? "warn"
              : "success",
          `    Performance: ${l.performance.status.toUpperCase()} (avg:${l.performance.avgScore} min:${l.performance.minScore})`,
        );
        addLog(
          l.accessibility.status === "fail"
            ? "error"
            : l.accessibility.status === "warning"
              ? "warn"
              : "success",
          `    Accessibility: ${l.accessibility.status.toUpperCase()} (avg:${l.accessibility.avgScore} min:${l.accessibility.minScore})`,
        );
        addLog(
          l.seo.status === "fail"
            ? "error"
            : l.seo.status === "warning"
              ? "warn"
              : "success",
          `    SEO: ${l.seo.status.toUpperCase()} (avg:${l.seo.avgScore} min:${l.seo.minScore})`,
        );
        addLog(
          l.bestPractices.status === "fail"
            ? "error"
            : l.bestPractices.status === "warning"
              ? "warn"
              : "success",
          `    Best Practices: ${l.bestPractices.status.toUpperCase()} (avg:${l.bestPractices.avgScore} min:${l.bestPractices.minScore})`,
        );
      }

      if (qualityGateResult.details.greenSoftware) {
        const g = qualityGateResult.details.greenSoftware;
        addLog(
          g.status === "fail"
            ? "error"
            : g.status === "warning"
              ? "warn"
              : "success",
          `  Green Software: ${g.status.toUpperCase()}`,
        );
      }

      addLog("info", "Issues by status:");
      addLog(
        "error",
        `  Fail: ${qualityGateResult.issuesByStatus.fail.length} issues`,
      );
      addLog(
        "warn",
        `  Warning: ${qualityGateResult.issuesByStatus.warning.length} issues`,
      );
      addLog(
        "success",
        `  Pass: ${qualityGateResult.issuesByStatus.pass.length} issues`,
      );

      localStorage.setItem(
        "qualityGateResult",
        JSON.stringify(qualityGateResult),
      );

      if (iteration === 1 || !localStorage.getItem("benchmarkInitialResult")) {
        localStorage.setItem(
          "benchmarkInitialResult",
          JSON.stringify(qualityGateResult),
        );
      }
      localStorage.setItem("previewUrl", deployUrl);

      localStorage.setItem("userPrompt", userPrompt);

      localStorage.setItem("generatedCode", JSON.stringify(generatedFiles));
      if (codegenMutation.data?.context) {
        localStorage.setItem(
          "codegenContext",
          JSON.stringify(codegenMutation.data.context),
        );
      }
      localStorage.setItem("currentIteration", String(iteration));
      localStorage.setItem("webName", webName);

      timingsRef.current.qualityGateMs =
        Date.now() - (timingsRef.current.qualityGateStart || Date.now());
      localStorage.setItem(
        "pipelineTimings",
        JSON.stringify(timingsRef.current),
      );

      router.push("/user-review");
    } catch (error) {
      addLog("error", `Quality Gate evaluation failed: ${error}`);
    }
  };

  const getStepStatus = (step: number): "active" | "done" | "pending" => {
    if (step === 1) {
      if (codeGenerationFinished) return "done";
      if (codegenMutation.isPending) return "active";
      return "pending";
    }
    if (step === 2) {
      if (deployMutation.isSuccess) return "done";
      if (deployMutation.isPending) return "active";
      if (codegenMutation.isSuccess || codeGenerationFinished) return "pending";
      return "pending";
    }
    if (step === 3) {
      if (allAuditsFinished) return "done";
      if (deployMutation.isSuccess && totalAudits > 0) return "active";
      return "pending";
    }
    return "pending";
  };

  useEffect(() => {
    const prompt = localStorage.getItem("userPrompt");
    if (prompt && !hasStartedRef.current) {
      hasStartedRef.current = true;
      setUserPrompt(prompt);

      const storedWebName = localStorage.getItem("webName");
      if (storedWebName) {
        setWebName(storedWebName);
      }

      const storedIteration = localStorage.getItem("iteration");
      const currentIteration = storedIteration
        ? parseInt(storedIteration, 10)
        : 1;
      setIteration(currentIteration);
      (async () => {
        const uploadedLogoWebp = localStorage.getItem("uploadedLogoWebp") || "";
        const customAssets =
          (await idbGet<Record<string, string>>("customAssets")) || {};

        let parsedCurrentCode: { context?: unknown; files?: unknown[] } | null =
          null;
        try {
          const idbData = await idbGet<{
            context?: unknown;
            files?: unknown[];
          }>("currentCode");
          if (idbData) {
            parsedCurrentCode = idbData;
            addLog("info", "Loaded previous code for refinement...");
          }
        } catch (error) {
          console.error("Failed to load currentCode from IndexedDB:", error);
        }

        const skipCodegen = localStorage.getItem("skipCodegen") === "1";
        const savedDeployUrl = skipCodegen
          ? localStorage.getItem("deployProductionUrl")
          : null;
        const savedDeployProject = skipCodegen
          ? localStorage.getItem("deployProject")
          : null;

        setStartTime(Date.now());
        localStorage.removeItem("userPrompt");
        localStorage.removeItem("iteration");
        if (currentIteration === 1) {
          localStorage.removeItem("deployProductionUrl");
          localStorage.removeItem("deployProject");
        }
        idbRemove("currentCode").catch(() => {});

        if (skipCodegen) {
          localStorage.removeItem("skipCodegen");
          if (savedDeployUrl)
            localStorage.setItem("deployProductionUrl", savedDeployUrl);
          if (savedDeployProject)
            localStorage.setItem("deployProject", savedDeployProject);
        }

        if (skipCodegen && parsedCurrentCode?.files?.length) {
          const files = parsedCurrentCode.files as Array<{
            path: string;
            content: string;
          }>;
          setGeneratedFiles(files);
          setCodeGenerationFinished(true);
          addLog(
            "info",
            `Re-assess mode (Iteration ${currentIteration}): using iter-1 stored files, skipping generation.`,
          );
          addLog("info", "Running heuristic evaluation on stored code...");
          heuristicMutation.mutate(files);
          addLog("info", "Deploying stored files to existing project...");
          deployMutation.mutate(files);
          return;
        }

        addLog("info", `Experiment started (Iteration ${currentIteration})...`);
        codegenMutation.mutate({
          prompt,
          currentCode: parsedCurrentCode,
          uploadedLogoWebp: uploadedLogoWebp || undefined,
          customAssets:
            Object.keys(customAssets).length > 0 ? customAssets : undefined,
        });
      })();
    }
  }, [codegenMutation, heuristicMutation, deployMutation, addLog]);

  useEffect(() => {
    if (startTime === 0) return;

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (logs.length >= 0) {
      logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  return (
    <main className="bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-900  h-[calc(100vh-72px)] flex flex-col font-sans text-slate-800">
      <section className="text-white px-6 py-4 shrink-0 flex items-center justify-between ">
        <div className="flex flex-col justify-center gap-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-white/95">
              Process Monitor
            </h1>
          </div>
          <p className="text-xs text-indigo-200/80 font-light">
            Track the real-time progress of your experiment, from code
            generation to deployment and quality assessment. Watch logs,
            metrics, and insights unfold as Gemini 3.0 Flash works its magic!
          </p>
        </div>
      </section>
      <section className="flex-1 px-4 pb-4 min-h-0 w-2/3 mx-auto">
        <div className="flex flex-col gap-4 h-full">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Generation & Assessment Pipeline{" "}
                {webName && (
                  <span className="text-indigo-600">— {webName}</span>
                )}
              </h3>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-xs">
                  Elapsed:{" "}
                  <span className="font-mono font-bold text-slate-800">
                    {formatTime(elapsedTime)}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-0"></div>

              <StepCard
                icon={Code}
                label="Code Gen"
                status={getStepStatus(1)}
                sub="Draft v1"
              />

              <StepCard
                icon={Search}
                label="Deploy"
                status={getStepStatus(2)}
                sub="Deploying"
              />

              <StepCard
                icon={Search}
                label="Assessment"
                status={getStepStatus(3)}
                sub="Auditing"
              />
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-inner flex flex-col flex-1 min-h-0">
            <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between shrink-0">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <Terminal className="w-3 h-3" /> System Logs
              </span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
              </div>
            </div>

            <div className="p-4 font-mono text-[13px] leading-relaxed space-y-2 overflow-y-auto flex-1 custom-scrollbar">
              {logs.map((log) => {
                const isError = log.type === "error";
                const isWarn = log.type === "warn" || log.type === "warning";
                const isSuccess = log.type === "success";
                const isInfo = log.type === "info";

                return (
                  <div key={log.id} className="flex gap-3 animate-fadeIn">
                    <span className="text-slate-500 shrink-0 select-none">
                      [{log.time}]
                    </span>
                    <div className="flex gap-2">
                      <span
                        className={`shrink-0 select-none font-bold ${
                          isError
                            ? "text-rose-500"
                            : isWarn
                              ? "text-amber-500"
                              : isSuccess
                                ? "text-emerald-500"
                                : "text-blue-400"
                        }`}
                      >
                        {isInfo && "ℹ"}
                        {isWarn && "⚠"}
                        {isSuccess && "✓"}
                        {isError && "✖"}
                      </span>
                      <span
                        className={`${
                          isError
                            ? "text-rose-200"
                            : isWarn
                              ? "text-amber-200"
                              : isSuccess
                                ? "text-emerald-200"
                                : "text-blue-100"
                        }`}
                      >
                        {log.msg}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div className="flex gap-3 mt-2">
                <span className="text-slate-500 shrink-0 opacity-0 select-none">
                  [00:00]
                </span>
                <span className="text-slate-400 animate-pulse font-bold">
                  _
                </span>
              </div>
              <div ref={logsEndRef} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

type StepCardProps = {
  icon: React.ElementType;
  label: string;
  status: "active" | "done" | "pending" | string;
  sub?: string;
};

function StepCard({ icon: Icon, label, status, sub }: StepCardProps) {
  const isActive = status === "active";
  const isDone = status === "done";

  return (
    <div
      className={`relative z-10 flex flex-col items-center gap-2 px-6 py-3 rounded-lg border transition-all duration-500 ${
        isActive
          ? "bg-indigo-50 border-indigo-200 shadow-md scale-105"
          : isDone
            ? "bg-white border-green-200 opacity-80"
            : "bg-white border-slate-100 opacity-50"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
          isActive
            ? "bg-indigo-600 text-white"
            : isDone
              ? "bg-green-100 text-green-600"
              : "bg-slate-100 text-slate-400"
        }`}
      >
        {isDone ? (
          <CheckCircle2 size={20} />
        ) : (
          <Icon size={20} className={isActive ? "animate-pulse" : ""} />
        )}
      </div>
      <div className="text-center">
        <div
          className={`text-xs font-bold ${isActive ? "text-indigo-700" : "text-slate-600"}`}
        >
          {label}
        </div>
        <div className="text-[10px] text-slate-400">{sub}</div>
      </div>
    </div>
  );
}
