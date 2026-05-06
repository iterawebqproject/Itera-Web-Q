import { type NextRequest, NextResponse } from "next/server";
import type { GreenSoftwareMetrics } from "@/lib/models/greensoftware-parser";
import type { HeuristicIssue } from "@/lib/models/heuristic-parser";
import type { LighthouseMetrics } from "@/lib/models/lighthouse-parser";
import type { Pa11yIssue, Pa11yMetrics } from "@/lib/models/pa11y-parser";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type QualityStatus = "fail" | "warning" | "pass";

interface AssessmentInput {
  heuristic?: HeuristicIssue[];
  pa11y?: Pa11yMetrics;
  lighthouse?: LighthouseMetrics;
  greenSoftware?: GreenSoftwareMetrics;
}

interface QualityGateIssue {
  source: "heuristic" | "pa11y" | "lighthouse" | "greenSoftware";
  category?: string;
  severity: string;
  id: string;
  title: string;
  description: string;
  recommendation?: string;
  affectedElements?: string[];
  score?: number | null;
  displayValue?: string;
  fileName?: string;
  infoOnly?: boolean;
}

interface QualityGateResult {
  overallStatus: QualityStatus;
  details: {
    heuristic?: {
      status: QualityStatus;
      essential: number;
      pragmatic: number;
      hedonic: number;
      total: number;
    };
    pa11y?: {
      status: QualityStatus;
      errors: number;
      warnings: number;
    };
    lighthouse?: {
      performance: {
        status: QualityStatus;
        avgScore: number;
        minScore: number;
      };
      accessibility: {
        status: QualityStatus;
        avgScore: number;
        minScore: number;
      };
      seo: { status: QualityStatus; avgScore: number; minScore: number };
      bestPractices: {
        status: QualityStatus;
        avgScore: number;
        minScore: number;
      };
    };
    greenSoftware?: {
      status: QualityStatus;
      failed: number;
      warnings: number;
      passed: number;
    };
  };
  issuesByStatus: {
    fail: QualityGateIssue[];
    warning: QualityGateIssue[];
    pass: QualityGateIssue[];
  };
}

function evaluateHeuristic(issues: HeuristicIssue[]): {
  status: QualityStatus;
  essential: number;
  pragmatic: number;
  hedonic: number;
} {
  const essential = issues.filter((i) => i.severity === "essential").length;
  const pragmatic = issues.filter((i) => i.severity === "pragmatic").length;
  const hedonic = issues.filter((i) => i.severity === "hedonic").length;

  if (essential >= 3) {
    return { status: "fail", essential, pragmatic, hedonic };
  }
  if (pragmatic >= 10) {
    return { status: "fail", essential, pragmatic, hedonic };
  }
  if (pragmatic >= 7 && hedonic >= 5) {
    return { status: "fail", essential, pragmatic, hedonic };
  }

  if (essential >= 1 && essential <= 2) {
    return { status: "warning", essential, pragmatic, hedonic };
  }
  if (pragmatic >= 4 && pragmatic <= 9) {
    return { status: "warning", essential, pragmatic, hedonic };
  }
  if (pragmatic >= 4 && pragmatic <= 6 && hedonic >= 4) {
    return { status: "warning", essential, pragmatic, hedonic };
  }

  if (hedonic >= 5) {
    return { status: "warning", essential, pragmatic, hedonic };
  }

  return { status: "pass", essential, pragmatic, hedonic };
}

function evaluatePa11y(metrics: Pa11yMetrics): {
  status: QualityStatus;
  errors: number;
  warnings: number;
} {
  const { errors, warnings } = metrics.summary;

  if (errors > 0) {
    return { status: "fail", errors, warnings };
  }

  if (warnings > 0) {
    return { status: "warning", errors, warnings };
  }

  return { status: "pass", errors, warnings };
}

