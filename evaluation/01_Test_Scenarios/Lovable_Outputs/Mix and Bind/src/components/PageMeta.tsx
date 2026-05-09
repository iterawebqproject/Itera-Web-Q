import { Helmet } from "react-helmet-async";

interface PageMetaProps {
  title: string;
  description: string;
  path: string;
}

const BASE_URL = "https://mix-and-bind-kit.lovable.app";

const PageMeta = ({ title, description, path }: PageMetaProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={`${BASE_URL}${path}`} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={`${BASE_URL}${path}`} />
  </Helmet>
);

export default PageMeta;
