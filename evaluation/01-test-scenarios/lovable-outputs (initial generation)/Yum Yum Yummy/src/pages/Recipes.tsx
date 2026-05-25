import { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { recipes } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";
import chefPortrait from "@/assets/chef-portrait.jpg";
import { Printer, ArrowDown, Check } from "lucide-react";

const Recipes = () => {
  const [searchParams] = useSearchParams();
  const recipeId = searchParams.get("id");
  const recipeCardRef = useRef<HTMLDivElement>(null);

  const recipe = recipeId ? recipes.find((r) => r.id === recipeId) : null;

  if (!recipe) {
    return (
      <Layout>
        <SEOHead
          title="Our Recipes"
          description="Browse all our beginner-friendly recipes with step-by-step instructions and big, beautiful photos."
          path="/recipes"
        />
        <section className="container mx-auto px-4 py-16">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Our Recipes
          </h1>
          <p className="text-center text-muted-foreground font-body mb-10">
            Choose a recipe to get started!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recipes.map((r) => (
              <RecipeCard key={r.id} {...r} />
            ))}
          </div>
        </section>
      </Layout>
    );
  }

  return <RecipeDetail recipe={recipe} recipeCardRef={recipeCardRef} />;
};

const RecipeDetail = ({
  recipe,
  recipeCardRef,
}: {
  recipe: (typeof recipes)[0];
  recipeCardRef: React.RefObject<HTMLDivElement>;
}) => {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(recipe.ingredients.length).fill(false)
  );

  const jumpToRecipe = () => {
    recipeCardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleIngredient = (index: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const recipeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    image: recipe.image,
    author: { "@type": "Person", name: recipe.author },
    prepTime: `PT${recipe.prepTime.replace(/\s/g, "").toUpperCase()}`,
    cookTime: `PT${recipe.cookTime.replace(/\s/g, "").toUpperCase()}`,
    recipeYield: `${recipe.servings} servings`,
    recipeCategory: recipe.category,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: step,
    })),
  };

  return (
    <Layout>
      <SEOHead
        title={recipe.title}
        description={recipe.description}
        path={`/recipes?id=${recipe.id}`}
        type="article"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }}
      />

      {/* Hero image */}
      <div className="w-full h-[40vh] min-h-[300px] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
          width={800}
          height={800}
          fetchPriority="high"
        />
      </div>

      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <span className="text-xs font-body text-primary font-medium uppercase tracking-wider">
          {recipe.category}
        </span>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
          {recipe.title}
        </h1>
        <p className="font-body text-muted-foreground leading-relaxed mb-6">
          {recipe.description}
        </p>

        {/* Quick meta */}
        <dl className="flex flex-wrap gap-6 text-sm font-body text-foreground/70 mb-8">
          <div>
            <dt className="sr-only">Prep time</dt>
            <dd>⏱ Prep: {recipe.prepTime}</dd>
          </div>
          <div>
            <dt className="sr-only">Cook time</dt>
            <dd>🔥 Cook: {recipe.cookTime}</dd>
          </div>
          <div>
            <dt className="sr-only">Servings</dt>
            <dd>🍽 Servings: {recipe.servings}</dd>
          </div>
        </dl>

        {/* Action buttons */}
        <div className="flex gap-3 mb-12">
          <button
            onClick={jumpToRecipe}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-body font-semibold text-sm hover:opacity-90 transition-opacity"
            aria-label="Jump to recipe card"
          >
            <ArrowDown size={16} aria-hidden="true" /> Jump to Recipe
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-body font-semibold text-sm hover:opacity-90 transition-opacity"
            aria-label="Print this recipe"
          >
            <Printer size={16} aria-hidden="true" /> Print Recipe
          </button>
        </div>

        {/* Interactive Recipe Card */}
        <div
          ref={recipeCardRef}
          className="bg-card border border-border rounded-xl p-8 shadow-sm"
        >
          <h2 className="font-heading text-2xl font-bold text-card-foreground mb-6">
            {recipe.title}
          </h2>

          {/* Ingredients */}
          <h3 className="font-heading text-lg font-semibold text-card-foreground mb-3">
            Ingredients
          </h3>
          <ul className="space-y-2 mb-8" aria-label="Ingredients checklist">
            {recipe.ingredients.map((ing, i) => (
              <li
                key={i}
                className="flex items-center gap-3 cursor-pointer font-body text-sm"
                onClick={() => toggleIngredient(i)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleIngredient(i); } }}
                role="checkbox"
                aria-checked={checked[i]}
                tabIndex={0}
              >
                <span
                  className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
                    checked[i]
                      ? "bg-primary border-primary"
                      : "border-border"
                  }`}
                  aria-hidden="true"
                >
                  {checked[i] && <Check size={14} className="text-primary-foreground" />}
                </span>
                <span
                  className={
                    checked[i]
                      ? "line-through text-muted-foreground"
                      : "text-card-foreground"
                  }
                >
                  {ing}
                </span>
              </li>
            ))}
          </ul>

          {/* Instructions */}
          <h3 className="font-heading text-lg font-semibold text-card-foreground mb-3">
            Instructions
          </h3>
          <ol className="space-y-4">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex gap-4 font-body text-sm text-card-foreground">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold" aria-hidden="true">
                  {i + 1}
                </span>
                <p className="leading-relaxed pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Author Signature */}
        <aside className="flex items-center gap-4 mt-12 p-6 bg-accent/50 rounded-xl" aria-label="Recipe author">
          <img
            src={chefPortrait}
            alt={`Photo of ${recipe.author}`}
            loading="lazy"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h4 className="font-heading text-sm font-bold text-foreground">
              {recipe.author}
            </h4>
            <p className="font-body text-xs text-muted-foreground">
              Home cook & recipe creator at Yum Yum Yummy. I believe everyone can make delicious food!
            </p>
          </div>
        </aside>
      </article>
    </Layout>
  );
};

export default Recipes;
