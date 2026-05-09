import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { getArticleById, articles } from "@/data/articles";

const comments = [
  { user: "StickFigureFan42", text: "This is the best explanation of quantum physics I've ever read. And I've read exactly one.", date: "2026-04-02" },
  { user: "DoodleLover", text: "I showed this to my physics professor. He cried. Not sure if from joy or horror.", date: "2026-04-01" },
  { user: "BrainWorm99", text: "Finally, someone who gets that none of us actually understand anything.", date: "2026-03-30" },
];

export default function ArticlePage() {
  const { id } = useParams();
  const article = getArticleById(id || "");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min((scrolled / total) * 100, 100) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!article) {
    return (
      <Layout>
        <SEOHead title="404: Doodle Not Found" description="This scribble seems to have wandered off." path={`/article/${id}`} />
        <div className="container py-20 text-center">
          <h1 className="font-display text-4xl text-foreground">404: Doodle Not Found</h1>
          <p className="font-body text-muted-foreground mt-4">This scribble seems to have wandered off.</p>
          <Link to="/" className="inline-block mt-6 font-body text-primary font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            ← Back to safety
          </Link>
        </div>
      </Layout>
    );
  }

  const related = articles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Person", name: "Brainy Doodle" },
  };

  return (
    <Layout>
      <SEOHead
        title={article.title}
        description={article.excerpt}
        path={`/article/${article.id}`}
        type="article"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-muted" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Reading progress">
        <div
          className="h-full bg-primary transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <article className="container max-w-2xl py-12">
        {/* Meta */}
        <div className="flex items-center gap-3 text-sm font-body text-muted-foreground mb-4">
          <Link to={`/topics?cat=${article.category}`} className="text-primary font-medium uppercase tracking-wider hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            {article.category}
          </Link>
          <span aria-hidden="true">·</span>
          <time dateTime={article.date}>{article.date}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readTime} read</span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl text-foreground leading-tight mb-6">
          {article.title}
        </h1>

        <p className="font-body text-lg text-muted-foreground italic sketch-border-light p-4 mb-8 bg-accent/30">
          {article.excerpt}
        </p>

        {/* Content */}
        <div className="font-body text-foreground leading-relaxed space-y-4">
          {article.content.split("\n\n").map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2 key={i} className="font-display text-3xl text-foreground mt-8 mb-3">
                  {block.replace("## ", "")}
                </h2>
              );
            }
            return (
              <p key={i} className="text-foreground/90">
                {block}
              </p>
            );
          })}
        </div>

        {/* Comment Archive */}
        <section className="mt-16 pt-8 border-t border-border" aria-labelledby="comments-heading">
          <h2 id="comments-heading" className="font-display text-2xl text-foreground mb-2">💬 Comment Archive</h2>
          <p className="font-body text-sm text-muted-foreground mb-6 sketch-border-light inline-block px-3 py-1 bg-muted">
            Comments are closed. We ran out of ink.
          </p>
          <div className="space-y-4">
            {comments.map((c, i) => (
              <div key={i} className="sketch-border-light bg-card p-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg text-primary">{c.user}</span>
                  <time className="text-xs font-body text-muted-foreground" dateTime={c.date}>{c.date}</time>
                </div>
                <p className="font-body text-sm text-card-foreground mt-2">{c.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12 pt-8 border-t border-border" aria-labelledby="related-heading">
            <h2 id="related-heading" className="font-display text-2xl text-foreground mb-4">✏️ More Scribbles Like This</h2>
            <div className="grid gap-4">
              {related.map((a) => (
                <Link
                  key={a.id}
                  to={`/article/${a.id}`}
                  className="sketch-border-light bg-card p-4 hover:bg-accent transition-colors block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <h3 className="font-display text-xl text-card-foreground">{a.title}</h3>
                  <p className="font-body text-sm text-muted-foreground mt-1">{a.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
}
