import { Helmet } from "react-helmet-async";

interface PageMetaProps {
  title: string;
  description: string;
  path: string;
}

const SITE = "Forger Case Files";
const BASE = "https://forger-briefing-data.lovable.app";

const PageMeta = ({ title, description, path }: PageMetaProps) => (
  <Helmet>
    <title>{`${title} — ${SITE}`}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={`${BASE}${path}`} />
    <meta property="og:title" content={`${title} — ${SITE}`} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={`${BASE}${path}`} />
  </Helmet>
);

export default PageMeta;
