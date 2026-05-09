import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import ModularBadge from "@/components/Badge";
import heroImg from "@/assets/exploded-laptop.jpg";
import partCooling from "@/assets/part-cooling.jpg";
import partHinge from "@/assets/part-hinge.jpg";
import partKeyboard from "@/assets/part-keyboard.jpg";
import partExpansion from "@/assets/part-expansion.jpg";
import partRam from "@/assets/part-ram.jpg";
import partSsd from "@/assets/part-ssd.jpg";

const anatomyParts = [
  { name: "Battery", x: 10, y: 15, desc: "61Wh hot-swappable lithium-ion. Replace in under 10 seconds.", upgrade: "85Wh extended available" },
  { name: "Mainboard", x: 45, y: 30, desc: "Custom AMD Ryzen platform with socketed CPU.", upgrade: "Next-gen drop-in compatible" },
  { name: "RAM", x: 70, y: 55, desc: "Dual DDR5 SO-DIMM slots. User-accessible.", upgrade: "Up to 64GB supported" },
  { name: "SSD", x: 25, y: 70, desc: "M.2 2280 NVMe slot. Tool-free access.", upgrade: "Up to 4TB capacity" },
  { name: "Cooling", x: 60, y: 20, desc: "Dual-fan vapor chamber cooling system.", upgrade: "High-performance fan module" },
  { name: "Display", x: 80, y: 10, desc: '13.5" 3:2 2256×1504 IPS panel. Replaceable.', upgrade: "120Hz panel option" },
];

const features = [
  { title: "Dual-Fan Vapor Chamber", desc: "Our custom cooling solution keeps thermals low while maintaining silence. Each fan is individually replaceable.", img: partCooling },
  { title: "180° Hinge Design", desc: "Precision-machined stainless steel hinges rated for 25,000+ open-close cycles. Field-replaceable.", img: partHinge },
  { title: "Input Module System", desc: "Hot-swappable keyboard layouts. Switch between QWERTY, Dvorak, or international layouts in minutes.", img: partKeyboard },
];

const expansionCards = [
  { name: "USB-C", img: partExpansion },
  { name: "HDMI 2.1", img: partExpansion },
  { name: "MicroSD", img: partRam },
  { name: "DisplayPort", img: partSsd },
  { name: "USB-A", img: partExpansion },
  { name: "Ethernet", img: partRam },
];

const ProductOverview = () => {
  const [activePart, setActivePart] = useState<string | null>(null);

  const togglePart = (name: string) => {
    setActivePart((prev) => (prev === name ? null : name));
  };

  return (
    <Layout title="Product Overview" description="Explore the anatomy of ElementModular laptops. Interactive exploded view showing every replaceable component.">
      {/* Anatomy Hero */}
      <section className="bg-secondary relative overflow-hidden" aria-labelledby="anatomy-heading">
        <div className="container py-16 md:py-24">
          <h1 id="anatomy-heading" className="font-display text-4xl md:text-5xl font-bold text-secondary-foreground text-center mb-4">
            Explore the Anatomy
          </h1>
          <p className="text-center text-secondary-foreground/80 mb-12 max-w-lg mx-auto">
            Tap or hover over any component to learn what it does and how you can upgrade it.
          </p>

          <div className="relative max-w-4xl mx-auto" role="img" aria-label="Interactive exploded laptop diagram. Tap components for details.">
            <img src={heroImg} alt="Exploded laptop anatomy showing replaceable parts" width={1920} height={1080} className="rounded-xl shadow-2xl" />

            {anatomyParts.map((part) => (
              <div
                key={part.name}
                className="absolute cursor-pointer"
                style={{ left: `${part.x}%`, top: `${part.y}%` }}
                onMouseEnter={() => setActivePart(part.name)}
                onMouseLeave={() => setActivePart(null)}
                onClick={() => togglePart(part.name)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); togglePart(part.name); } }}
                role="button"
                tabIndex={0}
                aria-label={`${part.name}: ${part.desc}`}
                aria-expanded={activePart === part.name}
              >
                <div className={`w-6 h-6 rounded-full border-2 border-primary-foreground flex items-center justify-center transition-transform ${
                  activePart === part.name ? "scale-150 bg-primary-foreground" : "bg-primary/70"
                }`}>
                  <div className={`w-2 h-2 rounded-full ${activePart === part.name ? "bg-primary" : "bg-primary-foreground"}`} />
                </div>

                {activePart === part.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-10 left-8 top-0 w-64 bg-card text-card-foreground p-4 rounded-lg shadow-xl"
                    role="tooltip"
                  >
                    <h4 className="font-display font-bold text-lg">{part.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{part.desc}</p>
                    <div className="mt-2">
                      <ModularBadge>{part.upgrade}</ModularBadge>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Rows */}
      <section className="py-16" aria-label="Key features">
        <div className="container space-y-16">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`grid md:grid-cols-2 gap-12 items-center`}
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <h3 className="font-display text-2xl md:text-3xl font-bold">{f.title}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <img src={f.img} alt={f.title} loading="lazy" width={600} height={600} className="rounded-xl w-full aspect-square object-cover" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Customization Row */}
      <section className="bg-primary py-16" aria-labelledby="build-heading">
        <div className="container text-center text-primary-foreground">
          <h2 id="build-heading" className="font-display text-3xl md:text-4xl font-bold">Choose Your Build</h2>
          <p className="mt-4 opacity-80 max-w-md mx-auto">Whether you love building or want it ready to go, we've got you covered.</p>
          <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-2xl mx-auto">
            <div className="bg-primary-foreground/10 rounded-xl p-8 backdrop-blur-sm border border-primary-foreground/20">
              <h3 className="font-display text-2xl font-bold">DIY Edition</h3>
              <p className="mt-3 opacity-80 text-sm">Components shipped separately. Build it your way with our step-by-step guide.</p>
              <p className="mt-4 font-display text-3xl font-bold">$999</p>
            </div>
            <div className="bg-primary-foreground/10 rounded-xl p-8 backdrop-blur-sm border border-primary-foreground/20">
              <h3 className="font-display text-2xl font-bold">Pre-Built</h3>
              <p className="mt-3 opacity-80 text-sm">Assembled, tested, and shipped ready to use. Same modularity, zero assembly.</p>
              <p className="mt-4 font-display text-3xl font-bold">$1,199</p>
            </div>
          </div>
        </div>
      </section>

      {/* Port Showcase */}
      <section className="py-16" aria-labelledby="expansion-heading">
        <div className="container">
          <h2 id="expansion-heading" className="font-display text-3xl font-bold text-center mb-4">Swappable Expansion Cards</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
            Choose the ports you need. Swap them anytime. No tools required.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {expansionCards.map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="bg-card rounded-xl p-4 text-center shadow-sm"
              >
                <img src={card.img} alt={`${card.name} expansion card`} loading="lazy" width={200} height={200} className="w-full aspect-square object-cover rounded-lg" />
                <p className="mt-3 font-medium text-sm">{card.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductOverview;
