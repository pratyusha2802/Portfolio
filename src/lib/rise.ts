import type { CSSProperties } from "react";

/** Sets the --i custom property the .rise stagger animation reads for delay. */
export function riseDelay(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}

/** Sets the --len custom property the squiggle-arrow draw-in animation reads. */
export function arrowLength(len: number): CSSProperties {
  return { "--len": len } as CSSProperties;
}
