import { useState, useMemo } from "react";
import { Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { toast } from "sonner";

interface Review {
  id: number;
  name: string;
  rating: number;
  category: string;
  date: string;
  text: string;
}

const initialReviews: Review[] = [
  { id: 1, name: "Sarah Chen", rating: 5, category: "Concierge", date: "2026-03-28", text: "The concierge service exceeded all my expectations. Truly white-glove treatment." },
  { id: 2, name: "Marcus Reed", rating: 4, category: "Networking", date: "2026-03-20", text: "Great networking events. Met key partners that accelerated my business growth." },
  { id: 3, name: "Priya Patel", rating: 5, category: "Support", date: "2026-03-15", text: "24/7 support is phenomenal. Every issue resolved within the hour." },
  { id: 4, name: "James Wu", rating: 4, category: "Concierge", date: "2026-02-28", text: "Excellent concierge for travel arrangements. Saved me countless hours." },
  { id: 5, name: "Elena Voss", rating: 5, category: "Networking", date: "2026-02-10", text: "The annual retreat was a game-changer for my professional network." },
  { id: 6, name: "David Kim", rating: 3, category: "Support", date: "2026-01-22", text: "Good support overall, though response times vary on weekends." },
];

const categories = ["All", "Concierge", "Networking", "Support"];

const Stars = ({ count, interactive, onChange }: { count: number; interactive?: boolean; onChange?: (n: number) => void }) => (
  <div className="flex gap-0.5" role={interactive ? "radiogroup" : "img"} aria-label={interactive ? "Select rating" : `${count} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        size={interactive ? 24 : 14}
        className={`${n <= count ? "fill-gold text-gold" : "text-border"} ${interactive ? "cursor-pointer" : ""}`}
        onClick={() => interactive && onChange?.(n)}
        role={interactive ? "radio" : undefined}
        aria-checked={interactive ? n === count : undefined}
        aria-label={interactive ? `${n} star${n > 1 ? "s" : ""}` : undefined}
        tabIndex={interactive ? 0 : undefined}
        onKeyDown={interactive ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onChange?.(n); } } : undefined}
      />
    ))}
  </div>
);

const ProductReviews = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [filterCat, setFilterCat] = useState("All");
  const [filterRating, setFilterRating] = useState(0);
  const [sortBy, setSortBy] = useState<"date" | "rating">("date");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", rating: 0, category: "Concierge", text: "" });

  const filtered = useMemo(() => {
    let list = [...reviews];
    if (filterCat !== "All") list = list.filter((r) => r.category === filterCat);
    if (filterRating > 0) list = list.filter((r) => r.rating === filterRating);
    list.sort((a, b) => (sortBy === "date" ? b.date.localeCompare(a.date) : b.rating - a.rating));
    return list;
  }, [reviews, filterCat, filterRating, sortBy]);

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "0";

  const submitReview = () => {
    if (!newReview.name.trim() || !newReview.text.trim() || newReview.rating === 0) {
      toast.error("Please fill all fields and select a rating");
      return;
    }
    setReviews((p) => [
      { ...newReview, id: Date.now(), date: new Date().toISOString().slice(0, 10) },
      ...p,
    ]);
    setNewReview({ name: "", rating: 0, category: "Concierge", text: "" });
    setDialogOpen(false);
    toast.success("Review submitted!");
  };

  return (
    <Layout>
      <SEOHead title="Member Reviews" description="Read reviews from EliteAccess members and share your own experience." />
      <section className="section-padding">
        <div className="container-narrow">
          {/* Header */}
          <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-4xl font-bold text-foreground">Member Reviews</h1>
              <p className="mt-1 text-muted-foreground">See what our members are saying</p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>Submit a Review</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Write a Review</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => { e.preventDefault(); submitReview(); }} className="space-y-4 pt-2">
                  <div>
                    <label htmlFor="review-name" className="mb-1 block text-sm font-medium text-foreground">Your Name</label>
                    <input
                      id="review-name"
                      value={newReview.name}
                      onChange={(e) => setNewReview((p) => ({ ...p, name: e.target.value }))}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Your name"
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Rating</label>
                    <Stars count={newReview.rating} interactive onChange={(n) => setNewReview((p) => ({ ...p, rating: n }))} />
                  </div>
                  <div>
                    <label htmlFor="review-category" className="mb-1 block text-sm font-medium text-foreground">Category</label>
                    <select
                      id="review-category"
                      value={newReview.category}
                      onChange={(e) => setNewReview((p) => ({ ...p, category: e.target.value }))}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option>Concierge</option>
                      <option>Networking</option>
                      <option>Support</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="review-text" className="mb-1 block text-sm font-medium text-foreground">Review</label>
                    <textarea
                      id="review-text"
                      value={newReview.text}
                      onChange={(e) => setNewReview((p) => ({ ...p, text: e.target.value }))}
                      rows={3}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Share your experience..."
                      maxLength={1000}
                    />
                  </div>
                  <Button type="submit" className="w-full">Submit</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Rating Summary */}
          <div className="mb-10 flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-8 sm:flex-row" aria-label="Rating summary">
            <div className="text-center">
              <div className="text-5xl font-bold text-foreground">{avgRating}</div>
              <Stars count={Math.round(Number(avgRating))} />
              <p className="mt-1 text-xs text-muted-foreground">{reviews.length} reviews</p>
            </div>
            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((n) => {
                const count = reviews.filter((r) => r.rating === n).length;
                const pct = reviews.length ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={n} className="flex items-center gap-2 text-sm">
                    <span className="w-3 text-muted-foreground">{n}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-border" role="meter" aria-valuenow={count} aria-valuemin={0} aria-valuemax={reviews.length} aria-label={`${n} star reviews`}>
                      <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-6 text-right text-xs text-muted-foreground">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap items-center gap-3" role="toolbar" aria-label="Filter reviews">
            <Filter size={16} className="text-muted-foreground" aria-hidden="true" />
            <div className="flex gap-2" role="group" aria-label="Category filter">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilterCat(c)}
                  aria-pressed={filterCat === c}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                    filterCat === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <label htmlFor="filter-rating" className="sr-only">Filter by rating</label>
            <select
              id="filter-rating"
              value={filterRating}
              onChange={(e) => setFilterRating(Number(e.target.value))}
              className="rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value={0}>All Ratings</option>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{n} Stars</option>
              ))}
            </select>
            <label htmlFor="sort-by" className="sr-only">Sort reviews</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "rating")}
              className="rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="date">Newest</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Review List */}
          <div className="space-y-4" aria-live="polite">
            {filtered.map((r) => (
              <article key={r.id} className="rounded-xl border border-border bg-card p-6">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary" aria-hidden="true">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{r.name}</p>
                      <time className="text-xs text-muted-foreground" dateTime={r.date}>{r.date}</time>
                    </div>
                  </div>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">{r.category}</span>
                </div>
                <Stars count={r.rating} />
                <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
              </article>
            ))}
            {filtered.length === 0 && (
              <p className="py-12 text-center text-muted-foreground">No reviews match your filters.</p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductReviews;
