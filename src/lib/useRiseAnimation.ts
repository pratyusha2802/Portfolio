import { useEffect } from "react";

/** Reveals .rise elements on load (hero) and on scroll into view (everything else). */
export function useRiseAnimation(): void {
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

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    targets.forEach((el) => io.observe(el));

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);
}
