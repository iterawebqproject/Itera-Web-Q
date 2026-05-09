import { useEffect } from "react";

/**
 * Sets document.title and optionally a meta description per page.
 */
const useDocumentTitle = (title: string, description?: string) => {
  useEffect(() => {
    const suffix = "UrbanConnect";
    document.title = title ? `${title} | ${suffix}` : suffix;

    if (description) {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }

    return () => {
      document.title = suffix;
    };
  }, [title, description]);
};

export default useDocumentTitle;
