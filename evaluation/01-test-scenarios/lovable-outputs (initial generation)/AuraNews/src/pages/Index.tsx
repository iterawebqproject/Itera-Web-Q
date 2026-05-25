import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { NewsTicker } from "@/components/NewsTicker";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryBadge } from "@/components/CategoryBadge";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import heroMain from "@/assets/hero-main.jpg";
import heroSecondary from "@/assets/hero-secondary.jpg";
import healthHero from "@/assets/health-hero.jpg";
import cultureHero from "@/assets/culture-hero.jpg";
import healthNutrition from "@/assets/health-nutrition.jpg";
import culturMusic from "@/assets/culture-music.jpg";
import healthMental from "@/assets/health-mental.jpg";
import cultureFilm from "@/assets/culture-film.jpg";

const streamArticles = [
  { title: "The Science of Sleep: Why 8 Hours Isn't Enough", excerpt: "New research reveals that sleep quality matters more than duration.", image: healthMental, category: "Health", categoryLink: "/health", articleLink: "/health/article", date: "2026-04-07", dateDisplay: "April 7, 2026" },
  { title: "Indie Cinema's Quiet Revolution", excerpt: "How micro-budget filmmakers are reshaping narrative storytelling.", image: cultureFilm, category: "Culture", categoryLink: "/culture", articleLink: "/culture/article", date: "2026-04-06", dateDisplay: "April 6, 2026" },
  { title: "Plant-Based Living: Beyond the Trend", excerpt: "A nuanced look at sustainable nutrition and modern wellness.", image: healthNutrition, category: "Health", categoryLink: "/health", articleLink: "/health/article", date: "2026-04-05", dateDisplay: "April 5, 2026" },
  { title: "The Return of Vinyl: Music's Analog Renaissance", excerpt: "Why audiophiles and Gen Z alike are embracing physical media.", image: culturMusic, category: "Culture", categoryLink: "/culture", articleLink: "/culture/article", date: "2026-04-04", dateDisplay: "April 4, 2026" },
];

const mostRead = [
  "Why Walking Is the Most Underrated Exercise",
  "The Golden Age of Television Is Over — Now What?",
  "Mediterranean Diet: A Complete 2026 Guide",
  "How Jazz Became the Soundtrack of Resistance",
  "Digital Detox: A 30-Day Experiment",
  "The Art of Slow Living in a Fast World",
  "New Wave Korean Cinema: 5 Must-Watch Films",
  "Gut Health and Mood: The Surprising Connection",
  "Street Photography as Social Commentary",
  "Why Reading Long-form Matters More Than Ever",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  name: "AuraNews",
  url: "https://aura-deep-stories.lovable.app",
  description: "AuraNews delivers high-authority journalism on health, culture, and the stories that shape modern life.",
};

const Index = () => {
  useDocumentTitle("Deep Stories on Culture & Wellness");

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <NewsTicker />

      <main id="main-content">
        {/* Hero Grid */}
        <section className="container mx-auto px-4 py-10" aria-label="Featured stories">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ArticleCard
              title="Urban Futures: How Cities Are Redesigning for People"
              excerpt="From Barcelona's superblocks to Seoul's sky gardens, the world's metropolises are putting pedestrians first."
              image={heroMain}
              category="Society"
              categoryLink="/culture"
              articleLink="/culture/article"
              date="April 8, 2026"
              large
            />
            <div className="grid grid-rows-2 gap-6">
              <ArticleCard
                title="The Wellness Industry's Reckoning with Science"
                excerpt="As wellness becomes a trillion-dollar market, researchers push back against pseudoscience."
                image={healthHero}
                category="Health"
                categoryLink="/health"
                articleLink="/health/article"
                date="April 8, 2026"
              />
              <ArticleCard
                title="Inside the World's Most Daring Art Galleries"
                excerpt="A visual journey through spaces that challenge what art can be."
                image={cultureHero}
                category="Culture"
                categoryLink="/culture"
                articleLink="/culture/article"
                date="April 7, 2026"
              />
            </div>
          </div>
        </section>

        {/* The Stream + Most Read Sidebar */}
        <section className="container mx-auto px-4 py-10" aria-label="Latest articles">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl font-bold mb-8 pb-3 border-b border-border">
                The Stream
              </h2>
              <div className="space-y-10">
                {streamArticles.map((a, i) => (
                  <article key={i} className="flex gap-5 group">
                    <Link to={a.articleLink} className="shrink-0 overflow-hidden rounded-sm" tabIndex={-1} aria-hidden="true">
                      <img src={a.image} alt="" loading="lazy" width={176} height={128} className="w-32 h-24 md:w-44 md:h-32 object-cover transition-transform duration-500 group-hover:scale-105" />
                    </Link>
                    <div>
                      <CategoryBadge category={a.category} to={a.categoryLink} />
                      <h3 className="mt-1 font-serif font-bold text-lg leading-snug group-hover:text-primary transition-colors">
                        <Link to={a.articleLink}>{a.title}</Link>
                      </h3>
                      <p className="mt-1 text-muted-foreground text-sm line-clamp-2">{a.excerpt}</p>
                      <time className="mt-1 block text-xs text-muted-foreground" dateTime={a.date}>{a.dateDisplay}</time>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Most Read Sidebar */}
            <aside aria-label="Most read articles">
              <h2 className="font-serif text-2xl font-bold mb-8 pb-3 border-b border-border">
                Most Read
              </h2>
              <ol className="space-y-4">
                {mostRead.map((title, i) => (
                  <li key={i} className="flex gap-3 group cursor-pointer">
                    <span className="font-serif text-2xl font-bold text-primary/30 group-hover:text-primary transition-colors" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-serif text-sm font-medium leading-snug group-hover:text-primary transition-colors pt-1">
                      {title}
                    </p>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>

        {/* Visual Arts Gallery */}
        <section className="py-10" aria-label="Visual arts gallery">
          <div className="container mx-auto px-4 mb-6">
            <h2 className="font-serif text-2xl font-bold pb-3 border-b border-border">Visual Arts</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {[
              { src: heroMain, alt: "Urban architecture and city redesign" },
              { src: cultureHero, alt: "Modern art gallery interior" },
              { src: heroSecondary, alt: "Contemporary street art installation" },
              { src: culturMusic, alt: "Vinyl records and analog music equipment" },
            ].map((img, i) => (
              <div key={i} className="overflow-hidden aspect-square cursor-pointer group">
                <img src={img.src} alt={img.alt} loading="lazy" width={400} height={400} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            ))}
          </div>
        </section>

        {/* Topic Index */}
        <section className="container mx-auto px-4 py-10" aria-label="Topic index">
          <h2 className="font-serif text-2xl font-bold mb-8 pb-3 border-b border-border">Topic Index</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Health & Wellness", "Culture & Arts", "Society", "Mental Health", "Nutrition", "Cinema", "Music", "Long Reads"].map((t) => (
              <div key={t} className="border border-border rounded-sm p-4 hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer">
                <h3 className="font-serif text-sm font-semibold">{t}</h3>
                <p className="text-xs text-muted-foreground mt-1">Explore archive →</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Index;
