import HeroSlider from "@/components/HeroSlider";
import purposeImg from "@/assets/purpose.jpg";
import { Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";

const stats = [
  { value: "50+", label: "Countries" },
  { value: "120M", label: "Consumers Served" },
  { value: "30%", label: "Carbon Reduction" },
];

const news = [
  { title: "Q1 2026 Results Exceed Expectations", date: "April 2, 2026", excerpt: "Revenue grew 12% year-over-year driven by strong performance across all brand categories." },
  { title: "New Sustainability Commitments Announced", date: "March 18, 2026", excerpt: "A Company pledges net-zero emissions by 2035 with new renewable energy partnerships." },
  { title: "Expanding into Southeast Asian Markets", date: "March 5, 2026", excerpt: "Strategic expansion brings our premium brands to 8 new markets across the region." },
];

const brandLogos = ["Luxe", "Naturals", "Gourmet", "Vitality", "Heritage", "Bloom"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "A Company",
  url: "https://vision-spotlight-72.lovable.app",
  description: "Building brands that make a difference. Committed to sustainability, innovation, and transparency.",
};

const Index = () => (
  <main id="main-content">
    <PageMeta
      title="Home"
      description="A Company shares the latest news, brand products, and sustainability goals. Explore our portfolio of premium consumer brands."
      canonical="https://vision-spotlight-72.lovable.app/"
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <HeroSlider />

    {/* Purpose & Impact */}
    <section className="section-padding" aria-labelledby="purpose-heading">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <img src={purposeImg} alt="Team collaborating on sustainability initiatives" className="w-full h-80 object-cover rounded-lg" loading="lazy" width={800} height={600} />
        <div>
          <h2 id="purpose-heading" className="section-title">Our Purpose & Impact</h2>
          <p className="section-subtitle mb-8">
            We believe business can be a force for good. Every decision we make is guided by our commitment to people, planet, and performance.
          </p>
          <div className="grid grid-cols-3 gap-6" role="list" aria-label="Impact statistics">
            {stats.map((s) => (
              <div key={s.label} className="text-center" role="listitem">
                <p className="text-3xl md:text-4xl font-black text-primary" aria-label={`${s.value} ${s.label}`}>{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Latest News */}
    <section className="section-padding bg-muted" aria-labelledby="news-heading">
      <div className="max-w-7xl mx-auto">
        <h2 id="news-heading" className="section-title mb-10">Latest News</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {news.map((n, i) => (
            <article key={i} className="bg-card rounded-lg p-6 card-hover">
              <time className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">{n.date}</time>
              <h3 className="text-lg font-bold text-secondary mb-3">{n.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{n.excerpt}</p>
              <span className="text-primary font-bold text-sm cursor-pointer hover:underline" role="link" tabIndex={0}>Read More →</span>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* Brand Bar */}
    <section className="py-12 border-t border-border" aria-label="Our brands">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-12">
        {brandLogos.map((name) => (
          <Link key={name} to="/brands" className="text-2xl font-black text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors tracking-wider uppercase">
            {name}
          </Link>
        ))}
      </div>
    </section>
  </main>
);

export default Index;
