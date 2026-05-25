import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import brewingTools from "@/assets/brewing-tools.jpg";

const tools = [
  { name: "Chasen (Whisk)", desc: "A bamboo whisk with 80–120 fine tines, essential for creating a smooth, frothy matcha." },
  { name: "Chawan (Bowl)", desc: "A wide ceramic bowl that allows room for whisking and appreciating the color of the tea." },
  { name: "Chashaku (Scoop)", desc: "A carved bamboo scoop used to measure the perfect amount of matcha powder." },
];

const steps = [
  { step: 1, title: "Sift Your Matcha", instruction: "Place 1–2 scoops (1–2g) of matcha into a fine-mesh sifter over your chawan. Gently press through to break up any clumps. This ensures a smooth, lump-free tea." },
  { step: 2, title: "Add Water", instruction: "Pour 60–70ml of hot water (70–80°C / 158–176°F) into the bowl. Water that's too hot will scorch the delicate tea leaves and create bitterness." },
  { step: 3, title: "Whisk Vigorously", instruction: "Using your chasen, whisk in a rapid W or M motion — not circles. Continue for 15–20 seconds until a fine, creamy foam forms on the surface. Lift the whisk from the center." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Brew Matcha (Usucha)",
  description: "Step-by-step guide to preparing thin matcha tea using traditional Japanese tools.",
  step: steps.map((s) => ({
    "@type": "HowToStep",
    name: s.title,
    text: s.instruction,
  })),
};

const BrewingMethods = () => (
  <Layout>
    <SEOHead
      title="Brewing Methods"
      description="Master matcha preparation with our step-by-step guide. Learn about essential tools like chasen, chawan, and chashaku."
      path="/brewing-methods"
      jsonLd={jsonLd}
    />
    <section className="container py-20 max-w-4xl">
      <h1 className="font-heading text-4xl font-bold text-foreground text-center mb-4">Brewing Methods</h1>
      <p className="font-body text-muted-foreground text-center mb-16 max-w-lg mx-auto">
        Master the art of preparing matcha with the right tools and technique.
      </p>

      <div className="mb-20">
        <img
          src={brewingTools}
          alt="Essential matcha brewing tools: chasen whisk, chawan bowl, and chashaku scoop on a wooden surface"
          className="w-full rounded-lg mb-10 object-cover max-h-80"
          loading="lazy"
          decoding="async"
          width={1200}
          height={640}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list" aria-label="Essential brewing tools">
          {tools.map((t) => (
            <div key={t.name} role="listitem" className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">{t.name}</h3>
              <p className="font-body text-sm text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-12">Step-by-Step: Usucha (Thin Tea)</h2>
      <ol className="space-y-12 max-w-2xl mx-auto list-none p-0">
        {steps.map((s) => (
          <li key={s.step} className="flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary flex items-center justify-center" aria-hidden="true">
              <span className="font-heading text-lg font-bold text-secondary-foreground">{s.step}</span>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">{s.title}</h3>
              <p className="font-body text-muted-foreground leading-relaxed">{s.instruction}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  </Layout>
);

export default BrewingMethods;
