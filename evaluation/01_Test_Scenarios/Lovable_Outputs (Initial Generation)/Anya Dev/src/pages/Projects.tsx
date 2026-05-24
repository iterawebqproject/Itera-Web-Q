import { contentItems } from "@/data/content";
import { ContentCard } from "@/components/ContentCard";

export default function Projects() {
  const projects = contentItems.filter((i) => i.category === "project");

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl text-foreground mb-2">Projects</h1>
      <p className="text-muted-foreground mb-10">Things I've shipped.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
