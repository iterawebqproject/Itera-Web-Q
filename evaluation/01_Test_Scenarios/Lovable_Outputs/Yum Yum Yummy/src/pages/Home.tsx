import { useState } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import RecipeCard from "@/components/RecipeCard";
import { recipes, categories } from "@/data/recipes";
import heroImage from "@/assets/hero-food.jpg";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Home = () => {
  const [email, setEmail] = useState("");
  const trending = recipes.slice(0, 3);
  const recent = recipes.slice(0, 4);

  return (
    <Layout>
      <SEOHead
        title="Yum Yum Yummy – Easy Recipes for Everyone"
        description="Simple, beautiful recipes for kitchen beginners. Big photos, clear steps, and a clean layout to help you enjoy cooking at home."
        path="/"
      />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden" aria-label="Hero banner">
        <img
          src={heroImage}
          alt="A beautifully arranged spread of fresh, colorful food on a kitchen table"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-card mb-4">
              Yum Yum Yummy
            </h1>
            <p className="font-body text-lg md:text-xl text-card/90 max-w-lg mx-auto">
              Simple, beautiful recipes for every kitchen
            </p>
            <Link
              to="/recipes"
              className="inline-block mt-6 px-8 py-3 bg-primary text-primary-foreground rounded-full font-body font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Start Here
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Recipes */}
      <section className="container mx-auto px-4 py-16" aria-label="Trending recipes">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
          Trending Recipes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trending.map((r) => (
            <RecipeCard key={r.id} {...r} />
          ))}
        </div>
      </section>

      {/* Category Circles */}
      <section className="container mx-auto px-4 py-12" aria-label="Browse by category">
        <h2 className="font-heading text-2xl font-bold text-foreground text-center mb-8">
          Browse by Category
        </h2>
        <div className="flex flex-wrap justify-center gap-8" role="list">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/food?category=${cat.name}`}
              className="category-circle"
              role="listitem"
              aria-label={`Browse ${cat.name} recipes`}
            >
              <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-3xl shadow-sm" aria-hidden="true">
                {cat.emoji}
              </div>
              <span className="font-body text-sm text-foreground/80">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="container mx-auto px-4 py-16" aria-label="Recent posts">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
          Recent Posts
        </h2>
        <div className="space-y-8 max-w-3xl mx-auto">
          {recent.map((r) => (
            <Link
              key={r.id}
              to={`/recipes?id=${r.id}`}
              className="flex flex-col sm:flex-row gap-6 group"
            >
              <div className="sm:w-48 sm:h-48 flex-shrink-0 overflow-hidden rounded-lg">
                <img
                  src={r.image}
                  alt={r.title}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="w-full h-48 sm:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xs font-body text-primary font-medium uppercase tracking-wider">
                  {r.category}
                </span>
                <h3 className="font-heading text-xl font-semibold text-foreground mt-1 group-hover:text-primary transition-colors">
                  {r.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {r.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Maroon Signup Bar */}
      <section className="bg-maroon py-16" aria-label="Newsletter signup">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-maroon-foreground mb-3">
            Never Miss a Recipe
          </h2>
          <p className="font-body text-maroon-foreground/80 mb-6 max-w-md mx-auto">
            Join our newsletter and get new recipes delivered straight to your inbox every week.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEmail("");
              toast.success("Thanks for subscribing! 🎉");
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-full bg-maroon-foreground text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
              autoComplete="email"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-body font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
