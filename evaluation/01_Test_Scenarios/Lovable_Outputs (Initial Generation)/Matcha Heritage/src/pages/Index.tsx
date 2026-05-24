import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import heroImg from "@/assets/hero-tea-field.jpg";
import regionUji from "@/assets/region-uji.jpg";
import regionNishio from "@/assets/region-nishio.jpg";
import regionShizuoka from "@/assets/region-shizuoka.jpg";
import recipeLatte from "@/assets/recipe-latte.jpg";
import recipeCake from "@/assets/recipe-cake.jpg";

const regions = [
  { name: "Uji, Kyoto", img: regionUji, desc: "The birthplace of Japanese tea ceremony" },
  { name: "Nishio, Aichi", img: regionNishio, desc: "Japan's largest matcha producer" },
  { name: "Shizuoka", img: regionShizuoka, desc: "Rich volcanic soil, bold flavor" },
];

const recipes = [
  { title: "Classic Matcha Latte", img: recipeLatte, time: "5 min", badge: "New" },
  { title: "Matcha Cheesecake", img: recipeCake, time: "45 min", badge: "New" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Matcha Heritage",
  url: "https://matcha-whispers.lovable.app",
  description: "A beautiful guide to Japanese matcha tea — history, regions, brewing methods, and recipes.",
};

const Index = () => (
  <Layout>
    <SEOHead
      title="Matcha Heritage — Your Guide to Japanese Tea"
      description="Discover the world of matcha: Japanese tea history, origin regions, taste profiles, brewing methods, and delicious recipes."
      path="/"
      jsonLd={jsonLd}
    />

    {/* Hero */}
    <section className="relative h-[85vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <img
        src={heroImg}
        alt="Lush Japanese tea fields at golden hour"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-primary/40" aria-hidden="true" />
      <div className="relative z-10 text-center px-4">
        <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4 drop-shadow-lg">
          Matcha Heritage
        </h1>
        <p className="font-body text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-xl mx-auto">
          A beautiful guide to Japanese tea history, taste profiles, and home brewing.
        </p>
        <Link
          to="/matcha-types-and-aroma"
          className="inline-block rounded-md bg-secondary px-8 py-3 font-body font-semibold text-secondary-foreground hover:bg-secondary/90 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Discover Your Matcha
        </Link>
      </div>
    </section>

    {/* Heritage Intro */}
    <section className="container py-20 text-center max-w-2xl">
      <h2 className="font-heading text-3xl font-bold text-foreground mb-4">A Tradition of Mindfulness</h2>
      <p className="font-body text-muted-foreground leading-relaxed mb-6">
        For over eight centuries, matcha has been at the heart of Japanese culture — from Zen monasteries to modern cafés.
        Each bowl tells a story of craftsmanship, terroir, and intention.
      </p>
      <Link to="/history-of-matcha" className="font-body text-sm font-semibold text-secondary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded">
        Learn History →
      </Link>
    </section>

    {/* Featured Regions */}
    <section className="bg-muted py-20" aria-labelledby="regions-heading">
      <div className="container">
        <h2 id="regions-heading" className="font-heading text-3xl font-bold text-foreground text-center mb-12">Tea Regions of Japan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {regions.map((r) => (
            <Link
              key={r.name}
              to="/origin-regions-japan"
              className="flex flex-col items-center text-center group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg p-2"
            >
              <div className="w-48 h-48 rounded-full overflow-hidden mb-4 border-4 border-secondary/30 group-hover:border-secondary transition-colors">
                <img src={r.img} alt={`Tea fields in ${r.name}`} className="w-full h-full object-cover" loading="lazy" decoding="async" width={384} height={384} />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">{r.name}</h3>
              <p className="font-body text-sm text-muted-foreground mt-1">{r.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Taste Guide Preview */}
    <section className="container py-20 text-center" aria-labelledby="flavor-heading">
      <h2 id="flavor-heading" className="font-heading text-3xl font-bold text-foreground mb-4">Find Your Flavor</h2>
      <p className="font-body text-muted-foreground mb-10 max-w-lg mx-auto">
        From sweet and creamy to bold and umami — explore matcha's spectrum.
      </p>
      <div className="relative max-w-md mx-auto aspect-square border border-border rounded-lg bg-card p-8" role="img" aria-label="Flavor chart showing matcha varieties plotted on Sweet-Bitter and Light-Rich axes">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 font-body text-xs text-muted-foreground font-semibold uppercase tracking-wider" aria-hidden="true">Sweet</div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-body text-xs text-muted-foreground font-semibold uppercase tracking-wider" aria-hidden="true">Bitter</div>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-xs text-muted-foreground font-semibold uppercase tracking-wider" aria-hidden="true">Light</div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-xs text-muted-foreground font-semibold uppercase tracking-wider" aria-hidden="true">Rich</div>
        <div className="absolute top-8 bottom-8 left-1/2 w-px bg-border" aria-hidden="true" />
        <div className="absolute left-8 right-8 top-1/2 h-px bg-border" aria-hidden="true" />
        <div className="absolute top-[30%] left-[35%] w-3 h-3 rounded-full bg-secondary" title="Uji Ceremonial" aria-hidden="true" />
        <div className="absolute top-[55%] left-[65%] w-3 h-3 rounded-full bg-primary" title="Nishio Culinary" aria-hidden="true" />
        <div className="absolute top-[40%] left-[55%] w-3 h-3 rounded-full bg-matcha-gold" title="Shizuoka Blend" aria-hidden="true" />
      </div>
      <Link to="/matcha-types-and-aroma" className="inline-block mt-8 font-body text-sm font-semibold text-secondary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded">
        Explore Types & Aroma →
      </Link>
    </section>

    {/* Recipe Row */}
    <section className="bg-muted py-20" aria-labelledby="recipes-heading">
      <div className="container">
        <h2 id="recipes-heading" className="font-heading text-3xl font-bold text-foreground text-center mb-12">Fresh Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {recipes.map((r) => (
            <Link
              key={r.title}
              to="/recipes-index"
              className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={r.img} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" width={800} height={600} />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading text-lg font-bold text-card-foreground">{r.title}</h3>
                  <span className="rounded-full bg-secondary px-3 py-0.5 text-xs font-body font-semibold text-secondary-foreground">
                    {r.badge}
                  </span>
                </div>
                <p className="font-body text-sm text-muted-foreground">{r.time} prep</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
