import { Coffee, Croissant, Home, ShoppingBag, Check } from "lucide-react";
import Layout from "@/components/Layout";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const categories = [
  { name: "Drinks", icon: Coffee, items: ["Espresso", "Cortado", "Cold Brew", "Matcha Latte"] },
  { name: "Food", icon: Croissant, items: ["Almond Croissant", "Avocado Toast", "Açaí Bowl", "Banana Bread"] },
  { name: "At Home", icon: Home, items: ["Whole Bean 250g", "Ground Coffee 250g", "Cold Brew Kit", "Pour Over Set"] },
  { name: "Merch", icon: ShoppingBag, items: ["Ceramic Mug", "Tote Bag", "Apron", "Travel Tumbler"] },
];

const nutritionData = [
  { item: "Espresso", cal: 5, organic: true, vegan: true },
  { item: "Cortado", cal: 60, organic: true, vegan: false },
  { item: "Cold Brew", cal: 10, organic: true, vegan: true },
  { item: "Matcha Latte", cal: 120, organic: true, vegan: true },
  { item: "Almond Croissant", cal: 340, organic: false, vegan: false },
  { item: "Avocado Toast", cal: 280, organic: true, vegan: true },
];

const MenuPage = () => {
  useDocumentTitle("Menu", "Browse Arbor Coffee & Co.'s menu of sustainably sourced drinks, food, at-home brewing, and merchandise.");

  return (
    <Layout>
      <section className="py-20" aria-labelledby="menu-heading">
        <div className="container text-center max-w-2xl">
          <h1 id="menu-heading" className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">Our Menu</h1>
          <p className="text-muted-foreground">Thoughtfully crafted, sustainably sourced.</p>
        </div>
      </section>

      {/* Category Grid */}
      <section className="pb-16" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="sr-only">Menu Categories</h2>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <article key={cat.name} className="bg-secondary/50 rounded-lg p-6">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4" aria-hidden="true">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-primary mb-3">{cat.name}</h3>
                  <ul className="space-y-1.5">
                    {cat.items.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Nutrition Table */}
      <section className="py-16 border-t border-border" aria-labelledby="nutrition-heading">
        <div className="container max-w-2xl">
          <h2 id="nutrition-heading" className="font-display text-2xl font-bold text-primary mb-8 text-center">Nutrition at a Glance</h2>
          <table className="w-full" role="table">
            <thead>
              <tr className="text-xs text-muted-foreground tracking-wider font-semibold">
                <th className="text-left pb-2 font-semibold" scope="col">Item</th>
                <th className="text-center pb-2 font-semibold" scope="col">Calories</th>
                <th className="text-center pb-2 font-semibold" scope="col">Organic</th>
                <th className="text-center pb-2 font-semibold" scope="col">Vegan</th>
              </tr>
            </thead>
            <tbody>
              {nutritionData.map((row) => (
                <tr key={row.item} className="border-b border-border/50">
                  <td className="text-sm text-primary font-medium py-3">{row.item}</td>
                  <td className="text-sm text-muted-foreground text-center py-3">{row.cal}</td>
                  <td className="text-center py-3">
                    {row.organic ? <Check className="w-4 h-4 text-success mx-auto" aria-label="Yes" /> : <span className="sr-only">No</span>}
                  </td>
                  <td className="text-center py-3">
                    {row.vegan ? <Check className="w-4 h-4 text-success mx-auto" aria-label="Yes" /> : <span className="sr-only">No</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
};

export default MenuPage;
