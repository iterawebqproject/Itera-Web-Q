import { Link } from "react-router-dom";
import { Cpu, Star } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const techArticles = [
  { id: "quantum-1000", title: "Quantum Computing Hits 1000 Qubits", excerpt: "IBM's latest quantum processor shatters previous records, opening doors to practical quantum advantage.", badge: "EXCLUSIVE", large: true },
  { id: "m4-ultra", title: "M4 Ultra Benchmarks Leaked", excerpt: "Leaked Geekbench scores show a 40% improvement over M3 Ultra in multi-threaded workloads.", badge: "LEAK" },
  { id: "6g-phase-two", title: "6G Research Enters Phase Two", excerpt: "Samsung and Nokia lead the next generation of wireless connectivity research.", badge: "R&D" },
  { id: "arm-servers", title: "ARM Chips Dominate Server Market", excerpt: "AWS Graviton4 and Ampere Altra Max push ARM's datacenter share past 30%.", badge: "TREND" },
  { id: "vision-pro-2", title: "Apple Vision Pro 2 Patent Surfaces", excerpt: "New filings reveal a lighter, more affordable spatial computing headset.", badge: "PATENT" },
];

const hardwareReviews = [
  { title: "NVIDIA RTX 5090", score: 9.2, verdict: "The undisputed king of rasterization and ray tracing." },
  { title: "AMD Ryzen 9 9950X", score: 8.8, verdict: "Multi-threaded dominance with surprising efficiency." },
  { title: "Samsung 990 EVO Plus", score: 8.1, verdict: "Blazing sequential reads at a competitive price." },
];

export default function TechCategory() {
  return (
    <div className="p-6 space-y-10 max-w-7xl mx-auto">
      <SEOHead
        title="Tech News"
        description="Hardware, infrastructure, and the bleeding edge of technology. Reviews, benchmarks, and analysis."
        path="/tech"
      />

      <section aria-labelledby="tech-heading">
        <div className="flex items-center gap-3 mb-2">
          <Cpu className="h-8 w-8 text-accent" aria-hidden="true" />
          <h1 id="tech-heading" className="text-4xl md:text-5xl font-bold neon-text text-primary">Tech</h1>
        </div>
        <p className="text-muted-foreground">Hardware, infrastructure, and the bleeding edge of technology.</p>
      </section>

      <section aria-labelledby="tech-news-heading">
        <h2 id="tech-news-heading" className="sr-only">Tech News Stream</h2>
        <div className="grid md:grid-cols-3 gap-4" role="list">
          {techArticles.map((a) => (
            <Link
              key={a.id}
              to={`/tech/${a.id}`}
              role="listitem"
              className={`${a.large ? "md:col-span-2 md:row-span-2" : ""} rounded-lg border border-border bg-card p-5 flex flex-col justify-end hover:neon-border transition-all duration-300 group focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2`}
              aria-label={`${a.badge}: ${a.title}`}
            >
              <span className="badge-neon mb-2 w-fit" aria-hidden="true">{a.badge}</span>
              <h3 className={`${a.large ? "text-2xl" : "text-lg"} font-bold group-hover:text-primary transition-colors`}>{a.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{a.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-accent" aria-hidden="true" /> Latest Hardware Reviews
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {hardwareReviews.map((r, i) => (
            <article key={i} className="rounded-lg border border-border bg-card p-5 flex flex-col items-center text-center">
              <div className="score-circle mb-3" role="img" aria-label={`Score: ${r.score} out of 10`}>{r.score}</div>
              <h3 className="font-bold text-lg">{r.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{r.verdict}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
