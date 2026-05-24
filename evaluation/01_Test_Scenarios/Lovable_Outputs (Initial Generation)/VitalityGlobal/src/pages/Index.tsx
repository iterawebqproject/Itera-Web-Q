import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { TrendingUp, Leaf, Shield, ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const pillars = [
  { icon: TrendingUp, title: "Growth", desc: "Delivering sustained value through strategic innovation and global expansion." },
  { icon: Leaf, title: "Sustainability", desc: "Committed to net-zero emissions and circular economy practices across all brands." },
  { icon: Shield, title: "Ethics", desc: "Governance rooted in transparency, integrity, and stakeholder accountability." },
];

const news = [
  { date: "Apr 12, 2026", title: "VitalityGlobal Reports Record Q1 Revenue Growth of 14%" },
  { date: "Apr 8, 2026", title: "New Partnership Expands Renewable Energy Portfolio Across APAC" },
  { date: "Mar 30, 2026", title: "VitalityGlobal Named to Forbes 'Most Ethical Companies' List" },
  { date: "Mar 22, 2026", title: "Sustainability Report 2025: 40% Plastic Reduction Achieved" },
];

const Index = () => (
  <Layout>
    <SEOHead
      title="VitalityGlobal — Empowering a Sustainable Future"
      description="A high-authority hub for corporate news, sustainable brand portfolios, and ethical career growth."
      path="/"
    />

    {/* Hero */}
    <section className="relative bg-deep-blue text-deep-blue-foreground overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent" aria-hidden="true" />
      <div className="container relative py-24 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Empowering a <span className="text-secondary">Sustainable</span> Future
          </h1>
          <p className="text-lg opacity-80 mb-8 leading-relaxed">
            VitalityGlobal is a diversified corporation committed to ethical growth,
            sustainable innovation, and creating lasting value for all stakeholders.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/sustainability-brands">
                Explore Our Brands <ArrowRight className="ml-2" size={18} aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-deep-blue-foreground/30 text-deep-blue-foreground hover:bg-deep-blue-foreground/10">
              <Link to="/about-us">Learn More</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Core Pillars */}
    <section className="container py-20" aria-labelledby="pillars-heading">
      <h2 id="pillars-heading" className="text-3xl font-bold text-center mb-4">Our Core Pillars</h2>
      <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
        The foundation of everything we do at VitalityGlobal.
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        {pillars.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-card border rounded-lg p-8 text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5" aria-hidden="true">
              <p.icon className="text-primary" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">{p.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
          </motion.article>
        ))}
      </div>
    </section>

    {/* News Feed */}
    <section className="bg-muted py-20" aria-labelledby="news-heading">
      <div className="container">
        <h2 id="news-heading" className="text-3xl font-bold mb-10">Latest News</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {news.map((n) => (
            <article key={n.title} className="bg-card border rounded-lg p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 bg-primary/10 rounded-md p-2" aria-hidden="true">
                <Calendar className="text-primary" size={18} />
              </div>
              <div>
                <time className="text-xs font-semibold text-primary">{n.date}</time>
                <h3 className="font-semibold mt-1 leading-snug">{n.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
