import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import MasonryGrid from "@/components/MasonryGrid";
import NewsletterFooter from "@/components/NewsletterFooter";
import PageMeta from "@/components/PageMeta";
import { trendHeroImage, trendArticles } from "@/data/mockData";

const Trends = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Trends"
        description="Explore the latest trends shaping cinema culture — from analog horror on TikTok to AI filmmaking and lo-fi movements."
        path="/trends"
      />
      <Header />

      <main id="main-content">
        {/* Trend Spotlight Hero */}
        <section className="relative h-[70vh] flex items-end" aria-label="Trend spotlight">
          <img src={trendHeroImage} alt="Cinematic trend spotlight visual" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} loading="eager" fetchPriority="high" />
          <div className="absolute inset-0 cw-gradient-overlay" aria-hidden="true" />
          <div className="absolute inset-0 bg-cw-overlay/40" aria-hidden="true" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 container pb-16"
          >
            <span className="cw-label block mb-3">Spotlight</span>
            <h1 className="cw-headline text-background max-w-3xl">
              What's Shaping Cinema Culture Right Now
            </h1>
            <Link
              to="/trends/1"
              className="inline-flex items-center gap-2 mt-6 text-sm uppercase tracking-widest font-bold text-primary hover:text-cw-glow transition-colors"
            >
              Read Feature <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>
        </section>

        {/* Trend Grid */}
        <section className="container py-20" aria-label="All trends">
          <h2 className="cw-subheadline mb-10">All Trends</h2>
          <MasonryGrid articles={trendArticles} />
        </section>
      </main>

      <NewsletterFooter />
    </div>
  );
};

export default Trends;
