import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";
import artist1 from "@/assets/artist-1.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";

const exhibitions = [
  { title: "Echoes of the Mekong", venue: "BACC, Bangkok", date: "May 12 — Jul 20, 2026", image: artwork1 },
  { title: "Form & Void", venue: "MOCA Bangkok", date: "Jun 1 — Aug 15, 2026", image: artwork2 },
  { title: "Tropical Impressions", venue: "Chiang Mai Art Museum", date: "Apr 5 — Jun 30, 2026", image: artwork3 },
];

const artists = [
  { name: "Somchai Prateep", discipline: "Painting", image: artist1 },
  { name: "Nattaya Suwannapak", discipline: "Mixed Media", image: artist2 },
  { name: "Prasert Khlongkhom", discipline: "Sculpture", image: artist3 },
];

const journalArticles = [
  { title: "The Rise of Thai Abstract Expressionism", category: "Essay", date: "Spring 2026" },
  { title: "Bangkok's Underground Art Scene", category: "Feature", date: "Spring 2026" },
  { title: "Collectors' Guide: Investing in Southeast Asian Art", category: "Guide", date: "Spring 2026" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Thai Gallery Guide",
  url: "https://thai-art-pulse.lovable.app",
  description: "A premium guide to Thailand's art world, featuring local artists, upcoming exhibitions, and the latest museum shows.",
};

const Index = () => {
  useDocumentTitle({
    title: "Discover Thailand's Art World",
    description: "A premium guide to Thailand's art world, featuring local artists, upcoming exhibitions, and the latest museum shows.",
  });

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSlider />

      {/* Current Exhibitions */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24" aria-labelledby="exhibitions-heading">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Now Showing</p>
            <h2 id="exhibitions-heading" className="font-heading text-4xl lg:text-5xl">Current Exhibitions</h2>
          </div>
          <Link to="/event" className="gallery-link hidden md:inline-block">
            View All <ArrowRight size={14} className="inline ml-1" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {exhibitions.map((ex) => (
            <Link to="/event" key={ex.title} className="gallery-card group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden mb-4">
                <img src={ex.image} alt={ex.title} className="w-full h-full object-cover" loading="lazy" width={400} height={500} />
              </div>
              <h3 className="font-heading text-xl mb-1">{ex.title}</h3>
              <p className="text-sm text-muted-foreground">{ex.venue}</p>
              <p className="text-xs text-muted-foreground mt-1">{ex.date}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Artist Spotlight */}
      <section className="bg-accent text-accent-foreground py-24" aria-labelledby="artists-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-accent-foreground/40 mb-2">Spotlight</p>
              <h2 id="artists-heading" className="font-heading text-4xl lg:text-5xl">Featured Artists</h2>
            </div>
            <Link to="/artist" className="hidden md:inline-block text-xs tracking-[0.2em] uppercase text-primary hover:text-primary/80 transition-colors">
              All Artists <ArrowRight size={14} className="inline ml-1" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {artists.map((a) => (
              <Link to="/artist" key={a.name} className="gallery-card group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden mb-4 grayscale">
                  <img src={a.image} alt={`Portrait of ${a.name}`} className="w-full h-full object-cover" loading="lazy" width={400} height={500} />
                </div>
                <h3 className="font-heading text-xl text-accent-foreground">{a.name}</h3>
                <p className="text-sm text-accent-foreground/50">{a.discipline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Thai Art Quarterly */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24" aria-labelledby="journal-heading">
        <div className="mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Journal</p>
          <h2 id="journal-heading" className="font-heading text-4xl lg:text-5xl">Thai Art Quarterly</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-border" role="list">
          {journalArticles.map((article) => (
            <article key={article.title} role="listitem" className="py-8 md:px-8 first:md:pl-0 last:md:pr-0 border-b md:border-b-0 md:border-r last:border-r-0 border-border">
              <span className="text-xs tracking-[0.2em] uppercase text-primary">{article.category}</span>
              <h3 className="font-heading text-2xl mt-2 mb-3">{article.title}</h3>
              <p className="text-xs text-muted-foreground">{article.date}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border" aria-labelledby="newsletter-heading">
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <h2 id="newsletter-heading" className="font-heading text-3xl lg:text-4xl mb-4">Stay Connected</h2>
          <p className="text-sm text-muted-foreground mb-8">
            Receive curated exhibition previews and artist interviews.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Newsletter subscription"
          >
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Your email address"
              autoComplete="email"
              className="flex-1 px-4 py-3 bg-secondary text-foreground text-sm border-0 outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Index;
