import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import notebookBundle from "@/assets/notebook-bundle.jpg";

const steps = [
  { num: 1, title: "Choose Your Cover", desc: "Pick from kraft, linen, leather, or canvas in your favorite color.", icon: (
    <svg viewBox="0 0 40 40" className="w-8 h-8"><rect x="8" y="5" width="24" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
  )},
  { num: 2, title: "Select Your Paper", desc: "Dotted, ruled, grid, or blank — each in premium 100gsm stock.", icon: (
    <svg viewBox="0 0 40 40" className="w-8 h-8"><rect x="8" y="5" width="24" height="30" rx="2" fill="none" stroke="currentColor" strokeWidth="2" /><line x1="12" y1="15" x2="28" y2="15" stroke="currentColor" strokeWidth="1.5" /><line x1="12" y1="21" x2="28" y2="21" stroke="currentColor" strokeWidth="1.5" /><line x1="12" y1="27" x2="22" y2="27" stroke="currentColor" strokeWidth="1.5" /></svg>
  )},
  { num: 3, title: "Pick Your Size", desc: "From pocket-sized field notes to full A4 sketchbooks.", icon: (
    <svg viewBox="0 0 40 40" className="w-8 h-8"><rect x="5" y="12" width="14" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2" /><rect x="23" y="6" width="14" height="28" rx="2" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
  )},
  { num: 4, title: "We Bind It For You", desc: "Hand-stitched with care, shipped in 3-5 business days.", icon: (
    <svg viewBox="0 0 40 40" className="w-8 h-8"><path d="M20 5 L20 35" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" /><rect x="6" y="8" width="28" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
  )},
];

const HowToDiy = () => (
  <div>
    <PageMeta title="How It's Made – Mix & Bind" description="Learn how your custom notebook is crafted in 4 simple steps. From cover to binding, see our handmade process." path="/how-to-diy" />
    {/* SVG Line Art Hero */}
    <section className="py-20 bg-card">
      <div className="container text-center">
        <svg viewBox="0 0 400 200" className="w-full max-w-md mx-auto mb-8">
          {/* Notebook outline */}
          <rect x="120" y="20" width="160" height="160" rx="8" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" />
          {/* Spine */}
          <line x1="200" y1="20" x2="200" y2="180" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="8 4" />
          {/* Pages fanned */}
          <rect x="130" y="30" width="60" height="140" rx="2" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.3" />
          <rect x="210" y="30" width="60" height="140" rx="2" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.3" />
          {/* Stitch marks */}
          {[50, 75, 100, 125, 150].map((y) => (
            <circle key={y} cx="200" cy={y} r="2" fill="hsl(var(--primary))" />
          ))}
          {/* Needle & thread */}
          <path d="M200 45 Q230 35 240 50" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <line x1="240" y1="50" x2="248" y2="42" stroke="hsl(var(--primary))" strokeWidth="2" />
        </svg>
        <h1 className="text-4xl md:text-5xl font-black text-foreground">How It's Made</h1>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto">Four simple steps from idea to your perfect notebook.</p>
      </div>
    </section>

    {/* Numbered Roadmap */}
    <section className="py-20">
      <div className="container max-w-2xl">
        <div className="space-y-10">
          {steps.map((step) => (
            <div key={step.num} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xl">
                {step.num}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-primary">{step.icon}</span>
                  <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Inspiration Bundle */}
    <section className="py-20 bg-card">
      <div className="container max-w-4xl">
        <h2 className="text-3xl font-black text-center mb-8 text-foreground">Need Inspiration?</h2>
        <div className="rounded-xl overflow-hidden">
          <img src={notebookBundle} alt="Curated notebook bundle" className="w-full object-cover" loading="lazy" width={1200} height={600} />
        </div>
        <p className="text-center text-muted-foreground mt-6 max-w-lg mx-auto">
          Can't decide? Try one of our curated starter bundles — pre-designed combos loved by our community.
        </p>
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-24 text-center">
      <div className="container">
        <Button variant="hero" size="lg" className="text-xl px-12 py-6 h-auto" asChild>
          <Link to="/books">Start Crafting</Link>
        </Button>
      </div>
    </section>
  </div>
);

export default HowToDiy;
