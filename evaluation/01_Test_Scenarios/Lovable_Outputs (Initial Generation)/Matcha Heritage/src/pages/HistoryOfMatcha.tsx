import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import historyAncient from "@/assets/history-ancient.jpg";
import historyCeremony from "@/assets/history-ceremony.jpg";

const timeline = [
  { year: "9th Century", title: "Seeds from China", text: "Buddhist monk Eichu brings tea seeds from China to Japan, introducing the emperor to powdered tea.", img: historyAncient, side: "left" as const },
  { year: "12th Century", title: "Eisai & Zen Tea", text: "Monk Eisai popularizes matcha among samurai and Zen practitioners, writing 'Kissa Yōjōki' — a treatise on tea and health.", img: null, side: "right" as const },
  { year: "15th Century", title: "Sen no Rikyū", text: "The legendary tea master codifies the Japanese tea ceremony (Chanoyu), emphasizing wabi-sabi aesthetics: simplicity, humility, and beauty in imperfection.", img: historyCeremony, side: "left" as const },
  { year: "16th Century", title: "Uji Cultivation", text: "Farmers in Uji perfect shade-growing techniques, producing vibrant, umami-rich matcha that becomes the gold standard.", img: null, side: "right" as const },
  { year: "21st Century", title: "Global Renaissance", text: "Matcha enters cafés, kitchens, and wellness routines worldwide — from Tokyo to New York — while honoring its centuries-old roots.", img: null, side: "left" as const },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The History of Matcha",
  description: "From ancient Chinese tea rituals to the modern matcha latte — a journey across centuries of Japanese tea tradition.",
};

const HistoryOfMatcha = () => (
  <Layout>
    <SEOHead
      title="History of Matcha"
      description="Explore matcha's journey from 9th-century China to modern Japanese tea ceremonies and global cafés."
      path="/history-of-matcha"
      type="article"
      jsonLd={jsonLd}
    />
    <section className="container py-20 max-w-3xl">
      <h1 className="font-heading text-4xl font-bold text-foreground text-center mb-4">The History of Matcha</h1>
      <p className="font-body text-muted-foreground text-center mb-16 max-w-lg mx-auto">
        From ancient Chinese tea rituals to the modern matcha latte — a journey across centuries.
      </p>

      <div className="relative" role="list" aria-label="Matcha history timeline">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" aria-hidden="true" />
        <div className="space-y-16">
          {timeline.map((item, i) => (
            <div key={i} role="listitem" className={`md:flex items-start gap-8 ${item.side === "right" ? "md:flex-row-reverse" : ""}`}>
              <div className="flex-1 space-y-3">
                <span className="font-body text-xs font-semibold text-secondary uppercase tracking-wider">{item.year}</span>
                <h2 className="font-heading text-2xl font-bold text-foreground">{item.title}</h2>
                <p className="font-body text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
              <div className="hidden md:flex items-center justify-center w-4" aria-hidden="true">
                <div className="w-3 h-3 rounded-full bg-secondary border-2 border-background" />
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                {item.img && (
                  <img src={item.img} alt={item.title} className="rounded-lg w-full object-cover max-h-72" loading="lazy" decoding="async" width={800} height={533} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default HistoryOfMatcha;
