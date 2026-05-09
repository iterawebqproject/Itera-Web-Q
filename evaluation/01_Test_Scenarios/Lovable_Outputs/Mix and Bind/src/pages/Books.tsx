import { useState } from "react";
import { Button } from "@/components/ui/button";
import PageMeta from "@/components/PageMeta";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

const allProducts = [
  { id: 1, name: "Midnight Journal", price: "$24", image: product1, size: "A5", color: "Navy", ruling: "Dotted", tag: "Best Seller" },
  { id: 2, name: "Sunset Notebook", price: "$22", image: product2, size: "B6", color: "Orange", ruling: "Ruled", tag: "New" },
  { id: 3, name: "Forest Diary", price: "$26", image: product3, size: "A5", color: "Green", ruling: "Blank", tag: "" },
  { id: 4, name: "Cloud Sketchbook", price: "$28", image: product1, size: "A4", color: "Navy", ruling: "Blank", tag: "" },
  { id: 5, name: "Ember Planner", price: "$30", image: product2, size: "A5", color: "Orange", ruling: "Grid", tag: "Best Seller" },
  { id: 6, name: "Moss Field Notes", price: "$18", image: product3, size: "Pocket", color: "Green", ruling: "Ruled", tag: "New" },
];

const filters = {
  Size: ["Pocket", "B6", "A5", "A4"],
  Color: ["Navy", "Orange", "Green"],
  Ruling: ["Dotted", "Ruled", "Blank", "Grid"],
};

const quickChips = ["All", "Best Sellers", "New"];

const Books = () => {
  const [activeChip, setActiveChip] = useState("All");
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

  const toggleFilter = (category: string, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[category] || [];
      return {
        ...prev,
        [category]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
      };
    });
  };

  const filtered = allProducts.filter((p) => {
    if (activeChip === "Best Sellers" && p.tag !== "Best Seller") return false;
    if (activeChip === "New" && p.tag !== "New") return false;
    for (const [cat, vals] of Object.entries(activeFilters)) {
      if (vals.length > 0) {
        const key = cat.toLowerCase() as keyof typeof p;
        if (key === "size" && !vals.includes(p.size)) return false;
        if (key === "color" && !vals.includes(p.color)) return false;
        if (key === "ruling" && !vals.includes(p.ruling)) return false;
      }
    }
    return true;
  });

  return (
    <div className="py-12">
      <PageMeta title="Shop All Notebooks – Mix & Bind" description="Browse custom handmade notebooks. Filter by size, color, and ruling to find your perfect journal." path="/books" />
      <div className="container">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-foreground">Shop All</h1>
          <p className="text-muted-foreground mt-1">{filtered.length} items</p>
        </div>

        {/* Quick Chips */}
        <div className="flex gap-3 mb-8">
          {quickChips.map((chip) => (
            <Button
              key={chip}
              variant={activeChip === chip ? "tangerine" : "tangerine-outline"}
              size="sm"
              onClick={() => setActiveChip(chip)}
            >
              {chip}
            </Button>
          ))}
        </div>

        <div className="flex gap-10">
          {/* Sidebar */}
          <aside className="hidden md:block w-52 flex-shrink-0">
            {Object.entries(filters).map(([category, options]) => (
              <div key={category} className="mb-6">
                <h3 className="text-sm font-bold text-foreground mb-3">{category}</h3>
                <div className="space-y-2">
                  {options.map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                      <input
                        type="checkbox"
                        checked={(activeFilters[category] || []).includes(opt)}
                        onChange={() => toggleFilter(category, opt)}
                        className="w-4 h-4 rounded border-border accent-primary"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <div key={p.id} className="bg-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" width={600} height={800} />
                  </div>
                  <div className="p-4">
                    {p.tag && <span className="text-xs font-bold text-primary">{p.tag}</span>}
                    <h3 className="font-bold text-foreground mt-1">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">{p.size} · {p.ruling}</p>
                    <p className="text-foreground font-semibold mt-2">{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-20">No products match your filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
