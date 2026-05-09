import { Link } from "react-router-dom";
import { BrainCircuit, Network, BarChart3 } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const neuralNewsFeed = [
  { id: "gpt5-analysis", title: "GPT-5 Redefines Language Understanding", excerpt: "OpenAI's latest model demonstrates emergent reasoning capabilities previously thought impossible.", badge: "BREAKING", featured: true },
  { id: "neural-interfaces", title: "Neural Interfaces: Consumer Ready?", excerpt: "Neuralink's N2 chip receives FDA clearance for consumer trials in 2026.", badge: "ANALYSIS" },
  { id: "opensource-surge", title: "Open-Source AI Models Surge Ahead", excerpt: "Meta's Llama 4 and Mistral Large 3 challenge proprietary model dominance.", badge: "TREND" },
  { id: "coding-agents", title: "Autonomous Coding Agents Ship Production Code", excerpt: "Devin 2.0 and GitHub Copilot Workspace are redefining software development.", badge: "FEATURE" },
  { id: "eu-ai-act", title: "EU AI Act Enforcement Begins", excerpt: "New regulations reshape how AI companies operate in European markets.", badge: "POLICY" },
];

const analysisBlock = {
  title: "Weekly AI Power Rankings",
  items: [
    { name: "GPT-5", score: 96, change: "+3" },
    { name: "Claude 4", score: 94, change: "+1" },
    { name: "Gemini Ultra 2", score: 91, change: "-1" },
    { name: "Llama 4 405B", score: 88, change: "+5" },
  ],
};

export default function AICategory() {
  return (
    <div className="p-6 space-y-10 max-w-7xl mx-auto">
      <SEOHead
        title="AI News"
        description="Intelligence amplified. Latest AI models, research breakthroughs, and expert analysis."
        path="/ai"
      />

      <section aria-labelledby="ai-heading">
        <div className="flex items-center gap-3 mb-2">
          <BrainCircuit className="h-8 w-8 text-primary" aria-hidden="true" />
          <h1 id="ai-heading" className="text-4xl md:text-5xl font-bold neon-text text-primary">AI</h1>
        </div>
        <p className="text-muted-foreground">Intelligence amplified. Models, research, and the minds behind them.</p>
      </section>

      <section aria-labelledby="neural-feed-heading">
        <h2 id="neural-feed-heading" className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Network className="h-5 w-5 text-primary" aria-hidden="true" /> Neural Network News Feed
        </h2>
        <div className="grid md:grid-cols-2 gap-4" role="list">
          {neuralNewsFeed.map((a) => (
            <Link
              key={a.id}
              to={`/ai/${a.id}`}
              role="listitem"
              className={`${a.featured ? "md:col-span-2" : ""} rounded-lg border border-border bg-card p-5 hover:neon-border transition-all duration-300 group focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2`}
              aria-label={`${a.badge}: ${a.title}`}
            >
              <span className="badge-neon mb-2 inline-block" aria-hidden="true">{a.badge}</span>
              <h3 className={`${a.featured ? "text-2xl" : "text-lg"} font-bold group-hover:text-primary transition-colors`}>{a.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{a.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="rankings-heading">
        <h2 id="rankings-heading" className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-accent" aria-hidden="true" /> {analysisBlock.title}
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {analysisBlock.items.map((item, i) => (
            <article key={i} className="rounded-lg border border-border bg-card p-5 text-center">
              <div className="score-circle mx-auto mb-3" role="img" aria-label={`Score: ${item.score} out of 100`}>{item.score}</div>
              <h3 className="font-bold">{item.name}</h3>
              <span className={`text-xs font-mono ${item.change.startsWith("+") ? "text-accent" : "text-destructive"}`}>
                {item.change}
              </span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
