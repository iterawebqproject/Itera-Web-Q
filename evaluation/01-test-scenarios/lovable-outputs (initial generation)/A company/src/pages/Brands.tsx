import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import PageMeta from "@/components/PageMeta";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

const products = [
  { name: "Luxe Reserve", category: "Beverages", image: product1, description: "Our premium artisan beverage crafted from the finest ingredients sourced from sustainable farms worldwide." },
  { name: "Naturals Glow", category: "Beauty", image: product2, description: "A luxurious skincare line that harnesses the power of nature with proprietary botanical extracts." },
  { name: "Gourmet Select", category: "Food", image: product3, description: "Curated gourmet snack collections featuring artisan treats from around the world." },
  { name: "Heritage Roast", category: "Coffee", image: product4, description: "Single-origin, ethically sourced coffee beans roasted to perfection in small batches." },
  { name: "Bloom Tea", category: "Tea", image: product5, description: "Premium organic tea blends featuring rare varietals, hand-picked and naturally processed." },
  { name: "Vitality Plus", category: "Wellness", image: product6, description: "Science-backed wellness supplements designed to support your daily health goals." },
];

const Brands = () => {
  const [selected, setSelected] = useState<typeof products[0] | null>(null);

  return (
    <main id="main-content" className="pt-20">
      <PageMeta
        title="Brands"
        description="Explore A Company's portfolio of premium products across beverages, beauty, food, coffee, tea, and wellness categories."
        canonical="https://vision-spotlight-72.lovable.app/brands"
      />

      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-primary-foreground mb-4">Our Brands</h1>
          <p className="text-lg text-primary-foreground/70">Explore our portfolio of premium products across categories.</p>
        </div>
      </section>

      <section className="section-padding" aria-labelledby="products-heading">
        <h2 id="products-heading" className="sr-only">Product Gallery</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <article key={p.name} className="group bg-card rounded-lg overflow-hidden border border-border card-hover">
              <div className="aspect-square overflow-hidden">
                <img src={p.image} alt={`${p.name} – ${p.category}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={640} height={640} decoding="async" />
              </div>
              <div className="p-6">
                <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">{p.category}</p>
                <h3 className="text-xl font-bold text-secondary mb-3">{p.name}</h3>
                <Button variant="hero" size="sm" onClick={() => setSelected(p)} aria-label={`Explore ${p.name}`}>
                  Explore
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="sm:max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selected.name}</DialogTitle>
                <DialogDescription className="text-xs text-primary font-bold uppercase tracking-wider">{selected.category}</DialogDescription>
              </DialogHeader>
              <img src={selected.image} alt={`${selected.name} product`} className="w-full h-64 object-cover rounded-lg" />
              <p className="text-muted-foreground text-sm leading-relaxed">{selected.description}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Brands;