function evaluateLighthouseCategoryMultiPage(scores: number[]): {
  status: QualityStatus;
  avgScore: number;
  minScore: number;
} {
  if (scores.length === 0) {
    return { status: "pass", avgScore: 0, minScore: 0 };
  }

  const min = Math.min(...scores);
  const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length;

  let status: QualityStatus;
  if (min < 50) {
    status = "fail";
  } else if (avg < 90) {
    status = "warning";
  } else {
    status = "pass";
  }

  return {
    status,
    avgScore: Math.round(avg),
    minScore: min,
  };
}

function evaluateGreenSoftware(metrics: GreenSoftwareMetrics): {
  status: QualityStatus;
  failed: number;
  warnings: number;
  passed: number;
} {
  const calculateMetricIssues = metrics.issues.filter(
    (i) => i.category === "Calculate Metric",
  );

  const failed = calculateMetricIssues.filter(
    (i) => i.status === "Failed",
  ).length;
  const warnings = calculateMetricIssues.filter(
    (i) => i.status === "Warning",
  ).length;
  const passed = calculateMetricIssues.filter(
    (i) => i.status === "Passed",
  ).length;

  if (failed >= 3) {
    return { status: "fail", failed, warnings, passed };
  }

  if (failed >= 1 || warnings >= 3) {
    return { status: "warning", failed, warnings, passed };
  }

  return { status: "pass", failed, warnings, passed };
}

function mapHeuristicIssues(issues: HeuristicIssue[]): QualityGateIssue[] {
  const severityOrder = { essential: 0, pragmatic: 1, hedonic: 2 };

  return issues
    .map((issue) => ({
      source: "heuristic" as const,
      category: issue.heuristic,
      severity: issue.severity,
      id: issue.checklistId,
      title: issue.checklistItem,
      description: issue.checklistItem,
      recommendation: issue.recommendation,
      affectedElements: Array.isArray(issue.affectedSelectors)
        ? issue.affectedSelectors
        : issue.affectedSelectors
          ? [issue.affectedSelectors]
          : [],
      fileName: issue.fileName,
    }))
    .sort((a, b) => {
      const orderA =
        severityOrder[a.severity as keyof typeof severityOrder] ?? 999;
      const orderB =
        severityOrder[b.severity as keyof typeof severityOrder] ?? 999;
      return orderA - orderB;
    });
}

function buildPa11yRecommendation(issue: Pa11yIssue): string {
  const code = issue.code || "";
  const message = issue.message || "";
  const selector = issue.selector || "";
  const context = issue.context || "";

  const targetHint = [selector, context].filter(Boolean).join(" | ");

  if (code.includes("1_4_3") || /contrast/i.test(message)) {
    const isLargeText = code.includes("G145") || /3:1/.test(message);
    const contrastTarget = isLargeText ? "3:1" : "4.5:1";
    return `Increase text/background contrast to at least ${contrastTarget}. Prefer solid or less-transparent backgrounds and darker text color. Validate the final pair using the reported target element(s): ${targetHint || "affected selector/context"}.`;
  }

  if (code.includes("Alpha") || /transparent|translucent/i.test(message)) {
    return `Avoid transparency on text or on its background container for this element. Use an opaque (or more solid) background layer and adjust foreground color to preserve readable contrast. Target: ${targetHint || "affected selector/context"}.`;
  }

  if (code.includes("F24") || /foreground|background/i.test(message)) {
    return `Ensure foreground color is explicitly paired with a readable background color (avoid relying on inheritance when contrast may vary). Apply a deterministic text/background pair on ${targetHint || "the affected element"}.`;
  }
  return message;
}

function mapPa11yIssues(metrics: Pa11yMetrics): QualityGateIssue[] {
  const errors = metrics.errorIssues.map((issue) => ({
    source: "pa11y" as const,
    category: "Accessibility",
    severity: "error",
    id: issue.code,
    title: issue.code,
    description: issue.message,
    recommendation: issue.message,
    affectedElements: [issue.context, issue.selector].filter(Boolean),
    fileName: (issue as Pa11yIssue & { fileName?: string }).fileName,
  }));

  const warnings = metrics.warningIssues.map((issue) => ({
    source: "pa11y" as const,
    category: "Accessibility",
    severity: "warning",
    id: issue.code,
    title: issue.code,
    description: issue.message,
    recommendation: buildPa11yRecommendation(issue),
    affectedElements: [issue.context, issue.selector].filter(Boolean),
    fileName: (issue as Pa11yIssue & { fileName?: string }).fileName,
  }));

  return [...errors, ...warnings];
}

