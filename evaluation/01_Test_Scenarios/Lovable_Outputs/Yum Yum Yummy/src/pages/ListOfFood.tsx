import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import RecipeCard from "@/components/RecipeCard";
import { recipes, categories } from "@/data/recipes";
import { Search } from "lucide-react";

const ListOfFood = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const [query, setQuery] = useState("");

  const filtered = recipes.filter((r) => {
    const matchesCategory = categoryFilter ? r.category === categoryFilter : true;
    const matchesQuery = query
      ? r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.description.toLowerCase().includes(query.toLowerCase())
      : true;
    return matchesCategory && matchesQuery;
  });

  return (
    <Layout>
      <SEOHead
        title="Browse All Recipes"
        description="Search and browse our full collection of beginner-friendly recipes by category, ingredient, or keyword."
        path="/food"
      />

      {/* Visual Search */}
      <section className="container mx-auto px-4 pt-16 pb-8 text-center" aria-label="Recipe search">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
          Browse All Recipes
        </h1>
        <div className="max-w-lg mx-auto relative">
          <label htmlFor="recipe-search" className="sr-only">Search recipes</label>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} aria-hidden="true" />
          <input
            id="recipe-search"
            type="search"
            placeholder="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-card text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            autoComplete="off"
          />
        </div>
        <Link
          to="/food"
          className="inline-block mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-full font-body text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Browse All Recipes
        </Link>
      </section>

      {/* Topic Clusters */}
      <section className="container mx-auto px-4 py-8" aria-label="Category filters">
        <h2 className="font-heading text-xl font-bold text-foreground mb-4">Popular Categories</h2>
        <nav aria-label="Recipe categories" className="flex flex-wrap gap-3">
          <Link
            to="/food"
            className={`px-4 py-2 rounded-full text-sm font-body transition-colors ${
              !categoryFilter
                ? "bg-primary text-primary-foreground"
                : "bg-accent text-accent-foreground hover:bg-primary/20"
            }`}
            aria-current={!categoryFilter ? "page" : undefined}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/food?category=${cat.name}`}
              className={`px-4 py-2 rounded-full text-sm font-body transition-colors ${
                categoryFilter === cat.name
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-accent-foreground hover:bg-primary/20"
              }`}
              aria-current={categoryFilter === cat.name ? "page" : undefined}
            >
              <span aria-hidden="true">{cat.emoji}</span> {cat.name}
            </Link>
          ))}
        </nav>
      </section>

      {/* Recipe Card Grid */}
      <section className="container mx-auto px-4 py-8 pb-16" aria-label="Recipe results">
        <div aria-live="polite" className="sr-only">
          {filtered.length} recipe{filtered.length !== 1 ? "s" : ""} found
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((r) => (
            <RecipeCard key={r.id} {...r} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground font-body py-12" role="status">
            No recipes found. Try a different search!
          </p>
        )}
      </section>
    </Layout>
  );
};

export default ListOfFood;
