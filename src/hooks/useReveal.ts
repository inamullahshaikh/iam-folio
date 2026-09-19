import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement = HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    const show = () => el.classList.add("is-visible");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => show());
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -4% 0px" },
    );

    requestAnimationFrame(() => observer.observe(el));

    const fallback = window.setTimeout(show, 2500);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [threshold]);

  return ref;
}

export const revealSectionClass = "reveal-section reveal-animate";
