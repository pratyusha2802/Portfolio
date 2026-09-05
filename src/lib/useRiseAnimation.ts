import { useEffect } from "react";

const DEFAULT_OBSERVER_INIT: IntersectionObserverInit = {
  rootMargin: "0px 0px -12% 0px",
  threshold: 0.12,
};

/**
 * Reveals .rise elements on load (hero) and on scroll into view (everything
 * else). Re-targets when `deps` changes — needed on pages like WorkDetail
 * where the same component instance renders different .rise content per
 * route param (case-study slug) without unmounting.
 *
 * `observerInit` defaults to a percentage-of-target threshold that suits
 * short elements (hero lines, section titles). A target much taller than
 * the viewport — a case-study section card — needs a fixed `threshold: 0`
 * instead: 12% of a 1600px card is a lot of scrolling through blank space
 * before the percentage-based default would ever fire.
 */
export function useRiseAnimation(
  deps: readonly unknown[] = [],
  observerInit: IntersectionObserverInit = DEFAULT_OBSERVER_INIT,
): void {
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      document.body.classList.add("is-ready");
      document.querySelectorAll(".hero .rise").forEach((el) => el.classList.add("in"));
    });

    const targets = document.querySelectorAll(".rise:not(.hero .rise)");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("in"));
      return () => cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, observerInit);
    targets.forEach((el) => io.observe(el));

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
    // oxlint-disable-next-line react-hooks/exhaustive-deps -- deps is caller-supplied by design
  }, deps);
}
