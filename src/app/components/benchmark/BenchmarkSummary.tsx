"use client";
import JSZip from "jszip";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type QualityStatus = "fail" | "warning" | "pass";

interface QualityGateSnapshot {
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
    fail: unknown[];
    warning: unknown[];
    pass: unknown[];
  };
}


const statusColor: Record<QualityStatus, string> = {
  fail: "#ef4444",
  warning: "#f59e0b",
  pass: "#10b981",
};
const statusBg: Record<QualityStatus, string> = {
  fail: "#fef2f2",
  warning: "#fffbeb",
  pass: "#f0fdf4",
};
const statusLabel: Record<QualityStatus, string> = {
  fail: "Fail",
  warning: "Warning",
  pass: "Pass",
};

function StatusPill({ s }: { s: QualityStatus }) {
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider"
      style={{ background: statusBg[s], color: statusColor[s] }}
    >
      {statusLabel[s]}
    </span>
  );
}

function Delta({
  v1,
  v2,
  unit = "",
  higherIsBetter = true,
}: {
  v1: number;
  v2: number;
  unit?: string;
  higherIsBetter?: boolean;
}) {
  const diff = v2 - v1;
  if (diff === 0)
    return (
      <span className="text-slate-400 text-xs font-semibold">— no change</span>
    );
  const improved = higherIsBetter ? diff > 0 : diff < 0;
  const sign = diff > 0 ? "+" : "";
  return (
    <span
      className="text-xs font-bold"
      style={{ color: improved ? "#10b981" : "#ef4444" }}
    >
      {sign}
      {diff.toFixed(diff % 1 === 0 ? 0 : 1)}
      {unit} {improved ? "▲" : "▼"}
    </span>
  );
}

function CompRow({
  label,
  v1,
  v2,
  unit,
  statusV1,
  statusV2,
  higherIsBetter = true,
}: {
  label: string;
  v1: number;
  v2: number;
  unit?: string;
  statusV1?: QualityStatus;
  statusV2?: QualityStatus;
  higherIsBetter?: boolean;
}) {
  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="py-2.5 px-4 text-sm text-slate-600 font-medium">
        {label}
      </td>
      <td className="py-2.5 px-4 text-center">
        <div className="flex items-center justify-center gap-1.5">
          <span className="text-sm font-semibold text-slate-400 tabular-nums line-through decoration-red-400/60">
            {v1}
            {unit}
          </span>
          {statusV1 && <StatusPill s={statusV1} />}
        </div>
      </td>
      <td className="py-2.5 px-4 text-center">
        <div className="flex items-center justify-center gap-1.5">
          <span
            className="text-sm font-bold tabular-nums"
            style={{
              color: statusV2
                ? statusColor[statusV2]
                : higherIsBetter
                  ? v2 >= v1
                    ? "#10b981"
                    : "#ef4444"
                  : v2 <= v1
                    ? "#10b981"
                    : "#ef4444",
            }}
          >
            {v2}
            {unit}
          </span>
          {statusV2 && <StatusPill s={statusV2} />}
        </div>
      </td>
      <td className="py-2.5 px-4 text-center">
        <Delta v1={v1} v2={v2} unit={unit} higherIsBetter={higherIsBetter} />
      </td>
    </tr>
  );
}

function TableHead() {
  return (
    <thead>
      <tr className="border-b border-slate-100">
        {["Metric", "V1", "Latest", "Delta"].map((h) => (
          <th
            key={h}
            className={`py-2 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider ${h === "Metric" ? "text-left" : "text-center"}`}
          >
            {h}
          </th>
        ))}
      </tr>
    </thead>
  );
}


