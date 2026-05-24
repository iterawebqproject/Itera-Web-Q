import useDocumentTitle from "@/hooks/useDocumentTitle";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";

const masterpieces = [
  { title: "Crimson Flow", artist: "Somchai Prateep", medium: "Oil & gold leaf on canvas", year: "2025", image: artwork1 },
  { title: "Earthen Whisper", artist: "Nattaya Suwannapak", medium: "Ceramic sculpture", year: "2024", image: artwork2 },
  { title: "Emerald Canopy", artist: "Prasert Khlongkhom", medium: "Oil on linen", year: "2026", image: artwork3 },
  { title: "Silent Echoes", artist: "Anuwat Charoensri", medium: "Acrylic on canvas", year: "2025", image: hero1 },
  { title: "Golden Meridian", artist: "Kanya Thongchai", medium: "Mixed media", year: "2024", image: hero2 },
];

const ArtPage = () => {
  useDocumentTitle({
    title: "Art Collection",
    description: "Explore Thailand's most compelling contemporary artworks, curated from top galleries and museums.",
  });

  return (
    <main id="main-content" className="pt-20">
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Collection</p>
        <h1 className="font-heading text-5xl lg:text-6xl mb-4">The Art</h1>
        <p className="text-muted-foreground max-w-xl">
          A curated selection of Thailand's most compelling contemporary artworks.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24" aria-labelledby="masterpieces-heading">
        <h2 id="masterpieces-heading" className="sr-only">Masterpiece Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {masterpieces.map((work) => (
            <article key={work.title} className="gallery-card">
              <div className="aspect-[4/5] overflow-hidden mb-6">
                <img src={work.image} alt={`${work.title} by ${work.artist}`} className="w-full h-full object-cover" loading="lazy" width={600} height={750} />
              </div>
              <h3 className="font-heading text-2xl">{work.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{work.artist}</p>
              <p className="text-xs text-muted-foreground mt-1">{work.medium}, {work.year}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-accent text-accent-foreground py-24" aria-labelledby="curators-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-xs tracking-[0.3em] uppercase text-accent-foreground/40 mb-2">Curator's Choice</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-square overflow-hidden">
              <img src={artwork1} alt="Crimson Flow — Curator's choice artwork by Somchai Prateep" className="w-full h-full object-cover" loading="lazy" width={600} height={600} />
            </div>
            <div>
              <h2 id="curators-heading" className="font-heading text-4xl lg:text-5xl mb-6">Crimson Flow</h2>
              <p className="text-accent-foreground/70 leading-relaxed mb-6">
                This monumental work by Somchai Prateep captures the essence of Thai artistic 
                tradition through a contemporary lens. The interplay of gold leaf and crimson 
                pigment creates a dynamic tension that speaks to the duality of preservation 
                and progress in Southeast Asian art.
              </p>
              <dl className="space-y-2 text-sm text-accent-foreground/50">
                <div><dt className="sr-only">Medium</dt><dd>Oil & gold leaf on canvas</dd></div>
                <div><dt className="sr-only">Dimensions</dt><dd>200 × 250 cm</dd></div>
                <div><dt className="sr-only">Year</dt><dd>2025</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 border-t border-border" aria-labelledby="credits-heading">
        <p id="credits-heading" className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">Featured Artists</p>
        <ul className="flex flex-wrap gap-x-8 gap-y-2" aria-label="Featured artists list">
          {["Somchai Prateep", "Nattaya Suwannapak", "Prasert Khlongkhom", "Anuwat Charoensri", "Kanya Thongchai"].map((name) => (
            <li key={name} className="text-sm text-foreground">{name}</li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default ArtPage;
