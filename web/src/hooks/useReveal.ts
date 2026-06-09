import { useEffect } from "react";

/**
 * Reveal-on-scroll. Elements with class "reveal" fade/slide in when
 * they enter the viewport. Items already visible on mount are revealed
 * immediately to avoid a flash of empty content at the top of the page.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    // Immediately reveal anything already in (or above) the viewport.
    const vh = window.innerHeight;
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.95) el.classList.add("is-visible");
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => {
      if (!el.classList.contains("is-visible")) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}
