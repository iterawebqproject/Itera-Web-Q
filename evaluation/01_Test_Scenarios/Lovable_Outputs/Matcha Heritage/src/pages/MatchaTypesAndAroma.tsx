import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

const gradeComparison = [
  { aspect: "Color", ceremonial: "Vibrant emerald green", culinary: "Yellow-green to olive" },
  { aspect: "Texture", ceremonial: "Ultra-fine, silky", culinary: "Slightly coarser" },
  { aspect: "Taste", ceremonial: "Sweet, complex umami", culinary: "Robust, slightly bitter" },
  { aspect: "Aroma", ceremonial: "Fresh, grassy, floral", culinary: "Earthy, nutty" },
  { aspect: "Best For", ceremonial: "Drinking straight (usucha / koicha)", culinary: "Lattes, baking, cooking" },
  { aspect: "Price", ceremonial: "$30–80 / 30g", culinary: "$10–25 / 100g" },
];

const aromaNotes = [
  { note: "Grassy", angle: 0, intensity: 90 },
  { note: "Umami", angle: 60, intensity: 80 },
  { note: "Nutty", angle: 120, intensity: 55 },
  { note: "Floral", angle: 180, intensity: 65 },
  { note: "Marine", angle: 240, intensity: 45 },
  { note: "Creamy", angle: 300, intensity: 70 },
];

const MatchaTypesAndAroma = () => {
  const cx = 150, cy = 150, maxR = 120;

  const points = aromaNotes.map((n) => {
    const rad = (n.angle - 90) * (Math.PI / 180);
    const r = (n.intensity / 100) * maxR;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad), ...n };
  });

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <Layout>
      <SEOHead
        title="Matcha Types & Aroma"
        description="Compare ceremonial and culinary grade matcha. Explore the aroma wheel with tasting notes like grassy, umami, nutty, and creamy."
        path="/matcha-types-and-aroma"
      />
      <section className="container py-20 max-w-4xl">
        <h1 className="font-heading text-4xl font-bold text-foreground text-center mb-4">Matcha Types & Aroma</h1>
        <p className="font-body text-muted-foreground text-center mb-16 max-w-lg mx-auto">
          Understanding grades and flavor profiles to find your perfect match(a).
        </p>

        <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Ceremonial vs. Culinary Grade</h2>
        <div className="overflow-x-auto mb-20">
          <table className="w-full border-collapse">
            <caption className="sr-only">Comparison of ceremonial and culinary grade matcha</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="text-left py-3 px-4 font-heading text-sm font-bold text-foreground">Aspect</th>
                <th scope="col" className="text-left py-3 px-4 font-heading text-sm font-bold text-secondary">Ceremonial</th>
                <th scope="col" className="text-left py-3 px-4 font-heading text-sm font-bold text-foreground">Culinary</th>
              </tr>
            </thead>
            <tbody>
              {gradeComparison.map((row) => (
                <tr key={row.aspect} className="border-b border-border/50">
                  <th scope="row" className="py-3 px-4 font-body text-sm font-semibold text-foreground">{row.aspect}</th>
                  <td className="py-3 px-4 font-body text-sm text-muted-foreground">{row.ceremonial}</td>
                  <td className="py-3 px-4 font-body text-sm text-muted-foreground">{row.culinary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-heading text-2xl font-bold text-foreground mb-6 text-center">The Aroma Wheel</h2>
        <div className="flex justify-center mb-8">
          <svg viewBox="0 0 300 300" className="w-full max-w-sm" role="img" aria-label="Radar chart showing matcha aroma profile: Grassy 90%, Umami 80%, Creamy 70%, Floral 65%, Nutty 55%, Marine 45%">
            <title>Matcha aroma profile radar chart</title>
            {[30, 60, 90, 120].map((r) => (
              <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" />
            ))}
            {aromaNotes.map((n) => {
              const rad = (n.angle - 90) * (Math.PI / 180);
              return (
                <line key={n.note} x1={cx} y1={cy} x2={cx + maxR * Math.cos(rad)} y2={cy + maxR * Math.sin(rad)} stroke="hsl(var(--border))" strokeWidth="0.5" />
              );
            })}
            <polygon points={polygonPoints} fill="hsl(var(--secondary))" fillOpacity="0.25" stroke="hsl(var(--secondary))" strokeWidth="2" />
            {points.map((p) => {
              const labelRad = (p.angle - 90) * (Math.PI / 180);
              const lx = cx + (maxR + 20) * Math.cos(labelRad);
              const ly = cy + (maxR + 20) * Math.sin(labelRad);
              return (
                <g key={p.note}>
                  <circle cx={p.x} cy={p.y} r="4" fill="hsl(var(--secondary))" />
                  <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" className="fill-foreground font-body text-[10px] font-semibold">
                    {p.note}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <p className="font-body text-sm text-muted-foreground text-center max-w-md mx-auto">
          This radar chart represents the typical aroma profile of premium ceremonial-grade matcha from Uji.
        </p>
      </section>
    </Layout>
  );
};

export default MatchaTypesAndAroma;
