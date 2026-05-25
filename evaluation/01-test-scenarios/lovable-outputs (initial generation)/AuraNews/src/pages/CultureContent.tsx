import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { SharePills } from "@/components/SharePills";
import { CategoryBadge } from "@/components/CategoryBadge";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import cultureFilm from "@/assets/culture-film.jpg";
import cultureHero from "@/assets/culture-hero.jpg";
import cultureMusic from "@/assets/culture-music.jpg";
import heroSecondary from "@/assets/hero-secondary.jpg";

const galleryImages = [
  { src: cultureFilm, alt: "Independent filmmaker on a micro-budget set" },
  { src: cultureHero, alt: "Contemporary art gallery with abstract installations" },
  { src: cultureMusic, alt: "Vinyl records in an analog music studio" },
  { src: heroSecondary, alt: "Street art mural in an urban setting" },
];

const relatedCulture = [
  { title: "The Return of Vinyl: Music's Analog Renaissance", image: cultureMusic, link: "/culture/article" },
  { title: "Inside the World's Most Daring Art Galleries", image: cultureHero, link: "/culture/article" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Indie Cinema's Quiet Revolution",
  author: { "@type": "Person", name: "Marcus Rivera" },
  datePublished: "2026-04-06",
  publisher: { "@type": "Organization", name: "AuraNews" },
  description: "How micro-budget filmmakers are reshaping narrative storytelling — and what Hollywood can learn from them.",
};

const CultureContent = () => {
  useDocumentTitle("Indie Cinema's Quiet Revolution");

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgressBar />
      <SiteHeader />

      <article id="main-content" className="container mx-auto px-4 max-w-3xl py-10">
        <CategoryBadge category="Culture" to="/culture" />

        <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight mt-4 text-headline">
          Indie Cinema's Quiet Revolution
        </h1>
        <p className="font-serif text-xl text-muted-foreground mt-3 italic">
          How micro-budget filmmakers are reshaping narrative storytelling — and what Hollywood can learn from them.
        </p>

        <div className="flex items-center justify-between mt-6 pb-6 border-b border-border">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">By Marcus Rivera</span> · <time dateTime="2026-04-06">April 6, 2026</time> · 15 min read
          </div>
          <SharePills />
        </div>

        {/* Cinematic Image Gallery */}
        <div className="grid grid-cols-2 gap-2 mt-8 mb-10" role="group" aria-label="Cinematic image gallery">
          {galleryImages.map((img, i) => (
            <div key={i} className="overflow-hidden rounded-sm">
              <img src={img.src} alt={img.alt} loading="lazy" width={600} height={400} className="w-full h-48 md:h-56 object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>

        {/* Long-form Analysis Body */}
        <div className="space-y-6 text-foreground leading-[1.9] text-[1.05rem]">
          <p>
            In a converted warehouse on the outskirts of Austin, Texas, a crew of seven is making a feature film. The budget is $40,000 — less than what a major studio spends on craft services for a single day of production. The camera is a consumer-grade mirrorless. The script was workshopped over Zoom calls spanning three continents. And yet, the film that emerges from this makeshift studio will go on to premiere at Sundance, spark a bidding war, and redefine what audiences expect from cinema.
          </p>

          <p>
            This isn't an anomaly. It's the new normal. Over the past five years, a generation of filmmakers has emerged who treat financial constraints not as obstacles but as creative catalysts. They're shooting on iPhones, casting non-actors, and telling stories that the mainstream industry has deemed too risky, too niche, or too quiet to greenlight.
          </p>

          <h2 className="font-serif text-2xl font-bold mt-10 mb-4 text-headline">The Economics of Independence</h2>

          <p>
            The democratization of filmmaking technology has been discussed for decades, but only now is its full impact becoming visible. When Sean Baker shot "Tangerine" on an iPhone 5s in 2015, it was a novelty. Today, the technical gap between independent and studio productions has narrowed to the point of irrelevance for many audiences — particularly younger viewers raised on YouTube and TikTok, where production value is secondary to authenticity.
          </p>

          <blockquote className="border-l-2 border-primary pl-6 my-8 font-serif italic text-lg text-muted-foreground">
            <p>"The most expensive thing in cinema has always been the story. Everything else is logistics."</p>
            <footer className="mt-2 text-sm not-italic font-semibold text-primary">— Chloé Zhao</footer>
          </blockquote>

          <h2 className="font-serif text-2xl font-bold mt-10 mb-4 text-headline">New Voices, New Stories</h2>

          <p>
            What makes this moment different from previous waves of independent cinema is the diversity of perspectives reaching audiences. Filmmakers from regions historically underrepresented in global cinema — West Africa, Southeast Asia, Central America — are finding audiences not through traditional distribution channels, but through festival circuits and streaming platforms hungry for fresh content.
          </p>

          <p>
            The result is a cinematic landscape richer and more varied than at any point in history. Stories that would have been impossible to tell — let alone distribute — even a decade ago are now reaching millions of viewers. A documentary about deaf communities in rural India. A horror film exploring generational trauma in the Korean diaspora. A romantic comedy set entirely within a WhatsApp conversation.
          </p>

          <h2 className="font-serif text-2xl font-bold mt-10 mb-4 text-headline">The Hollywood Response</h2>

          <p>
            The major studios have taken notice, though their response has been characteristically ambivalent. On one hand, they're acquiring independent films at record rates and signing first-look deals with emerging directors. On the other, they continue to pour hundreds of millions into franchise properties and sequels, hedging against the volatility of original storytelling.
          </p>

          <p>
            The tension between these two impulses — the desire for fresh voices and the safety of proven formulas — will define the next chapter of American cinema. For now, the most exciting stories are being told on the margins, by filmmakers who have nothing to lose and everything to say.
          </p>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <SharePills />
        </div>
      </article>

      {/* Recommended Culture Stories */}
      <section className="container mx-auto px-4 max-w-3xl pb-10" aria-label="Recommended stories">
        <h2 className="font-serif text-2xl font-bold mb-6 pb-3 border-b border-border">Recommended</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {relatedCulture.map((a, i) => (
            <Link to={a.link} key={i} className="group">
              <div className="overflow-hidden rounded-sm mb-3">
                <img src={a.image} alt={a.title} loading="lazy" width={600} height={400} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <CategoryBadge category="Culture" to="/culture" />
              <h3 className="mt-2 font-serif font-bold leading-snug group-hover:text-primary transition-colors">{a.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default CultureContent;
