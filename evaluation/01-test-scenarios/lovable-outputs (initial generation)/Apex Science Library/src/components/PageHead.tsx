import { useEffect } from "react";

interface PageHeadProps {
  title: string;
  description?: string;
}

export function PageHead({ title, description }: PageHeadProps) {
  useEffect(() => {
    const fullTitle = title === "Home" ? "Apex Science Library" : `${title} | Apex Science Library`;
    document.title = fullTitle;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute("content", description);
      }
    }
  }, [title, description]);

  return null;
}
