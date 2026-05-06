"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { idbSet } from "@/lib/idb-storage";

const statusConfig = {
  fail: {
    label: "Fail",
    color: "#ef4444",
    bg: "#fef2f2",
    border: "#fecaca",
    accent: "#dc2626",
    dot: "#ef4444",
  },
  warning: {
    label: "Warning",
    color: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
    accent: "#d97706",
    dot: "#f59e0b",
  },
  pass: {
    label: "Pass",
    color: "#10b981",
    bg: "#f0fdf4",
    border: "#a7f3d0",
    accent: "#059669",
    dot: "#10b981",
  },
} as const;

const sourceLabel = {
  heuristic: "Heuristic",
  pa11y: "Pa11y",
  lighthouse: "Lighthouse",
  greenSoftware: "Green Software",
} as const;

const severityConfig = {
  error: { label: "Error", bg: "#fee2e2", color: "#dc2626" },
  essential: { label: "Essential", bg: "#fee2e2", color: "#dc2626" },
  warning: { label: "Warning", bg: "#fef3c7", color: "#d97706" },
  pragmatic: { label: "Pragmatic", bg: "#fef3c7", color: "#d97706" },
  hedonic: { label: "Hedonic", bg: "#ede9fe", color: "#7c3aed" },
  info: { label: "Info", bg: "#dbeafe", color: "#2563eb" },
} as const;


function Badge({
  label,
  bg,
  color,
}: {
  label: string;
  bg: string;
  color: string;
}) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider"
      style={{
        background: bg,
        color: color,
        fontFamily: "'DM Mono', monospace",
      }}
    >
      {label}
    </span>
  );
}

function CodeChip({ text }: { text: string }) {
  return (
    <span
      className="block px-2.5 py-1.5 bg-slate-900 text-slate-400 rounded-md text-[11.5px] break-all leading-relaxed border-l-[3px] border-slate-700"
      style={{
        fontFamily: "'DM Mono', monospace",
      }}
    >
      {text}
    </span>
  );
}

