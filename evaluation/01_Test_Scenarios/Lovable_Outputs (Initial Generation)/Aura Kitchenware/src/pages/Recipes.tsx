import { useState } from "react";
import { motion } from "framer-motion";
import { recipes, recipeCategories } from "@/data/recipes";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus } from "lucide-react";

const Recipes = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [servingMultipliers, setServingMultipliers] = useState<Record<string, number>>({});

  const filtered = selectedCategory === "All"
    ? recipes
    : recipes.filter((r) => r.category === selectedCategory);

  const getMultiplier = (id: string) => servingMultipliers[id] ?? 1;

  const adjustServings = (id: string, delta: number) => {
    setServingMultipliers((prev) => {
      const current = prev[id] ?? 1;
      const next = Math.max(0.5, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const scrollToRecipe = (id: string) => {
    document.getElementById(`recipe-${id}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <SEOHead title="Recipes" description="Delicious recipes designed to showcase your Aura kitchenware. Quick meals, healthy options, and desserts." />
      <section className="section-padding text-center">
        <h1 className="heading-display text-4xl">Recipes</h1>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto">
          Delicious recipes designed to showcase your Aura kitchenware
        </p>

        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {recipeCategories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      {/* Jump-to buttons */}
      <section className="container-tight px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex gap-3 flex-wrap justify-center">
          {filtered.map((r) => (
            <Button
              key={r.id}
              variant="outline"
              size="sm"
              onClick={() => scrollToRecipe(r.id)}
            >
              Jump to: {r.title}
            </Button>
          ))}
        </div>
      </section>

      {/* Recipe Details */}
      <section className="container-tight px-4 sm:px-6 lg:px-8 pb-24 space-y-16">
        {filtered.map((recipe) => {
          const mult = getMultiplier(recipe.id);
          return (
            <motion.div
              key={recipe.id}
              id={`recipe-${recipe.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="scroll-mt-24"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full rounded-lg object-cover aspect-[4/3]"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2 flex-wrap">
                    {recipe.tags.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                    ))}
                  </div>
                  <h2 className="heading-display text-2xl">{recipe.title}</h2>
                  <p className="text-sm text-muted-foreground">{recipe.prepTime} · {recipe.category}</p>

                  {/* Serving toggle */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">Servings:</span>
                    <button
                      onClick={() => adjustServings(recipe.id, -0.5)}
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                      aria-label="Decrease servings"
                    >
                      <Minus className="w-3 h-3" aria-hidden="true" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">
                      {recipe.servings * mult}
                    </span>
                    <button
                      onClick={() => adjustServings(recipe.id, 0.5)}
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                      aria-label="Increase servings"
                    >
                      <Plus className="w-3 h-3" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Split view: ingredients vs steps */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    <div>
                      <h3 className="text-sm font-medium uppercase tracking-wider mb-3 text-muted-foreground">Ingredients</h3>
                      <ul className="space-y-2">
                        {recipe.ingredients.map((ing, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span> {ing}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium uppercase tracking-wider mb-3 text-muted-foreground">Steps</h3>
                      <ol className="space-y-3">
                        {recipe.steps.map((step, i) => (
                          <li key={i} className="text-sm flex gap-3">
                            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs shrink-0">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Kitchenware recommendations */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Made with</p>
                    <div className="flex gap-2 flex-wrap">
                      {recipe.kitchenware.map((k) => (
                        <Badge key={k} className="bg-secondary text-secondary-foreground text-xs">{k}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
};

export default Recipes;
