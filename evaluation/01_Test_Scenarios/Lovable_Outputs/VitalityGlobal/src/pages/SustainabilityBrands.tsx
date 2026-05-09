import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Recycle, Wind, Droplets, TreePine, Leaf, Sun, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const impactStats = [
  { icon: Recycle, value: "40%", label: "Less Plastic" },
  { icon: Wind, value: "Net Zero", label: "By 2040" },
  { icon: Droplets, value: "60%", label: "Water Recycled" },
  { icon: TreePine, value: "2M+", label: "Trees Planted" },
];

const brands = [
  { icon: Leaf, name: "EcoNova", desc: "Sustainable household products with fully biodegradable packaging." },
  { icon: Heart, name: "PureLife", desc: "Organic health and wellness brand with ethically sourced ingredients." },
  { icon: Sun, name: "SolarVita", desc: "Renewable energy solutions for residential and commercial markets." },
  { icon: Zap, name: "GreenPulse", desc: "Electric mobility and clean transport technology." },
];

const SustainabilityBrands = () => (
  <Layout>
    <SEOHead
      title="Sustainability & Brands"
      description="Explore VitalityGlobal's environmental impact and sustainable brand portfolio driving Net Zero by 2040."
      path="/sustainability-brands"
    />

    {/* Impact Stats */}
    <section className="bg-deep-blue text-deep-blue-foreground py-20" aria-labelledby="impact-heading">
      <div className="container">
        <motion.h1
          id="impact-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
        >
          Our Impact
        </motion.h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8" role="list" aria-label="Environmental impact statistics">
          {impactStats.map((s, i) => (
            <motion.div
              key={s.label}
              role="listitem"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <s.icon className="mx-auto mb-3 text-secondary" size={36} aria-hidden="true" />
              <div className="text-3xl md:text-4xl font-bold">{s.value}</div>
              <div className="text-sm opacity-70 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Brand Portfolio */}
    <section className="container py-20" aria-labelledby="brands-heading">
      <h2 id="brands-heading" className="text-3xl font-bold text-center mb-4">Brand Portfolio</h2>
      <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
        Each of our brands operates with sustainability at its core.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {brands.map((b, i) => (
          <motion.article
            key={b.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4" aria-hidden="true">
              <b.icon className="text-primary" size={28} />
            </div>
            <h3 className="font-bold mb-2">{b.name}</h3>
            <p className="text-sm text-muted-foreground">{b.desc}</p>
          </motion.article>
        ))}
      </div>
    </section>

    {/* Commitment */}
    <section className="bg-primary text-primary-foreground py-16" aria-labelledby="commitment-heading">
      <div className="container text-center">
        <h2 id="commitment-heading" className="text-3xl font-bold mb-4">Our Commitment to the Planet</h2>
        <p className="max-w-2xl mx-auto opacity-90 mb-8 leading-relaxed">
          We publish an annual sustainability report detailing our progress on emissions reduction,
          resource stewardship, and social impact. Transparency is at the heart of our mission.
        </p>
        <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
          Download Sustainability Report
        </Button>
      </div>
    </section>
  </Layout>
);

export default SustainabilityBrands;
