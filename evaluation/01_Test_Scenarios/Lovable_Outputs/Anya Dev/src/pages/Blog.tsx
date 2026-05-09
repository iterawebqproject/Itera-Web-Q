import { contentItems } from "@/data/content";
import { ContentCard } from "@/components/ContentCard";

export default function Blog() {
  const blogs = contentItems.filter((i) => i.category === "blog");

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl text-foreground mb-2">Blog</h1>
      <p className="text-muted-foreground mb-10">Thoughts on code, craft, and the web.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
