import workspace from "@/assets/workspace.jpg";
import PageMeta from "@/components/PageMeta";

const rules = [
  { title: "Handmade Always", desc: "Every notebook is hand-stitched by our small team.", icon: (
    <svg viewBox="0 0 48 48" className="w-10 h-10"><path d="M24 8 C18 14, 10 18, 10 26 C10 33, 16 38, 24 38 C32 38, 38 33, 38 26 C38 18, 30 14, 24 8Z" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" /></svg>
  )},
  { title: "Sustainable Materials", desc: "FSC paper, recycled covers, water-based inks.", icon: (
    <svg viewBox="0 0 48 48" className="w-10 h-10"><circle cx="24" cy="24" r="14" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" /><path d="M24 14 L24 34 M16 20 L24 14 L32 20" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" /></svg>
  )},
  { title: "Made to Last", desc: "Lay-flat binding and thick pages that resist bleed-through.", icon: (
    <svg viewBox="0 0 48 48" className="w-10 h-10"><rect x="12" y="10" width="24" height="28" rx="3" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" /><line x1="12" y1="18" x2="36" y2="18" stroke="hsl(var(--primary))" strokeWidth="1.5" /></svg>
  )},
];

const comparison = [
  { feature: "Custom covers", us: "✓", them: "—" },
  { feature: "Paper choice", us: "4 types", them: "1 type" },
  { feature: "Handmade", us: "✓", them: "—" },
  { feature: "Sustainable", us: "100%", them: "Partial" },
  { feature: "Lay-flat binding", us: "✓", them: "—" },
];

const AboutUs = () => (
  <div>
    <PageMeta title="About Us – Mix & Bind" description="Meet the team behind Mix & Bind. Learn about our handmade process, sustainable materials, and passion for stationery." path="/about-us" />
    {/* Story */}
    <section className="py-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div className="rounded-xl overflow-hidden">
            <img src={workspace} alt="Our workspace" className="w-full object-cover" loading="lazy" width={800} height={600} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-foreground mb-6">We're Mix & Bind</h1>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Started in 2022 by two stationery nerds who couldn't find the perfect notebook. So we made our own — and then made it possible for everyone.
              </p>
              <p>
                Every notebook we create is hand-stitched in our small studio using sustainably sourced materials. We believe the tools you write with should be as thoughtful as the words you put in them.
              </p>
              <p>
                From choosing your cover material to selecting the perfect paper weight, Mix & Bind puts the creative power in your hands. Because your notebook should be as unique as your ideas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Rules Grid */}
    <section className="py-20 bg-card">
      <div className="container">
        <h2 className="text-3xl font-black text-center mb-12 text-foreground">Our Rules</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {rules.map((rule) => (
            <div key={rule.title} className="text-center p-6">
              <div className="mb-4 flex justify-center">{rule.icon}</div>
              <h3 className="font-bold text-foreground mb-2">{rule.title}</h3>
              <p className="text-sm text-muted-foreground">{rule.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Comparison Table */}
    <section className="py-20">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-black text-center mb-10 text-foreground">How We Compare</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 font-bold text-foreground">Feature</th>
              <th className="text-center py-3 font-bold text-primary">Mix & Bind</th>
              <th className="text-center py-3 font-bold text-muted-foreground">Others</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr key={row.feature} className="border-b last:border-0">
                <td className="py-3 text-foreground">{row.feature}</td>
                <td className="py-3 text-center font-semibold text-primary">{row.us}</td>
                <td className="py-3 text-center text-muted-foreground">{row.them}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  </div>
);

export default AboutUs;
