import { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const categories = ["All", "Infrastructure", "Security", "Cloud", "AI"] as const;

const products = [
  { name: "Enterprise Server X9", category: "Infrastructure", img: product1, desc: "High-performance computing for demanding enterprise workloads." },
  { name: "CyberShield Dashboard", category: "Security", img: product2, desc: "Real-time threat monitoring, analytics, and automated response." },
  { name: "CloudStack Pro", category: "Cloud", img: product3, desc: "Scalable, resilient cloud infrastructure for modern applications." },
  { name: "AI Neural Engine", category: "AI", img: product4, desc: "Accelerate machine learning pipelines with dedicated AI hardware." },
  { name: "SecureVault Pro", category: "Security", img: product1, desc: "Enterprise-grade data encryption and key management solution." },
  { name: "EdgeCompute Module", category: "Infrastructure", img: product4, desc: "Low-latency edge processing for IoT and real-time analytics." },
];

const ProductPage = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <div>
      <SEOHead title="Products" description="Browse ATech Solutions enterprise products for infrastructure, security, cloud, and AI." />

      {/* Category Filter */}
      <section className="container pt-16 pb-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-8">Our Products</h1>
        <div className="flex gap-6 border-b overflow-x-auto" role="tablist" aria-label="Product categories">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={active === cat}
              aria-controls="product-grid"
              onClick={() => setActive(cat)}
              className={`pb-3 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-primary ${
                active === cat
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="container pb-16" id="product-grid" role="tabpanel" aria-label={`${active} products`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {filtered.map((p) => (
            <article key={p.name} className="group bg-card border overflow-hidden">
              <img src={p.img} alt={p.name} loading="lazy" width={800} height={800} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-6">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{p.category}</span>
                <h2 className="text-lg font-bold mt-1">{p.name}</h2>
                <p className="text-sm text-muted-foreground mt-2">{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Demo Section */}
      <section className="bg-dust" aria-label="Request a demo">
        <div className="container py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">See Our Solutions in Action</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Schedule a personalized demo and discover how ATech Solutions can transform your enterprise operations.
          </p>
          <Link
            to="/faq"
            className="inline-block px-10 py-3 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
          >
            Request a Demo
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
