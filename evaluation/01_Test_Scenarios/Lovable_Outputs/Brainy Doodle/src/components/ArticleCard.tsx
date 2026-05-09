import { Link } from "react-router-dom";
import type { Article } from "@/data/articles";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to={`/article/${article.id}`}
      className="block sketch-border-light bg-card p-5 hover:doodle-shadow transition-all duration-200 hover:-translate-y-1 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span className="text-xs font-body font-medium text-primary uppercase tracking-wider">
        {article.category}
      </span>
      <h3 className="font-display text-2xl text-card-foreground mt-1 group-hover:text-primary transition-colors">
        {article.title}
      </h3>
      <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">
        {article.excerpt}
      </p>
      <div className="flex items-center gap-3 mt-3 text-xs font-body text-muted-foreground">
        <time dateTime={article.date}>{article.date}</time>
        <span aria-hidden="true">·</span>
        <span>{article.readTime} read</span>
      </div>
    </Link>
  );
}
