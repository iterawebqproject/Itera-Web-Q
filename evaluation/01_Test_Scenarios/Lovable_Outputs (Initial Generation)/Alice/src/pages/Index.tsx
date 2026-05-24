import { Sun, Heart, ShoppingBag, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import SEOHead from "@/components/SEOHead";

const services = [
  { icon: Sparkles, title: "Coaching", description: "One-on-one sessions to unlock your potential and nurture self-growth." },
  { icon: Heart, title: "Wellness", description: "Curated rituals and practices for mind, body, and soul alignment." },
  { icon: ShoppingBag, title: "Shop", description: "Handpicked essentials to support your journey of self-love.", link: "/product" },
];

const press = ["Vogue Wellness", "MindBody Journal", "The Growth Edit", "Serenity Magazine", "Wellness Weekly"];

const Index = () => (
  <main id="main-content" className="pt-16">
    <SEOHead title="Home" description="Alice — A soft, magazine-style space for self-growth stories, coaching tips, and wellness essentials." />

    {/* Hero */}
    <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6" aria-labelledby="hero-heading">
      <ScrollReveal>
        <Sun className="w-20 h-20 text-primary mx-auto mb-8" strokeWidth={1} aria-hidden="true" />
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <h1 id="hero-heading" className="font-heading text-5xl md:text-7xl font-medium tracking-tight leading-tight max-w-3xl">
          Stories of Growth,<br />Rituals of Self-Love
        </h1>
      </ScrollReveal>
      <ScrollReveal delay={0.3}>
        <p className="mt-6 text-muted-foreground text-lg max-w-xl leading-relaxed">
          A magazine-style space for personal transformation, coaching wisdom, and luxury wellness.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.45}>
        <Link
          to="/alice-profile"
          className="mt-10 inline-block text-sm tracking-widest uppercase border-b-2 border-primary text-primary pb-1 hover:opacity-70 transition-opacity"
        >
          Explore Alice's Work
        </Link>
      </ScrollReveal>
    </section>

    {/* Quote */}
    <ScrollReveal>
      <section className="py-20 px-6" aria-label="Inspirational quote">
        <blockquote className="max-w-2xl mx-auto text-center">
          <p className="font-heading text-3xl md:text-4xl italic leading-relaxed text-foreground">
            "The most beautiful garden you'll ever tend is the one within yourself."
          </p>
          <cite className="block mt-6 text-sm tracking-widest uppercase text-muted-foreground not-italic">— Alice</cite>
        </blockquote>
      </section>
    </ScrollReveal>

    {/* Services */}
    <section className="py-20 px-6" aria-labelledby="services-heading">
      <div className="container">
        <ScrollReveal>
          <h2 id="services-heading" className="font-heading text-3xl text-center mb-16">What I Offer</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.1}>
              <div className="text-center group hover-lift p-8 rounded-lg bg-card">
                <s.icon className="w-10 h-10 mx-auto mb-4 text-foreground group-hover:text-primary transition-colors duration-300" strokeWidth={1.2} aria-hidden="true" />
                <h3 className="font-heading text-xl mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                {s.link && (
                  <Link to={s.link} className="inline-block mt-4 text-xs tracking-widest uppercase text-primary hover:opacity-70 transition-opacity">
                    Browse →
                  </Link>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Press */}
    <ScrollReveal>
      <section className="py-16 border-t border-border" aria-label="Press mentions">
        <div className="container">
          <p className="text-center text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">As Seen In</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {press.map((name) => (
              <span key={name} className="text-sm tracking-widest text-muted-foreground/60 font-heading text-lg">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  </main>
);

export default Index;
