import { Link } from "react-router-dom";
import { ArrowRight, Zap, BrainCircuit, Cpu } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const featuredArticles = [
  { id: 1, title: "GPT-5 Redefines Language Understanding", category: "AI", badge: "BREAKING", span: "col-span-2 row-span-2", url: "/ai/gpt5-analysis" },
  { id: 2, title: "Quantum Computing Hits 1000 Qubits", category: "TECH", badge: "EXCLUSIVE", span: "col-span-2 row-span-1", url: "/tech/quantum-1000" },
  { id: 3, title: "Neural Interfaces: Consumer Ready?", category: "AI", badge: "ANALYSIS", span: "col-span-1 row-span-1", url: "/ai/neural-interfaces" },
  { id: 4, title: "M4 Ultra Benchmarks Leaked", category: "TECH", badge: "LEAK", span: "col-span-1 row-span-1", url: "/tech/m4-ultra" },
  { id: 5, title: "Open-Source AI Models Surge Ahead", category: "AI", badge: "TREND", span: "col-span-2 row-span-1", url: "/ai/opensource-surge" },
  { id: 6, title: "6G Research Enters Phase Two", category: "TECH", badge: "R&D", span: "col-span-2 row-span-1", url: "/tech/6g-phase-two" },
];

const aiSpotlight = [
  { title: "Autonomous Coding Agents Ship Production Code", time: "2h ago" },
  { title: "Multimodal AI Passes Medical Board Exams", time: "4h ago" },
  { title: "EU AI Act Enforcement Begins", time: "6h ago" },
];

const techFeed = [
  { title: "Apple Vision Pro 2 Patent Surfaces", time: "1h ago" },
  { title: "NVIDIA Blackwell Ultra GPU Announced", time: "3h ago" },
  { title: "ARM Chips Dominate Server Market", time: "5h ago" },
  { title: "SpaceX Starlink V3 Achieves 1Gbps", time: "7h ago" },
];

export default function Index() {
  return (
    <div className="p-6 space-y-10 max-w-7xl mx-auto">
      <SEOHead
        title="Home"
        description="Your hyper-curated feed of AI breakthroughs, hardware revolutions, and the tech shaping tomorrow."
        path="/"
      />

      <section aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="text-5xl md:text-7xl font-bold neon-text text-primary leading-tight">
          The Future.<br />Decoded.
        </h1>
        <p className="text-muted-foreground mt-3 text-lg max-w-xl">
          Your hyper-curated feed of AI breakthroughs, hardware revolutions, and the tech shaping tomorrow.
        </p>
        <nav className="flex gap-3 mt-6" aria-label="Category hubs">
          <Link to="/ai" className="btn-neon flex items-center gap-2">
            <BrainCircuit className="h-4 w-4" aria-hidden="true" /> AI Hub <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link to="/tech" className="btn-neon flex items-center gap-2">
            <Cpu className="h-4 w-4" aria-hidden="true" /> Tech Hub <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </nav>
      </section>

      <section aria-labelledby="grid-heading">
        <h2 id="grid-heading" className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-accent" aria-hidden="true" /> The Master Grid
        </h2>
        <div className="grid-jigsaw" role="list">
          {featuredArticles.map((a) => (
            <Link
              key={a.id}
              to={a.url}
              role="listitem"
              className={`${a.span} rounded-lg border border-border bg-card p-5 flex flex-col justify-end hover:neon-border transition-all duration-300 group focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2`}
              aria-label={`${a.badge}: ${a.title} — ${a.category}`}
            >
              <span className="badge-neon mb-2 w-fit" aria-hidden="true">{a.badge}</span>
              <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{a.title}</h3>
              <span className="text-xs text-muted-foreground mt-1">{a.category}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <section aria-labelledby="ai-spotlight-heading">
          <h2 id="ai-spotlight-heading" className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-primary" aria-hidden="true" /> Featured AI Spotlight
          </h2>
          <ul className="space-y-3 list-none p-0">
            {aiSpotlight.map((item, i) => (
              <li key={i}>
                <Link to="/ai" className="block rounded-lg border border-border bg-card p-4 hover:neon-border transition-all duration-300 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
                  <h3 className="font-semibold">{item.title}</h3>
                  <time className="text-xs text-muted-foreground">{item.time}</time>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="tech-feed-heading">
          <h2 id="tech-feed-heading" className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-accent" aria-hidden="true" /> Tech Breakthrough Feed
          </h2>
          <ul className="space-y-3 list-none p-0">
            {techFeed.map((item, i) => (
              <li key={i}>
                <Link to="/tech" className="block rounded-lg border border-border bg-card p-4 hover:neon-border-accent transition-all duration-300 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
                  <h3 className="font-semibold">{item.title}</h3>
                  <time className="text-xs text-muted-foreground">{item.time}</time>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
