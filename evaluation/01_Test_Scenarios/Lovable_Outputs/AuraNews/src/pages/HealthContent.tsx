import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { SharePills } from "@/components/SharePills";
import { CategoryBadge } from "@/components/CategoryBadge";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import healthHero from "@/assets/health-hero.jpg";
import healthNutrition from "@/assets/health-nutrition.jpg";
import healthMental from "@/assets/health-mental.jpg";

const relatedArticles = [
  { title: "Breathwork: Ancient Practice, Modern Science", image: healthMental, link: "/health/article" },
  { title: "Plant-Based Living: Beyond the Trend", image: healthNutrition, link: "/health/article" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The Wellness Industry's Reckoning with Science",
  author: { "@type": "Person", name: "Sarah Mitchell" },
  datePublished: "2026-04-08",
  publisher: { "@type": "Organization", name: "AuraNews" },
  description: "As wellness becomes a trillion-dollar market, researchers push back against pseudoscience.",
};

const HealthContent = () => {
  useDocumentTitle("The Wellness Industry's Reckoning with Science");

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgressBar />
      <SiteHeader />

      <article id="main-content" className="container mx-auto px-4 max-w-3xl py-10">
        <CategoryBadge category="Health" to="/health" />

        <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight mt-4 text-headline">
          The Wellness Industry's Reckoning with Science
        </h1>

        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          As wellness becomes a trillion-dollar market, researchers push back against pseudoscience. We investigate the claims, the studies, and the people caught in between.
        </p>

        <div className="flex items-center justify-between mt-6 pb-6 border-b border-border">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">By Sarah Mitchell</span> · <time dateTime="2026-04-08">April 8, 2026</time> · 12 min read
          </div>
          <SharePills />
        </div>

        {/* Feature Image */}
        <img
          src={healthHero}
          alt="Researchers examining wellness supplements in a laboratory"
          width={1200}
          height={800}
          className="w-full rounded-sm mt-8 mb-10"
        />

        {/* Article Body */}
        <div className="space-y-6 text-foreground leading-[1.9] text-[1.05rem]">
          <p>
            The global wellness economy surpassed $5.6 trillion in 2025, encompassing everything from organic supplements to mindfulness apps, cryotherapy chambers to adaptogenic mushroom blends. But beneath the glossy marketing and Instagram aesthetics lies a growing tension between an industry built on aspiration and a scientific community demanding evidence.
          </p>

          <h2 className="font-serif text-2xl font-bold mt-10 mb-4 text-headline">The Promise and the Problem</h2>

          <p>
            Walk into any upscale pharmacy or wellness boutique, and you'll find shelves lined with supplements claiming to boost immunity, enhance cognitive function, or reverse aging. The language is carefully calibrated — not quite making medical claims, but implying transformative results. "Support your body's natural defenses." "Unlock your cognitive potential." "Turn back the biological clock."
          </p>

          <p>
            For Dr. Maya Chen, an integrative medicine specialist at Stanford, this gray area is both the industry's greatest asset and its most dangerous feature. "There's a difference between something that's generally safe and something that's been proven to work," she explains. "The wellness industry often conflates the two."
          </p>

          <blockquote className="border-l-2 border-primary pl-6 my-8 font-serif italic text-lg text-muted-foreground">
            <p>"We need to stop treating symptoms and start treating systems. But we also need to be honest about what we know and what we don't."</p>
            <footer className="mt-2 text-sm not-italic font-semibold text-primary">— Dr. Maya Chen</footer>
          </blockquote>

          <h2 className="font-serif text-2xl font-bold mt-10 mb-4 text-headline">Following the Money</h2>

          <p>
            The financial incentives are staggering. A single wellness brand can launch a new supplement line with minimal regulatory oversight, market it through influencer partnerships, and generate millions in revenue before any serious clinical scrutiny. The FDA's current framework, designed for pharmaceuticals, struggles to keep pace with an industry that operates in the space between food and medicine.
          </p>

          <p>
            Yet the picture isn't entirely bleak. A growing number of wellness companies are voluntarily submitting their products to third-party testing, publishing ingredient sourcing data, and funding independent research. "The smart companies know that trust is their real currency," says industry analyst Rebecca Torres. "As consumers become more educated, transparency becomes a competitive advantage."
          </p>

          <h2 className="font-serif text-2xl font-bold mt-10 mb-4 text-headline">What the Research Actually Says</h2>

          <p>
            The scientific literature on many popular wellness interventions is more nuanced than either advocates or critics suggest. Meditation, for instance, has robust evidence supporting its benefits for stress reduction and attention, but claims about its ability to reshape brain structure are often overstated. Similarly, certain herbal supplements have demonstrated efficacy in rigorous trials, while others have consistently failed to outperform placebo.
          </p>

          <p>
            The challenge, as always, is bridging the gap between what science shows and what people feel. For many wellness consumers, personal experience carries more weight than randomized controlled trials. And that's not entirely irrational — the placebo effect is real, measurable, and sometimes clinically meaningful.
          </p>

          <p>
            As the industry matures, the most important question may not be whether wellness works, but how we define "working" in the first place. In a healthcare system that often fails to address the whole person, perhaps the wellness industry's greatest contribution is reminding us that health encompasses far more than the absence of disease.
          </p>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <SharePills />
        </div>
      </article>

      {/* Related Health Articles */}
      <section className="container mx-auto px-4 max-w-3xl pb-10" aria-label="Related stories">
        <h2 className="font-serif text-2xl font-bold mb-6 pb-3 border-b border-border">Related Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {relatedArticles.map((a, i) => (
            <Link to={a.link} key={i} className="group">
              <div className="overflow-hidden rounded-sm mb-3">
                <img src={a.image} alt={a.title} loading="lazy" width={600} height={400} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <CategoryBadge category="Health" to="/health" />
              <h3 className="mt-2 font-serif font-bold leading-snug group-hover:text-primary transition-colors">{a.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default HealthContent;
