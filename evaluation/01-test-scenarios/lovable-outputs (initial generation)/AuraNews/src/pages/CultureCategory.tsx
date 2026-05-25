import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryBadge } from "@/components/CategoryBadge";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import cultureHero from "@/assets/culture-hero.jpg";
import cultureFilm from "@/assets/culture-film.jpg";
import cultureMusic from "@/assets/culture-music.jpg";
import heroSecondary from "@/assets/hero-secondary.jpg";

const movieGrid = [
  { title: "Indie Cinema's Quiet Revolution", image: cultureFilm, date: "April 6, 2026" },
  { title: "Inside the World's Most Daring Galleries", image: cultureHero, date: "April 5, 2026" },
  { title: "Street Culture and the New Visual Language", image: heroSecondary, date: "April 4, 2026" },
  { title: "The Return of Vinyl: Analog Renaissance", image: cultureMusic, date: "April 3, 2026" },
];

const weeklyPicks = [
  "The Brutalist — Dir. Brady Corbet",
  "Nosferatu — Dir. Robert Eggers",
  "Conclave — Dir. Edward Berger",
  "Anora — Dir. Sean Baker",
  "Emilia Pérez — Dir. Jacques Audiard",
];

const CultureCategory = () => {
  useDocumentTitle("Culture & Arts");

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Culture Hub Header */}
      <section className="container mx-auto px-4 pt-10 pb-6">
        <CategoryBadge category="Culture & Arts" />
        <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3 text-headline">Culture & Arts</h1>
        <p className="mt-3 text-muted-foreground max-w-xl leading-relaxed">
          Cinema, music, visual arts, and the cultural currents shaping how we see the world.
        </p>
      </section>

      <main id="main-content" className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Movie & TV Show Grid */}
            <h2 className="font-serif text-2xl font-bold mb-8 pb-3 border-b border-border">Film & Visual Arts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {movieGrid.map((a, i) => (
                <ArticleCard
                  key={i}
                  title={a.title}
                  excerpt="A deep dive into the creative forces redefining contemporary culture."
                  image={a.image}
                  category="Culture"
                  categoryLink="/culture"
                  articleLink="/culture/article"
                  date={a.date}
                />
              ))}
            </div>

            {/* Music & Society Features */}
            <h2 className="font-serif text-2xl font-bold mt-12 mb-8 pb-3 border-b border-border">Music & Society</h2>
            <article className="flex gap-5 group">
              <Link to="/culture/article" className="shrink-0 overflow-hidden rounded-sm" tabIndex={-1} aria-hidden="true">
                <img src={cultureMusic} alt="" loading="lazy" width={176} height={128} className="w-32 h-24 md:w-44 md:h-32 object-cover transition-transform duration-500 group-hover:scale-105" />
              </Link>
              <div>
                <CategoryBadge category="Music" to="/culture" />
                <h3 className="mt-1 font-serif font-bold text-lg leading-snug group-hover:text-primary transition-colors">
                  <Link to="/culture/article">How Jazz Became the Soundtrack of Resistance</Link>
                </h3>
                <p className="mt-1 text-muted-foreground text-sm line-clamp-2">
                  From Harlem to global stages, jazz has always been more than music — it's a language of freedom and defiance.
                </p>
                <time className="mt-1 block text-xs text-muted-foreground" dateTime="2026-04-02">April 2, 2026</time>
              </div>
            </article>
          </div>

          {/* Weekly Recommendation Sidebar */}
          <aside aria-label="Weekly picks and cultural critique">
            <h2 className="font-serif text-2xl font-bold mb-8 pb-3 border-b border-border">This Week's Picks</h2>
            <ol className="space-y-4">
              {weeklyPicks.map((pick, i) => (
                <li key={i} className="flex gap-3 group cursor-pointer">
                  <span className="font-serif text-2xl font-bold text-primary/30 group-hover:text-primary transition-colors" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-serif text-sm font-medium leading-snug group-hover:text-primary transition-colors pt-1">
                    {pick}
                  </p>
                </li>
              ))}
            </ol>

            {/* Cultural Critique Highlights */}
            <h3 className="font-serif text-lg font-bold mt-10 mb-4 pb-2 border-b border-border">Cultural Critique</h3>
            <div className="space-y-4">
              {["The Death of the Monoculture", "Why Nostalgia Sells", "AI Art: Creative Tool or Threat?"].map((t, i) => (
                <div key={i} className="border-l-2 border-primary/30 pl-4 cursor-pointer group">
                  <p className="font-serif text-sm font-medium group-hover:text-primary transition-colors">{t}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Opinion · 5 min read</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default CultureCategory;
