import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown>;
}

const SITE_NAME = "NeonLogic";
const BASE_URL = "https://neon-logic-stream.lovable.app";

export function SEOHead({ title, description, path, type = "website", jsonLd }: SEOHeadProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${BASE_URL}${path}`;

  const defaultJsonLd = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "NewsArticle" : "WebSite",
    name: fullTitle,
    description,
    url: canonicalUrl,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <script type="application/ld+json">
        {JSON.stringify(jsonLd || defaultJsonLd)}
      </script>
    </Helmet>
  );
}
