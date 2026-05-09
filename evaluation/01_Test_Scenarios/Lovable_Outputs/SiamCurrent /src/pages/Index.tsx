import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BreakingTicker from "@/components/BreakingTicker";
import SkipToContent from "@/components/SkipToContent";
import NewsCard from "@/components/NewsCard";
import { articles, getArticlesByCategory, getTrendingArticles } from "@/data/news";
import { useState } from "react";

const Index = () => {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "success" | "error">("idle");
  const featured = articles[0];
  const secondaryStories = [articles[4], articles[1]];
  const businessArticles = getArticlesByCategory("business").slice(0, 2);
  const entertainmentArticles = getArticlesByCategory("entertainment").slice(0, 2);
  const trending = getTrendingArticles();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribeStatus("error");
      return;
    }
    setSubscribeStatus("success");
    setEmail("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SkipToContent />
      <BreakingTicker />
      <SiteHeader />

      <main className="flex-1" id="main-content">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <section aria-label="Featured stories" className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <div className="lg:col-span-2">
              <NewsCard article={featured} variant="hero" />
            </div>
            <div className="flex flex-col gap-5 justify-between">
              {secondaryStories.map((a) => (
                <NewsCard key={a.id} article={a} variant="secondary" />
              ))}
            </div>
          </section>

          {/* Category Rows + Trending Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-12">
              {/* Business */}
              <section aria-label="Business news">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-serif text-2xl font-bold">Business</h2>
                  <Link to="/business" className="text-primary text-sm font-sans font-medium hover:underline">
                    View All →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {businessArticles.map((a) => (
                    <NewsCard key={a.id} article={a} variant="compact" />
                  ))}
                </div>
              </section>

              {/* Entertainment */}
              <section aria-label="Entertainment news">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-serif text-2xl font-bold">Entertainment</h2>
                  <Link to="/entertainment" className="text-primary text-sm font-sans font-medium hover:underline">
                    View All →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {entertainmentArticles.map((a) => (
                    <NewsCard key={a.id} article={a} variant="compact" />
                  ))}
                </div>
              </section>
            </div>

            {/* Trending Sidebar */}
            <aside aria-label="Trending stories">
              <h2 className="font-serif text-xl font-bold mb-5 pb-2 border-b-2 border-primary">
                Top 5 Stories
              </h2>
              <ol className="space-y-5">
                {trending.map((a, i) => (
                  <li key={a.id}>
                    <Link to={`/${a.category}/${a.id}`} className="group flex items-start gap-4">
                      <span className="text-4xl font-serif font-black text-primary/20 leading-none" aria-hidden="true">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <span className="text-xs font-sans font-bold uppercase text-primary">
                          {a.category}
                        </span>
                        <h4 className="font-serif text-sm font-semibold leading-snug mt-0.5 group-hover:text-primary transition-colors line-clamp-2">
                          {a.title}
                        </h4>
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
            </aside>
          </div>

          {/* Newsletter */}
          <section className="my-16 surface-elevated border rounded-lg p-8 md:p-12 text-center max-w-2xl mx-auto" aria-label="Newsletter subscription">
            <h2 className="font-serif text-2xl font-bold">Stay Informed</h2>
            <p className="text-muted-foreground font-sans text-sm mt-2">
              Get the latest Thai news delivered to your inbox every morning.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-3 mt-5 max-w-md mx-auto" noValidate>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setSubscribeStatus("idle"); }}
                required
                aria-describedby="subscribe-feedback"
                className="flex-1 px-4 py-2.5 rounded-md border bg-background text-foreground font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-sans text-sm font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Subscribe
              </button>
            </form>
            <p id="subscribe-feedback" className="text-sm font-sans mt-3" role="status" aria-live="polite">
              {subscribeStatus === "success" && (
                <span className="text-green-600">Thank you for subscribing!</span>
              )}
              {subscribeStatus === "error" && (
                <span className="text-destructive">Please enter a valid email address.</span>
              )}
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Index;
