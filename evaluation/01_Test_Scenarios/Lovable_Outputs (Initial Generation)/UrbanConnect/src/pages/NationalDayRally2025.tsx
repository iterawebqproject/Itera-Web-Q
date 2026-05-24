import { useState } from "react";
import { Copy, Check, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const keyTakeaways = [
  "Launch of new SkillsFuture 2.0 programme for mid-career workers",
  "Housing policy reform: 40% more BTO flats in 2026",
  "Carbon tax increase from $25 to $45 per tonne by 2027",
  "New National AI Strategy 2.0 with $1B investment",
  "Enhanced ComCare support for lower-income households",
];

const timeline = [
  { time: "8:00 PM", event: "Opening Address by the Prime Minister" },
  { time: "8:20 PM", event: "Economic Outlook and Growth Strategy" },
  { time: "8:45 PM", event: "Social Compact: Housing, Healthcare, Education" },
  { time: "9:15 PM", event: "Singapore's Green Future" },
  { time: "9:35 PM", event: "National Security and Digital Defence" },
  { time: "9:50 PM", event: "Closing Remarks and Q&A" },
];

const transcript = `Good evening, fellow Singaporeans. Tonight, I want to speak to you about our shared future — a future built on trust, resilience, and opportunity.

Our economy has shown remarkable strength. GDP growth exceeded expectations at 4.2%, and unemployment remains at historic lows. But growth alone is not enough. We must ensure that every Singaporean benefits.

That is why tonight, I am announcing three major initiatives. First, SkillsFuture 2.0 — a comprehensive retraining programme that will prepare 200,000 mid-career workers for the jobs of tomorrow. Second, a bold expansion of our housing programme, with 40% more BTO flats over the next three years. Third, a new $1 billion investment in our National AI Strategy.

These are not just policies. They are promises — promises that we will leave no one behind as we build a smarter, greener, and more inclusive Singapore.

Thank you, and majulah Singapura.`;

const NationalDayRally2025 = () => {
  useDocumentTitle("National Day Rally 2025", "Key policy announcements, timeline, and full transcript from Singapore's National Day Rally 2025.");

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(transcript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = transcript;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Layout>
      <section className="hero-section py-12" aria-labelledby="ndr-heading">
        <div className="container">
          <h1 id="ndr-heading" className="text-3xl md:text-4xl font-bold">National Day Rally 2025</h1>
          <p className="mt-2 opacity-85">Key policy announcements and highlights</p>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="container py-12" aria-labelledby="takeaways-heading">
        <h2 id="takeaways-heading" className="text-xl font-bold mb-6">Policy Highlights</h2>
        <ul className="space-y-4" role="list">
          {keyTakeaways.map((item, i) => (
            <li key={i} className="flex items-start gap-3 border-l-4 border-primary pl-4 py-2">
              <p className="text-sm font-medium">{item}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Timeline */}
      <section className="container py-12" aria-labelledby="timeline-heading">
        <h2 id="timeline-heading" className="text-xl font-bold mb-6">Announcement Timeline</h2>
        <ol className="relative pl-8" role="list">
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border" aria-hidden="true" />
          {timeline.map((item, i) => (
            <li key={i} className="relative mb-6 last:mb-0">
              <div className="absolute -left-5 top-1 w-4 h-4 rounded-full bg-primary border-2 border-card" aria-hidden="true" />
              <div className="bg-card border rounded-lg px-5 py-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <Clock size={12} aria-hidden="true" />
                  <time>{item.time}</time>
                </div>
                <p className="text-sm font-medium">{item.event}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Transcript */}
      <section className="container pb-16" aria-labelledby="transcript-heading">
        <div className="flex items-center justify-between mb-4">
          <h2 id="transcript-heading" className="text-xl font-bold">Full Transcript</h2>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
            aria-label={copied ? "Transcript copied" : "Copy transcript to clipboard"}
          >
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
        <article className="bg-card border rounded-lg p-6 md:p-8 prose prose-sm max-w-none">
          {transcript.split("\n\n").map((p, i) => (
            <p key={i} className="mb-4 last:mb-0 text-sm leading-relaxed text-muted-foreground">{p}</p>
          ))}
        </article>
      </section>
    </Layout>
  );
};

export default NationalDayRally2025;
