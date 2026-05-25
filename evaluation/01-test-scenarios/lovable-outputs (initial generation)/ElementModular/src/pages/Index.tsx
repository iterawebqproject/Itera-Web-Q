import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import ModularBadge from "@/components/Badge";
import heroImg from "@/assets/exploded-laptop.jpg";
import laptop180 from "@/assets/laptop-180.jpg";
import desktopImg from "@/assets/desktop-topdown.jpg";
import laptopImg from "@/assets/laptop-topdown.jpg";
import partKeyboard from "@/assets/part-keyboard.jpg";
import partExpansion from "@/assets/part-expansion.jpg";
import partRam from "@/assets/part-ram.jpg";
import partSsd from "@/assets/part-ssd.jpg";
import partCooling from "@/assets/part-cooling.jpg";
import partHinge from "@/assets/part-hinge.jpg";

const parts = [
  { src: partKeyboard, name: "Keyboard" },
  { src: partExpansion, name: "Expansion Card" },
  { src: partRam, name: "RAM Module" },
  { src: partSsd, name: "SSD Storage" },
  { src: partCooling, name: "Cooling Fan" },
  { src: partHinge, name: "Hinge Assembly" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ElementModular",
  url: "https://element-explore-hub.lovable.app",
  description: "Modular, repairable, and upgradable computers designed to last.",
  sameAs: [],
};

const Index = () => (
  <Layout
    title="Home"
    description="ElementModular – Modular computers designed so you never throw away a working machine. Configure once, upgrade forever."
  >
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />

    {/* Hero */}
    <section className="relative bg-secondary overflow-hidden" aria-labelledby="hero-heading">
      <div className="container py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ModularBadge>User Upgradeable</ModularBadge>
          <h1 id="hero-heading" className="font-display text-4xl md:text-6xl font-bold text-secondary-foreground mt-4 leading-tight">
            Configure once.<br />Upgrade forever.
          </h1>
          <p className="mt-4 text-secondary-foreground/80 text-lg max-w-md">
            Modular computers designed so you never have to throw away a working machine again.
          </p>
          <Link
            to="/product-overview"
            className="inline-block mt-8 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Explore the Anatomy
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img src={heroImg} alt="Exploded view of a modular laptop showing all replaceable components" width={1920} height={1080} className="rounded-xl shadow-2xl" />
        </motion.div>
      </div>
    </section>

    {/* Mission Bar */}
    <section className="bg-muted" aria-labelledby="mission-heading">
      <div className="container py-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 id="mission-heading" className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Computers shouldn't be boring.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md">
            We believe in transparency — not just in business, but literally inside the machine. Open it up. Learn. Fix. Upgrade.
          </p>
        </div>
        <img src={laptop180} alt="ElementModular laptop opened flat at 180 degrees" width={1280} height={720} loading="lazy" className="rounded-xl" />
      </div>
    </section>

    {/* Product Spotlight */}
    <section aria-label="Product spotlight">
      <div className="grid md:grid-cols-2">
        <div className="bg-primary p-12 md:p-16 flex flex-col justify-center text-primary-foreground">
          <ModularBadge>Desktop</ModularBadge>
          <h3 className="font-display text-3xl font-bold mt-4">ElementDesk Pro</h3>
          <p className="mt-3 opacity-80">Full-tower modularity. Swap any component in under 60 seconds.</p>
          <Link to="/categories" className="mt-6 underline underline-offset-4 font-medium hover:opacity-80 transition-opacity">
            View Desktops →
          </Link>
        </div>
        <div className="overflow-hidden">
          <img src={desktopImg} alt="ElementDesk Pro desktop computer top-down view" width={800} height={800} loading="lazy" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="grid md:grid-cols-2">
        <div className="overflow-hidden md:order-1">
          <img src={laptopImg} alt="ElementBook 16 laptop top-down view" width={800} height={800} loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="bg-forest p-12 md:p-16 flex flex-col justify-center text-forest-foreground md:order-2">
          <ModularBadge>Laptop</ModularBadge>
          <h3 className="font-display text-3xl font-bold mt-4">ElementBook 16</h3>
          <p className="mt-3 opacity-80">Thin, light, and completely repairable with zero proprietary screws.</p>
          <Link to="/categories" className="mt-6 underline underline-offset-4 font-medium hover:opacity-80 transition-opacity">
            View Laptops →
          </Link>
        </div>
      </div>
    </section>

    {/* Hardware Marquee */}
    <section className="bg-card py-12 overflow-hidden" aria-label="Hardware components showcase">
      <div className="marquee-track" aria-hidden="true">
        {[...parts, ...parts].map((part, i) => (
          <div key={i} className="flex-shrink-0 mx-6 text-center">
            <img src={part.src} alt="" width={160} height={160} loading="lazy" className="rounded-lg w-40 h-40 object-cover" />
            <p className="mt-2 text-sm text-muted-foreground font-medium">{part.name}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Manifesto */}
    <section className="bg-muted py-24" aria-labelledby="manifesto-heading">
      <div className="container text-center">
        <motion.h2
          id="manifesto-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
        >
          Let's fix<br />Consumer Electronics
        </motion.h2>
        <p className="mt-6 text-muted-foreground max-w-lg mx-auto text-lg">
          Join the movement for modular, repairable, and upgradable hardware.
        </p>
        <Link
          to="/about-us"
          className="inline-block mt-8 px-6 py-3 border-2 border-foreground text-foreground rounded-lg font-medium hover:bg-foreground hover:text-background transition-colors"
        >
          Read Our Manifesto
        </Link>
      </div>
    </section>
  </Layout>
);

export default Index;
