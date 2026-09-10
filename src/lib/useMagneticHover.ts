import { useEffect, useRef } from "react";

/**
 * Pulls an element toward the cursor within its own bounds on hover (a
 * "magnetic" button feel), snapping back to rest on leave. Sets --mx/--my
 * custom properties consumed by the .magnetic transform rule in index.css
 * — kept as a separate transform input (not a directly-set style.transform)
 * so a component's own hover lift can still compose with it via calc().
 * No-ops entirely under prefers-reduced-motion.
 */
export function useMagneticHover<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.setProperty("--mx", `${(x * strength).toFixed(1)}px`);
      el.style.setProperty("--my", `${(y * strength).toFixed(1)}px`);
    };
    const reset = () => {
      el.style.setProperty("--mx", "0px");
      el.style.setProperty("--my", "0px");
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", reset);
    };
  }, [strength]);

  return ref;
}
