import { useCallback } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import regionUji from "@/assets/region-uji.jpg";
import regionNishio from "@/assets/region-nishio.jpg";
import regionShizuoka from "@/assets/region-shizuoka.jpg";

const regions = [
  {
    id: "uji", name: "Uji, Kyoto", img: regionUji,
    climate: "Mild with morning fog, ideal for shade-growing",
    soil: "Rich alluvial soil along the Uji River",
    altitude: "30–200m",
    taste: "Sweet, creamy umami with minimal bitterness",
    description: "Uji is the most prestigious matcha-producing region in Japan, with a tea heritage spanning over 800 years. The combination of misty mornings and nutrient-rich river soil creates leaves with unparalleled sweetness."
  },
  {
    id: "nishio", name: "Nishio, Aichi", img: regionNishio,
    climate: "Warm coastal climate with ample rainfall",
    soil: "Mineral-rich clay soil near the Yahagi River",
    altitude: "10–50m",
    taste: "Balanced sweetness with a clean, fresh finish",
    description: "Nishio produces roughly 30% of Japan's matcha. Its warm coastal climate and clay-rich soil yield a balanced cup that's become the backbone of many premium matcha blends worldwide."
  },
  {
    id: "shizuoka", name: "Shizuoka", img: regionShizuoka,
    climate: "Warm Pacific climate with volcanic influence",
    soil: "Volcanic ash soil (andosol), naturally acidic",
    altitude: "200–600m",
    taste: "Bold, vegetal with a slight astringency",
    description: "In the shadow of Mount Fuji, Shizuoka's high-altitude plantations produce robust matcha with character. The volcanic soil gives the tea a distinctive depth that's prized in culinary applications."
  },
];

const OriginRegionsJapan = () => {
  const scrollToRegion = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <Layout>
      <SEOHead
        title="Origin Regions of Japan"
        description="Explore Japan's top matcha-producing regions — Uji, Nishio, and Shizuoka — and their unique terroir, climate, and flavor profiles."
        path="/origin-regions-japan"
      />
      <section className="container py-20">
        <h1 className="font-heading text-4xl font-bold text-foreground text-center mb-4">Origin Regions of Japan</h1>
        <p className="font-body text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          Click a region to explore its unique terroir, climate, and flavor profile.
        </p>

        <div className="max-w-xl mx-auto mb-20">
          <svg viewBox="0 0 400 500" className="w-full" role="img" aria-label="Interactive map of Japan's tea regions: Uji, Nishio, and Shizuoka">
            <title>Map of Japan tea regions</title>
            <path
              d="M200,50 Q280,80 300,150 Q320,220 290,300 Q270,360 250,400 Q230,440 200,460 Q170,440 150,400 Q130,360 110,300 Q80,220 100,150 Q120,80 200,50Z"
              fill="hsl(var(--muted))"
              stroke="hsl(var(--border))"
              strokeWidth="2"
            />
            {[
              { id: "uji", cx: 210, cy: 280, label: "Uji" },
              { id: "nishio", cx: 240, cy: 300, label: "Nishio" },
              { id: "shizuoka", cx: 250, cy: 260, label: "Shizuoka" },
            ].map((m) => (
              <g
                key={m.id}
                className="cursor-pointer"
                onClick={() => scrollToRegion(m.id)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); scrollToRegion(m.id); } }}
                role="button"
                tabIndex={0}
                aria-label={`Scroll to ${m.label} region`}
              >
                <circle cx={m.cx} cy={m.cy} r="12" fill="hsl(var(--secondary))" opacity="0.8" className="hover:opacity-100 transition-opacity" />
                <circle cx={m.cx} cy={m.cy} r="5" fill="hsl(var(--secondary-foreground))" />
                <text x={m.cx} y={m.cy - 18} textAnchor="middle" className="fill-foreground font-body text-xs font-semibold pointer-events-none">
                  {m.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="space-y-24 max-w-4xl mx-auto">
          {regions.map((r) => (
            <article key={r.id} id={r.id} className="scroll-mt-24">
              <img
                src={r.img}
                alt={`Tea plantation in ${r.name}`}
                className="w-full h-64 md:h-80 object-cover rounded-lg mb-8"
                loading="lazy"
                decoding="async"
                width={1200}
                height={640}
              />
              <h2 className="font-heading text-3xl font-bold text-foreground mb-3">{r.name}</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">{r.description}</p>
              <dl className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Climate", value: r.climate },
                  { label: "Soil", value: r.soil },
                  { label: "Altitude", value: r.altitude },
                  { label: "Taste", value: r.taste },
                ].map((d) => (
                  <div key={d.label} className="bg-muted rounded-lg p-4">
                    <dt className="font-body text-xs font-semibold text-secondary uppercase tracking-wider">{d.label}</dt>
                    <dd className="font-body text-sm text-foreground mt-1">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default OriginRegionsJapan;
