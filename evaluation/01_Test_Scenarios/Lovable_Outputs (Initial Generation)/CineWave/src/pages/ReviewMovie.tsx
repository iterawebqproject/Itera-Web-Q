import { motion } from "framer-motion";
import { Star, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import NewsletterSlideIn from "@/components/NewsletterSlideIn";
import NewsletterFooter from "@/components/NewsletterFooter";
import PageMeta from "@/components/PageMeta";
import { reviewData } from "@/data/mockData";

const ReviewMovie = () => {
  const { title, director, year, rating, genre, image, synopsis, review, relatedReviews } = reviewData;

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title={`${title} Review`}
        description={synopsis.slice(0, 155)}
        path="/review-movie"
        type="article"
      />
      <Header />
      <NewsletterSlideIn />

      <main id="main-content">
        {/* Review Header */}
        <section className="relative h-[60vh] flex items-end" aria-label="Movie review header">
          <img src={image} alt={`Scene from ${title}`} className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} loading="eager" fetchPriority="high" />
          <div className="absolute inset-0 cw-gradient-overlay" aria-hidden="true" />
          <div className="absolute inset-0 bg-cw-overlay/40" aria-hidden="true" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 container pb-12"
          >
            <Link to="/movie" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-bold text-background/60 hover:text-primary transition-colors mb-4">
              <ArrowLeft size={14} aria-hidden="true" /> Back to Movies
            </Link>
            <span className="cw-label block mb-2">{genre}</span>
            <h1 className="cw-headline text-background">{title}</h1>
            <div className="flex items-center gap-4 mt-4 text-background/70 text-sm">
              <span>Dir. {director}</span>
              <span>{year}</span>
              <span className="flex items-center gap-1">
                <Star size={14} className="fill-primary text-primary" aria-hidden="true" /> <span aria-label={`Rating: ${rating} out of 10`}>{rating}/10</span>
              </span>
            </div>
          </motion.div>
        </section>

        {/* Review Body */}
        <article className="container max-w-3xl py-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <blockquote className="text-xl leading-relaxed text-foreground/80 mb-10 italic border-l-4 border-primary pl-6">
              {synopsis}
            </blockquote>
            {review.split("\n\n").map((paragraph, i) => (
              <p key={i} className="cw-body mb-6">{paragraph}</p>
            ))}
          </motion.div>
        </article>

        {/* Related Reviews */}
        <section className="container pb-20" aria-label="Related reviews">
          <h2 className="cw-subheadline mb-8">Related Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedReviews.map((r) => (
              <Link key={r.id} to="/review-movie" className="block group cw-card-hover">
                <div className="relative h-48 overflow-hidden rounded-sm">
                  <img src={r.image} alt={`${r.title} movie poster`} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 cw-gradient-overlay" aria-hidden="true" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-base font-black uppercase tracking-tight text-background">{r.title}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={12} className="fill-primary text-primary" aria-hidden="true" />
                      <span className="text-xs font-bold text-background" aria-label={`Rating: ${r.rating} out of 10`}>{r.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <NewsletterFooter />
    </div>
  );
};

export default ReviewMovie;
