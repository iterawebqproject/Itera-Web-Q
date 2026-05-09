import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, User, ChevronDown, ChevronUp } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const articles: Record<string, { title: string; author: string; readTime: string; score: number; body: string; pros: string[]; cons: string[] }> = {
  "quantum-1000": {
    title: "Quantum Computing Hits 1000 Qubits",
    author: "Dr. Elena Voss",
    readTime: "8 min",
    score: 9.4,
    body: `IBM's Condor processor has achieved a landmark milestone — 1,121 qubits on a single chip. This isn't just a numbers game; the error correction rates have improved by 3x compared to the 433-qubit Osprey.\n\nThe implications are staggering. Researchers at CERN are already running preliminary simulations that would take classical supercomputers thousands of years. Drug discovery pipelines at Pfizer and Moderna are being restructured around quantum-optimized molecular modeling.\n\nBut challenges remain. Coherence times, while improved, still limit practical computation windows to microseconds. The cryogenic cooling requirements make deployment outside specialized facilities impractical.\n\nStill, this is the moment the industry has been waiting for. Google's response is expected within months, and D-Wave's annealing approach offers a complementary path forward.`,
    pros: ["1,121 qubits — largest ever on a single chip", "3x improved error correction", "Real-world simulation capabilities", "Modular architecture for scaling"],
    cons: ["Coherence time still limited", "Requires extreme cryogenic cooling", "Software ecosystem still immature", "Cost prohibitive for most organizations"],
  },
  "m4-ultra": {
    title: "M4 Ultra Benchmarks Leaked",
    author: "Marcus Chen",
    readTime: "5 min",
    score: 8.7,
    body: `Leaked Geekbench 6 scores reveal Apple's M4 Ultra hitting 18,200 in single-core and 38,500 in multi-core tests. That's a 40% improvement over M3 Ultra in multi-threaded workloads.\n\nThe chip features a 32-core CPU (24 performance + 8 efficiency), 80-core GPU, and 32-core Neural Engine. Memory bandwidth reportedly reaches 800 GB/s with up to 512GB unified memory.\n\nCreative professionals will notice the biggest gains in video rendering and 3D workflows. DaVinci Resolve benchmarks show 4K timeline playback with 6 streams of RAW footage simultaneously.\n\nExpected to debut in the Mac Studio and Mac Pro refresh later this year, pricing remains the elephant in the room.`,
    pros: ["40% multi-core improvement", "80-core GPU", "800 GB/s memory bandwidth", "Exceptional Neural Engine performance"],
    cons: ["Expected premium pricing", "Limited to Mac Studio/Pro", "No discrete GPU option", "Thermal constraints in compact form factors"],
  },
};

const fallbackArticle = {
  title: "Article Not Found",
  author: "NeonLogic",
  readTime: "1 min",
  score: 0,
  body: "This article doesn't exist yet. Check back soon for more tech coverage.",
  pros: [] as string[],
  cons: [] as string[],
};

export default function TechContent() {
  const { slug } = useParams();
  const article = articles[slug || ""] || fallbackArticle;
  const [prosOpen, setProsOpen] = useState(true);
  const [consOpen, setConsOpen] = useState(true);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <SEOHead
        title={article.title}
        description={article.body.slice(0, 155)}
        path={`/tech/${slug}`}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: article.title,
          author: { "@type": "Person", name: article.author },
          publisher: { "@type": "Organization", name: "NeonLogic" },
        }}
      />

      <nav aria-label="Breadcrumb">
        <Link to="/tech" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm focus-visible:outline-2 focus-visible:outline-primary">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Tech
        </Link>
      </nav>

      <h1 className="text-3xl md:text-5xl font-bold neon-text text-primary leading-tight">{article.title}</h1>

      <div className="flex items-center gap-4 flex-wrap">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm">
          <User className="h-3.5 w-3.5" aria-hidden="true" /> {article.author}
        </span>
        <span className="inline-flex items-center gap-2 text-muted-foreground text-sm">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          <time>{article.readTime} read</time>
        </span>
      </div>

      {article.score > 0 && (
        <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
          <div className="score-circle score-circle-lg" role="img" aria-label={`NeonLogic Score: ${article.score} out of 10`}>{article.score}</div>
          <div>
            <p className="font-bold text-lg">NeonLogic Score</p>
            <p className="text-sm text-muted-foreground">Based on performance, value, and innovation</p>
          </div>
        </div>
      )}

      <article>
        {article.body.split("\n\n").map((p, i) => (
          <p key={i} className="text-foreground/90 leading-relaxed mb-4">{p}</p>
        ))}
      </article>

      {article.pros.length > 0 && (
        <section aria-label="Pros and Cons" className="space-y-4">
          <div className="rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => setProsOpen(!prosOpen)}
              aria-expanded={prosOpen}
              aria-controls="pros-list"
              className="w-full flex items-center justify-between p-4 bg-primary/10 hover:bg-primary/15 transition-colors focus-visible:outline-2 focus-visible:outline-primary"
            >
              <span className="font-bold text-primary">✓ Pros</span>
              {prosOpen ? <ChevronUp className="h-4 w-4 text-primary" aria-hidden="true" /> : <ChevronDown className="h-4 w-4 text-primary" aria-hidden="true" />}
            </button>
            {prosOpen && (
              <ul id="pros-list" className="p-4 space-y-2">
                {article.pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5" aria-hidden="true">+</span> {p}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => setConsOpen(!consOpen)}
              aria-expanded={consOpen}
              aria-controls="cons-list"
              className="w-full flex items-center justify-between p-4 bg-destructive/10 hover:bg-destructive/15 transition-colors focus-visible:outline-2 focus-visible:outline-primary"
            >
              <span className="font-bold text-destructive">✗ Cons</span>
              {consOpen ? <ChevronUp className="h-4 w-4 text-destructive" aria-hidden="true" /> : <ChevronDown className="h-4 w-4 text-destructive" aria-hidden="true" />}
            </button>
            {consOpen && (
              <ul id="cons-list" className="p-4 space-y-2">
                {article.cons.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-destructive mt-0.5" aria-hidden="true">−</span> {c}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
