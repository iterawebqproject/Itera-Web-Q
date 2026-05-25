import { useState } from "react";
import { Printer } from "lucide-react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import recipeLatte from "@/assets/recipe-latte.jpg";
import recipeCake from "@/assets/recipe-cake.jpg";
import recipeIced from "@/assets/recipe-iced.jpg";

type Category = "All" | "Lattes" | "Cakes" | "Iced Drinks";

const recipes = [
  { title: "Classic Matcha Latte", img: recipeLatte, time: "5 min", badge: "Easy", category: "Lattes" as Category, instructions: "Sift 2g matcha into a bowl. Add 30ml hot water (80°C) and whisk until smooth. Steam 200ml milk and pour over the matcha. Sweeten to taste." },
  { title: "Matcha Cheesecake", img: recipeCake, time: "45 min + chill", badge: "Pro", category: "Cakes" as Category, instructions: "Blend cream cheese, sugar, eggs, and 10g matcha until smooth. Pour into a graham cracker crust. Bake at 160°C for 40 minutes. Chill for 4 hours before serving." },
  { title: "Iced Matcha Lemonade", img: recipeIced, time: "3 min", badge: "Easy", category: "Iced Drinks" as Category, instructions: "Whisk 2g matcha with 30ml warm water. Fill a glass with ice, add fresh lemonade, and pour the matcha on top. Stir gently for a marbled effect." },
  { title: "Matcha Oat Latte", img: recipeLatte, time: "5 min", badge: "Easy", category: "Lattes" as Category, instructions: "Sift 2g matcha into a cup. Add 30ml hot water and whisk. Steam 200ml oat milk and pour over. Top with a light dusting of matcha powder." },
  { title: "Matcha Mochi Cake", img: recipeCake, time: "50 min", badge: "Pro", category: "Cakes" as Category, instructions: "Mix glutinous rice flour, sugar, matcha, baking powder, eggs, butter, milk, and coconut milk. Bake at 175°C for 45 minutes until set." },
  { title: "Frozen Matcha Smoothie", img: recipeIced, time: "4 min", badge: "Easy", category: "Iced Drinks" as Category, instructions: "Blend 2g matcha, 1 frozen banana, 200ml almond milk, 1 tbsp honey, and a handful of ice until smooth. Pour and enjoy immediately." },
];

const categories: Category[] = ["All", "Lattes", "Cakes", "Iced Drinks"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Matcha Recipes",
  itemListElement: recipes.map((r, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: r.title,
  })),
};

const RecipesIndex = () => {
  const [active, setActive] = useState<Category>("All");
  const filtered = active === "All" ? recipes : recipes.filter((r) => r.category === active);

  return (
    <Layout>
      <SEOHead
        title="Matcha Recipes"
        description="Simple matcha recipes for lattes, cheesecakes, iced drinks, and more. Easy and pro-level instructions for home brewing."
        path="/recipes-index"
        jsonLd={jsonLd}
      />
      <section className="container py-20">
        <h1 className="font-heading text-4xl font-bold text-foreground text-center mb-4">Matcha Recipes</h1>
        <p className="font-body text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          Simple recipes for lattes, desserts, and refreshing iced drinks.
        </p>

        <div className="no-print flex justify-center gap-3 mb-12 flex-wrap" role="group" aria-label="Filter recipes by category">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={`rounded-full px-5 py-2 text-sm font-body font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                active === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {filtered.map((r) => (
            <article
              key={r.title}
              className="bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={r.img}
                  alt={r.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={640}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-heading text-lg font-bold text-card-foreground">{r.title}</h2>
                  <span
                    className={`rounded-full px-3 py-0.5 text-xs font-body font-semibold ${
                      r.badge === "Pro"
                        ? "bg-matcha-gold text-primary"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {r.badge}
                  </span>
                </div>
                <p className="font-body text-sm text-muted-foreground mb-3">
                  <time>{r.time}</time> prep
                </p>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{r.instructions}</p>
                <button
                  onClick={() => window.print()}
                  className="no-print inline-flex items-center gap-2 text-xs font-body font-semibold text-secondary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                  aria-label={`Print recipe: ${r.title}`}
                >
                  <Printer size={14} aria-hidden="true" />
                  Print Recipe
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default RecipesIndex;
