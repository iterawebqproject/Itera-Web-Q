import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description?: string;
}

const SEOHead = ({ title, description }: SEOHeadProps) => {
  useEffect(() => {
    document.title = `${title} | Aura Kitchenware`;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", description);
    }
  }, [title, description]);

  return null;
};

export default SEOHead;
