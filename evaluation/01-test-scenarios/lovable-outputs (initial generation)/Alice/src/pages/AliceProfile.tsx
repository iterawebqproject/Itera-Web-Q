import { Sprout, Flower2, Sun, Star, ChevronDown } from "lucide-react";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SEOHead from "@/components/SEOHead";

const milestones = [
  { icon: Sprout, year: "2015", title: "The Seed", description: "Left corporate life to explore mindfulness and self-discovery." },
  { icon: Flower2, year: "2018", title: "Growth", description: "Became a certified wellness coach and launched her first workshop." },
  { icon: Sun, year: "2021", title: "Radiance", description: "Published 'The Inner Garden' — a bestselling guide to self-love." },
  { icon: Star, year: "2024", title: "Legacy", description: "Built a global community of 50,000+ seekers on their growth journey." },
];

const workshops = [
  { title: "The Inner Garden Workshop", dates: "June 15–17, 2026", details: "A 3-day immersive retreat exploring journaling, breathwork, and self-compassion practices. Held at a serene countryside venue." },
  { title: "Self-Love Sundays", dates: "Every Sunday, 10 AM EST", details: "Weekly virtual gathering for guided meditation, community sharing, and intention setting for the week ahead." },
  { title: "Coaching Foundations", dates: "August 1–30, 2026", details: "A month-long intensive for aspiring coaches. Learn to hold space, ask powerful questions, and create transformation." },
  { title: "Mindful Mornings Bootcamp", dates: "September 5–12, 2026", details: "A week of morning rituals designed to rewire your habits and start each day with clarity and calm." },
];

const AliceProfile = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main id="main-content" className="pt-24 pb-16">
      <SEOHead title="About Alice" description="Discover Alice's transformation journey — from corporate life to wellness coaching and self-love advocacy." />
      <div className="container max-w-3xl px-6">
        <ScrollReveal>
          <h1 className="font-heading text-4xl md:text-5xl text-center mb-4">Alice's Journey</h1>
          <p className="text-center text-muted-foreground mb-20">A path of transformation, one milestone at a time.</p>
        </ScrollReveal>

        {/* Timeline */}
        <section className="relative mb-24" aria-label="Transformation timeline">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" aria-hidden="true" />
          <div className="space-y-12">
            {milestones.map((m, i) => (
              <ScrollReveal key={m.year} delay={i * 0.1}>
                <div className="flex items-start gap-6 relative">
                  <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center shrink-0 z-10" aria-hidden="true">
                    <m.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-xs tracking-widest uppercase text-muted-foreground">{m.year}</span>
                    <h3 className="font-heading text-xl mt-1">{m.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{m.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Workshops */}
        <section aria-labelledby="workshops-heading" className="mb-24">
          <ScrollReveal>
            <h2 id="workshops-heading" className="font-heading text-3xl mb-8">Workshops</h2>
          </ScrollReveal>
          <div className="space-y-3" role="list">
            {workshops.map((w, i) => (
              <ScrollReveal key={w.title} delay={i * 0.05}>
                <div className="border border-border rounded-lg overflow-hidden" role="listitem">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-card transition-colors"
                    aria-expanded={openIndex === i}
                    aria-controls={`workshop-${i}`}
                  >
                    <span className="font-heading text-lg">{w.title}</span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                  {openIndex === i && (
                    <div id={`workshop-${i}`} className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed animate-fade-up" role="region">
                      <p className="font-medium text-foreground mb-1">{w.dates}</p>
                      <p>{w.details}</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Philosophy */}
        <ScrollReveal>
          <section aria-labelledby="philosophy-heading" className="border-l-4 border-primary pl-8 py-6">
            <h2 id="philosophy-heading" className="font-heading text-2xl mb-4">My Philosophy</h2>
            <p className="text-muted-foreground leading-relaxed">
              I believe every person carries an inner garden — a space of infinite potential waiting to bloom. 
              My work is rooted in the conviction that self-love is not indulgence; it is the foundation of all 
              meaningful growth. Through gentle guidance, honest storytelling, and curated rituals, I help 
              others reconnect with the wisdom they already hold within.
            </p>
          </section>
        </ScrollReveal>
      </div>
    </main>
  );
};

export default AliceProfile;
