import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import MediaCard from "@/components/MediaCard";
import GenreBadge from "@/components/GenreBadge";
import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import season1 from "@/assets/season1.jpg";
import season2 from "@/assets/season2.jpg";
import movie from "@/assets/movie.jpg";

const ratings = [
  { user: "MissionControl_42", score: 9.2, text: "Perfectly balances espionage tension with family comedy." },
  { user: "AnyaFanatic", score: 9.8, text: "Waku waku! Every episode is a rollercoaster of emotions!" },
  { user: "AnimeCritic_Pro", score: 8.7, text: "WIT Studio delivers stunning animation with heartfelt storytelling." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Forger Case Files",
  url: "https://forger-briefing-data.lovable.app",
  description: "Explore characters, mission synopses, and fan reviews from the Spy x Family anime series.",
};

const Home = () => (
  <div className="min-h-screen flex flex-col">
    <PageMeta
      title="Home"
      description="Explore characters, mission synopses, and fan reviews from the Spy x Family anime series."
      path="/"
    />
    <Navbar />

    <main id="main-content" className="flex-1">
      {/* Hero */}
      <section className="relative h-[85vh] flex items-end">
        <img
          src={heroBanner}
          alt="Spy x Family key art featuring the Forger family"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={768}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="relative container mx-auto px-4 pb-16 animate-fade-in">
          <div className="flex gap-2 mb-4" role="list" aria-label="Genres">
            {["Action", "Comedy", "Slice of Life"].map((g) => (
              <span role="listitem" key={g}><GenreBadge genre={g} /></span>
            ))}
          </div>
          <h1 className="font-display font-bold text-5xl md:text-7xl text-foreground leading-tight max-w-3xl">
            Operation <span className="text-primary">Strix</span>
          </h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl">
            A spy who must build a fake family, an assassin posing as a wife, and a telepathic daughter — the Forger family's mission begins.
          </p>
          <Link
            to="/synopsis"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold transition-all hover:opacity-90 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            Read Synopsis <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Visual Highlights */}
      <section className="container mx-auto px-4 py-20" aria-labelledby="mission-db">
        <h2 id="mission-db" className="font-display font-bold text-3xl text-foreground mb-8">Mission Database</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MediaCard image={season1} title="Season 1" status="Completed" />
          <MediaCard image={season2} title="Season 2" status="Completed" />
          <MediaCard image={movie} title="Code: White" status="Completed" />
        </div>
      </section>

      {/* Latest Fan Ratings */}
      <section className="container mx-auto px-4 pb-20" aria-labelledby="field-reports">
        <h2 id="field-reports" className="font-display font-bold text-3xl text-foreground mb-8">Field Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ratings.map((r) => (
            <article key={r.user} className="glass rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Star size={16} className="text-secondary fill-secondary" aria-hidden="true" />
                <span className="font-bold text-foreground" aria-label={`Rating: ${r.score} out of 10`}>{r.score}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">"{r.text}"</p>
              <p className="text-xs font-medium text-primary">— {r.user}</p>
            </article>
          ))}
        </div>
      </section>
    </main>

    <Footer />

    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  </div>
);

export default Home;
