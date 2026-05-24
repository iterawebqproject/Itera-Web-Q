import { useState, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { articles } from "@/data/articles";
import vaultDoodle from "@/assets/vault-doodle.png";

export default function Archive() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    if (!search.trim()) return articles;
    const q = search.toLowerCase();
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.includes(q)
    );
  }, [search]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof articles>();
    filtered.forEach((a) => {
      const d = new Date(a.date);
      const key = `${d.toLocaleString("default", { month: "long" })} ${d.getFullYear()}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(a);
    });
    return Array.from(map.entries());
  }, [filtered]);

  const surpriseMe = useCallback(() => {
    const random = articles[Math.floor(Math.random() * articles.length)];
    navigate(`/article/${random.id}`);
  }, [navigate]);

  return (
    <Layout>
      <SEOHead
        title="Archive"
        description="Every doodle ever scribbled. Search through old wisdom or hit Surprise Me for a random article."
        path="/archive"
      />
      <section className="container py-12 max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <img src={vaultDoodle} alt="" width={80} height={80} loading="lazy" className="wiggle" aria-hidden="true" />
          <div>
            <h1 className="font-display text-4xl md:text-5xl text-foreground">The Vault</h1>
            <p className="font-body text-muted-foreground mt-1">
              Every doodle ever scribbled. Some are wisdom. Most are nonsense.
            </p>
          </div>
        </div>

        {/* Search + Surprise Me */}
        <div className="flex gap-3 mb-10" role="search">
          <label htmlFor="archive-search" className="sr-only">Search articles</label>
          <input
            id="archive-search"
            type="search"
            placeholder="Search for old wisdom..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 sketch-border-light bg-card px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            onClick={surpriseMe}
            className="sketch-border bg-primary text-primary-foreground font-body font-semibold px-5 py-3 text-sm hover:opacity-90 transition-opacity whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            🎲 Surprise Me!
          </button>
        </div>

        {/* Chronological list */}
        {grouped.map(([month, arts]) => (
          <section key={month} className="mb-10" aria-label={`Articles from ${month}`}>
            <h2 className="font-display text-2xl text-foreground mb-4 sketch-underline inline-block">
              {month}
            </h2>
            <div className="space-y-3">
              {arts.map((a) => (
                <Link
                  key={a.id}
                  to={`/article/${a.id}`}
                  className="flex items-start justify-between gap-4 sketch-border-light bg-card p-4 hover:bg-accent transition-colors block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <div>
                    <h3 className="font-display text-xl text-card-foreground">{a.title}</h3>
                    <p className="font-body text-xs text-muted-foreground mt-1">
                      {a.category} · {a.readTime}
                    </p>
                  </div>
                  <time className="font-body text-xs text-muted-foreground whitespace-nowrap" dateTime={a.date}>{a.date}</time>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {filtered.length === 0 && (
          <p className="text-center font-body text-muted-foreground py-20" role="status">
            No doodles match your search. Try "quantum" or "coffee" — those are always fun.
          </p>
        )}
      </section>
    </Layout>
  );
}