interface Issue {
  source: string;
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

interface PageTimingEntry {
  pageName: string;
  heuristicMs: number;
  lighthouseMs: number;
  pa11yMs: number;
  greenSoftwareMs: number;
  totalMs: number;
}

interface PipelineTimings {
  codeGenMs: number;
  deployMs: number;
  heuristicMs: number;
  lighthouseMs: number;
  pa11yMs: number;
  greenSoftwareMs: number;
  assessmentTotalMs: number;
  qualityGateMs: number;
  coachMs?: number;
  pageCount: number;
  perPageTimings?: PageTimingEntry[];
}

interface PageAuditSummary {
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
}

function scoreColor(score: number): string {
  if (score >= 90) return "#059669";
  if (score >= 50) return "#d97706";
  return "#dc2626";
}

function scoreBg(score: number): string {
  if (score >= 90) return "#f0fdf4";
  if (score >= 50) return "#fffbeb";
  return "#fef2f2";
}

function ScoreCell({
  label,
  value,
  unit,
}: {
  label: string;
  value: number;
  unit?: string;
}) {
  return (
    <div
      className="flex items-center justify-between px-2.5 py-1.5 rounded-md"
      style={{ background: scoreBg(value) }}
    >
      <span
        className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {label}
      </span>
      <span
        className="text-xs font-bold"
        style={{ color: scoreColor(value), fontFamily: "'DM Mono', monospace" }}
      >
        {value}
        {unit}
      </span>
    </div>
  );
}

function PageCard({
  summary,
  heuristicCounts,
}: {
  summary: PageAuditSummary;
  heuristicCounts: { essential: number; pragmatic: number; hedonic: number };
}) {
  const [open, setOpen] = useState(false);
  const displayName = /\.pages\.dev$/i.test(summary.pageName)
    ? "Home"
    : summary.pageName.replace(/\.html$/i, "").replace(/^index$/, "Home");
  const lh = summary.lighthouse;
  const pa = summary.pa11y;
  const gs = summary.greenSoftware;
  const hTotal =
    heuristicCounts.essential +
    heuristicCounts.pragmatic +
    heuristicCounts.hedonic;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 px-3.5 py-2.5 text-left hover:bg-slate-50/50 transition-colors"
      >
        <span
          className="text-xs transition-transform duration-200"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          ▸
        </span>
        <span
          className="text-sm font-bold text-slate-700 capitalize"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {displayName}
        </span>
      </button>

      {open && (
        <div className="px-3.5 pb-3.5 space-y-3">
          <div>
            <p
              className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Lighthouse
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              <ScoreCell label="Performance" value={lh.performance} />
              <ScoreCell label="Accessibility" value={lh.accessibility} />
              <ScoreCell label="SEO" value={lh.seo} />
              <ScoreCell label="Best Practices" value={lh.bestPractices} />
            </div>
          </div>

          <div>
            <p
              className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Pa11y
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              <div className="flex items-center justify-between px-2.5 py-1.5 rounded-md bg-red-50">
                <span
                  className="text-[10px] font-semibold text-slate-500 uppercase"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Errors
                </span>
                <span
                  className="text-xs font-bold text-red-600"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {pa.errors}
                </span>
              </div>
              <div className="flex items-center justify-between px-2.5 py-1.5 rounded-md bg-amber-50">
                <span
                  className="text-[10px] font-semibold text-slate-500 uppercase"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Warnings
                </span>
                <span
                  className="text-xs font-bold text-amber-600"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {pa.warnings}
                </span>
              </div>
            </div>
          </div>

          <div>
            <p
              className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Green Software
            </p>
            <div className="flex items-center justify-between px-2.5 py-1.5 rounded-md bg-emerald-50">
              <span
                className="text-[10px] font-semibold text-slate-500 uppercase"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Passed
              </span>
              <span
                className="text-xs font-bold text-emerald-600"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {gs.passed}/{gs.totalChecks}
              </span>
            </div>
            {(gs.critical > 0 || gs.warnings > 0) && (
              <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                {gs.critical > 0 && (
                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-md bg-red-50">
                    <span
                      className="text-[10px] font-semibold text-slate-500 uppercase"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      Failed
                    </span>
                    <span
                      className="text-xs font-bold text-red-600"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {gs.critical}
                    </span>
                  </div>
                )}
                {gs.warnings > 0 && (
                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-md bg-amber-50">
                    <span
                      className="text-[10px] font-semibold text-slate-500 uppercase"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      Warnings
                    </span>
                    <span
                      className="text-xs font-bold text-amber-600"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {gs.warnings}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {hTotal > 0 && (
            <div>
              <p
                className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Heuristic
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {heuristicCounts.essential > 0 && (
                  <div className="flex flex-col items-center px-2 py-1.5 rounded-md bg-red-50">
                    <span
                      className="text-xs font-bold text-red-600"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {heuristicCounts.essential}
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase">
                      Essential
                    </span>
                  </div>
                )}
                {heuristicCounts.pragmatic > 0 && (
                  <div className="flex flex-col items-center px-2 py-1.5 rounded-md bg-amber-50">
                    <span
                      className="text-xs font-bold text-amber-600"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {heuristicCounts.pragmatic}
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase">
                      Pragmatic
                    </span>
                  </div>
                )}
                {heuristicCounts.hedonic > 0 && (
                  <div className="flex flex-col items-center px-2 py-1.5 rounded-md bg-violet-50">
                    <span
                      className="text-xs font-bold text-violet-600"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {heuristicCounts.hedonic}
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase">
                      Hedonic
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PageOverviewPanel({
  summaries,
  allIssues,
}: {
  summaries: PageAuditSummary[];
  allIssues: Issue[];
}) {

  const heuristicByPage = (pageName: string) => {
    const pageIssues = allIssues.filter(
      (i) => i.source === "heuristic" && i.fileName === pageName,
    );
    return {
      essential: pageIssues.filter((i) => i.severity === "essential").length,
      pragmatic: pageIssues.filter((i) => i.severity === "pragmatic").length,
      hedonic: pageIssues.filter((i) => i.severity === "hedonic").length,
    };
  };

  const crossPageHeuristic = allIssues.filter(
    (i) =>
      i.source === "heuristic" &&
      (!i.fileName || i.fileName === "cross-page-analysis"),
  );
  const crossCounts = {
    essential: crossPageHeuristic.filter((i) => i.severity === "essential")
      .length,
    pragmatic: crossPageHeuristic.filter((i) => i.severity === "pragmatic")
      .length,
    hedonic: crossPageHeuristic.filter((i) => i.severity === "hedonic").length,
  };
  const crossTotal =
    crossCounts.essential + crossCounts.pragmatic + crossCounts.hedonic;

  if (summaries.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <svg
          className="w-4 h-4 text-white/95"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <title>Pages</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3
          className="text-xs font-bold uppercase tracking-wider text-white/95"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          Per-Page Report
        </h3>
      </div>

      {summaries.map((s) => (
        <PageCard
          key={s.pageName}
          summary={s}
          heuristicCounts={heuristicByPage(s.pageName)}
        />
      ))}

      {crossTotal > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="px-3.5 py-2.5 flex items-center gap-2">
            <span className="text-sm font-bold text-slate-700">Cross-Page</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-50 text-purple-600">
              H:{crossTotal}
            </span>
          </div>
          <div className="px-3.5 pb-3.5">
            <div className="grid grid-cols-3 gap-1.5">
              {crossCounts.essential > 0 && (
                <div className="flex flex-col items-center px-2 py-1.5 rounded-md bg-red-50">
                  <span
                    className="text-xs font-bold text-red-600"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {crossCounts.essential}
                  </span>
                  <span className="text-[9px] text-slate-400 uppercase">
                    Essen.
                  </span>
                </div>
              )}
              {crossCounts.pragmatic > 0 && (
                <div className="flex flex-col items-center px-2 py-1.5 rounded-md bg-amber-50">
                  <span
                    className="text-xs font-bold text-amber-600"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {crossCounts.pragmatic}
                  </span>
                  <span className="text-[9px] text-slate-400 uppercase">
                    Pragm.
                  </span>
                </div>
              )}
              {crossCounts.hedonic > 0 && (
                <div className="flex flex-col items-center px-2 py-1.5 rounded-md bg-violet-50">
                  <span
                    className="text-xs font-bold text-violet-600"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {crossCounts.hedonic}
                  </span>
                  <span className="text-[9px] text-slate-400 uppercase">
                    Hedon.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function fmtMs(ms: number): string {
  return `${(ms / 1000).toFixed(3)}s`;
}

function TimingRow({ label, ms }: { label: string; ms: number }) {
  if (!ms) return null;
  return (
    <div className="flex items-center justify-between py-0.5">
      <span
        className="text-[10px] text-slate-500"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {label}
      </span>
      <span
        className="text-[10px] font-semibold text-slate-700"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {fmtMs(ms)}
      </span>
    </div>
  );
}

function PerPageTimingCard({ entry }: { entry: PageTimingEntry }) {
  const displayName = /\.pages\.dev$/i.test(entry.pageName)
    ? "Home"
    : entry.pageName.replace(/\.html$/i, "").replace(/^index$/, "Home");

  return (
    <div className="bg-slate-50 border border-slate-100 rounded-lg overflow-hidden px-2.5 py-2 space-y-0.5">
      <div className="flex items-center justify-between">
        <span
          className="text-[10px] font-bold text-slate-600 capitalize"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {displayName}
        </span>
        <span
          className="text-[10px] font-bold text-slate-700"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {fmtMs(entry.totalMs)}
        </span>
      </div>
      <div className="pl-2 border-l border-slate-200 space-y-0.5">
        <TimingRow label="Heuristic" ms={entry.heuristicMs} />
        <TimingRow label="Pa11y" ms={entry.pa11yMs} />
        <TimingRow label="Lighthouse" ms={entry.lighthouseMs} />
        <TimingRow label="Green Software" ms={entry.greenSoftwareMs} />
      </div>
    </div>
  );
}

function TimingsPanel({ timings }: { timings: PipelineTimings | null }) {
  if (!timings) return null;

  const totalMs =
    (timings.codeGenMs || 0) +
    (timings.deployMs || 0) +
    (timings.assessmentTotalMs || 0) +
    (timings.qualityGateMs || 0) +
    (timings.coachMs || 0);

  const perPage = timings.perPageTimings || [];

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="px-3.5 py-2 flex items-center gap-2 border-b border-slate-100">
        <svg
          className="w-3.5 h-3.5 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <title>Timings</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span
          className="text-[10px] font-bold text-slate-500 uppercase tracking-wider"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          Pipeline Timings
        </span>
        {timings.pageCount > 0 && (
          <span
            className="ml-auto text-[9px] text-slate-400"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {timings.pageCount} page{timings.pageCount > 1 ? "s" : ""}
          </span>
        )}
      </div>
      <div className="px-3.5 py-2 space-y-0.5">
        <TimingRow label="Code Generation" ms={timings.codeGenMs} />
        <TimingRow label="Deployment" ms={timings.deployMs} />

        {timings.assessmentTotalMs > 0 && (
          <>
            <div className="flex items-center justify-between py-0.5">
              <span
                className="text-[10px] font-semibold text-slate-600"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Assessment
              </span>
              <span
                className="text-[10px] font-semibold text-slate-700"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {fmtMs(timings.assessmentTotalMs)}
              </span>
            </div>
            <div className="pl-2 border-l border-slate-100 space-y-0.5">
              {perPage.length > 0 ? (
                <>
                  <div className="pt-0.5">
                    <span
                      className="text-[9px] font-bold text-slate-400 uppercase tracking-wider"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      Per Page
                    </span>
                  </div>
                  <div className="space-y-1">
                    {perPage.map((p, i) => (
                      <PerPageTimingCard key={`${p.pageName}-${i}`} entry={p} />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <TimingRow label="Lighthouse" ms={timings.lighthouseMs} />
                  <TimingRow label="Pa11y" ms={timings.pa11yMs} />
                  <TimingRow
                    label="Green Software"
                    ms={timings.greenSoftwareMs}
                  />
                </>
              )}
            </div>
          </>
        )}

        <TimingRow label="Quality Gate" ms={timings.qualityGateMs} />

        {timings.coachMs != null && timings.coachMs > 0 && (
          <TimingRow label="Prompt Refinement" ms={timings.coachMs} />
        )}

        {totalMs > 0 && (
          <div className="border-t border-slate-100 mt-1 pt-1 flex items-center justify-between">
            <span
              className="text-[10px] font-bold text-slate-600"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Total
            </span>
            <span
              className="text-[10px] font-bold text-indigo-600"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {fmtMs(totalMs)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

type QualityStatus = "fail" | "warning" | "pass";

function SpotCard({ issue, index }: { issue: Issue; index: number }) {
  const pageLabel = issue.fileName
    ? /\.pages\.dev$/i.test(issue.fileName)
      ? "Home"
      : issue.fileName.replace(/\.html$/i, "").replace(/^index$/, "Home")
    : null;

  return (
    <div className="rounded-lg p-3 bg-slate-50 border border-slate-200">
      <div className="flex items-center gap-2 mb-1.5">
        <p
          className="text-[10px] font-bold text-slate-400 uppercase tracking-wider"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          Spot #{index + 1}
        </p>
        {pageLabel && (
          <span
            className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 uppercase tracking-wider"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {pageLabel}
          </span>
        )}
      </div>
      {issue.affectedElements && issue.affectedElements.length > 0 ? (
        <div className="flex flex-col gap-1">
          {issue.affectedElements.map((el, i) => (
            <CodeChip key={`${issue.id}-spot-${i}`} text={el} />
          ))}
        </div>
      ) : (
        <p className="text-xs text-slate-400 italic">
          No specific element context
        </p>
      )}
    </div>
  );
}

function GroupedIssueCard({
  issues,
  status,
  onToggle,
  selectedIssueIds,
}: {
  issues: Issue[];
  status: QualityStatus;
  onToggle: (issueIds: string[], checked: boolean) => void;
  selectedIssueIds: Set<string>;
}) {
  const [occOpen, setOccOpen] = useState(false);
  const cfg = statusConfig[status];
  const rep = issues[0];
  const issueIds = issues.map((i) => i.id);
  const checked = issueIds.every((id) => selectedIssueIds.has(id));
  const isInfoOnly = rep.infoOnly === true;
  const sevCfg =
    severityConfig[rep.severity as keyof typeof severityConfig] ||
    severityConfig.info;
  const hasSpotDetails = issues.some(
    (i) => (i.affectedElements && i.affectedElements.length > 0) || i.fileName,
  );
  const multipleOccurrences = issues.length > 1;
  const lighthouseScore =
    rep.source === "lighthouse" && rep.score != null
      ? Math.round(rep.score * 100)
      : null;
  const showSpots = hasSpotDetails;

  const handleCheckChange = (newChecked: boolean) => {
    onToggle(issueIds, newChecked);
  };

  return (
    <div
      className="rounded-xl p-5 flex gap-3.5 transition-all duration-200"
      style={{
        background: isInfoOnly ? "#f8fafc" : checked ? cfg.bg : "#ffffff",
        border: `1px solid ${isInfoOnly ? "#e2e8f0" : checked ? cfg.accent : "#e2e8f0"}`,
        opacity: isInfoOnly ? 0.85 : 1,
      }}
    >
      <div className="pt-0.5 pl-1 flex-shrink-0">
        {isInfoOnly ? (
          <div
            className="w-[18px] h-[18px] rounded-md flex items-center justify-center flex-shrink-0"
            style={{ background: "#dbeafe" }}
            title="Info only — derived from Lighthouse, not selectable"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#2563eb">
              <title>Info</title>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </div>
        ) : (
          <label className="cursor-pointer flex items-center">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => handleCheckChange(e.target.checked)}
              className="hidden"
            />
            <div
              className="w-[18px] h-[18px] rounded-md border-2 flex items-center justify-center transition-all duration-150 flex-shrink-0"
              style={{
                borderColor: checked ? cfg.color : "#cbd5e1",
                background: checked ? cfg.color : "white",
              }}
            >
              {checked && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <title>Checked</title>
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </label>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p
          className="mb-2 text-sm font-semibold leading-relaxed"
          style={{
            color: checked ? cfg.accent : "#0f172a",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {rep.title}
        </p>

        <div className="flex items-center gap-2 flex-wrap mb-2.5">
          {rep.category && (
            <Badge label={rep.category} bg="#f1f5f9" color="#64748b" />
          )}
          <Badge label={sevCfg.label} bg={sevCfg.bg} color={sevCfg.color} />
          {lighthouseScore !== null && (
            <Badge
              label={`Score ${lighthouseScore}`}
              bg={
                lighthouseScore >= 90
                  ? "#dcfce7"
                  : lighthouseScore >= 50
                    ? "#fef3c7"
                    : "#fee2e2"
              }
              color={
                lighthouseScore >= 90
                  ? "#166534"
                  : lighthouseScore >= 50
                    ? "#b45309"
                    : "#b91c1c"
              }
            />
          )}
          {rep.source === "lighthouse" && rep.displayValue && (
            <Badge label={rep.displayValue} bg="#eef2ff" color="#4338ca" />
          )}
          {isInfoOnly && (
            <Badge
              label="Derived from Lighthouse"
              bg="#dbeafe"
              color="#2563eb"
            />
          )}
          {multipleOccurrences && (
            <Badge
              label={`${issues.length} spots`}
              bg="#eff6ff"
              color="#3b82f6"
            />
          )}
        </div>

        <div className="mb-2.5">
          <p
            className="mb-1 text-[11px] font-bold text-slate-600 uppercase tracking-wider"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {rep.source === "heuristic" ? "Heuristic" : "Description"}
          </p>
          <p
            className="text-sm text-slate-600 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {rep.source === "heuristic" ? rep.category : rep.description}
          </p>
        </div>

        {showSpots && (
          <div className="mb-2.5">
            <button
              type="button"
              onClick={() => setOccOpen((v) => !v)}
              className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 hover:text-slate-700 transition-colors"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              <span
                style={{
                  display: "inline-block",
                  transform: occOpen ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              >
                ▸
              </span>
              Spots found ({issues.length})
            </button>
            {occOpen && (
              <div className="flex flex-col gap-2">
                {issues.map((issue, i) => (
                  <SpotCard
                    key={`spot-${i}-${issue.id}`}
                    issue={issue}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
          <p
            className="mb-1 text-[11px] font-bold text-emerald-600 uppercase tracking-wider"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            💡 Recommendation
          </p>
          <p
            className="text-sm text-slate-700 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {rep.recommendation}
          </p>
        </div>
      </div>
    </div>
  );
}

function SourceGroup({
  source,
  category,
  issues,
  status,
  onToggle,
  selectedIssueIds,
}: {
  source: string;
  category: string | null;
  issues: Issue[];
  status: QualityStatus;
  onToggle: (issueIds: string[], checked: boolean) => void;
  selectedIssueIds: Set<string>;
}) {
  const [open, setOpen] = useState(false);
  const cfg = statusConfig[status];
  const srcLabel = sourceLabel[source as keyof typeof sourceLabel] || source;
  const displayLabel = category ? `${srcLabel} — ${category}` : srcLabel;

  const titleGroups = Object.values(
    issues.reduce<Record<string, Issue[]>>((acc, issue) => {
      const key = `${issue.title}|||${issue.recommendation ?? ""}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(issue);
      return acc;
    }, {}),
  );

  return (
    <div
      className="bg-white border rounded-lg overflow-hidden"
      style={{ borderColor: cfg.border }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2.5 px-4 py-3 bg-transparent border-none cursor-pointer text-left"
      >
        <span
          className="text-base transition-transform duration-200 leading-none"
          style={{
            color: cfg.accent,
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          ▸
        </span>
        <span
          className="text-sm font-semibold text-slate-700"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {displayLabel}
        </span>
        <span
          className="text-xs text-slate-600 bg-slate-100 rounded-xl px-2 py-0.5 font-semibold"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {titleGroups.length === issues.length
            ? issues.length
            : `${titleGroups.length} types · ${issues.length} total`}
        </span>
      </button>

      {open && (
        <div className="px-3.5 pb-3.5 flex flex-col gap-2.5">
          {titleGroups.map((group, i) => (
            <GroupedIssueCard
              key={`group-${i}-${group[0].title}`}
              issues={group}
              status={status}
              onToggle={onToggle}
              selectedIssueIds={selectedIssueIds}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface GroupedIssue {
  source: string;
  category: string | null;
  issues: Issue[];
}

function StatusSection({
  status,
  issues,
  onToggle,
  selectedIssueIds,
}: {
  status: QualityStatus;
  issues: Issue[];
  onToggle: (issueIds: string[], checked: boolean) => void;
  selectedIssueIds: Set<string>;
}) {
  const [open, setOpen] = useState(status === "fail");
  const cfg = statusConfig[status];

  if (!issues || issues.length === 0) return null;

  const groupedIssues: Record<string, GroupedIssue> = {};
  issues.forEach((issue) => {
    const key =
      issue.source === "lighthouse" && issue.category
        ? `${issue.source}:${issue.category}`
        : issue.source;

    if (!groupedIssues[key]) {
      groupedIssues[key] = {
        source: issue.source,
        category:
          issue.source === "lighthouse" ? (issue.category ?? null) : null,
        issues: [],
      };
    }
    groupedIssues[key].issues.push(issue);
  });

  const groups = Object.values(groupedIssues);

  return (
    <div
      className="border rounded-2xl overflow-hidden"
      style={{
        background: cfg.bg,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-5 py-3.5 bg-transparent border-none cursor-pointer text-left"
      >
        <div
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ background: cfg.dot }}
        />
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{
            color: cfg.accent,
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {cfg.label}
        </span>
        <span
          className="text-xs font-semibold bg-white rounded-full px-2.5 py-0.5 border"
          style={{
            color: cfg.accent,
            borderColor: cfg.border,
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {groups.length} aspect{groups.length !== 1 ? "s" : ""}
        </span>
        <span
          className="ml-auto text-lg transition-transform duration-200"
          style={{
            color: cfg.accent,
            transform: open ? "rotate(0deg)" : "rotate(-90deg)",
          }}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="px-3.5 pb-3.5 flex flex-col gap-2">
          {groups.map((group, i) => (
            <SourceGroup
              key={`${group.source}-${i}`}
              source={group.source}
              category={group.category}
              issues={group.issues}
              status={status}
              onToggle={onToggle}
              selectedIssueIds={selectedIssueIds}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function UserReviewCard() {
  const router = useRouter();
  const hasSavedAssessment = useRef(false);
  const [issues, setIssues] = useState<{
    fail: Issue[];
    warning: Issue[];
    pass: Issue[];
  }>({
    fail: [],
    warning: [],
    pass: [],
  });
  const [, setOverallStatus] = useState<string>("pass");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedIssues, setSelectedIssues] = useState<Set<string>>(new Set());
  const [originalUserPrompt, setOriginalUserPrompt] = useState<string>("");
  const [previousUserPrompt, setPreviousUserPrompt] = useState<string>("");
  const [refinedPrompt, setRefinedPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  interface CoachResponse {
    refinedUserPrompt?: string;
    summary?: string;
    [key: string]: unknown;
  }
  const [coachResponse, setCoachResponse] = useState<CoachResponse | null>(
    null,
  );
  const [userDesignNotes, setUserDesignNotes] = useState<string>("");
  const [generatedCode, setGeneratedCode] = useState<
    Array<{
      path: string;
      content: string;
      encoding?: "utf8" | "base64";
      mimeType?: string;
    }>
  >([]);
  const [iteration, setIteration] = useState(1);
  const [webName, setWebName] = useState("");
  const [pageAuditSummaries, setPageAuditSummaries] = useState<
    PageAuditSummary[]
  >([]);
  const [pipelineTimings, setPipelineTimings] =
    useState<PipelineTimings | null>(null);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);

  const handleToggleIssue = (issueIds: string[], checked: boolean) => {
    setSelectedIssues((prev) => {
      const newSet = new Set(prev);
      for (const id of issueIds) {
        if (checked) newSet.add(id);
        else newSet.delete(id);
      }
      return newSet;
    });
  };

  const handleGenerateRefinedPrompt = async () => {
    setIsGenerating(true);
    try {
      const selectedIssuesList = [
        ...issues.fail,
        ...issues.warning,
        ...issues.pass,
      ].filter((issue) => selectedIssues.has(issue.id));

      const qualityGateData = localStorage.getItem("qualityGateResult");
      const qualityGateResult = qualityGateData
        ? JSON.parse(qualityGateData)
        : null;

      const coachStart = Date.now();
      const response = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalUserPrompt,
          previousUserPrompt,
          qualityGateResult,
          selectedIssues: selectedIssuesList,
          userDesignNotes: userDesignNotes.trim(),
          generatedCode,
        }),
      });

      const data: CoachResponse = await response.json();
      const coachMs = Date.now() - coachStart;
      setCoachResponse(data);
      setRefinedPrompt(data.refinedUserPrompt ?? "");

      if (assessmentId) {
        const selectedIssuesList2 = [
          ...issues.fail,
          ...issues.warning,
          ...issues.pass,
        ]
          .filter((issue) => selectedIssues.has(issue.id))
          .map((issue) => ({
            id: issue.id,
            source: issue.source,
            title: issue.title,
            severity: issue.severity,
          }));

      }

      setPipelineTimings((prev) => {
        const updated = prev ? { ...prev, coachMs } : null;
        if (updated)
          localStorage.setItem("pipelineTimings", JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error("Failed to generate refined prompt:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = async () => {
    if (!refinedPrompt) return;

    const nextIteration = iteration + 1;

    let siteContext: Record<string, unknown> = {
      siteIdentity: { brandName: webName, title: webName, tagline: "" },
    };
    try {
      const storedCtx = localStorage.getItem("codegenContext");
      if (storedCtx) {
        siteContext = JSON.parse(storedCtx);
      }
    } catch {
    }
    const currentCode = {
      context: siteContext,
      files: generatedCode,
    };

    localStorage.setItem("userPrompt", refinedPrompt);
    localStorage.setItem("webName", webName);
    localStorage.setItem("iteration", String(nextIteration));
    await idbSet("currentCode", currentCode);

    router.push("/progress");
  };

  useEffect(() => {
    const qualityGateData = localStorage.getItem("qualityGateResult");
    if (qualityGateData) {
      try {
        const result = JSON.parse(qualityGateData);
        setIssues(result.issuesByStatus);
        setOverallStatus(result.overallStatus);
      } catch (error) {
        console.error("Failed to parse quality gate data:", error);
      }
    }

    const storedPreviewUrl = localStorage.getItem("previewUrl");
    if (storedPreviewUrl) {
      setPreviewUrl(storedPreviewUrl);
    }

    const storedOriginal = localStorage.getItem("originalUserPrompt");
    if (storedOriginal) {
      setOriginalUserPrompt(storedOriginal);
    }
    const storedPrompt = localStorage.getItem("userPrompt");
    if (storedPrompt) {
      setPreviousUserPrompt(storedPrompt);
    }

    const storedCode = localStorage.getItem("generatedCode");
    if (storedCode) {
      try {
        setGeneratedCode(JSON.parse(storedCode));
      } catch (error) {
        console.error("Failed to parse generated code:", error);
      }
    }

    const storedIteration = localStorage.getItem("currentIteration");
    if (storedIteration) {
      setIteration(parseInt(storedIteration, 10));
    }

    const storedWebName = localStorage.getItem("webName");
    if (storedWebName) {
      setWebName(storedWebName);
    }

    const storedSummaries = localStorage.getItem("pageAuditSummaries");
    if (storedSummaries) {
      try {
        setPageAuditSummaries(JSON.parse(storedSummaries));
      } catch (error) {
        console.error("Failed to parse page audit summaries:", error);
      }
    }

    const storedTimings = localStorage.getItem("pipelineTimings");
    if (storedTimings) {
      try {
        setPipelineTimings(JSON.parse(storedTimings));
      } catch (error) {
        console.error("Failed to parse pipeline timings:", error);
      }
    }

    if (hasSavedAssessment.current) return;
    hasSavedAssessment.current = true;

  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        
        /* Custom scrollbar */
        .custom-scroll::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
      <main className="bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-900 w-full h-[calc(100vh-72px)] flex flex-col font-sans text-slate-800">
        <section className="text-white px-6 py-4 shrink-0 flex items-center justify-between">
          <div className="flex flex-col justify-center gap-1">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold tracking-tight text-white/95">
                Quality Check Results
              </h1>
            </div>
            <p className="text-xs text-indigo-200/80 font-light">
              Review and select issues you&apos;d like to fix to improve your
              design
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-indigo-200/80">Selected Issues</p>
              <p className="text-lg font-bold text-white">
                {selectedIssues.size}
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.push("/benchmark/summary")}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold text-sm hover:bg-emerald-600 transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Summary</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              View Summary
            </button>
            <button
              type="button"
              onClick={handleGenerateRefinedPrompt}
              disabled={
                (selectedIssues.size === 0 &&
                  userDesignNotes.trim().length === 0) ||
                isGenerating
              }
              className="px-4 py-2 bg-white text-indigo-900 rounded-lg font-semibold text-sm hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <title>Loading</title>
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Generate</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Generate Refined Prompt
                </>
              )}
            </button>
          </div>
        </section>
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="container mx-auto p-4 grid grid-cols-3 gap-5">
            <div className="col-span-1 custom-scroll overflow-y-auto pr-1 space-y-4">
              <PageOverviewPanel
                summaries={pageAuditSummaries}
                allIssues={[...issues.fail, ...issues.warning, ...issues.pass]}
              />
              <TimingsPanel timings={pipelineTimings} />
            </div>
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-2 mb-1">
                <h3
                  className="text-xs font-bold uppercase tracking-wider text-white/95"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Deployed Preview
                </h3>
              </div>
              {previewUrl && (
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                      <div>
                        <h3 className="text-sm font-bold text-slate-700">
                          Deployed Preview
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5 truncate max-w-[400px]">
                          {previewUrl}
                        </p>
                      </div>
                    </div>
                    <a
                      href={previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors flex items-center gap-2 shrink-0"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <title>Open preview</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Open &amp; Review
                    </a>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 mb-1">
                <h3
                  className="text-xs font-bold uppercase tracking-wider text-white/95"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  User Design Notes
                </h3>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-5 py-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <title>Design Notes</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <h3 className="text-sm font-bold text-slate-700">
                      Design Improvement Notes
                    </h3>
                    <span className="ml-auto text-xs text-purple-600 font-medium">
                      Optional
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-slate-600 mb-3">
                    Describe any specific UI improvements you&apos;d like to see
                    based on your review. This will help the AI Coach provide
                    more targeted suggestions.
                  </p>
                  <textarea
                    value={userDesignNotes}
                    onChange={(e) => setUserDesignNotes(e.target.value)}
                    placeholder="Example: I'd like the navigation to be more prominent, the color contrast needs improvement for accessibility, the call-to-action buttons should be larger and more visible..."
                    className="w-full h-32 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y min-h-[80px] max-h-[300px] text-sm"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <svg
                      className="w-4 h-4 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <title>Info</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-xs text-slate-500">
                      These notes will be combined with selected issues to
                      generate a refined prompt
                    </p>
                  </div>
                </div>
              </div>

              {refinedPrompt && (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      className="text-xs font-bold uppercase tracking-wider text-white/95"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      Refined Prompt
                    </h3>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <title>Success</title>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <h3 className="text-sm font-bold text-slate-700">
                          Refined Prompt (AI Coach)
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(refinedPrompt);
                        }}
                        className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <title>Copy</title>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        Copy
                      </button>
                    </div>
                    <div className="p-5">
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <pre className="text-xs text-slate-700 whitespace-pre-wrap font-mono">
                          {refinedPrompt}
                        </pre>
                      </div>
                      {coachResponse?.summary && (
                        <div className="mt-4">
                          <p className="text-xs font-semibold text-slate-600 mb-2">
                            Summary:
                          </p>
                          <p className="text-sm text-slate-600">
                            {coachResponse.summary}
                          </p>
                        </div>
                      )}

                      <div className="mt-5 pt-4 border-t border-slate-200">
                        <button
                          type="button"
                          onClick={handleRegenerate}
                          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-semibold text-sm hover:from-indigo-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2 shadow-sm"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <title>Re-generate</title>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                          Re-generate with Refined Prompt (Iteration{" "}
                          {iteration + 1})
                        </button>
                        <p className="text-xs text-slate-500 text-center mt-2">
                          This will send the refined prompt to the code
                          generator while preserving the existing code structure
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="flex items-center gap-2 mb-1">
                <h3
                  className="text-xs font-bold uppercase tracking-wider text-white/95"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Identified Issues
                </h3>
              </div>
              <StatusSection
                status="fail"
                issues={issues.fail}
                onToggle={handleToggleIssue}
                selectedIssueIds={selectedIssues}
              />
              <StatusSection
                status="warning"
                issues={issues.warning}
                onToggle={handleToggleIssue}
                selectedIssueIds={selectedIssues}
              />
              <StatusSection
                status="pass"
                issues={issues.pass}
                onToggle={handleToggleIssue}
                selectedIssueIds={selectedIssues}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
