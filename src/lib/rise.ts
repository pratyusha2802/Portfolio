import type { CSSProperties } from "react";

/** Sets the --i custom property the .rise stagger animation reads for delay. */
export function riseDelay(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}
