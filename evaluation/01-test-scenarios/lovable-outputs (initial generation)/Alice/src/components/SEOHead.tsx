import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
}

const SEOHead = ({ title, description }: SEOHeadProps) => {
  useEffect(() => {
    document.title = `${title} | Alice`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description);
  }, [title, description]);
  return null;
};

export default SEOHead;
