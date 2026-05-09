import { contentItems } from "@/data/content";
import { ContentCard } from "@/components/ContentCard";

export default function Experiments() {
  const experiments = contentItems.filter((i) => i.category === "experiment");

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl text-foreground mb-2">Experiments</h1>
      <p className="text-muted-foreground mb-10">Things I'm tinkering with.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {experiments.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
