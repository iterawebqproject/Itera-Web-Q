import { Droplets, BookOpen, Flame, Feather, Gem, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import SEOHead from "@/components/SEOHead";

const products = [
  { id: "serenity-oil", icon: Droplets, name: "Serenity Essential Oil", price: "$38", badge: "Self-Love Choice" },
  { id: "inner-garden-journal", icon: BookOpen, name: "The Inner Garden Journal", price: "$24", badge: "Self-Love Choice" },
  { id: "ritual-candle", icon: Flame, name: "Ritual Soy Candle", price: "$32", badge: null },
  { id: "affirmation-cards", icon: Feather, name: "Daily Affirmation Cards", price: "$18", badge: "Self-Love Choice" },
  { id: "crystal-set", icon: Gem, name: "Clarity Crystal Set", price: "$56", badge: null },
  { id: "herbal-tea", icon: Leaf, name: "Bloom Herbal Tea Blend", price: "$22", badge: "Self-Love Choice" },
];

const Product = () => (
  <main id="main-content" className="pt-24 pb-16">
    <SEOHead title="Shop" description="Browse Alice's curated wellness essentials — oils, journals, candles, and more for your self-love journey." />
    <div className="container max-w-4xl px-6">
      <ScrollReveal>
        <h1 className="font-heading text-4xl md:text-5xl text-center mb-4">The Shop</h1>
        <p className="text-center text-muted-foreground mb-16">Curated essentials for your self-love journey.</p>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-6" role="list" aria-label="Product catalog">
        {products.map((p, i) => (
          <ScrollReveal key={p.id} delay={i * 0.08}>
            <Link to={`/product/${p.id}`} className="group block hover-lift bg-card rounded-lg p-8 border border-border" role="listitem" aria-label={`${p.name} — ${p.price}`}>
              <p.icon className="w-10 h-10 text-foreground group-hover:text-primary transition-colors duration-300 mb-4" strokeWidth={1.2} aria-hidden="true" />
              <h3 className="font-heading text-lg mb-2">{p.name}</h3>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">{p.price}</span>
                {p.badge && (
                  <span className="text-[10px] tracking-widest uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-sm">
                    {p.badge}
                  </span>
                )}
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </main>
);

export default Product;
