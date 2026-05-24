import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Layout from "@/components/Layout";
import useDocumentHead from "@/hooks/useDocumentHead";
import artistFeatured from "@/assets/artist-featured.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";
import artist4 from "@/assets/artist-4.jpg";

const artists = [
  { name: "Ari Nova", genre: "Pop", image: artist2, slug: "ari-nova" },
  { name: "DRAKO", genre: "Hip-Hop", image: artist3, slug: "drako" },
  { name: "Jake Rivers", genre: "Rock", image: artistFeatured, slug: "jake-rivers" },
  { name: "Luna Vex", genre: "Indie", image: artist4, slug: "luna-vex" },
  { name: "Mara Cole", genre: "Rock", image: artist2, slug: "mara-cole" },
  { name: "Nyx", genre: "Electronic", image: artist3, slug: "nyx" },
  { name: "Raven Black", genre: "Hip-Hop", image: artist4, slug: "raven-black" },
  { name: "The Rustics", genre: "Rock", image: artistFeatured, slug: "the-rustics" },
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const SingerPage = () => {
  useDocumentHead({
    title: "Singers",
    description: "Browse our A-Z artist directory and discover the featured artist of the month on Ms Music.",
  });

  const grouped = alphabet.reduce<Record<string, typeof artists>>((acc, letter) => {
    const matches = artists.filter(a => a.name.toUpperCase().startsWith(letter));
    if (matches.length) acc[letter] = matches;
    return acc;
  }, {});

  return (
    <Layout>
      {/* Featured Artist of the Month */}
      <section className="relative pt-24 pb-20 overflow-hidden" aria-label="Featured artist of the month">
        <div className="container mx-auto px-4 pt-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="score-badge score-badge-high mb-4 inline-block">
              <Star size={12} className="mr-1" aria-hidden="true" /> Artist of the Month
            </span>
            <div className="grid md:grid-cols-2 gap-12 items-center mt-8">
              <div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                  Luna <span className="editorial-gradient-text">Vex</span>
                </h1>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  From bedroom recordings to sold-out arenas, Luna Vex has become the defining voice of indie pop's new wave. Her introspective lyrics and haunting melodies have captivated a generation.
                </p>
                <Link
                  to="/singer/luna-vex"
                  className="mt-8 inline-flex items-center gap-2 editorial-gradient-bg text-primary-foreground px-8 py-4 font-bold uppercase text-sm tracking-widest hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  View Full Profile
                </Link>
              </div>
              <div className="relative aspect-[3/4] overflow-hidden">
                <img src={artist4} alt="Luna Vex performing" className="hover-bw-to-color w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* A-Z Directory */}
      <section className="bg-secondary py-20" aria-label="Artist directory A to Z">
        <div className="container mx-auto px-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">Directory</h2>
          <p className="text-3xl md:text-5xl font-black tracking-tighter text-secondary-foreground mb-12">Artists A–Z</p>

          {/* Alphabet quick links */}
          <nav aria-label="Alphabet navigation" className="flex flex-wrap gap-1 mb-10">
            {alphabet.map(l => (
              <a
                key={l}
                href={grouped[l] ? `#letter-${l}` : undefined}
                aria-disabled={!grouped[l]}
                className={`w-8 h-8 flex items-center justify-center text-xs font-bold uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  grouped[l] ? "text-primary hover:bg-primary hover:text-primary-foreground" : "text-muted-foreground/30 cursor-default"
                } transition-colors`}
              >
                {l}
              </a>
            ))}
          </nav>

          <div className="space-y-12">
            {Object.entries(grouped).map(([letter, list]) => (
              <div key={letter} id={`letter-${letter}`}>
                <h3 className="text-6xl font-black text-muted-foreground/20 mb-4" aria-hidden="true">{letter}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {list.map((artist) => (
                    <Link to={`/singer/${artist.slug}`} key={artist.slug} className="group flex items-center gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                      <div className="w-16 h-16 overflow-hidden flex-shrink-0">
                        <img src={artist.image} alt={artist.name} className="hover-bw-to-color w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div>
                        <h4 className="font-bold group-hover:text-primary transition-colors">{artist.name}</h4>
                        <span className="text-xs text-muted-foreground">{artist.genre}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SingerPage;
