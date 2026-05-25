import { Link } from "react-router-dom";
import { Leaf, Coffee, Globe, Users, Sprout, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const Index = () => {
  useDocumentTitle("Premium Sustainable Coffee", "Arbor Coffee & Co. crafts premium, sustainably sourced coffee from 52 farms across 24 countries. Explore our menu and green sourcing mission.");

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 md:py-36" aria-labelledby="hero-heading">
        <div className="container text-center max-w-3xl">
          <h1 id="hero-heading" className="font-display text-5xl md:text-7xl font-bold text-primary leading-tight mb-6">
            Crafted with Purpose
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            From sustainable farms to your cup — premium coffee that honors the earth and the people who nurture it.
          </p>
          <Button asChild size="lg" className="gap-2 text-base px-8 py-6">
            <Link to="/menu">
              Explore Our Menu <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Z-Pattern Value Blocks */}
      <section className="py-16" aria-labelledby="values-heading">
        <h2 id="values-heading" className="sr-only">Our Values</h2>
        <div className="container space-y-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex items-center justify-center" aria-hidden="true">
              <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center">
                <Coffee className="w-16 h-16 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="font-display text-3xl font-bold text-primary mb-4">Single-Origin Excellence</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every bean is carefully selected from small-batch farmers who share our commitment to quality. We trace every step from seed to cup, ensuring the purest expression of flavor.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2 flex items-center justify-center" aria-hidden="true">
              <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center">
                <Leaf className="w-16 h-16 text-primary" />
              </div>
            </div>
            <div className="md:order-1">
              <h3 className="font-display text-3xl font-bold text-primary mb-4">Green Sourcing Goals</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our commitment to sustainability drives every decision. From carbon-neutral shipping to biodegradable packaging, we're building a future where great coffee and a healthy planet coexist.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Bar */}
      <section className="py-16 border-y border-border" aria-labelledby="impact-heading">
        <h2 id="impact-heading" className="sr-only">Global Impact</h2>
        <div className="container">
          <div className="grid grid-cols-3 gap-8 text-center" role="list">
            <div className="space-y-2" role="listitem">
              <Globe className="w-8 h-8 text-accent mx-auto" aria-hidden="true" />
              <p className="font-display text-4xl md:text-5xl font-bold text-primary">24</p>
              <p className="text-sm text-muted-foreground tracking-wide">Countries</p>
            </div>
            <div className="space-y-2" role="listitem">
              <Users className="w-8 h-8 text-accent mx-auto" aria-hidden="true" />
              <p className="font-display text-4xl md:text-5xl font-bold text-primary">180+</p>
              <p className="text-sm text-muted-foreground tracking-wide">Partners</p>
            </div>
            <div className="space-y-2" role="listitem">
              <Sprout className="w-8 h-8 text-accent mx-auto" aria-hidden="true" />
              <p className="font-display text-4xl md:text-5xl font-bold text-primary">52</p>
              <p className="text-sm text-muted-foreground tracking-wide">Sustainable Farms</p>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CafeOrCoffeeShop",
            name: "Arbor Coffee & Co.",
            description: "Premium sustainably sourced coffee company operating across 24 countries with 52 sustainable farms.",
            url: "https://arbor-green-greens.lovable.app",
            servesCuisine: "Coffee",
            priceRange: "$$",
          }),
        }}
      />
    </Layout>
  );
};

export default Index;
