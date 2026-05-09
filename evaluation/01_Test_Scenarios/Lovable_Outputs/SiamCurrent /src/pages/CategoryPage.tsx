import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BreakingTicker from "@/components/BreakingTicker";
import SkipToContent from "@/components/SkipToContent";
import NewsCard from "@/components/NewsCard";
import { getArticlesByCategory } from "@/data/news";

interface CategoryPageProps {
  category: "business" | "entertainment";
}

const CategoryPage = ({ category }: CategoryPageProps) => {
  const allArticles = getArticlesByCategory(category);
  const [visibleCount, setVisibleCount] = useState(3);
  const visible = allArticles.slice(0, visibleCount);
  const title = category.charAt(0).toUpperCase() + category.slice(1);
  const hasMore = visibleCount < allArticles.length;

  return (
    <div className="min-h-screen flex flex-col">
      <SkipToContent />
      <BreakingTicker />
      <SiteHeader />

      <main className="flex-1" id="main-content">
        <div className="container mx-auto px-4 py-8">
          {/* Category Header */}
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-black">{title}</h1>
            <div className="w-16 h-0.5 bg-primary mt-3" role="presentation" />
          </div>

          {/* Main Feed */}
          <div className="space-y-5 max-w-3xl" role="feed" aria-label={`${title} articles`}>
            {visible.map((a) => (
              <NewsCard key={a.id} article={a} variant="horizontal" />
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setVisibleCount((c) => c + 3)}
                className="px-8 py-2.5 rounded-md bg-primary text-primary-foreground font-sans text-sm font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={`Load more ${title.toLowerCase()} articles`}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default CategoryPage;
