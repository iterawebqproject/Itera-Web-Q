import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
}

const usePageMeta = ({ title, description }: PageMeta) => {
  useEffect(() => {
    const suffix = "Alice Life";
    document.title = title === "Home" ? suffix : `${title} — ${suffix}`;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.origin + window.location.pathname;
  }, [title, description]);
};

export default usePageMeta;