export default function BenchmarkSummary() {
  const router = useRouter();
  const [initial, setInitial] = useState<QualityGateSnapshot | null>(null);
  const [latest, setLatest] = useState<QualityGateSnapshot | null>(null);
  const [iterations, setIterations] = useState(1);
  const [webName, setWebName] = useState("Untitled Web");
  const [generatedCode, setGeneratedCode] = useState<
    { path: string; content: string }[]
  >([]);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const init = localStorage.getItem("benchmarkInitialResult");
    const lat = localStorage.getItem("qualityGateResult");
    const iter = localStorage.getItem("currentIteration");
    const name = localStorage.getItem("webName");
    const code = localStorage.getItem("generatedCode");

    if (init) setInitial(JSON.parse(init));
    if (lat) setLatest(JSON.parse(lat));
    if (iter) setIterations(parseInt(iter, 10));
    if (name) setWebName(name);
    if (code) {
      try {
        setGeneratedCode(JSON.parse(code));
      } catch (error) {
       console.error("Failed to parse generated code from localStorage", error);
      }
    }
  }, []);

  const handleExportZip = async () => {
    if (generatedCode.length === 0) return;
    setIsExporting(true);
    try {
      const zip = new JSZip();
      const folderName =
        webName.replace(/[^a-zA-Z0-9-_]/g, "-").toLowerCase() || "web-code";
      const folder = zip.folder(folderName);
      for (const file of generatedCode) {
        folder?.file(file.path, file.content);
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${folderName}-v${iterations}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  if (!initial || !latest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-slate-500 mb-4">No benchmark data found.</p>
          <button
            type="button"
            onClick={() => router.push("/user-requirement")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
          >
            Start New Design
          </button>
        </div>
      </div>
    );
  }

  const lhI = initial.details.lighthouse;
  const lhL = latest.details.lighthouse;
  const heI = initial.details.heuristic;
  const heL = latest.details.heuristic;
  const paI = initial.details.pa11y;
  const paL = latest.details.pa11y;
  const gsI = initial.details.greenSoftware;
  const gsL = latest.details.greenSoftware;

  const failI = initial.issuesByStatus.fail.length;
  const failL = latest.issuesByStatus.fail.length;
  const warnI = initial.issuesByStatus.warning.length;
  const warnL = latest.issuesByStatus.warning.length;

  const overallImproved =
    (initial.overallStatus === "fail" || initial.overallStatus === "warning") &&
    latest.overallStatus === "pass";

  const isSingleIteration = JSON.stringify(initial) === JSON.stringify(latest);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
      `}</style>
      <main
        className="min-h-screen bg-slate-50 text-slate-800"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <header className="bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-900 px-8 py-5">
          <div className="max-w-6xl mx-auto flex items-end justify-between flex-wrap gap-4">
            <div>
              <p
                className="text-xs text-indigo-300 uppercase tracking-widest mb-1"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Benchmark Summary
              </p>
              <h1 className="text-2xl font-bold text-white">{webName}</h1>
              <p className="text-sm text-indigo-200/70 mt-0.5">
                {isSingleIteration
                  ? "1 iteration — no refinement performed"
                  : `${iterations} iteration${iterations > 1 ? "s" : ""} completed`}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                <span
                  className="text-white/60 text-xs"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  V1
                </span>
                <StatusPill s={initial.overallStatus} />
                <span className="text-white/40 text-sm">→</span>
                <span
                  className="text-white/60 text-xs"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  V{iterations}
                </span>
                <StatusPill s={latest.overallStatus} />
              </div>
              {overallImproved && (
                <span className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                  ✓ Quality Gate Passed
                </span>
              )}
              <button
                type="button"
                onClick={() => router.push("/user-review")}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors"
              >
                ← Back to Review
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-8 py-6 space-y-6">
          {(() => {
            const passI = initial.issuesByStatus.pass.length;
            const passL = latest.issuesByStatus.pass.length;
            const totalI = failI + warnI + passI;
            const totalL = failL + warnL + passL;
            const kpiCards = [
              {
                label: "Total Checks",
                desc: "Total issues evaluated across all categories",
                v1: totalI,
                v2: totalL,
                color: "#64748b",
              },
              {
                label: "Fail",
                desc: "Critical issues — lower is always better",
                v1: failI,
                v2: failL,
                color:
                  failL === 0
                    ? "#059669"
                    : failL < failI
                      ? "#d97706"
                      : "#dc2626",
              },
              {
                label: "Warning",
                desc: "Context-dependent — may shift from Fail or Pass",
                v1: warnI,
                v2: warnL,
                color: "#d97706",
              },
              {
                label: "Pass",
                desc: "Context-dependent — may shift from Warning or Fail",
                v1: passI,
                v2: passL,
                color: "#059669",
              },
            ];
            return (
              <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {kpiCards.map(({ label, desc, v1, v2, color }) => (
                  <div
                    key={label}
                    className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
                  >
                    <p
                      className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {label}
                    </p>
                    <p className="text-[10px] text-slate-400 mb-2 leading-tight">
                      {desc}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-slate-400 line-through decoration-red-400/60">
                        {v1}
                      </span>
                      <span className="text-slate-300 text-xs">→</span>
                      <span
                        className="text-3xl font-bold tabular-nums"
                        style={{ color }}
                      >
                        {v2}
                      </span>
                    </div>
                  </div>
                ))}
              </section>
            );
          })()}

          {isSingleIteration && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700 flex items-center gap-2">
              <span>⚠</span>
              <span>
                Only one iteration was completed. The V1 and Latest values are
                identical. Use the refinement workflow to improve your design.
              </span>
            </div>
          )}

          <section className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {heI && heL && (
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/60">
                  <h2 className="text-sm font-bold text-slate-700">
                    Heuristic Evaluation
                  </h2>
                </div>
                <table className="w-full text-sm">
                  <TableHead />
                  <tbody>
                    <CompRow
                      label="Essential"
                      v1={heI.essential}
                      v2={heL.essential}
                      higherIsBetter={false}
                    />
                    <CompRow
                      label="Pragmatic"
                      v1={heI.pragmatic}
                      v2={heL.pragmatic}
                      higherIsBetter={false}
                    />
                    <CompRow
                      label="Hedonic"
                      v1={heI.hedonic}
                      v2={heL.hedonic}
                      higherIsBetter={false}
                    />
                    <CompRow
                      label="Total"
                      v1={heI.total}
                      v2={heL.total}
                      statusV1={heI.status}
                      statusV2={heL.status}
                      higherIsBetter={false}
                    />
                  </tbody>
                </table>
              </div>
            )}

            {lhI && lhL && (
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/60">
                  <h2 className="text-sm font-bold text-slate-700">
                    Lighthouse Scores (avg)
                  </h2>
                </div>
                <table className="w-full text-sm">
                  <TableHead />
                  <tbody>
                    <CompRow
                      label="Performance"
                      v1={lhI.performance.avgScore}
                      v2={lhL.performance.avgScore}
                      statusV1={lhI.performance.status}
                      statusV2={lhL.performance.status}
                    />
                    <CompRow
                      label="Accessibility"
                      v1={lhI.accessibility.avgScore}
                      v2={lhL.accessibility.avgScore}
                      statusV1={lhI.accessibility.status}
                      statusV2={lhL.accessibility.status}
                    />
                    <CompRow
                      label="SEO"
                      v1={lhI.seo.avgScore}
                      v2={lhL.seo.avgScore}
                      statusV1={lhI.seo.status}
                      statusV2={lhL.seo.status}
                    />
                    <CompRow
                      label="Best Practices"
                      v1={lhI.bestPractices.avgScore}
                      v2={lhL.bestPractices.avgScore}
                      statusV1={lhI.bestPractices.status}
                      statusV2={lhL.bestPractices.status}
                    />
                  </tbody>
                </table>
              </div>
            )}

            {paI && paL && (
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/60">
                  <h2 className="text-sm font-bold text-slate-700">
                    Pa11y Accessibility
                  </h2>
                </div>
                <table className="w-full text-sm">
                  <TableHead />
                  <tbody>
                    <CompRow
                      label="Errors"
                      v1={paI.errors}
                      v2={paL.errors}
                      statusV1={paI.status}
                      statusV2={paL.status}
                      higherIsBetter={false}
                    />
                    <CompRow
                      label="Warnings"
                      v1={paI.warnings}
                      v2={paL.warnings}
                      higherIsBetter={false}
                    />
                  </tbody>
                </table>
              </div>
            )}

            {gsI && gsL && (
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/60">
                  <h2 className="text-sm font-bold text-slate-700">
                    Green Software (Calculated Metrics Only)
                  </h2>
                </div>
                <table className="w-full text-sm">
                  <TableHead />
                  <tbody>
                    <CompRow
                      label="Passed"
                      v1={gsI.passed}
                      v2={gsL.passed}
                      statusV1={gsI.status}
                      statusV2={gsL.status}
                    />
                    <CompRow
                      label="Failed"
                      v1={gsI.failed}
                      v2={gsL.failed}
                      higherIsBetter={false}
                    />
                    <CompRow
                      label="Warnings"
                      v1={gsI.warnings}
                      v2={gsL.warnings}
                      higherIsBetter={false}
                    />
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-sm font-bold text-slate-700 mb-1">
                Optimization Iterations
              </h2>
              <p className="text-xs text-slate-500">
                Total refinement cycles completed
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {Array.from({ length: iterations }).map((_, i) => (
                <div
                  key={`iter-${i + 1}-of-${iterations}`}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm"
                  style={{
                    background:
                      i === iterations - 1
                        ? "linear-gradient(135deg,#4f46e5,#2563eb)"
                        : "#cbd5e1",
                  }}
                >
                  {i + 1}
                </div>
              ))}
              <div
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white"
                style={{
                  background:
                    latest.overallStatus === "pass" ? "#10b981" : "#f59e0b",
                }}
              >
                {latest.overallStatus === "pass" ? "✓ Passed" : "In Progress"}
              </div>
            </div>
          </section>

          {generatedCode.length > 0 && (
            <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-700 mb-1">
                    Export Latest Code
                  </h2>
                  <p className="text-xs text-slate-500">
                    {generatedCode.length} file
                    {generatedCode.length !== 1 ? "s" : ""} ready — download as
                    ZIP to continue development
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {generatedCode.map((f) => (
                      <span
                        key={f.path}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {f.path}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleExportZip}
                  disabled={isExporting}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm shrink-0"
                >
                  {isExporting ? (
                    <svg
                      className="animate-spin w-4 h-4"
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
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <title>Download</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  )}
                  {isExporting
                    ? "Exporting..."
                    : `Download ZIP (V${iterations})`}
                </button>
              </div>
            </section>
          )}

          <div className="flex justify-end gap-3 pb-6">
            <button
              type="button"
              onClick={() => router.push("/user-review")}
              className="px-5 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              ← Back to Review
            </button>
            <button
              type="button"
              onClick={() => router.push("/user-requirement")}
              className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg text-sm font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all shadow-sm"
            >
              Start New Design
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
