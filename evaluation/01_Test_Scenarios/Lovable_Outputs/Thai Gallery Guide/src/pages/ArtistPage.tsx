import { useState } from "react";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import artist1 from "@/assets/artist-1.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";

const allArtists = [
  { name: "Anuwat Charoensri", discipline: "Installation", image: artist1, letter: "A" },
  { name: "Chalerm Piromgool", discipline: "Painting", image: artist3, letter: "C" },
  { name: "Kanya Thongchai", discipline: "Photography", image: artist2, letter: "K" },
  { name: "Nattaya Suwannapak", discipline: "Mixed Media", image: artist2, letter: "N" },
  { name: "Prasert Khlongkhom", discipline: "Sculpture", image: artist3, letter: "P" },
  { name: "Somchai Prateep", discipline: "Painting", image: artist1, letter: "S" },
  { name: "Tanit Rattana", discipline: "Digital Art", image: artist3, letter: "T" },
  { name: "Wanida Petchsingto", discipline: "Ceramics", image: artist2, letter: "W" },
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const ArtistPage = () => {
  const [filter, setFilter] = useState<string | null>(null);

  useDocumentTitle({
    title: "Artists Directory",
    description: "Browse Thailand's finest contemporary artists — painters, sculptors, photographers, and digital art pioneers.",
  });

  const filtered = filter
    ? allArtists.filter((a) => a.letter === filter)
    : allArtists;

  return (
    <main id="main-content" className="pt-20">
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Directory</p>
        <h1 className="font-heading text-5xl lg:text-6xl mb-8">Artists</h1>

        {/* A-Z Filter */}
        <nav className="flex flex-wrap gap-1 mb-12" aria-label="Filter artists alphabetically">
          <button
            onClick={() => setFilter(null)}
            aria-pressed={!filter}
            className={`px-2 py-1 text-xs tracking-wider uppercase transition-colors focus:ring-2 focus:ring-primary ${
              !filter ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {alphabet.map((letter) => {
            const hasArtists = allArtists.some((a) => a.letter === letter);
            return (
              <button
                key={letter}
                onClick={() => hasArtists && setFilter(letter)}
                disabled={!hasArtists}
                aria-pressed={filter === letter}
                className={`px-2 py-1 text-xs tracking-wider uppercase transition-colors focus:ring-2 focus:ring-primary ${
                  filter === letter
                    ? "text-primary"
                    : hasArtists
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-muted-foreground/30 cursor-default"
                }`}
              >
                {letter}
              </button>
            );
          })}
        </nav>

        {/* Artist Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {filtered.map((artist) => (
            <article key={artist.name} className="gallery-card">
              <div className="aspect-[3/4] overflow-hidden mb-4 grayscale hover:grayscale-0 transition-all duration-700">
                <img src={artist.image} alt={`Portrait of ${artist.name}`} className="w-full h-full object-cover" loading="lazy" width={300} height={400} />
              </div>
              <h3 className="font-heading text-lg">{artist.name}</h3>
              <p className="text-xs text-muted-foreground">{artist.discipline}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Master of the Month */}
      <section className="bg-accent text-accent-foreground py-24" aria-labelledby="master-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-xs tracking-[0.3em] uppercase text-accent-foreground/40 mb-2">Master of the Month</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[3/4] overflow-hidden grayscale">
              <img src={artist1} alt="Portrait of Somchai Prateep" className="w-full h-full object-cover" loading="lazy" width={600} height={800} />
            </div>
            <div>
              <h2 id="master-heading" className="font-heading text-4xl lg:text-5xl mb-6">Somchai Prateep</h2>
              <p className="text-accent-foreground/70 leading-relaxed mb-6">
                One of Thailand's most celebrated contemporary painters, Somchai Prateep has 
                spent four decades exploring the intersection of traditional Thai aesthetics 
                and abstract expressionism. His works are held in major collections worldwide.
              </p>
              <dl className="space-y-1 text-sm text-accent-foreground/50">
                <div><dt className="sr-only">Born</dt><dd>Born 1968, Bangkok</dd></div>
                <div><dt className="sr-only">Education</dt><dd>Silpakorn University, BFA</dd></div>
                <div><dt className="sr-only">Exhibitions</dt><dd>200+ solo exhibitions worldwide</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Emerging Talent */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24" aria-labelledby="emerging-heading">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Emerging Talent</p>
        <h2 id="emerging-heading" className="font-heading text-4xl mb-12">Rising Voices</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Nattaya Suwannapak", bio: "Pushing boundaries in mixed media installation", image: artist2 },
            { name: "Tanit Rattana", bio: "Digital art pioneer exploring AI and tradition", image: artist3 },
            { name: "Kanya Thongchai", bio: "Documentary photographer of rural Thailand", image: artist2 },
          ].map((artist) => (
            <article key={artist.name} className="gallery-card">
              <div className="aspect-square overflow-hidden mb-4 grayscale hover:grayscale-0 transition-all duration-700">
                <img src={artist.image} alt={`Portrait of ${artist.name}`} className="w-full h-full object-cover" loading="lazy" width={400} height={400} />
              </div>
              <h3 className="font-heading text-xl mb-1">{artist.name}</h3>
              <p className="text-sm text-muted-foreground">{artist.bio}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ArtistPage;