function deriveFileNameFromUrl(url?: string): string | undefined {
  if (!url) return undefined;

  try {
    const pathname = new URL(url).pathname;
    const fileName = pathname.split("/").pop() || "";
    return fileName || undefined;
  } catch {
    const fallback = url.split("?")[0].split("#")[0];
    const fileName = fallback.split("/").pop() || "";
    return fileName || undefined;
  }
}

function mapLighthouseIssues(metrics: LighthouseMetrics): QualityGateIssue[] {
  const fileName = deriveFileNameFromUrl(
    metrics.pageInfo.finalUrl || metrics.pageInfo.url,
  );

  return metrics.failedAudits
    .map((audit) => ({
      source: "lighthouse" as const,
      category: audit.categoryType,
      severity: audit.score !== null && audit.score < 0.5 ? "error" : "warning",
      id: audit.id,
      title: audit.title,
      description: audit.description,
      recommendation: audit.description,
      affectedElements: audit.affectedElements,
      score: audit.score,
      displayValue: audit.displayValue,
      fileName,
    }))
    .sort((a, b) => {
      if (a.severity !== b.severity) {
        return a.severity === "error" ? -1 : 1;
      }
      return (a.score ?? 0) - (b.score ?? 0);
    });
}

function mapGreenSoftwareIssues(
  metrics: GreenSoftwareMetrics,
): QualityGateIssue[] {
  const calculateMetricIssues = metrics.issues.filter(
    (i) => i.category === "Calculate Metric",
  );

  return calculateMetricIssues
    .map((issue) => ({
      source: "greenSoftware" as const,
      category: "Green Software",
      severity: issue.status === "Failed" ? "error" : "warning",
      id: issue.metricId,
      title: issue.title,
      description: issue.description,
      recommendation: issue.recommendation,
    }))
    .sort((a, _) => {
      return a.severity === "error" ? -1 : 1;
    });
}

function mapGreenSoftwareDirectAuditIssues(
  metrics: GreenSoftwareMetrics,
): QualityGateIssue[] {
  const directAuditIssues = metrics.issues.filter(
    (i) => i.category === "Direct Audit",
  );

  return directAuditIssues.map((issue) => ({
    source: "greenSoftware" as const,
    category: "Direct Audit",
    severity: "info",
    id: `da-${issue.metricId}`,
    title: issue.title,
    description: issue.description,
    recommendation:
      "This issue is derived from Lighthouse audit data. Fixing the corresponding Lighthouse issue will resolve this automatically.",
    infoOnly: true,
  }));
}


function calculateOverallStatus(
  heuristicStatus?: QualityStatus,
  pa11yStatus?: QualityStatus,
  lighthouseStatuses?: Record<string, QualityStatus>,
  greenSoftwareStatus?: QualityStatus,
): QualityStatus {
  const statuses: QualityStatus[] = [];

  if (heuristicStatus) statuses.push(heuristicStatus);
  if (pa11yStatus) statuses.push(pa11yStatus);
  if (lighthouseStatuses) {
    statuses.push(...Object.values(lighthouseStatuses));
  }
  if (greenSoftwareStatus) statuses.push(greenSoftwareStatus);

  if (statuses.includes("fail")) return "fail";
  if (statuses.includes("warning")) return "warning";
  return "pass";
}

