import { useEffect } from "react";

interface DocumentHeadOptions {
  title: string;
  description?: string;
}

const useDocumentHead = ({ title, description }: DocumentHeadOptions) => {
  useEffect(() => {
    const suffix = "Ms Music";
    document.title = title ? `${title} — ${suffix}` : suffix;

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

export default useDocumentHead;
