import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import ModularBadge from "@/components/Badge";
import desktopImg from "@/assets/desktop-topdown.jpg";
import laptopImg from "@/assets/laptop-topdown.jpg";
import partRam from "@/assets/part-ram.jpg";
import partSsd from "@/assets/part-ssd.jpg";
import partExpansion from "@/assets/part-expansion.jpg";

const laptops = [
  { name: "ElementBook 13", price: "$999", badge: "Customizable", img: laptopImg },
  { name: "ElementBook 16", price: "$1,299", badge: "Customizable", img: laptopImg },
  { name: "ElementBook 16 Pro", price: "$1,699", badge: "Customizable", img: laptopImg },
];

const desktops = [
  { name: "ElementDesk Mini", price: "$699", badge: "Customizable", img: desktopImg },
  { name: "ElementDesk Pro", price: "$1,199", badge: "Customizable", img: desktopImg },
  { name: "ElementDesk Max", price: "$1,899", badge: "Customizable", img: desktopImg },
];

const ecosystem = [
  { name: "DDR5 RAM Module", desc: "Works with all ElementBook & ElementDesk models.", img: partRam },
  { name: "NVMe SSD 2TB", desc: "Universal hot-swappable storage.", img: partSsd },
  { name: "USB-C Expansion Card", desc: "Add ports to any modular bay.", img: partExpansion },
];

const Categories = () => {
  const [view, setView] = useState<"laptop" | "desktop">("laptop");
  const products = view === "laptop" ? laptops : desktops;

  return (
    <Layout title="Categories" description="Browse ElementModular laptops and desktops. Fully customizable, repairable modular computers.">
      <section className="container py-16" aria-labelledby="products-heading">
        <h1 id="products-heading" className="font-display text-4xl font-bold text-center">Our Products</h1>

        {/* Toggle */}
        <div className="flex justify-center mt-8 gap-2" role="tablist" aria-label="Product category">
          <button
            role="tab"
            aria-selected={view === "laptop"}
            onClick={() => setView("laptop")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              view === "laptop" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            Laptops
          </button>
          <button
            role="tab"
            aria-selected={view === "desktop"}
            onClick={() => setView("desktop")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              view === "desktop" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            Desktops
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-12" role="tabpanel" aria-label={`${view} products`}>
          {products.map((p, i) => (
            <motion.div
              key={`${view}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to="/product-overview" className="group block bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img src={p.img} alt={p.name} loading="lazy" width={600} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <ModularBadge>{p.badge}</ModularBadge>
                  <h3 className="font-display text-xl font-bold mt-3">{p.name}</h3>
                  <p className="text-muted-foreground mt-1">Starting at {p.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Ecosystem */}
      <section className="bg-muted py-16" aria-labelledby="ecosystem-heading">
        <div className="container">
          <h2 id="ecosystem-heading" className="font-display text-3xl font-bold text-center mb-12">Universal Ecosystem</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {ecosystem.map((e, i) => (
              <div key={i} className="bg-card rounded-xl p-6 flex gap-4 items-start">
                <img src={e.img} alt={e.name} loading="lazy" width={80} height={80} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">{e.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Categories;
