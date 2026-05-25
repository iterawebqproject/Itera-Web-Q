import { useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CourseFeedItem from "@/components/CourseFeedItem";
import { courses, categories } from "@/data/courses";

const levels = ["All", "Beginner", "Intermediate", "Advanced"] as const;
const prices = ["All", "Free", "Paid"] as const;

const Category = () => {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("q") || "";

  const [level, setLevel] = useState<string>("All");
  const [price, setPrice] = useState<string>("All");
  const [search, setSearch] = useState(queryFromUrl);

  const category = categories.find((c) => c.id === categoryId);
  const title = categoryId === "all" ? "All Courses" : category?.name || "Courses";

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      if (categoryId !== "all" && c.category !== categoryId) return false;
      if (level !== "All" && c.level !== level) return false;
      if (price === "Free" && c.price !== "Free") return false;
      if (price === "Paid" && c.price === "Free") return false;
      if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.instructor.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [categoryId, level, price, search]);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container py-8" id="main-content">
        <h1 className="font-heading text-2xl font-bold mb-1">{title}</h1>
        <p className="text-muted-foreground text-sm mb-6" aria-live="polite">{filtered.length} courses</p>

        {/* Search */}
        <label htmlFor="category-search" className="sr-only">Filter courses</label>
        <input
          id="category-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter courses..."
          className="w-full sm:max-w-sm mb-4 px-3 py-2 rounded-md border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-6" role="toolbar" aria-label="Filter options">
          <div role="group" aria-label="Level filters" className="flex flex-wrap gap-2">
            {levels.map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                aria-pressed={level === l}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${level === l ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:bg-accent"}`}
              >
                {l}
              </button>
            ))}
          </div>
          <span className="w-px bg-border mx-1" aria-hidden="true" />
          <div role="group" aria-label="Price filters" className="flex flex-wrap gap-2">
            {prices.map((p) => (
              <button
                key={p}
                onClick={() => setPrice(p)}
                aria-pressed={price === p}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${price === p ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:bg-accent"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Feed */}
        <div className="flex flex-col gap-3" role="list" aria-label="Course list">
          {filtered.length === 0 && <p className="text-muted-foreground text-sm py-8 text-center">No courses match your filters.</p>}
          {filtered.map((c) => (
            <CourseFeedItem key={c.id} course={c} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Category;
