import { contentItems } from "@/data/content";
import { ContentCard } from "@/components/ContentCard";
import { Helmet } from "react-helmet-async";

const topPicks = contentItems.filter(
  (_, i) => [0, 2, 4, 5].includes(i)
);

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Anya Dev — Developer Portfolio</title>
        <meta name="description" content="Portfolio of Anya Dev — web developer, creative coder, and open source contributor." />
        <link rel="canonical" href="https://anya-garden-hub.lovable.app/" />
      </Helmet>
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <section aria-labelledby="hero-heading" className="mb-20">
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <h1 id="hero-heading" className="font-serif text-4xl md:text-5xl leading-tight text-foreground">
                Hi, I'm <span className="text-secondary">Anya</span>.
                <br />I build things for the web.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
                Developer, writer, and tinkerer. Exploring the intersection of
                craft and code through projects, experiments, and words.
              </p>
            </div>
            <div className="hidden md:block flex-shrink-0" aria-hidden="true">
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                className="text-secondary opacity-60"
                role="img"
                aria-label="Decorative crystal shape"
              >
                <path d="M20 20L40 10L60 20L40 30Z" fill="currentColor" opacity="0.3" />
                <path d="M20 20L40 30L40 55L20 45Z" fill="currentColor" opacity="0.5" />
                <path d="M60 20L40 30L40 55L60 45Z" fill="currentColor" opacity="0.7" />
                <circle cx="40" cy="15" r="3" fill="currentColor" opacity="0.9" />
              </svg>
            </div>
          </div>
        </section>

        {/* Featured Feed */}
        <section aria-labelledby="top-picks-heading">
          <h2 id="top-picks-heading" className="font-serif text-2xl text-foreground mb-8">Top Picks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topPicks.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
