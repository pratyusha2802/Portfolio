import type { CSSProperties, ReactNode } from "react";

/**
 * Deterministic pseudo-random in [0, 1) from an integer seed. Each letter's
 * scatter offset needs to be stable across re-renders — a plain
 * Math.random() call recomputes (and visibly jumps) on any re-render after
 * the entrance has already played.
 */
function seeded(n: number): number {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Splits `text` into per-letter spans for the scatter-to-settle heading
 * entrance (see .letter in index.css), grouping each word's letters inside
 * a nowrap wrapper so line-wrapping still only happens between words —
 * without it, the browser wraps between individual inline-block letters
 * and breaks words mid-letter. Each letter gets a small, deterministic
 * random rotation/offset via --ty/--rot/--li custom properties;
 * `.rise.in .letter` resets them to the settled position, staggered by --li.
 */
export function splitLetters(text: string, keyPrefix: string): ReactNode[] {
  let letterIndex = 0;
  const words = text.split(" ");

  return words.flatMap((word, wi) => {
    const letters = [...word].map((char) => {
      const i = letterIndex++;
      const ty = (seeded(i * 7 + keyPrefix.length) - 0.5) * 28;
      const rot = (seeded(i * 13 + keyPrefix.length + 1) - 0.5) * 24;
      const style = {
        "--ty": `${ty.toFixed(1)}px`,
        "--rot": `${rot.toFixed(1)}deg`,
        "--li": i,
      } as CSSProperties;
      return (
        <span className="letter" style={style} key={`${keyPrefix}-${i}`}>
          {char}
        </span>
      );
    });

    const wordSpan = (
      <span className="letter-word" key={`${keyPrefix}-word-${wi}`}>
        {letters}
      </span>
    );

    return wi < words.length - 1 ? [wordSpan, " "] : [wordSpan];
  });
}
