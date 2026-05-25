import { Helmet } from "react-helmet-async";

interface PageMetaProps {
  title: string;
  description: string;
  canonical?: string;
}

const PageMeta = ({ title, description, canonical }: PageMetaProps) => (
  <Helmet>
    <title>{title} | A Company</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={`${title} | A Company`} />
    <meta property="og:description" content={description} />
    <meta name="twitter:title" content={`${title} | A Company`} />
    <meta name="twitter:description" content={description} />
    {canonical && <link rel="canonical" href={canonical} />}
  </Helmet>
);

export default PageMeta;
