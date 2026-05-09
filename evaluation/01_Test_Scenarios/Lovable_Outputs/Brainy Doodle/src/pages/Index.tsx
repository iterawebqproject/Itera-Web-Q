import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import ArticleCard from "@/components/ArticleCard";
import { articles, categories, getFeaturedArticle } from "@/data/articles";
import heroDoodle from "@/assets/hero-doodle.png";

export default function Index() {
  const featured = getFeaturedArticle();
  const popular = articles.slice(0, 4);
  const latest = articles.slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Brainy Doodle",
    description: "Complex topics explained with stick figures, bad puns, and zero academic jargon.",
    url: "https://brainy-doodle-blog.lovable.app",
  };

  return (
    <Layout>
      <SEOHead
        title="Home"
        description="Complex topics explained with stick figures, bad puns, and zero academic jargon. Your brain will thank you."
        path="/"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="container py-12 md:py-20" aria-labelledby="hero-heading">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <h1 id="hero-heading" className="font-display text-5xl md:text-7xl text-foreground leading-tight">
              Smart ideas,{" "}
              <span className="sketch-underline text-primary">dumb drawings.</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-md">
              Complex topics explained with stick figures, bad puns, and zero academic jargon. Your brain will thank you. Probably.
            </p>
            <Link
              to={`/article/${featured.id}`}
              className="inline-block sketch-border bg-primary text-primary-foreground font-body font-semibold px-6 py-3 hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Read the latest doodle →
            </Link>
          </div>
          <div className="flex-1">
            <img src={heroDoodle} alt="Stick figure characters explaining complex ideas on a whiteboard" width={1280} height={512} className="w-full" />
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="bg-accent/50 py-12" aria-labelledby="featured-heading">
        <div className="container">
          <h2 id="featured-heading" className="font-display text-3xl text-foreground mb-6">📌 The Latest Doodle</h2>
          <Link
            to={`/article/${featured.id}`}
            className="block sketch-border bg-card p-6 md:p-8 hover:doodle-shadow transition-all group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span className="text-xs font-body font-medium text-primary uppercase tracking-wider">
              {featured.category}
            </span>
            <h3 className="font-display text-3xl md:text-4xl text-card-foreground mt-2 group-hover:text-primary transition-colors">
              {featured.title}
            </h3>
            <p className="font-body text-muted-foreground mt-3 max-w-2xl">{featured.excerpt}</p>
            <span className="inline-block mt-4 font-body text-sm text-primary font-semibold">
              Read this masterpiece →
            </span>
          </Link>
        </div>
      </section>

      {/* Category Grid */}
      <section className="container py-12" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="font-display text-3xl text-foreground mb-6">🗂️ Pick Your Brain Flavor</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/topics?cat=${cat.id}`}
              className="sketch-border-light bg-card p-4 text-center hover:bg-accent hover:-translate-y-1 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="text-3xl" role="img" aria-label={cat.label}>{cat.emoji}</span>
              <p className="font-display text-xl text-card-foreground mt-1">{cat.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      <section className="container pb-16" aria-labelledby="recent-heading">
        <h2 id="recent-heading" className="font-display text-3xl text-foreground mb-6">✏️ Recent Scribbles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {latest.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Popular */}
      <section className="bg-muted/50 py-12" aria-labelledby="popular-heading">
        <div className="container">
          <h2 id="popular-heading" className="font-display text-3xl text-foreground mb-6">🔥 Popular Scribbles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {popular.map((a, i) => (
              <Link
                key={a.id}
                to={`/article/${a.id}`}
                className="flex items-start gap-4 sketch-border-light bg-card p-4 hover:bg-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="font-display text-4xl text-primary/40" aria-hidden="true">#{i + 1}</span>
                <div>
                  <h3 className="font-display text-xl text-card-foreground">{a.title}</h3>
                  <p className="text-xs font-body text-muted-foreground mt-1">{a.readTime} read</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
