import { Helmet } from "react-helmet-async";

interface PageMetaProps {
  title: string;
  description: string;
  canonical?: string;
}

const PageMeta = ({ title, description, canonical }: PageMetaProps) => (
  <Helmet>
    <title>{title} | Legacy Media</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={`${title} | Legacy Media`} />
    <meta property="og:description" content={description} />
    <meta name="twitter:title" content={`${title} | Legacy Media`} />
    <meta name="twitter:description" content={description} />
    {canonical && <link rel="canonical" href={canonical} />}
  </Helmet>
);

export default PageMeta;
