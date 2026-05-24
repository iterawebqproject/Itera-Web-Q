import { motion } from "framer-motion";
import { MessageSquare, BookOpen, Headphones } from "lucide-react";
import Layout from "@/components/Layout";

const articles = [
  { title: "ElementModular Wins Right to Repair Award 2026", date: "Mar 15, 2026", tag: "Press" },
  { title: "How We Design for a 10-Year Lifespan", date: "Feb 28, 2026", tag: "Engineering" },
  { title: "Community Spotlight: Student Builds Custom Lab PCs", date: "Feb 10, 2026", tag: "Community" },
  { title: "Our Recycling Program Hits 50,000 Components", date: "Jan 22, 2026", tag: "Sustainability" },
  { title: "V2 Mainboard: What's New Under the Hood", date: "Jan 5, 2026", tag: "Product" },
  { title: "Partnership with iFixit for Repair Documentation", date: "Dec 18, 2025", tag: "Partnership" },
];

const support = [
  { icon: MessageSquare, title: "Community Forum", desc: "Join 40,000+ members sharing builds, mods, and repair tips." },
  { icon: BookOpen, title: "Assembly Guides", desc: "Step-by-step visual guides for every component swap." },
  { icon: Headphones, title: "Customer Service", desc: "Real humans, real answers. No bots, no runaround." },
];

const AboutUs = () => (
  <Layout title="About Us" description="Learn about ElementModular's mission for the Right to Repair. Modular, sustainable computers built to last a decade.">
    {/* Our Story */}
    <section className="py-20" aria-labelledby="story-heading">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 id="story-heading" className="font-display text-4xl md:text-5xl font-bold leading-tight">
            We believe you should own what you buy.
          </h1>
          <div className="mt-12 space-y-8 text-lg leading-relaxed text-muted-foreground">
            <p>
              ElementModular was born from frustration. We were tired of sealed-shut laptops, glued-in batteries, and planned obsolescence disguised as "sleek design."
            </p>
            <blockquote className="border-l-4 border-secondary pl-6 text-foreground font-display text-2xl italic">
              "The most sustainable computer is the one you never throw away."
            </blockquote>
            <p>
              Every ElementModular product is designed to be opened, understood, repaired, and upgraded by its owner. We publish full schematics, offer every part individually, and build for longevity.
            </p>
            <blockquote className="border-l-4 border-secondary pl-6 text-foreground font-display text-2xl italic">
              "Right to Repair isn't a feature. It's a fundamental right."
            </blockquote>
            <p>
              We're a team of engineers, educators, and advocates who believe consumer electronics can be both beautiful and built to last. Join us.
            </p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Article Grid */}
    <section className="bg-muted py-16" aria-labelledby="news-heading">
      <div className="container">
        <h2 id="news-heading" className="font-display text-3xl font-bold text-center mb-12">Latest News</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20" aria-hidden="true" />
              <div className="p-6">
                <span className="text-xs font-semibold text-secondary uppercase tracking-wider">{a.tag}</span>
                <h3 className="font-display text-lg font-bold mt-2 leading-snug">{a.title}</h3>
                <time className="text-sm text-muted-foreground mt-2 block" dateTime={a.date}>{a.date}</time>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    {/* Support Cards */}
    <section className="py-16" aria-labelledby="support-heading">
      <div className="container">
        <h2 id="support-heading" className="font-display text-3xl font-bold text-center mb-12">Get Support</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {support.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="bg-card rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="w-14 h-14 bg-secondary/15 rounded-xl flex items-center justify-center mx-auto">
                <s.icon size={28} className="text-secondary" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-bold mt-4">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default AboutUs;
