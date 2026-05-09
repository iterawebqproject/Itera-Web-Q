import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import MasonryGrid from "@/components/MasonryGrid";
import NewsletterFooter from "@/components/NewsletterFooter";
import PageMeta from "@/components/PageMeta";
import { newsArticles, trendingMovies } from "@/data/mockData";

const Movie = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Trending Movies"
        description="Discover the most talked-about films in underground cinema, from neo-noir thrillers to experimental documentaries."
        path="/movie"
      />
      <Header />

      <main id="main-content" className="pt-24 container">
        {/* Trending Movies */}
        <section className="mb-16" aria-label="Trending movies">
          <h1 className="cw-subheadline mb-8">Trending Movies</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingMovies.map((movie, i) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link to="/review-movie" className="block group cw-card-hover">
                  <div className="relative h-64 overflow-hidden rounded-sm">
                    <img
                      src={movie.image}
                      alt={`${movie.title} movie poster`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 cw-gradient-overlay" aria-hidden="true" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="cw-label">{movie.genre}</span>
                      <h3 className="text-lg font-black uppercase tracking-tight text-background mt-1">
                        {movie.title}
                      </h3>
                      <div className="flex items-center gap-1 mt-2">
                        <Star size={14} className="fill-primary text-primary" aria-hidden="true" />
                        <span className="text-sm font-bold text-background" aria-label={`Rating: ${movie.rating} out of 10`}>{movie.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Continuous Feed */}
        <section className="mb-16" aria-label="All stories">
          <h2 className="cw-subheadline mb-8">All Stories</h2>
          <MasonryGrid articles={newsArticles} />
        </section>
      </main>

      <NewsletterFooter />
    </div>
  );
};

export default Movie;
