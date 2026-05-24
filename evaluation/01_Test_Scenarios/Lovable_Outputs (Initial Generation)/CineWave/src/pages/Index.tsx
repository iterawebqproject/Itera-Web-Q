import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import NewsletterFooter from "@/components/NewsletterFooter";
import MasonryGrid from "@/components/MasonryGrid";
import PageMeta from "@/components/PageMeta";
import { heroImage, newsArticles } from "@/data/mockData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Underground Cinema & Viral Film Culture"
        description="CineWave covers underground cinema, viral pop-culture trends, and the intersection of social media and filmmaking for the next generation."
        path="/"
      />
      <Header />

      {/* Hero */}
      <main id="main-content">
        <section className="relative h-screen flex items-end" aria-label="Featured content">
          <img
            src={heroImage}
            alt="Cinematic neon-lit cityscape representing modern underground film culture"
            className="absolute inset-0 w-full h-full object-cover"
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 cw-gradient-overlay" aria-hidden="true" />
          <div className="absolute inset-0 bg-cw-overlay/30" aria-hidden="true" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 container pb-20"
          >
            <span className="cw-label block mb-4">Featured</span>
            <h1 className="cw-headline text-background max-w-4xl">
              The Future of Cinema is Being Written Now
            </h1>
            <p className="mt-4 text-lg text-background/70 max-w-xl">
              Underground films, viral culture, and the creators reshaping how we experience stories.
            </p>
            <Link
              to="/trends"
              className="inline-flex items-center gap-2 mt-8 text-sm uppercase tracking-widest font-bold text-primary hover:text-cw-glow transition-colors"
            >
              Explore Trends <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>
        </section>

        {/* Masonry News Feed */}
        <section className="container py-20" aria-label="Latest stories">
          <div className="flex items-center justify-between mb-10">
            <h2 className="cw-subheadline">Latest Stories</h2>
            <Link
              to="/movie"
              className="text-sm uppercase tracking-widest font-bold text-muted-foreground hover:text-primary transition-colors"
            >
              View All
            </Link>
          </div>
          <MasonryGrid articles={newsArticles} />
        </section>
      </main>

      <NewsletterFooter />
    </div>
  );
};

export default Index;
