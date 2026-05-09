import { Link } from "react-router-dom";
import { Shield, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import heroBg from "@/assets/hero-bg.jpg";

const steps = [
  { icon: Users, title: "Create Account", desc: "Sign up in minutes with our streamlined process." },
  { icon: Shield, title: "Choose Your Plan", desc: "Select the membership tier that fits your needs." },
  { icon: Zap, title: "Access Benefits", desc: "Instantly unlock premium services and support." },
];

const benefits = [
  "Priority 24/7 concierge support",
  "Exclusive networking events",
  "Premium partner discounts",
  "Dedicated account manager",
  "Early access to new services",
  "Annual strategy consultation",
];

const Index = () => (
  <Layout>
    <SEOHead
      title="Premium Access for Professionals"
      description="EliteAccess provides top-tier services, exclusive benefits, and effortless membership management for professionals."
    />

    {/* Hero */}
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden" aria-label="Hero">
      <img
        src={heroBg}
        alt="Modern cityscape representing premium professional services"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-foreground/60" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h1 className="mb-6 text-4xl font-bold leading-tight text-primary-foreground md:text-6xl">
          Premium Access for <br className="hidden md:block" />
          <span className="text-primary">Professionals</span>
        </h1>
        <p className="mb-8 text-lg text-primary-foreground/80">
          Your gateway to top-tier services, exclusive benefits, and effortless membership management.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link to="/signup">Join Now</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
            <Link to="/subscription-plans">View Plans</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* How it Works */}
    <section className="section-padding" aria-labelledby="how-it-works">
      <div className="container-narrow text-center">
        <h2 id="how-it-works" className="mb-2 text-3xl font-bold text-foreground">How It Works</h2>
        <p className="mb-12 text-muted-foreground">Three simple steps to premium membership</p>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <article key={i} className="flex flex-col items-center rounded-xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary" aria-hidden="true">
                <s.icon size={26} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* Benefits */}
    <section className="section-padding bg-surface" aria-labelledby="member-benefits">
      <div className="container-narrow text-center">
        <h2 id="member-benefits" className="mb-2 text-3xl font-bold text-foreground">Member Benefits</h2>
        <p className="mb-12 text-muted-foreground">Everything included with your membership</p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <li key={i} className="flex items-center gap-3 rounded-lg border border-border bg-card p-5 text-left">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success/10 text-success" aria-hidden="true">✓</div>
              <span className="text-sm font-medium text-foreground">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </Layout>
);

export default Index;
