import { useState } from "react";
import { Download, ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const expenditures = [
  { category: "Healthcare", amount: "$18.2B", pct: "22%", details: "Includes hospital expansion, Medishield Life subsidies, and public health programmes." },
  { category: "Defence", amount: "$16.5B", pct: "20%", details: "National security, SAF modernisation, and cyber defence initiatives." },
  { category: "Education", amount: "$14.8B", pct: "18%", details: "Pre-school expansion, SkillsFuture credits, university research grants." },
  { category: "Transport", amount: "$10.1B", pct: "12%", details: "MRT network expansion, bus fleet renewal, active mobility infrastructure." },
  { category: "Social Services", amount: "$8.7B", pct: "11%", details: "ComCare, housing grants, senior activity centres, disability support." },
  { category: "Environment", amount: "$5.3B", pct: "6%", details: "Coastal protection, Green Plan 2030, waste management modernisation." },
];

const downloads = [
  { name: "Budget Statement 2026 (Full)", file: "budget-statement-2026.pdf" },
  { name: "Revenue & Expenditure Estimates", file: "revenue-expenditure-2026.pdf" },
  { name: "Annex A – Tax Changes", file: "annex-a-tax-changes.pdf" },
  { name: "Infographic Summary", file: "budget-2026-infographic.pdf" },
];

const Budget2026 = () => {
  useDocumentTitle("Budget 2026", "Explore Singapore's Budget 2026 expenditure breakdown, financial data, and download official documents.");

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Layout>
      <section className="hero-section py-12" aria-labelledby="budget-heading">
        <div className="container">
          <h1 id="budget-heading" className="text-3xl md:text-4xl font-bold">Budget 2026</h1>
          <p className="mt-2 opacity-85">Expenditure breakdown and official documents</p>
        </div>
      </section>

      <section className="container py-12" aria-labelledby="expenditure-heading">
        <h2 id="expenditure-heading" className="text-xl font-bold mb-6">Expenditure Breakdown</h2>
        <div className="space-y-2" role="list">
          {expenditures.map((item, i) => (
            <div key={item.category} className="border rounded-lg bg-card overflow-hidden" role="listitem">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/50 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-expanded={openIndex === i}
                aria-controls={`expenditure-panel-${i}`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-semibold">{item.category}</span>
                  <span className="text-sm text-muted-foreground">{item.amount} ({item.pct})</span>
                </div>
                <ChevronDown size={18} className={`transition-transform ${openIndex === i ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              <div
                id={`expenditure-panel-${i}`}
                role="region"
                aria-labelledby={`expenditure-btn-${i}`}
                className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-40 py-4 px-5" : "max-h-0"}`}
              >
                <p className="text-sm text-muted-foreground border-t pt-4">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-16" aria-labelledby="downloads-heading">
        <h2 id="downloads-heading" className="text-xl font-bold mb-6">Download Hub</h2>
        <div className="space-y-3">
          {downloads.map((d) => (
            <div key={d.file} className="flex items-center justify-between border rounded-lg px-5 py-3 bg-card">
              <span className="text-sm font-medium">{d.name}</span>
              <a
                href={`/documents/${d.file}`}
                download
                className="flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                aria-label={`Download ${d.name}`}
              >
                <Download size={16} aria-hidden="true" /> Download
              </a>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Budget2026;
