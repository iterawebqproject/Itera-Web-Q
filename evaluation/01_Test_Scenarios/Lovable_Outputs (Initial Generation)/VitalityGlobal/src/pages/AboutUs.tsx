import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Globe, Users, Building2, BarChart3, Shield, Lightbulb, Heart, Leaf } from "lucide-react";

const stats = [
  { icon: Globe, label: "Countries", value: "42" },
  { icon: Users, label: "Employees", value: "28,000+" },
  { icon: Building2, label: "Offices", value: "85" },
  { icon: BarChart3, label: "Revenue (B)", value: "$18.4" },
];

const timeline = [
  { year: "1987", event: "Founded in Geneva as a sustainable commodities firm." },
  { year: "1995", event: "Expanded into consumer goods and health sciences." },
  { year: "2004", event: "Listed on NYSE; reached $2B market cap." },
  { year: "2012", event: "Launched VitalityGreen — our sustainability division." },
  { year: "2018", event: "Acquired EcoNova and PureLife brands." },
  { year: "2023", event: "Achieved 40% reduction in single-use plastics." },
  { year: "2026", event: "Targeting Net Zero across all operations by 2040." },
];

const values = [
  { icon: Shield, title: "Integrity", desc: "Transparent governance and ethical decision-making." },
  { icon: Lightbulb, title: "Innovation", desc: "Pioneering solutions for tomorrow's challenges." },
  { icon: Heart, title: "People", desc: "Investing in diverse talent and inclusive culture." },
  { icon: Leaf, title: "Planet", desc: "Stewardship of natural resources and climate action." },
];

const AboutUs = () => (
  <Layout>
    <SEOHead
      title="About Us"
      description="Learn about VitalityGlobal's mission, global presence, history, and corporate values driving ethical growth."
      path="/about-us"
    />

    {/* Profile */}
    <section className="container py-20" aria-labelledby="about-heading">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 id="about-heading" className="text-4xl md:text-5xl font-bold mb-6">About VitalityGlobal</h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-12">
          VitalityGlobal is a diversified multinational corporation headquartered in Geneva, Switzerland.
          With operations spanning 42 countries, we lead in sustainable consumer goods, health sciences,
          and renewable technologies. Our mission is to create lasting value while safeguarding the planet
          for future generations.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6" role="list" aria-label="Key statistics">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            role="listitem"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border rounded-lg p-6 text-center"
          >
            <s.icon className="text-primary mx-auto mb-3" size={28} aria-hidden="true" />
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Timeline */}
    <section className="bg-muted py-20" aria-labelledby="timeline-heading">
      <div className="container">
        <h2 id="timeline-heading" className="text-3xl font-bold mb-12 text-center">Our Journey</h2>
        <ol className="relative max-w-2xl mx-auto" aria-label="Company timeline">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" aria-hidden="true" />
          {timeline.map((t, i) => (
            <motion.li
              key={t.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative pl-12 pb-10 last:pb-0"
            >
              <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-primary border-4 border-background" aria-hidden="true" />
              <time className="text-sm font-bold text-primary">{t.year}</time>
              <p className="text-foreground mt-1">{t.event}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>

    {/* Values */}
    <section className="container py-20" aria-labelledby="values-heading">
      <h2 id="values-heading" className="text-3xl font-bold text-center mb-12">Corporate Values</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {values.map((v, i) => (
          <motion.article
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border rounded-lg p-6 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4" aria-hidden="true">
              <v.icon className="text-primary" size={24} />
            </div>
            <h3 className="font-bold mb-2">{v.title}</h3>
            <p className="text-sm text-muted-foreground">{v.desc}</p>
          </motion.article>
        ))}
      </div>
    </section>
  </Layout>
);

export default AboutUs;
