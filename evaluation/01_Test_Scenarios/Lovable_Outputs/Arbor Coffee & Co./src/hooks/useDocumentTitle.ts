import { useEffect } from "react";

const useDocumentTitle = (title: string, description?: string) => {
  useEffect(() => {
    const suffix = "Arbor Coffee & Co.";
    document.title = title ? `${title} | ${suffix}` : suffix;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute("content", description);
      }
    }

    return () => {
      document.title = suffix;
    };
  }, [title, description]);
};

export default useDocumentTitle;
