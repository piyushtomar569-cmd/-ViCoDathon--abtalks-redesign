import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to the returned ref and toggles the
 * `is-visible` class (paired with the `.reveal` CSS class) once the element
 * scrolls into view. Reveals only once so re-scrolling doesn't replay it.
 */
export default function useReveal(options) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px", ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}
