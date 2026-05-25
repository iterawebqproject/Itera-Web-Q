import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  type?: string;
}

const SITE_NAME = "VitalityGlobal";
const BASE_URL = "https://ethical-growth-center.lovable.app";

const SEOHead = ({ title, description, path, type = "website" }: SEOHeadProps) => {
  const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${BASE_URL}${path}`;

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
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE_NAME,
          url: BASE_URL,
          description: "A diversified corporation committed to ethical growth, sustainable innovation, and lasting value.",
          foundingDate: "1987",
          numberOfEmployees: { "@type": "QuantitativeValue", value: 28000 },
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
