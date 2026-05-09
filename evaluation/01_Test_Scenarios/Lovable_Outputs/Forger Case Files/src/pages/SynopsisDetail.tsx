import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import MediaCard from "@/components/MediaCard";
import { useState } from "react";
import season1 from "@/assets/season1.jpg";
import season2 from "@/assets/season2.jpg";
import movie from "@/assets/movie.jpg";

const entries = [
  { id: 1, title: "Season 1", year: 2022, type: "TV", episodes: 25, status: "Completed", image: season1 },
  { id: 2, title: "Season 2", year: 2023, type: "TV", episodes: 25, status: "Completed", image: season2 },
  { id: 3, title: "Code: White", year: 2023, type: "Movie", episodes: 1, status: "Completed", image: movie },
  { id: 4, title: "Season 3 (TBA)", year: 2025, type: "TV", episodes: null, status: "Upcoming", image: season1 },
];

const SeasonAndMovieList = () => {
  const [sortByRelease, setSortByRelease] = useState(true);

  const sorted = [...entries].sort((a, b) =>
    sortByRelease ? a.year - b.year : b.year - a.year
  );

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta
        title="Seasons & Movies"
        description="Browse all Spy x Family seasons and movies in release order."
        path="/seasons"
      />
      <Navbar />
      <main id="main-content" className="flex-1 pt-24 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-4xl text-foreground">Mission Archives</h1>
            <p className="text-muted-foreground mt-2">Complete database of all Spy x Family seasons and films.</p>
          </div>
          <button
            onClick={() => setSortByRelease(!sortByRelease)}
            className="px-4 py-2 rounded-lg glass text-sm font-medium text-foreground hover:bg-muted/50 transition-all focus-visible:outline-2 focus-visible:outline-primary"
            aria-label={`Sort by ${sortByRelease ? "newest first" : "release order"}`}
          >
            {sortByRelease ? "Newest First" : "Release Order"}
          </button>
        </div>

        {/* Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {sorted.filter(e => e.status === "Completed").map((entry) => (
            <MediaCard key={entry.id} image={entry.image} title={entry.title} status={entry.status} />
          ))}
        </div>

        {/* Text List */}
        <h2 className="font-display font-bold text-2xl text-foreground mb-4">Full Directory</h2>
        <ul className="space-y-3 list-none p-0">
          {sorted.map((entry) => (
            <li key={entry.id} className="glass rounded-xl p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{entry.title}</h3>
                <p className="text-sm text-muted-foreground">{entry.type} · {entry.year} {entry.episodes ? `· ${entry.episodes} eps` : ""}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                entry.status === "Completed" ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"
              }`}>
                {entry.status}
              </span>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default SeasonAndMovieList;
