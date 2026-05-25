import { useParams, Link } from "react-router-dom";
import { Droplets, BookOpen, Flame, Feather, Gem, Leaf, Sparkles, ArrowLeft } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const productData: Record<string, {
  icon: typeof Droplets;
  name: string;
  price: string;
  description: string;
  benefits: string[];
}> = {
  "serenity-oil": {
    icon: Droplets, name: "Serenity Essential Oil", price: "$38",
    description: "A calming blend of lavender, chamomile, and ylang-ylang crafted to ease tension and invite stillness into your evening ritual. Each bottle is hand-blended in small batches using organic, ethically sourced botanicals.",
    benefits: ["Promotes deep relaxation before sleep", "Ethically sourced, organic ingredients", "Perfect for bath rituals and diffusing"],
  },
  "inner-garden-journal": {
    icon: BookOpen, name: "The Inner Garden Journal", price: "$24",
    description: "A guided journaling companion designed by Alice to help you tend to your inner world. With prompts rooted in self-compassion, gratitude, and intention-setting, this journal becomes a sacred space for daily reflection.",
    benefits: ["90 days of guided self-love prompts", "Printed on sustainably sourced paper", "Designed to cultivate daily mindfulness"],
  },
  "ritual-candle": {
    icon: Flame, name: "Ritual Soy Candle", price: "$32",
    description: "Hand-poured soy wax candle infused with sandalwood and vanilla. Designed to anchor your meditation practice and create a warm, centering atmosphere in any room.",
    benefits: ["40+ hours of clean, even burn", "Non-toxic soy wax with cotton wick", "Warm sandalwood & vanilla scent"],
  },
  "affirmation-cards": {
    icon: Feather, name: "Daily Affirmation Cards", price: "$18",
    description: "A deck of 52 hand-illustrated affirmation cards to carry with you or display at your desk. Each card offers a gentle reminder of your inherent worth and limitless potential.",
    benefits: ["52 unique affirmations for every week", "Beautiful hand-illustrated designs", "Compact size for on-the-go inspiration"],
  },
  "crystal-set": {
    icon: Gem, name: "Clarity Crystal Set", price: "$56",
    description: "A curated trio of rose quartz, amethyst, and clear quartz — chosen to support heart-opening, intuition, and mental clarity. Each stone is ethically mined and comes with a guide to crystal practice.",
    benefits: ["Three stones for love, intuition & clarity", "Includes a crystal practice guide", "Ethically sourced and hand-selected"],
  },
  "herbal-tea": {
    icon: Leaf, name: "Bloom Herbal Tea Blend", price: "$22",
    description: "A caffeine-free blend of chamomile, rose petals, and lemon balm. Crafted to be your companion during moments of pause — a cup of warmth that says 'you deserve this.'",
    benefits: ["Caffeine-free, all-natural ingredients", "Supports relaxation and digestion", "20 individually wrapped sachets"],
  },
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? productData[id] : null;

  if (!product) {
    return (
      <main id="main-content" className="pt-24 pb-16 text-center">
        <SEOHead title="Product Not Found" description="The product you're looking for could not be found." />
        <p className="text-muted-foreground">Product not found.</p>
        <Link to="/product" className="text-primary mt-4 inline-block">← Back to Shop</Link>
      </main>
    );
  }

  const Icon = product.icon;

  return (
    <main id="main-content" className="pt-24 pb-16">
      <SEOHead title={product.name} description={product.description.slice(0, 155)} />
      <div className="container max-w-4xl px-6">
        <ScrollReveal>
          <Link to="/product" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Shop
          </Link>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <ScrollReveal>
            <div className="bg-card rounded-lg border border-border flex items-center justify-center aspect-square" role="img" aria-label={`${product.name} illustration`}>
              <Icon className="w-24 h-24 text-primary" strokeWidth={0.8} aria-hidden="true" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div>
              <h1 className="font-heading text-3xl md:text-4xl mb-3">{product.name}</h1>
              <p className="text-xl text-primary font-medium mb-6">{product.price}</p>
              <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

              <ul className="space-y-3 mb-10" aria-label="Product benefits">
                {product.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                    <span className="text-foreground">{b}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full tracking-widest uppercase text-xs py-6">
                Add to Cart
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
