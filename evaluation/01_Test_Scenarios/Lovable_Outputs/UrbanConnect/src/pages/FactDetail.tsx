import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, XCircle, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const factsDB: Record<string, {
  title: string;
  status: "Verified" | "Clarified";
  myth: string;
  fact: string;
  sources: { label: string; url: string }[];
}> = {
  "1": {
    title: "Free bus rides for seniors on weekday mornings",
    status: "Verified",
    myth: "Seniors get free public transport at all times.",
    fact: "Free rides apply only to weekday mornings before 7:45 AM on basic bus services. This policy was confirmed by MOT and is active since 1 Jan 2025.",
    sources: [
      { label: "MOT Official Press Release", url: "#" },
      { label: "TransitLink FAQ", url: "#" },
    ],
  },
  "2": {
    title: "GST will increase to 12% by 2027",
    status: "Clarified",
    myth: "The government plans to raise GST to 12% in 2027.",
    fact: "MOF has clarified that there are currently no plans to raise GST beyond the current 9% rate. The previous increase from 8% to 9% in January 2024 was the final planned adjustment.",
    sources: [
      { label: "MOF Budget Statement 2025", url: "#" },
      { label: "Channel NewsAsia Report", url: "#" },
    ],
  },
  "3": {
    title: "New citizenship pathway for long-term PRs",
    status: "Verified",
    myth: "All PRs who have lived in Singapore for 10+ years automatically get citizenship.",
    fact: "MHA confirmed a new streamlined application process for long-term PRs. It is not automatic — applicants must still meet criteria including employment, family ties, and national service obligations.",
    sources: [
      { label: "MHA Circular 2025/07", url: "#" },
    ],
  },
  "4": {
    title: "All HDB flats will be 99-year leasehold",
    status: "Clarified",
    myth: "HDB will stop all lease buyback and renewal programmes.",
    fact: "HDB clarified that SERS (Selective En Bloc Redevelopment Scheme) and VERS (Voluntary Early Redevelopment Scheme) remain active. The 99-year leasehold model continues but with enhanced support for ageing estates.",
    sources: [
      { label: "HDB InfoWEB", url: "#" },
      { label: "MND Media Statement", url: "#" },
    ],
  },
  "5": {
    title: "CPF contribution rates rising for workers over 55",
    status: "Verified",
    myth: "CPF rates are doubling for senior workers.",
    fact: "CPF Board confirmed phased increases of 0.5–1% per year for workers aged 55–70, starting January 2026. Rates are not doubling — the increases are gradual and matched by employer contributions.",
    sources: [
      { label: "CPF Board Advisory", url: "#" },
      { label: "MOM Press Release", url: "#" },
    ],
  },
};

const FactDetail = () => {
  const { id } = useParams();
  const fact = factsDB[id || ""];

  useDocumentTitle(
    fact ? `${fact.title} — ${fact.status}` : "Fact Not Found",
    fact ? `${fact.status}: ${fact.fact.slice(0, 140)}` : undefined
  );

  if (!fact) {
    return (
      <Layout>
        <div className="container py-20 text-center" role="alert">
          <p className="text-muted-foreground">Fact not found.</p>
          <Link to="/factually-checkpulse" className="text-primary underline mt-4 inline-block">Back to CheckPulse</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container py-12">
        <Link to="/factually-checkpulse" className="flex items-center gap-1.5 text-sm text-primary font-medium mb-6 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded">
          <ArrowLeft size={16} aria-hidden="true" /> Back to CheckPulse
        </Link>

        {/* Header */}
        <header className="flex items-start gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-3">{fact.title}</h1>
          </div>
          <span className={fact.status === "Verified" ? "badge-verified" : "badge-clarified"} role="status">
            {fact.status}
          </span>
        </header>

        {/* Myth vs Fact */}
        <div className="grid md:grid-cols-2 gap-6 mb-12" role="comparison" aria-label="Myth versus Fact">
          <div className="border rounded-lg p-6 bg-card">
            <div className="flex items-center gap-2 mb-3">
              <XCircle size={20} className="text-destructive" aria-hidden="true" />
              <h2 className="font-bold text-lg">The Myth</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{fact.myth}</p>
          </div>
          <div className="border rounded-lg p-6 bg-card border-primary/30">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={20} className="text-primary" aria-hidden="true" />
              <h2 className="font-bold text-lg">The Fact</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{fact.fact}</p>
          </div>
        </div>

        {/* Sources */}
        <aside className="border-t pt-8" aria-labelledby="sources-heading">
          <h2 id="sources-heading" className="font-bold text-lg mb-4">Official Sources</h2>
          <ul className="space-y-3">
            {fact.sources.map((s, i) => (
              <li key={i}>
                <a
                  href={s.url}
                  className="flex items-center gap-2 text-sm text-primary font-medium hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={14} aria-hidden="true" /> {s.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </Layout>
  );
};

export default FactDetail;
