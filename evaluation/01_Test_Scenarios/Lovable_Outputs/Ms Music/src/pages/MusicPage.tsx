import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import Layout from "@/components/Layout";
import ReviewBadge from "@/components/ReviewBadge";
import useDocumentHead from "@/hooks/useDocumentHead";
import heroImg from "@/assets/hero-singer.jpg";
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import album4 from "@/assets/album-4.jpg";

const categories = ["All", "Indie", "Pop", "Rock", "Hip-Hop"];

const newsItems = [
  { id: "luna-surprise", title: "Luna Vex Announces Surprise Midnight Album Drop", category: "Indie", image: album1, date: "Apr 8, 2026" },
  { id: "pop-guard", title: "Pop's New Guard: 5 Artists to Watch This Summer", category: "Pop", image: album2, date: "Apr 7, 2026" },
  { id: "drako-tour", title: "DRAKO's Neon Streets Tour Sells Out in Minutes", category: "Hip-Hop", image: album3, date: "Apr 6, 2026" },
  { id: "rustics-return", title: "The Rustics Return With Raw Analog Sound", category: "Rock", image: album4, date: "Apr 5, 2026" },
  { id: "lofi-mainstream", title: "Inside the Studio: How Lo-Fi Became Mainstream", category: "Indie", image: album2, date: "Apr 4, 2026" },
  { id: "grammy-picks", title: "Grammy Predictions: Our Bold Picks for 2027", category: "Pop", image: album1, date: "Apr 3, 2026" },
];

const trending = [
  "Luna Vex drops surprise album at midnight",
  "Rock revival: The Rustics lead the charge",
  "DRAKO's tour documentary premieres Friday",
  "Indie label spotlight: Velvet Records",
];

const playlists = [
  { id: "late-night-indie", name: "Late Night Indie", tracks: 24, mood: "Moody & Atmospheric" },
  { id: "raw-power-rock", name: "Raw Power Rock", tracks: 18, mood: "High Energy" },
  { id: "hiphop-essentials", name: "Hip-Hop Essentials", tracks: 32, mood: "Street & Culture" },
  { id: "pop-futures", name: "Pop Futures", tracks: 20, mood: "Fresh & Forward" },
];

const MusicPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  useDocumentHead({
    title: "Music News",
    description: "Breaking music news, deep dives, and curated playlists from Ms Music.",
  });

  const filtered = activeCategory === "All" ? newsItems : newsItems.filter(n => n.category === activeCategory);

  return (
    <Layout>
      {/* News Feed Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden" aria-label="Music news hero">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container mx-auto px-4 pt-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="score-badge score-badge-high mb-4 inline-block">Music News</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
              The <span className="editorial-gradient-text">Pulse</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Breaking news, deep dives, and curated playlists — all in one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trending Strip — pauses on hover for accessibility */}
      <section className="bg-secondary py-4 overflow-hidden" aria-label="Trending headlines">
        <div className="flex items-center gap-4 animate-marquee whitespace-nowrap hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]" role="marquee">
          {[...trending, ...trending].map((t, i) => (
            <span key={`trend-${i}`} className="flex items-center gap-2 text-sm font-bold text-secondary-foreground px-4">
              <TrendingUp size={14} className="text-primary" aria-hidden="true" /> {t}
            </span>
          ))}
        </div>
      </section>

      {/* Categorized News Grid */}
      <section className="py-20" aria-label="News articles">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 mb-10 flex-wrap" role="group" aria-label="Filter by category">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  activeCategory === cat
                    ? "editorial-gradient-bg text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden mb-4">
                  <img src={item.image} alt={item.title} className="hover-bw-to-color w-full h-full object-cover" loading="lazy" />
                  <div className="absolute top-3 left-3">
                    <ReviewBadge score={0} label={item.category} />
                  </div>
                </div>
                <time className="text-xs text-muted-foreground">{item.date}</time>
                <h3 className="text-xl font-black tracking-tight mt-1 group-hover:text-primary transition-colors">{item.title}</h3>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Playlists */}
      <section className="bg-secondary py-20" aria-label="Weekly curated playlists">
        <div className="container mx-auto px-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">Weekly Curations</h2>
          <p className="text-3xl md:text-5xl font-black tracking-tighter text-secondary-foreground mb-12">Editor's Playlists</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {playlists.map((pl, i) => (
              <motion.div
                key={pl.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 border border-secondary-foreground/10 hover:border-primary transition-colors group cursor-pointer"
              >
                <h3 className="text-xl font-black group-hover:text-primary transition-colors">{pl.name}</h3>
                <p className="text-sm text-secondary-foreground/60 mt-1">{pl.mood}</p>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-xs text-secondary-foreground/40">{pl.tracks} tracks</span>
                  <ArrowRight size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MusicPage;
