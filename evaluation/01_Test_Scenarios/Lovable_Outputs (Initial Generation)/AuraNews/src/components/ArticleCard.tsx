import { Link } from "react-router-dom";
import { CategoryBadge } from "./CategoryBadge";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  categoryLink: string;
  articleLink: string;
  date: string;
  large?: boolean;
}

export function ArticleCard({ title, excerpt, image, category, categoryLink, articleLink, date, large }: ArticleCardProps) {
  return (
    <article className={`group ${large ? "" : ""}`}>
      <Link to={articleLink} className="block overflow-hidden rounded-sm mb-4">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${large ? "h-80 md:h-[28rem]" : "h-48 md:h-56"}`}
        />
      </Link>
      <CategoryBadge category={category} to={categoryLink} />
      <h3 className={`mt-2 font-serif font-bold leading-tight group-hover:text-primary transition-colors ${large ? "text-2xl md:text-3xl" : "text-lg"}`}>
        <Link to={articleLink}>{title}</Link>
      </h3>
      <p className="mt-2 text-muted-foreground text-sm leading-relaxed line-clamp-2">{excerpt}</p>
      <time className="mt-2 block text-xs text-muted-foreground">{date}</time>
    </article>
  );
}
