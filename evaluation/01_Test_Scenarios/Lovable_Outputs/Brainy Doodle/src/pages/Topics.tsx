import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import ArticleCard from "@/components/ArticleCard";
import { articles, categories, type Category, getArticlesByCategory } from "@/data/articles";
import mascot from "@/assets/mascot.png";

export default function Topics() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCat = (searchParams.get("cat") as Category) || null;

  const filtered = activeCat ? getArticlesByCategory(activeCat) : articles;
  const activeCategory = categories.find((c) => c.id === activeCat);

  const doodleOfMonth = articles[2];

  return (
    <Layout>
      <SEOHead
        title={activeCategory ? activeCategory.label : "All Topics"}
        description={activeCategory ? `All articles about ${activeCategory.label.toLowerCase()} explained with stick figures.` : "Browse all topics covered by Brainy Doodle."}
        path="/topics"
      />
      <section className="container py-12">
        <div className="flex items-center gap-4 mb-8">
          <img src={mascot} alt="" width={64} height={64} loading="lazy" className="float" aria-hidden="true" />
          <div>
            <h1 className="font-display text-4xl md:text-5xl text-foreground">
              {activeCategory ? `${activeCategory.emoji} ${activeCategory.label}` : "All Topics"}
            </h1>
            <p className="font-body text-muted-foreground mt-1">
              {activeCategory
                ? `Everything we've scribbled about ${activeCategory.label.toLowerCase()}.`
                : "Browse all the nonsense, organized by category."}
            </p>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by category">
          <button
            onClick={() => setSearchParams({})}
            className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              !activeCat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
            aria-pressed={!activeCat}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSearchParams({ cat: cat.id })}
              className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                activeCat === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
              aria-pressed={activeCat === cat.id}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Doodle of the Month */}
        <div className="sketch-border bg-secondary/50 p-6 mb-10">
          <h2 className="font-display text-2xl text-secondary-foreground">🏆 Doodle of the Month</h2>
          <h3 className="font-display text-2xl text-foreground mt-1">{doodleOfMonth.title}</h3>
          <p className="font-body text-sm text-muted-foreground mt-2">{doodleOfMonth.excerpt}</p>
        </div>

        {/* Articles */}
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center font-body text-muted-foreground py-20" role="status">
            No scribbles here yet. Check back after the next coffee break.
          </p>
        )}
      </section>
    </Layout>
  );
}
