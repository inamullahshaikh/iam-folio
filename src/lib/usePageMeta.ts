import { useEffect } from "react";

interface PageMeta {
  title: string;
  description?: string;
}

const DEFAULT_TITLE = "Inamullah Shaikh | Software Engineer · Full-Stack";

export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    document.title = title;
    if (description) {
      let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = "description";
        document.head.appendChild(tag);
      }
      tag.content = description;
    }
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title, description]);
}
