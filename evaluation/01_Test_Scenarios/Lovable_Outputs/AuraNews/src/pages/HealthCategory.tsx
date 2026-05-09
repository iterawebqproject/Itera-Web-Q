import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryBadge } from "@/components/CategoryBadge";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import healthHero from "@/assets/health-hero.jpg";
import healthNutrition from "@/assets/health-nutrition.jpg";
import healthMental from "@/assets/health-mental.jpg";

const healthStream = [
  { title: "Breathwork: The Ancient Practice Backed by Modern Science", excerpt: "Controlled breathing techniques are proving effective against anxiety and chronic pain.", image: healthMental, date: "2026-04-06", dateDisplay: "April 6, 2026" },
  { title: "Is Intermittent Fasting Still Worth It in 2026?", excerpt: "New longitudinal studies challenge some long-held assumptions about time-restricted eating.", image: healthNutrition, date: "2026-04-05", dateDisplay: "April 5, 2026" },
  { title: "The Microbiome Revolution: What Your Gut Is Telling You", excerpt: "Scientists decode the complex relationship between gut bacteria and overall health.", image: healthHero, date: "2026-04-04", dateDisplay: "April 4, 2026" },
];

const expertColumns = [
  { name: "Dr. Maya Chen", specialty: "Integrative Medicine", quote: "We need to stop treating symptoms and start treating systems." },
  { name: "Dr. James Obi", specialty: "Sports Nutrition", quote: "Recovery is the most overlooked component of athletic performance." },
  { name: "Dr. Leila Farsi", specialty: "Mental Wellness", quote: "Mindfulness isn't about emptying your mind — it's about observing it." },
];

const HealthCategory = () => {
  useDocumentTitle("Health & Wellness");

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Category Header */}
      <section className="container mx-auto px-4 pt-10 pb-6">
        <CategoryBadge category="Health & Wellness" />
        <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3 text-headline">Health & Wellness</h1>
        <p className="mt-3 text-muted-foreground max-w-xl leading-relaxed">
          Evidence-based reporting on physical health, mental wellness, nutrition, and the science of living well.
        </p>
      </section>

      {/* Featured Editorial */}
      <section className="container mx-auto px-4 py-8">
        <ArticleCard
          title="The Wellness Industry's Reckoning with Science"
          excerpt="As wellness becomes a trillion-dollar market, researchers push back against pseudoscience. We investigate the claims, the studies, and the people caught in between."
          image={healthHero}
          category="Featured"
          categoryLink="/health"
          articleLink="/health/article"
          date="April 8, 2026"
          large
        />
      </section>

      <main id="main-content" className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Health Stream */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-bold mb-8 pb-3 border-b border-border">The Health Stream</h2>
            <div className="space-y-10">
              {healthStream.map((a, i) => (
                <article key={i} className="flex gap-5 group">
                  <Link to="/health/article" className="shrink-0 overflow-hidden rounded-sm" tabIndex={-1} aria-hidden="true">
                    <img src={a.image} alt="" loading="lazy" width={176} height={128} className="w-32 h-24 md:w-44 md:h-32 object-cover transition-transform duration-500 group-hover:scale-105" />
                  </Link>
                  <div>
                    <CategoryBadge category="Health" to="/health" />
                    <h3 className="mt-1 font-serif font-bold text-lg leading-snug group-hover:text-primary transition-colors">
                      <Link to="/health/article">{a.title}</Link>
                    </h3>
                    <p className="mt-1 text-muted-foreground text-sm line-clamp-2">{a.excerpt}</p>
                    <time className="mt-1 block text-xs text-muted-foreground" dateTime={a.date}>{a.dateDisplay}</time>
                  </div>
                </article>
              ))}
            </div>

            {/* Nutrition & Medicine Sub-sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <section>
                <h3 className="font-serif text-lg font-bold pb-2 border-b border-border mb-4">Nutrition</h3>
                <ArticleCard
                  title="Plant-Based Living: Beyond the Trend"
                  excerpt="A nuanced look at sustainable nutrition and modern wellness practices."
                  image={healthNutrition}
                  category="Nutrition"
                  categoryLink="/health"
                  articleLink="/health/article"
                  date="April 5, 2026"
                />
              </section>
              <section>
                <h3 className="font-serif text-lg font-bold pb-2 border-b border-border mb-4">Mental Health</h3>
                <ArticleCard
                  title="The Science of Sleep: Why 8 Hours Isn't Enough"
                  excerpt="New research reveals that sleep quality matters more than duration."
                  image={healthMental}
                  category="Mental Health"
                  categoryLink="/health"
                  articleLink="/health/article"
                  date="April 7, 2026"
                />
              </section>
            </div>
          </div>

          {/* Expert Column Snippets */}
          <aside aria-label="Expert voices">
            <h2 className="font-serif text-2xl font-bold mb-8 pb-3 border-b border-border">Expert Voices</h2>
            <div className="space-y-6">
              {expertColumns.map((e, i) => (
                <blockquote key={i} className="border-l-2 border-primary/30 pl-4">
                  <p className="font-serif text-sm italic leading-relaxed text-foreground">"{e.quote}"</p>
                  <footer className="mt-2">
                    <cite className="text-xs font-semibold text-primary not-italic">{e.name}</cite>
                    <p className="text-xs text-muted-foreground">{e.specialty}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default HealthCategory;
