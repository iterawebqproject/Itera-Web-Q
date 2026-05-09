import { motion } from "framer-motion";
import { Leaf, Heart, Award, Globe } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import founder from "@/assets/founder.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";

const timeline = [
  { year: "2018", event: "Elena begins sketching the first Aura designs in her Florence studio." },
  { year: "2019", event: "First collection launches with 3 pieces — the Dutch Oven, Skillet, and Saucepan." },
  { year: "2020", event: "Aura goes viral on social media. Community grows to 50,000 cooks." },
  { year: "2022", event: "Expanded to 12 products. Partnerships with sustainable ceramic artisans." },
  { year: "2024", event: "Launched the Aura Kitchen Lab — recipes, guides, and cooking classes." },
  { year: "2026", event: "Spring Collection debuts with new colorways inspired by the Mediterranean." },
];

const values = [
  { icon: Leaf, title: "Sustainable Materials", desc: "Every Aura piece is made from natural, non-toxic ceramic sourced from responsible suppliers." },
  { icon: Heart, title: "Crafted with Care", desc: "Each product is hand-inspected and tested for durability, heat distribution, and beauty." },
  { icon: Award, title: "Lifetime Warranty", desc: "We stand behind our quality with a lifetime guarantee against manufacturing defects." },
  { icon: Globe, title: "Ethical Sourcing", desc: "Our supply chain prioritizes fair wages, local artisans, and minimal environmental impact." },
];

const OurStory = () => (
  <div>
    <SEOHead title="Our Story" description="Learn about Aura Kitchenware's journey from Elena's Florence studio to your modern kitchen." />
    {/* Brand Header */}
    <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
      <img src={hero1} alt="Aura Kitchenware inspiration" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center text-center">
        <div>
          <h1 className="heading-display text-4xl sm:text-5xl text-primary-foreground">Our Story</h1>
          <p className="text-primary-foreground/80 mt-3 max-w-md mx-auto">
            Born from a love of cooking, designed for modern living
          </p>
        </div>
      </div>
    </section>

    {/* Founder Gallery */}
    <section className="section-padding">
      <div className="container-tight grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="heading-display text-3xl">Meet Elena</h2>
          <p className="text-muted-foreground leading-relaxed">
            Elena Rossi spent 15 years as a ceramic artist in Florence before founding Aura Kitchenware.
            Frustrated by the choice between ugly functional tools and beautiful but impractical ones,
            she set out to create a line that was both.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            "Your kitchen is the heart of your home. Every tool in it should spark joy — not just serve
            a purpose. That's the Aura philosophy."
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-3"
        >
          <img src={founder} alt="Elena Rossi" className="rounded-lg object-cover aspect-[3/4] w-full" loading="lazy" />
          <img src={hero2} alt="Aura kitchen" className="rounded-lg object-cover aspect-[3/4] w-full mt-8" loading="lazy" />
        </motion.div>
      </div>
    </section>

    {/* Timeline */}
    <section className="section-padding bg-card">
      <div className="container-tight max-w-2xl">
        <h2 className="heading-display text-2xl mb-12 text-center">Our Journey</h2>
        <div className="space-y-8">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-6"
            >
              <div className="shrink-0 w-16 text-right">
                <span className="heading-display text-primary text-lg">{item.year}</span>
              </div>
              <div className="relative pl-6 border-l-2 border-primary/20 pb-4">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary" />
                <p className="text-sm text-muted-foreground">{item.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="section-padding">
      <div className="container-tight">
        <h2 className="heading-display text-2xl mb-12 text-center">What We Stand For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex gap-4 items-start"
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <v.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="heading-display text-base mb-1">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default OurStory;
