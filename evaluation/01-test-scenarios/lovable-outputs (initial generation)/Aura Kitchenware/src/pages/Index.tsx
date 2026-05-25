import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChefHat, Flame, CookingPot } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import RecipeCard from "@/components/RecipeCard";
import SEOHead from "@/components/SEOHead";
import { products } from "@/data/products";
import { recipes } from "@/data/recipes";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import founder from "@/assets/founder.jpg";

const heroSlides = [
  { image: hero1, title: "Cook Beautifully", subtitle: "Ceramic kitchenware that matches your home" },
  { image: hero2, title: "Spring Collection", subtitle: "New colors inspired by Mediterranean sunsets" },
  { image: hero3, title: "Tools of the Trade", subtitle: "Handcrafted with care, designed for life" },
];

const categoryBubbles = [
  { icon: CookingPot, label: "Pots", link: "/all-products" },
  { icon: Flame, label: "Pans", link: "/all-products" },
  { icon: ChefHat, label: "Kettles", link: "/all-products" },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((s) => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const newArrivals = products.filter((p) => p.badge === "New" || p.badge === "Best Seller").slice(0, 3);

  return (
    <div>
      <SEOHead title="Home" description="Aura Kitchenware: handcrafted ceramic cookware designed to match your home decor. Shop pots, pans, kettles and discover recipes." />
      {/* Hero Slider */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden" aria-roledescription="carousel" aria-label="Featured promotions">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-foreground/30" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 flex items-center justify-center text-center">
          <motion.div
            key={`text-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="heading-display text-4xl sm:text-6xl text-primary-foreground">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-md mx-auto">
              {heroSlides[currentSlide].subtitle}
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link to="/all-products">
                Shop the Collection <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentSlide ? "bg-primary-foreground w-6" : "bg-primary-foreground/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Category Bubbles */}
      <section className="section-padding">
        <div className="container-tight flex justify-center gap-12 sm:gap-20">
          {categoryBubbles.map((cat) => (
            <Link key={cat.label} to={cat.link} className="flex flex-col items-center gap-3 group">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <cat.icon className="w-8 h-8" />
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="heading-display text-3xl">New Arrivals</h2>
            <p className="text-muted-foreground mt-2">Freshly curated for your kitchen</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/all-products">View All Products <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Founder's Note */}
      <section className="section-padding">
        <div className="container-tight grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src={founder}
              alt="Elena, founder of Aura Kitchenware"
              className="rounded-lg w-full max-w-sm mx-auto object-cover aspect-[4/5]"
              loading="lazy"
              width={800}
              height={1000}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="heading-display text-3xl">A Note from Elena</h2>
            <p className="text-muted-foreground leading-relaxed">
              "I started Aura because I believe your kitchen tools should be as beautiful as the meals
              you make. Every piece is designed to bring warmth, joy, and a touch of elegance to your
              daily rituals — from morning coffee to evening feasts."
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Each Aura piece is crafted from premium ceramic, designed to last generations while
              looking stunning on your countertop or table.
            </p>
            <Button variant="outline" asChild>
              <Link to="/our-story">Read Our Story <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <div className="text-center mb-12">
            <h2 className="heading-display text-3xl">From Our Kitchen</h2>
            <p className="text-muted-foreground mt-2">Recipes crafted with Aura tools</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/recipes">All Recipes <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Instagram Feed Placeholder */}
      <section className="section-padding">
        <div className="container-tight text-center">
          <h2 className="heading-display text-3xl mb-2">@aurakitchenware</h2>
          <p className="text-muted-foreground mb-8">Follow us for daily inspiration</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[hero1, hero2, hero3, founder].map((img, i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={img}
                  alt={`Instagram post ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
