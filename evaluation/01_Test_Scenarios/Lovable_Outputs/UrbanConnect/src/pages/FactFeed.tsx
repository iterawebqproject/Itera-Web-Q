import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const factItems = [
  { id: 1, title: "Free bus rides for seniors on weekday mornings", status: "Verified" as const, date: "2025-07-12", summary: "MOT confirmed this policy is active since 1 Jan 2025." },
  { id: 2, title: "GST will increase to 12% by 2027", status: "Clarified" as const, date: "2025-07-10", summary: "MOF clarified: No plans beyond the current 9% rate." },
  { id: 3, title: "New citizenship pathway for long-term PRs", status: "Verified" as const, date: "2025-06-28", summary: "MHA confirmed new streamlined process effective Aug 2025." },
  { id: 4, title: "All HDB flats will be 99-year leasehold", status: "Clarified" as const, date: "2025-06-15", summary: "HDB clarified: SERS and VERS programmes remain in effect." },
  { id: 5, title: "CPF contribution rates rising for workers over 55", status: "Verified" as const, date: "2025-05-20", summary: "CPF Board confirmed phased increases starting Jan 2026." },
];

interface FactFeedProps {
  title: string;
}

const FactFeed = ({ title }: FactFeedProps) => {
  useDocumentTitle(title, `Browse and filter ${title.toLowerCase()} — verified and clarified government statements.`);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "Verified" | "Clarified">("all");

  const filtered = useMemo(() => {
    return factItems.filter((item) => {
      const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === "all" || item.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  return (
    <Layout>
      <section className="hero-section py-12" aria-labelledby="factfeed-heading">
        <div className="container">
          <h1 id="factfeed-heading" className="text-3xl md:text-4xl font-bold">{title}</h1>
          <p className="mt-2 opacity-85">Search and filter verified statements</p>
        </div>
      </section>

      <section className="container py-12">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8" role="search" aria-label="Filter statements">
          <div className="relative flex-1">
            <label htmlFor="fact-search" className="sr-only">Search statements</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} aria-hidden="true" />
            <input
              id="fact-search"
              type="search"
              placeholder="Search statements…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border rounded-md py-2.5 pl-10 pr-4 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex gap-2" role="group" aria-label="Filter by status">
            {(["all", "Verified", "Clarified"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-md text-sm font-medium border transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  filter === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border hover:bg-muted"
                }`}
                aria-pressed={filter === f}
              >
                {f === "all" ? "All" : f}
              </button>
            ))}
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-4" role="feed" aria-label="Fact-check results">
          {filtered.length === 0 && (
            <p className="text-center py-12 text-muted-foreground" role="status">No results found.</p>
          )}
          {filtered.map((item) => (
            <Link
              key={item.id}
              to={`/fact-detail/${item.id}`}
              className="block border rounded-lg bg-card p-5 hover:shadow-md transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`${item.title} — ${item.status}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.summary}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    <time dateTime={item.date}>{item.date}</time>
                  </p>
                </div>
                <span className={item.status === "Verified" ? "badge-verified" : "badge-clarified"} role="status">
                  {item.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default FactFeed;
