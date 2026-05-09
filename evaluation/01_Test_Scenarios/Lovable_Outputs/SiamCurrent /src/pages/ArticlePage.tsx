import { useParams, Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SkipToContent from "@/components/SkipToContent";
import { getArticleById, getArticlesByCategory } from "@/data/news";
import { useEffect, useRef, useState } from "react";

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const article = getArticleById(id || "");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!sidebarRef.current || !contentRef.current) { ticking = false; return; }
        const content = contentRef.current.getBoundingClientRect();
        const sidebarHeight = sidebarRef.current.scrollHeight;
        const top = 80;

        if (content.top > top) {
          setSidebarStyle({ position: "relative" });
        } else if (content.bottom - sidebarHeight > top) {
          setSidebarStyle({ position: "fixed", top });
        } else {
          setSidebarStyle({ position: "absolute", bottom: 0 });
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on article change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <SkipToContent />
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center" id="main-content">
          <p className="text-muted-foreground font-sans">Article not found.</p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const related = getArticlesByCategory(article.category).filter((a) => a.id !== article.id).slice(0, 3);

  // JSON-LD structured data for article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    author: { "@type": "Person", name: article.author },
    datePublished: article.date,
    publisher: {
      "@type": "NewsMediaOrganization",
      name: "SiamCurrent",
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SkipToContent />
      <SiteHeader />

      <main className="flex-1" id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10" ref={contentRef}>
            {/* Article */}
            <article className="lg:col-span-2 max-w-none">
              {/* Header */}
              <header className="mb-6">
                <span className="category-badge text-xs font-sans font-bold uppercase px-2 py-1 rounded">
                  {article.category}
                </span>
                <h1 className="font-serif text-3xl md:text-4xl font-black leading-tight mt-4">
                  {article.title}
                </h1>
                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground font-sans">
                  <span className="font-medium text-foreground">{article.author}</span>
                  <span aria-hidden="true">•</span>
                  <time>{article.date}</time>
                  <span className="bg-muted px-2 py-0.5 rounded text-xs font-medium">
                    {article.readTime}
                  </span>
                </div>
              </header>

              {/* Main Image */}
              <figure className="mb-8">
                <img
                  src={article.image}
                  alt={article.caption}
                  loading="eager"
                  decoding="async"
                  className="w-full h-auto rounded-lg object-cover max-h-[480px]"
                />
                <figcaption className="text-xs text-muted-foreground font-sans mt-2 italic">
                  {article.caption}
                </figcaption>
              </figure>

              {/* Body */}
              <div className="font-sans text-base leading-8 space-y-5">
                {article.body.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </article>

            {/* Sticky Sidebar */}
            <aside className="relative hidden lg:block" aria-label="Related stories">
              <div ref={sidebarRef} style={{ ...sidebarStyle, width: "100%" }}>
                <h3 className="font-serif text-lg font-bold mb-4 pb-2 border-b-2 border-primary">
                  Related Stories
                </h3>
                <div className="space-y-5">
                  {related.map((a) => (
                    <Link
                      key={a.id}
                      to={`/${a.category}/${a.id}`}
                      className="group block"
                    >
                      <img
                        src={a.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <h4 className="font-serif text-sm font-semibold mt-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {a.title}
                      </h4>
                      <p className="text-xs text-muted-foreground font-sans mt-1">
                        {a.readTime}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default ArticlePage;
