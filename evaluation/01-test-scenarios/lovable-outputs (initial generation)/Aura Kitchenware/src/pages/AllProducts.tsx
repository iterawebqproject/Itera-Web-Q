import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import hero3 from "@/assets/hero-3.jpg";

const ITEMS_PER_PAGE = 6;

const AllProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const colorOptions = [
    { name: "Terracotta", hex: "#FE5A1D" },
    { name: "Cream", hex: "#F5F0E8" },
  ];

  const toggleColor = (name: string) =>
    setSelectedColors((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (selectedColors.length > 0 && !p.colors.some((c) => selectedColors.includes(c.name)))
        return false;
      return true;
    });
  }, [selectedCategory, priceRange, selectedColors]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div>
      <SEOHead title="Shop All Products" description="Browse Aura's full collection of handcrafted ceramic pots, pans, kettles, and kitchen tools." />
      {/* Seasonal Banner */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <img src={hero3} alt="Spring Collection" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-display text-3xl sm:text-4xl text-primary-foreground">Shop the Collection</h1>
            <p className="text-primary-foreground/80 mt-2">Timeless pieces for the modern kitchen</p>
          </div>
        </div>
      </div>

      <div className="container-tight section-padding">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter */}
          <aside className="lg:w-56 shrink-0 space-y-6">
            <div>
              <h3 className="heading-display text-sm mb-3 uppercase tracking-wider">Category</h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => { setSelectedCategory(cat); setPage(1); }}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="heading-display text-sm mb-3 uppercase tracking-wider">Color</h3>
              <div className="flex gap-3">
                {colorOptions.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => { toggleColor(c.name); setPage(1); }}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColors.includes(c.name)
                        ? "border-primary scale-110 ring-2 ring-primary/30"
                        : "border-border"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="heading-display text-sm mb-3 uppercase tracking-wider">Price</h3>
              <Slider
                min={0}
                max={200}
                step={5}
                value={priceRange}
                onValueChange={(v) => { setPriceRange(v); setPage(1); }}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {paginated.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">No products match your filters.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginated.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    variant={page === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
