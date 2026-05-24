import { useState } from "react";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import museum1 from "@/assets/museum-1.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";

const regions = ["All", "Bangkok", "Chiang Mai", "Chiang Rai", "Phuket"];

const galleries = [
  { name: "Bangkok Art and Culture Centre (BACC)", region: "Bangkok", type: "Museum", hours: "Tue–Sun, 10:00–21:00", admission: "Free", phone: "+66 2 214 6630", image: museum1 },
  { name: "Museum of Contemporary Art (MOCA)", region: "Bangkok", type: "Museum", hours: "Tue–Sun, 10:00–17:00", admission: "250 THB", phone: "+66 2 953 1005", image: hero2 },
  { name: "Jim Thompson Art Center", region: "Bangkok", type: "Gallery", hours: "Thu–Sun, 11:00–20:00", admission: "Free", phone: "+66 2 001 0888", image: hero1 },
  { name: "National Gallery Bangkok", region: "Bangkok", type: "Museum", hours: "Wed–Sun, 09:00–16:00", admission: "200 THB", phone: "+66 2 281 2224", image: museum1 },
  { name: "Chiang Mai Art Museum", region: "Chiang Mai", type: "Museum", hours: "Tue–Sun, 09:00–17:00", admission: "150 THB", phone: "+66 53 217 793", image: hero2 },
  { name: "MAIIAM Contemporary Art Museum", region: "Chiang Mai", type: "Museum", hours: "Wed–Mon, 10:00–18:00", admission: "150 THB", phone: "+66 52 080 555", image: hero1 },
  { name: "Chiang Rai Art Bridge", region: "Chiang Rai", type: "Gallery", hours: "Daily, 09:00–17:00", admission: "Free", phone: "+66 53 713 455", image: museum1 },
  { name: "Phuket Art Village", region: "Phuket", type: "Gallery", hours: "Daily, 10:00–19:00", admission: "Free", phone: "+66 76 510 220", image: hero2 },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Thailand Art Galleries & Museums",
  itemListElement: galleries.map((g, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Museum",
      name: g.name,
      address: { "@type": "PostalAddress", addressRegion: g.region, addressCountry: "TH" },
      telephone: g.phone,
    },
  })),
};

const GalleryMuseumPage = () => {
  const [selectedRegion, setSelectedRegion] = useState("All");

  useDocumentTitle({
    title: "Galleries & Museums",
    description: "Find Thailand's finest art galleries and museums — hours, admission, and locations in Bangkok, Chiang Mai, and beyond.",
  });

  const filtered = selectedRegion === "All"
    ? galleries
    : galleries.filter((g) => g.region === selectedRegion);

  return (
    <main id="main-content" className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Directory</p>
        <h1 className="font-heading text-5xl lg:text-6xl mb-4">Galleries & Museums</h1>
        <p className="text-muted-foreground max-w-xl mb-12">
          Your comprehensive guide to Thailand's finest art spaces.
        </p>

        {/* Region Filter */}
        <nav className="flex flex-wrap gap-2 mb-12" aria-label="Filter by region">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              aria-pressed={selectedRegion === region}
              className={`px-4 py-2 text-xs tracking-[0.15em] uppercase border transition-colors duration-300 focus:ring-2 focus:ring-primary ${
                selectedRegion === region
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
              }`}
            >
              {region}
            </button>
          ))}
        </nav>

        {/* Gallery List */}
        <div className="space-y-0 border-t border-border">
          {filtered.map((gallery) => (
            <article key={gallery.name} className="gallery-card grid grid-cols-1 md:grid-cols-[250px_1fr_200px] gap-6 items-start py-8 border-b border-border">
              <div className="aspect-[3/2] overflow-hidden">
                <img src={gallery.image} alt={gallery.name} className="w-full h-full object-cover" loading="lazy" width={250} height={167} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-heading text-xl">{gallery.name}</h2>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary border border-primary px-2 py-0.5">{gallery.type}</span>
                </div>
                <p className="text-sm text-muted-foreground">{gallery.region}</p>
                <p className="text-sm text-muted-foreground mt-1">Hours: {gallery.hours}</p>
                <p className="text-sm text-muted-foreground">Admission: {gallery.admission}</p>
              </div>
              <div className="text-right">
                <a href={`tel:${gallery.phone.replace(/\s/g, "")}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {gallery.phone}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Featured Museum */}
      <section className="bg-accent text-accent-foreground py-24" aria-labelledby="featured-museum-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-xs tracking-[0.3em] uppercase text-accent-foreground/40 mb-2">Featured Museum</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={museum1} alt="Bangkok Art and Culture Centre exterior" className="w-full h-full object-cover" loading="lazy" width={600} height={450} />
            </div>
            <div>
              <h2 id="featured-museum-heading" className="font-heading text-4xl lg:text-5xl mb-6">BACC</h2>
              <p className="text-accent-foreground/70 leading-relaxed mb-6">
                The Bangkok Art and Culture Centre stands as Thailand's premier contemporary 
                art destination. Spanning 9 floors of exhibition space, BACC hosts rotating 
                exhibitions, artist residencies, and cultural programs year-round.
              </p>
              <address className="space-y-1 text-sm text-accent-foreground/50 not-italic">
                <p>939 Rama 1 Road, Pathumwan, Bangkok</p>
                <p>BTS National Stadium, Exit 3</p>
                <p>Free admission to main galleries</p>
              </address>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Placeholder */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24" aria-labelledby="map-heading">
        <h2 id="map-heading" className="font-heading text-4xl mb-8">Find a Gallery</h2>
        <div className="aspect-[2/1] bg-secondary flex items-center justify-center" role="img" aria-label="Interactive gallery map — coming soon">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">Interactive Map</p>
            <p className="text-xs text-muted-foreground/50 mt-1">Coming soon</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GalleryMuseumPage;
