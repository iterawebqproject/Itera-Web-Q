import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, User, MessageSquareQuote } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const articles: Record<string, { title: string; author: string; readTime: string; score: number; body: string; expertQuote: { text: string; author: string; role: string } }> = {
  "gpt5-analysis": {
    title: "GPT-5 Redefines Language Understanding",
    author: "Sarah Kim",
    readTime: "10 min",
    score: 97,
    body: `OpenAI's GPT-5 represents a paradigm shift in artificial intelligence. Unlike its predecessors, GPT-5 demonstrates what researchers are calling "emergent structured reasoning" — the ability to decompose novel problems into sub-steps without explicit chain-of-thought prompting.\n\nIn benchmark testing, GPT-5 scored 92% on the ARC-AGI challenge, up from GPT-4's 42%. More impressively, it passed a panel of Turing tests with an 87% deception rate, meaning human evaluators couldn't distinguish it from a human expert in 87% of conversations.\n\nThe architecture introduces a novel "reflection layer" that allows the model to evaluate and revise its own outputs before presenting them. This self-correction mechanism dramatically reduces hallucinations — down to 2.1% from GPT-4's 11.4%.\n\nSam Altman described it as "the first model we've built that genuinely surprises us in ways we didn't anticipate during training." The implications for scientific research, creative industries, and education are profound.\n\nHowever, the computational requirements are staggering. Training reportedly cost $400M and required a custom-built supercomputer with 100,000 H200 GPUs. This raises serious questions about the concentration of AI capabilities among a handful of well-funded organizations.`,
    expertQuote: {
      text: "GPT-5's reasoning capabilities are genuinely novel. We're seeing emergent behaviors that weren't in the training objective. This is the closest thing to a phase transition in AI that I've witnessed in my career.",
      author: "Dr. Ilya Sutskever",
      role: "Chief Scientist, Safe Superintelligence Inc.",
    },
  },
  "neural-interfaces": {
    title: "Neural Interfaces: Consumer Ready?",
    author: "Dr. James Okafor",
    readTime: "7 min",
    score: 82,
    body: `Neuralink's N2 brain-computer interface has received FDA clearance for limited consumer trials, marking a historic moment in neurotechnology. The device, roughly the size of a coin, is implanted by a robotic surgeon in an outpatient procedure lasting under two hours.\n\nEarly trial participants report the ability to control computers, smartphones, and smart home devices through thought alone. Typing speeds reach 40 words per minute — competitive with smartphone keyboards.\n\nBut the consumer path is fraught with challenges. The device requires a craniotomy, however minor. Battery life is limited to 12 hours between wireless charging sessions. And the long-term effects of having a foreign device in brain tissue remain unknown.\n\nCompetitors are offering less invasive alternatives. Synchron's Stentrode, implanted via blood vessel, shows promising results without brain surgery. Kernel's non-invasive helmet achieves lower bandwidth but zero surgical risk.\n\nThe question isn't whether neural interfaces will become mainstream — it's which approach will win.`,
    expertQuote: {
      text: "The FDA clearance is a milestone, but we're still years from a consumer product. The risk-benefit calculus for healthy individuals is very different from patients with paralysis.",
      author: "Dr. Krishna Shenoy",
      role: "Director, Neural Prosthetic Systems Lab, Stanford",
    },
  },
};

const fallbackArticle = {
  title: "Article Not Found",
  author: "NeonLogic",
  readTime: "1 min",
  score: 0,
  body: "This article doesn't exist yet. Check back soon for more AI coverage.",
  expertQuote: { text: "", author: "", role: "" },
};

export default function AIContent() {
  const { slug } = useParams();
  const article = articles[slug || ""] || fallbackArticle;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <SEOHead
        title={article.title}
        description={article.body.slice(0, 155)}
        path={`/ai/${slug}`}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: article.title,
          author: { "@type": "Person", name: article.author },
          publisher: { "@type": "Organization", name: "NeonLogic" },
        }}
      />

      <nav aria-label="Breadcrumb">
        <Link to="/ai" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm focus-visible:outline-2 focus-visible:outline-primary">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to AI
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
          <div className="score-circle score-circle-lg" role="img" aria-label={`AI Impact Score: ${article.score} out of 100`}>{article.score}</div>
          <div>
            <p className="font-bold text-lg">AI Impact Score</p>
            <p className="text-sm text-muted-foreground">Rated on novelty, real-world impact, and research significance</p>
          </div>
        </div>
      )}

      <article>
        {article.body.split("\n\n").map((p, i) => (
          <p key={i} className="text-foreground leading-relaxed mb-4 text-base">{p}</p>
        ))}
      </article>

      {article.expertQuote.text && (
        <blockquote className="rounded-lg border-l-4 border-primary bg-primary/5 p-6" cite="">
          <div className="flex items-start gap-3">
            <MessageSquareQuote className="h-6 w-6 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
            <div>
              <p className="italic text-foreground/90 leading-relaxed">"{article.expertQuote.text}"</p>
              <footer className="mt-3">
                <cite className="not-italic">
                  <p className="font-bold text-sm">{article.expertQuote.author}</p>
                  <p className="text-xs text-muted-foreground">{article.expertQuote.role}</p>
                </cite>
              </footer>
            </div>
          </div>
        </blockquote>
      )}
    </div>
  );
}
