import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Layout from "@/components/Layout";
import ReviewBadge from "@/components/ReviewBadge";
import useDocumentHead from "@/hooks/useDocumentHead";
import heroImg from "@/assets/hero-singer.jpg";
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import album4 from "@/assets/album-4.jpg";
import artistFeatured from "@/assets/artist-featured.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist4 from "@/assets/artist-4.jpg";

const interviews = [
  { id: "luna-vex", tab: "Luna Vex", excerpt: "\"I write songs in the dark — literally. No lights, no screens, just me and the piano.\"", genre: "Indie Pop" },
  { id: "drako", tab: "DRAKO", excerpt: "\"Every beat I make is a protest. If it doesn't make you uncomfortable, I didn't do my job.\"", genre: "Hip-Hop" },
  { id: "mara-cole", tab: "Mara Cole", excerpt: "\"Rock isn't dead. It just went underground. And underground is where the best things happen.\"", genre: "Rock" },
];

const reviews = [
  { id: "midnight-frequencies", title: "Midnight Frequencies", artist: "Luna Vex", score: 9, label: "Must Listen", image: album1, genre: "Indie" },
  { id: "soft-echoes", title: "Soft Echoes", artist: "Ari Nova", score: 7, image: album2, genre: "Pop" },
  { id: "neon-streets", title: "Neon Streets", artist: "DRAKO", score: 8, image: album3, genre: "Hip-Hop" },
  { id: "analog-burn", title: "Analog Burn", artist: "The Rustics", score: 9, label: "Must Listen", image: album4, genre: "Rock" },
];

const interviewImages = [artist4, artistFeatured, artist2];

const Home = () => {
  const [activeTab, setActiveTab] = useState(0);
  useDocumentHead({
    title: "Home",
    description: "Ms Music shares the latest reviews, artist interviews, and cultural news with a bold, edgy editorial voice.",
  });

  return (
    <Layout>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Ms Music",
            url: "https://ms-music-vibe.lovable.app",
            description: "The boldest voice in music journalism.",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://ms-music-vibe.lovable.app/music?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="relative h-screen flex items-end overflow-hidden" aria-label="Featured article">
        <img src={heroImg} alt="Featured artist performing live on stage" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent" aria-hidden="true" />
        <div className="relative container mx-auto px-4 pb-20 z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="score-badge score-badge-high mb-4 inline-block">Issue #47 — Live Now</span>
            <h1 className="text-5xl md:text-8xl font-black text-secondary-foreground leading-none tracking-tighter max-w-4xl">
              The Sound<br />
              <span className="editorial-gradient-text">That Defines</span><br />
              A Generation
            </h1>
            <p className="mt-6 text-lg text-secondary-foreground/70 max-w-xl">
              Inside our exclusive interview with the artists reshaping the sonic landscape.
            </p>
            <Link
              to="/music"
              className="mt-8 inline-flex items-center gap-2 editorial-gradient-bg text-primary-foreground px-8 py-4 font-bold uppercase text-sm tracking-widest hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Read the Latest Review <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Interview Tabs — Slanted */}
      <section className="bg-secondary py-32 slant-section -mt-8" aria-label="Artist interviews">
        <div className="container mx-auto px-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">The Ms Music Interview</h2>
          <p className="text-3xl md:text-5xl font-black tracking-tighter text-secondary-foreground mb-12">Unfiltered Voices</p>

          <div role="tablist" aria-label="Artist interviews" className="flex gap-2 mb-8 flex-wrap">
            {interviews.map((item, i) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={activeTab === i}
                aria-controls={`tabpanel-${item.id}`}
                id={`tab-${item.id}`}
                onClick={() => setActiveTab(i)}
                className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  activeTab === i
                    ? "editorial-gradient-bg text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.tab}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            role="tabpanel"
            id={`tabpanel-${interviews[activeTab].id}`}
            aria-labelledby={`tab-${interviews[activeTab].id}`}
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{interviews[activeTab].genre}</span>
              <blockquote className="text-2xl md:text-4xl font-black text-secondary-foreground leading-tight mt-4">
                {interviews[activeTab].excerpt}
              </blockquote>
              <Link
                to={`/singer/${interviews[activeTab].id}`}
                className="mt-6 inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Read Full Interview <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={interviewImages[activeTab]}
                alt={`Portrait of ${interviews[activeTab].tab}`}
                className="hover-bw-to-color w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Front Row Reviews */}
      <section className="py-24" aria-label="Album reviews">
        <div className="container mx-auto px-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">Front Row Reviews</h2>
          <p className="text-3xl md:text-5xl font-black tracking-tighter mb-12">What We're Spinning</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((r, i) => (
              <motion.article
                key={r.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden bg-card"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img src={r.image} alt={`Album cover: ${r.title} by ${r.artist}`} className="hover-bw-to-color w-full h-full object-cover" loading="lazy" width={600} height={600} />
                  <div className="absolute top-3 right-3">
                    <ReviewBadge score={r.score} label={r.label} />
                  </div>
                  <div className="absolute inset-0 bg-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" aria-hidden="true">
                    <Play className="text-primary" size={48} />
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">{r.genre}</span>
                  <h3 className="text-lg font-black tracking-tight mt-1">{r.title}</h3>
                  <p className="text-sm text-muted-foreground">{r.artist}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