export async function POST(req: NextRequest) {
  try {
    const input: AssessmentInput = await req.json();

    const result: QualityGateResult = {
      overallStatus: "pass",
      details: {},
      issuesByStatus: {
        fail: [],
        warning: [],
        pass: [],
      },
    };

    if (input.heuristic && input.heuristic.length > 0) {
      const heuristicEval = evaluateHeuristic(input.heuristic);
      result.details.heuristic = {
        status: heuristicEval.status,
        essential: heuristicEval.essential,
        pragmatic: heuristicEval.pragmatic,
        hedonic: heuristicEval.hedonic,
        total: input.heuristic.length,
      };
    }

    if (input.pa11y) {
      const pa11yEval = evaluatePa11y(input.pa11y);
      result.details.pa11y = {
        status: pa11yEval.status,
        errors: pa11yEval.errors,
        warnings: pa11yEval.warnings,
      };
    }

    if (
      input.lighthouse?.allPageScores &&
      input.lighthouse.allPageScores.length > 0
    ) {
      const categories = [
        "performance",
        "accessibility",
        "seo",
        "bestPractices",
      ] as const;
      const lighthouseDetails = {} as NonNullable<
        typeof result.details.lighthouse
      >;

      for (const cat of categories) {
        const scores = input.lighthouse.allPageScores.map((p) => p[cat]);
        lighthouseDetails[cat] = evaluateLighthouseCategoryMultiPage(scores);
      }

      result.details.lighthouse = lighthouseDetails;
    }

    if (input.greenSoftware) {
      const greenSoftwareEval = evaluateGreenSoftware(input.greenSoftware);
      result.details.greenSoftware = {
        status: greenSoftwareEval.status,
        failed: greenSoftwareEval.failed,
        warnings: greenSoftwareEval.warnings,
        passed: greenSoftwareEval.passed,
      };
    }

    const lighthouseStatuses = result.details.lighthouse
      ? {
          performance: result.details.lighthouse.performance.status,
          accessibility: result.details.lighthouse.accessibility.status,
          seo: result.details.lighthouse.seo.status,
          bestPractices: result.details.lighthouse.bestPractices.status,
        }
      : undefined;

    result.overallStatus = calculateOverallStatus(
      result.details.heuristic?.status,
      result.details.pa11y?.status,
      lighthouseStatuses,
      result.details.greenSoftware?.status,
    );

    if (input.heuristic && result.details.heuristic) {
      const heuristicIssues = mapHeuristicIssues(input.heuristic);
      result.issuesByStatus[result.details.heuristic.status].push(
        ...heuristicIssues,
      );
    }

    if (input.pa11y && result.details.pa11y) {
      const pa11yIssues = mapPa11yIssues(input.pa11y);
      result.issuesByStatus[result.details.pa11y.status].push(...pa11yIssues);
    }

    if (input.lighthouse && result.details.lighthouse) {
      const lighthouseIssues = mapLighthouseIssues(input.lighthouse);

      for (const issue of lighthouseIssues) {
        let categoryStatus: QualityStatus = "pass";

        if (issue.category === "performance") {
          categoryStatus = result.details.lighthouse.performance.status;
        } else if (issue.category === "accessibility") {
          categoryStatus = result.details.lighthouse.accessibility.status;
        } else if (issue.category === "seo") {
          categoryStatus = result.details.lighthouse.seo.status;
        } else if (issue.category === "bestPractices") {
          categoryStatus = result.details.lighthouse.bestPractices.status;
        }

        result.issuesByStatus[categoryStatus].push(issue);
      }
    }

    if (input.greenSoftware && result.details.greenSoftware) {
      const greenSoftwareIssues = mapGreenSoftwareIssues(input.greenSoftware);
      result.issuesByStatus[result.details.greenSoftware.status].push(
        ...greenSoftwareIssues,
      );

      const directAuditIssues = mapGreenSoftwareDirectAuditIssues(
        input.greenSoftware,
      );
      if (directAuditIssues.length > 0) {
        result.issuesByStatus[result.details.greenSoftware.status].push(
          ...directAuditIssues,
        );
      }
    }

    return NextResponse.json(result, { status: 200 });
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
