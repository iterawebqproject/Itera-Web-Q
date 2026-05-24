import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import JsonLd from "@/components/JsonLd";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

const CategoryIcon = ({ type }: { type: "cover" | "paper" | "size" }) => {
  if (type === "cover") return (
    <svg viewBox="0 0 80 80" className="w-16 h-16 mx-auto">
      <rect x="15" y="10" width="50" height="60" rx="4" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" />
      <line x1="20" y1="25" x2="60" y2="25" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <line x1="20" y1="35" x2="50" y2="35" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <line x1="20" y1="45" x2="55" y2="45" stroke="hsl(var(--primary))" strokeWidth="1.5" />
    </svg>
  );
  if (type === "paper") return (
    <svg viewBox="0 0 80 80" className="w-16 h-16 mx-auto">
      <rect x="20" y="8" width="40" height="55" rx="2" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" />
      <rect x="25" y="15" width="40" height="55" rx="2" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.5" />
      <circle cx="40" cy="35" r="8" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
    </svg>
  );
  return (
    <svg viewBox="0 0 80 80" className="w-16 h-16 mx-auto">
      <rect x="10" y="20" width="25" height="35" rx="3" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" />
      <rect x="45" y="10" width="30" height="50" rx="3" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" />
    </svg>
  );
};

const products = [
  { id: 1, name: "Midnight Journal", price: "$24", image: product1, tag: "Best Seller" },
  { id: 2, name: "Sunset Notebook", price: "$22", image: product2, tag: "New" },
  { id: 3, name: "Forest Diary", price: "$26", image: product3, tag: "Popular" },
];

const newArrivals = [
  { name: "Linen A5", price: "$28", color: "bg-secondary" },
  { name: "Kraft Pocket", price: "$16", color: "bg-accent" },
  { name: "Cotton B6", price: "$32", color: "bg-muted" },
  { name: "Canvas A4", price: "$36", color: "bg-secondary" },
  { name: "Silk Mini", price: "$20", color: "bg-accent" },
];

const testimonials = [
  { name: "Sarah M.", text: "The quality is incredible. My journal feels truly personal and unique.", stars: 5 },
  { name: "Alex K.", text: "Perfect gift for my partner. The customization options are amazing.", stars: 5 },
  { name: "Jordan R.", text: "I've tried many notebooks but Mix & Bind is on another level.", stars: 4 },
];

const Home = () => (
  <div>
    <PageMeta title="Mix & Bind – Custom Handmade Notebooks" description="Design your own notebook. Choose cover, paper, and size to create a journal as unique as your ideas. Handmade with sustainable materials." path="/" />
    <JsonLd />
    {/* Hero */}
    <section className="bg-primary grid-pattern py-24 md:py-32">
      <div className="container text-center">
        <h1 className="text-5xl md:text-7xl font-black text-primary-foreground leading-tight mb-6">
          Your Notebook,<br />Your Rules.
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 max-w-lg mx-auto mb-8">
          Design a journal that's as unique as your ideas. Pick your cover, paper, and size.
        </p>
        <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary font-bold text-lg px-10" asChild>
          <Link to="/books">Start Crafting</Link>
        </Button>
      </div>
    </section>

    {/* Category Trio */}
    <section className="py-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { type: "cover" as const, label: "Covers", desc: "Kraft, linen, or leather" },
            { type: "paper" as const, label: "Papers", desc: "Dotted, ruled, or blank" },
            { type: "size" as const, label: "Sizes", desc: "Pocket to A4" },
          ].map((cat) => (
            <Link to="/books" key={cat.type} className="text-center group p-8 rounded-lg hover:bg-accent transition-colors">
              <CategoryIcon type={cat.type} />
              <h3 className="text-lg font-bold mt-4 text-foreground">{cat.label}</h3>
              <p className="text-sm text-muted-foreground mt-1">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Manifesto */}
    <section className="py-20 bg-card">
      <div className="container text-center max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-black leading-tight text-foreground">
          We believe every <span className="text-primary">blank page</span> is a chance to create something <span className="text-primary">extraordinary</span>.
        </h2>
      </div>
    </section>

    {/* Featured Products */}
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl font-black text-center mb-12 text-foreground">Featured Notebooks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {products.map((p) => (
            <Link to="/books" key={p.id} className="group">
              <div className="bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" width={600} height={800} />
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold text-primary">{p.tag}</span>
                  <h3 className="font-bold text-foreground mt-1">{p.name}</h3>
                  <p className="text-muted-foreground font-semibold mt-1">{p.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-20 bg-card">
      <div className="container">
        <h2 className="text-3xl font-black text-center mb-12 text-foreground">What Crafters Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-background p-6 rounded-lg border">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-4">"{t.text}"</p>
              <p className="text-xs font-bold text-muted-foreground">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* New Arrivals */}
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl font-black mb-8 text-foreground">New Arrivals</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {newArrivals.map((item, i) => (
            <Link to="/books" key={i} className="flex-shrink-0 w-52">
              <div className="bg-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className={`aspect-square ${item.color} flex items-center justify-center`}>
                  <span className="text-4xl font-black text-muted-foreground/20">{i + 1}</span>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-sm text-foreground">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Home;
