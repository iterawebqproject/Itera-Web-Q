import { Link } from "react-router-dom";
import type { Article } from "@/data/news";

interface NewsCardProps {
  article: Article;
  variant?: "hero" | "secondary" | "horizontal" | "compact";
}

// Build optimized Unsplash URL (WebP + sized) preserving original params behavior.
const buildSrc = (url: string, w: number, q = 70) => {
  const base = url.split("?")[0];
  return `${base}?w=${w}&q=${q}&fm=webp&auto=format&fit=crop`;
};
const buildSrcSet = (url: string, widths: number[], q = 70) =>
  widths.map((w) => `${buildSrc(url, w, q)} ${w}w`).join(", ");

const NewsCard = ({ article, variant = "compact" }: NewsCardProps) => {
  const linkTo = `/${article.category}/${article.id}`;

  if (variant === "hero") {
    return (
      <Link to={linkTo} className="group block" aria-label={`Read full story: ${article.title}`}>
        <article className="relative overflow-hidden rounded-lg">
          <img
            src={buildSrc(article.image, 1200, 72)}
            srcSet={buildSrcSet(article.image, [640, 960, 1280, 1600], 72)}
            sizes="(min-width: 1024px) 880px, 100vw"
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width={1280}
            height={595}
            className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="category-badge text-xs font-sans font-bold uppercase px-2 py-1 rounded">
              {article.category}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold mt-3 leading-tight text-primary-foreground">
              {article.title}
            </h2>
            <p className="font-sans text-sm mt-2 text-primary-foreground/80 line-clamp-2">
              {article.excerpt}
            </p>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "secondary") {
    return (
      <Link to={linkTo} className="group flex gap-4 items-start" aria-label={`Read: ${article.title}`}>
        <img
          src={buildSrc(article.image, 240)}
          srcSet={`${buildSrc(article.image, 240)} 1x, ${buildSrc(article.image, 480)} 2x`}
          alt=""
          loading="lazy"
          decoding="async"
          width={112}
          height={80}
          className="w-28 h-20 object-cover rounded-md shrink-0 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="min-w-0">
          <span className="text-xs font-sans font-bold uppercase text-primary">
            {article.category}
          </span>
          <h3 className="font-serif text-sm font-semibold leading-snug mt-1 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 font-sans">
            <time>{article.date}</time>
          </p>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link to={linkTo} className="group flex gap-5 surface-elevated rounded-lg overflow-hidden border hover:shadow-md transition-shadow" aria-label={`Read: ${article.title}`}>
        <img
          src={buildSrc(article.image, 480)}
          srcSet={`${buildSrc(article.image, 480)} 1x, ${buildSrc(article.image, 960)} 2x`}
          alt=""
          loading="lazy"
          decoding="async"
          width={224}
          height={160}
          className="w-56 h-40 object-cover shrink-0 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="py-4 pr-4 flex flex-col justify-center min-w-0">
          <span className="text-xs font-sans font-bold uppercase text-primary">
            {article.category}
          </span>
          <h3 className="font-serif text-lg font-bold leading-snug mt-1 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 font-sans line-clamp-2">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground font-sans">
            <span>{article.author}</span>
            <span aria-hidden="true">•</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </Link>
    );
  }

  // compact
  return (
    <Link to={linkTo} className="group block surface-elevated rounded-lg overflow-hidden border hover:shadow-md transition-shadow" aria-label={`Read: ${article.title}`}>
      <article>
        <img
          src={buildSrc(article.image, 480)}
          srcSet={buildSrcSet(article.image, [320, 480, 640, 960])}
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
          alt=""
          loading="lazy"
          decoding="async"
          width={480}
          height={320}
          className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="p-4">
          <span className="text-xs font-sans font-bold uppercase text-primary">
            {article.category}
          </span>
          <h3 className="font-serif text-base font-bold leading-snug mt-1 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 font-sans line-clamp-2">
            {article.excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default NewsCard;
