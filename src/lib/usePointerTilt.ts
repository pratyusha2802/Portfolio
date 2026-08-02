import { useEffect, useRef } from "react";

/**
 * Tilts an element toward the cursor via CSS custom properties (--tilt-x/--tilt-y),
 * consumed by a `transform: perspective(...) rotateX(var(--tilt-x)) rotateY(var(--tilt-y))`
 * rule in CSS. No-ops entirely under prefers-reduced-motion.
 */
export function usePointerTilt<T extends HTMLElement>(maxDeg = 8) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--tilt-x", `${(-y * maxDeg).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${(x * maxDeg).toFixed(2)}deg`);
    };
    const reset = () => {
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", reset);
    };
  }, [maxDeg]);

  return ref;
}
