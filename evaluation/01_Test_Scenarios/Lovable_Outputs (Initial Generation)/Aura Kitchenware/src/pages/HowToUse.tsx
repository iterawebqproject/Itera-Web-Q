import { motion } from "framer-motion";
import { Play, Shield, Sparkles, HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";
import SEOHead from "@/components/SEOHead";

const videos = [
  { title: "Perfect Searing with Ceramic", duration: "5:32", category: "Technique" },
  { title: "Slow Cooking Masterclass", duration: "12:15", category: "Technique" },
  { title: "Seasoning Your Aura Pan", duration: "3:48", category: "Care" },
];

const demos = [
  {
    title: "Aura Dutch Oven",
    description: "Perfect for slow-cooked stews, braised meats, and artisan bread. The heavy ceramic lid locks in moisture for tender results every time.",
    tips: ["Preheat on low-medium heat", "Use wooden or silicone utensils", "Ideal for oven temperatures up to 500°F"],
  },
  {
    title: "Aura Ceramic Skillet",
    description: "Non-stick ceramic coating delivers perfect sears without excess oil. From pancakes to pan-fried salmon, this skillet does it all.",
    tips: ["Add oil before heating", "Avoid metal utensils", "Hand wash recommended"],
  },
  {
    title: "Aura Tea Kettle",
    description: "Engineered for even heat distribution, our kettle boils water quickly while looking gorgeous on your stovetop.",
    tips: ["Fill with cold water only", "Remove from heat once boiling", "Descale monthly with vinegar"],
  },
];

const careGuide = [
  { icon: Sparkles, title: "Cleaning", text: "Hand wash with mild soap and warm water. Avoid abrasive scrubbers that can damage the ceramic coating." },
  { icon: Shield, title: "Storage", text: "Stack with felt protectors between pieces. Store lids separately to prevent chipping." },
];

const faqs = [
  { q: "Are Aura products dishwasher safe?", a: "While our products are technically dishwasher safe, we recommend hand washing to preserve the ceramic finish and extend the life of your cookware." },
  { q: "Can I use Aura on induction cooktops?", a: "Yes! All Aura pots and pans feature an induction-compatible base that works on all stovetop types." },
  { q: "What's the warranty?", a: "Every Aura piece comes with a lifetime warranty against manufacturing defects. We stand behind our craftsmanship." },
  { q: "How do I remove stubborn stains?", a: "Soak with a mixture of baking soda and warm water for 30 minutes, then gently scrub with a soft sponge." },
];

const toolGuide = [
  { need: "Slow cooking & braising", recommendation: "Aura Dutch Oven" },
  { need: "Quick searing & sautéing", recommendation: "Aura Ceramic Skillet" },
  { need: "Boiling & steaming", recommendation: "Aura Saucepan" },
  { need: "Morning tea & pour-over coffee", recommendation: "Aura Tea Kettle" },
  { need: "Stir fry & high-heat cooking", recommendation: "Aura Wok Pan" },
];

const HowToUse = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      <SEOHead title="How to Use" description="Master your Aura kitchenware with expert tips, care guides, and cooking techniques." />
      <section className="section-padding text-center">
        <h1 className="heading-display text-4xl">How to Use Your Aura</h1>
        <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
          Master your Aura kitchenware with expert tips, care guides, and cooking techniques.
        </p>
      </section>

      {/* Video Gallery */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <h2 className="heading-display text-2xl mb-8">Masterclass Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {videos.map((video, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-muted rounded-lg aspect-video flex flex-col items-center justify-center cursor-pointer hover:bg-secondary transition-colors group"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Play className="w-6 h-6" />
                </div>
                <p className="mt-3 text-sm font-medium">{video.title}</p>
                <p className="text-xs text-muted-foreground">{video.duration}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Demos */}
      <section className="section-padding">
        <div className="container-tight">
          <h2 className="heading-display text-2xl mb-8">Product Guides</h2>
          <div className="space-y-8">
            {demos.map((demo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-lg p-6 border border-border"
              >
                <h3 className="heading-display text-lg mb-2">{demo.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{demo.description}</p>
                <ul className="space-y-1">
                  {demo.tips.map((tip, j) => (
                    <li key={j} className="text-sm flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span> {tip}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Care Guide */}
      <section className="section-padding bg-card">
        <div className="container-tight">
          <h2 className="heading-display text-2xl mb-8">Maintenance & Care</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {careGuide.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="heading-display text-base mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-tight max-w-2xl">
          <h2 className="heading-display text-2xl mb-8 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-primary" /> FAQ
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between text-sm font-medium"
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  {faq.q}
                  <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === i ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {openFaq === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    role="region"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="px-5 pb-4 text-sm text-muted-foreground"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Selection Guide */}
      <section className="section-padding bg-card">
        <div className="container-tight max-w-2xl">
          <h2 className="heading-display text-2xl mb-8">Tool Selection Guide</h2>
          <table className="w-full border border-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-muted">
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">What You Need</th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">We Recommend</th>
              </tr>
            </thead>
            <tbody>
            {toolGuide.map((item, i) => (
              <tr key={i} className="border-t border-border text-sm">
                <td className="px-5 py-3">{item.need}</td>
                <td className="px-5 py-3 text-primary font-medium">{item.recommendation}</td>
              </tr>
            ))}
            </tbody>
           </table>
        </div>
      </section>
    </div>
  );
};

export default HowToUse;
