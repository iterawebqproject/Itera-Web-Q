import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Search, FileText, Shield, BarChart3 } from "lucide-react";
import Layout from "@/components/Layout";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const tickerItems = [
  "✓ 'Free bus rides for seniors' — Verified",
  "⚠ 'GST hike delayed to 2027' — Clarified",
  "✓ 'New MRT line opens Dec 2025' — Verified",
  "✓ 'Healthcare spending up 12%' — Verified",
];

const Home = () => {
  useDocumentTitle("Home", "Access verified government data, budget breakdowns, and fact-checked statements on UrbanConnect.");

  const [tickerIndex, setTickerIndex] = useState(0);

  const advanceTicker = useCallback(() => {
    setTickerIndex((i) => (i + 1) % tickerItems.length);
  }, []);

  useEffect(() => {
    // Pause ticker when tab is hidden (Green Software)
    let interval: ReturnType<typeof setInterval>;
    const handleVisibility = () => {
      if (document.hidden) {
        clearInterval(interval);
      } else {
        interval = setInterval(advanceTicker, 4000);
      }
    };
    interval = setInterval(advanceTicker, 4000);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [advanceTicker]);

  return (
    <Layout>
      {/* Hero */}
      <section className="hero-section py-20 md:py-28" aria-labelledby="hero-heading">
        <div className="container text-center">
          <h1 id="hero-heading" className="text-3xl md:text-5xl font-bold mb-4">
            Trusted Information,<br />One Platform.
          </h1>
          <p className="text-lg opacity-85 mb-8 max-w-xl mx-auto">
            Access verified government data, budget breakdowns, and fact-checked statements.
          </p>
          <div className="max-w-lg mx-auto relative">
            <label htmlFor="hero-search" className="sr-only">Search official information</label>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={20} aria-hidden="true" />
            <input
              id="hero-search"
              type="search"
              placeholder="Search official info…"
              className="w-full rounded-full py-3 pl-12 pr-5 text-foreground text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-foreground/40"
            />
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="ticker-bar py-2 text-center text-sm font-medium tracking-wide" role="status" aria-live="polite" aria-label="Latest verified statements">
        <span className="opacity-60 mr-2">Live Clarity:</span>
        {tickerItems[tickerIndex]}
      </div>

      {/* Features Grid */}
      <section className="container py-16" aria-labelledby="features-heading">
        <h2 id="features-heading" className="text-2xl font-bold text-center mb-10">Explore Official Resources</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: BarChart3, title: "Budget 2026", desc: "Full expenditure breakdown and downloads", to: "/budget-2026" },
            { icon: FileText, title: "Policy Updates", desc: "National Day Rally highlights and transcripts", to: "/national-day-rally-2025" },
            { icon: Shield, title: "Fact-Checks", desc: "Verified statements and corrections", to: "/factually-checkpulse" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="bg-card rounded-lg border p-8 text-center hover:shadow-md transition-shadow group focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`${item.title}: ${item.desc}`}
            >
              <div className="mx-auto w-14 h-14 rounded-full bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors" aria-hidden="true">
                <item.icon size={26} />
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
