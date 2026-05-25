import { ContentItem, getCategoryIcon, getStatusColor } from "@/data/content";
import { Link } from "react-router-dom";

interface ContentCardProps {
  item: ContentItem;
}

const categoryRoutes: Record<ContentItem["category"], string> = {
  blog: "/blog",
  experiment: "/experiments",
  project: "/projects",
};

export function ContentCard({ item }: ContentCardProps) {
  const linkTo = item.category === "experiment"
    ? `/experiments/${item.id}`
    : `${categoryRoutes[item.category]}/${item.id}`;

  return (
    <Link
      to={linkTo}
      className="group block rounded-lg border border-border p-5 transition-colors duration-200 hover:border-secondary/50 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`${item.title} — ${item.status}`}
    >
      <div className="mb-3 text-2xl" aria-hidden="true">{getCategoryIcon(item.category)}</div>
      <h3 className="font-serif text-lg text-foreground group-hover:text-secondary transition-colors duration-200">
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
        {item.excerpt}
      </p>
      <div className="mt-4 flex items-center gap-2 flex-wrap">
        <span
          className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusColor(item.status)}`}
        >
          {item.status}
        </span>
        {item.tags?.map((tag) => (
          <span
            key={tag}
            className="inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
