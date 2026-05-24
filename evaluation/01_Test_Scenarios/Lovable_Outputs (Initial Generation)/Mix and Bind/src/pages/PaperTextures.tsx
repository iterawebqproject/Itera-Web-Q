import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";

const paperTypes = [
  { name: "Dotted", pattern: "dots-pattern", weight: "100gsm", opacity: "Cream", feel: "Smooth", rating: 4 },
  { name: "Ruled", pattern: "lines-pattern", weight: "90gsm", opacity: "White", feel: "Textured", rating: 5 },
  { name: "Grid", pattern: "grid-paper-pattern", weight: "100gsm", opacity: "White", feel: "Smooth", rating: 4 },
  { name: "Blank", pattern: "", weight: "120gsm", opacity: "Ivory", feel: "Extra Smooth", rating: 5 },
];

const specs = ["Weight", "Opacity", "Feel"];

const RatingDots = ({ rating }: { rating: number }) => (
  <span className="flex gap-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} className={`text-xs ${i <= rating ? "text-primary" : "text-muted"}`}>●</span>
    ))}
  </span>
);

const PaperTextures = () => (
  <div className="py-12">
    <PageMeta title="Paper Textures – Mix & Bind" description="Explore dotted, ruled, grid, and blank paper textures. Compare weights and feel to pick the perfect paper." path="/paper-textures" />
    <div className="container">
      <h1 className="text-4xl font-black text-foreground mb-2">Paper Textures</h1>
      <p className="text-muted-foreground mb-12">Feel the difference. Choose the paper that matches your flow.</p>

      {/* Pattern Rows */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paperTypes.map((paper) => (
            <div key={paper.name} className="border rounded-lg overflow-hidden bg-card">
              <div className={`h-48 ${paper.pattern} bg-card`} />
              <div className="p-5">
                <h3 className="font-bold text-lg text-foreground">{paper.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{paper.weight} · {paper.opacity} · {paper.feel}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Specs Matrix */}
      <section className="mb-16">
        <h2 className="text-2xl font-black text-foreground mb-6">Specs at a Glance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 pr-6 font-bold text-foreground">Paper</th>
                {specs.map((s) => (
                  <th key={s} className="text-left py-3 pr-6 font-bold text-foreground">{s}</th>
                ))}
                <th className="text-left py-3 font-bold text-foreground">Rating</th>
              </tr>
            </thead>
            <tbody>
              {paperTypes.map((p) => (
                <tr key={p.name} className="border-b last:border-0">
                  <td className="py-3 pr-6 font-semibold text-foreground">{p.name}</td>
                  <td className="py-3 pr-6 text-muted-foreground">{p.weight}</td>
                  <td className="py-3 pr-6 text-muted-foreground">{p.opacity}</td>
                  <td className="py-3 pr-6 text-muted-foreground">{p.feel}</td>
                  <td className="py-3"><RatingDots rating={p.rating} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sample CTA */}
      <section className="bg-primary rounded-xl p-10 text-center">
        <h2 className="text-2xl font-black text-primary-foreground mb-3">Want to feel before you buy?</h2>
        <p className="text-primary-foreground/80 mb-6">Order a free paper sample kit with all four textures.</p>
        <Button variant="outline" className="border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary font-bold" asChild>
          <Link to="/books">Get Free Samples</Link>
        </Button>
      </section>
    </div>
  </div>
);

export default PaperTextures;
