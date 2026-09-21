/**
 * Loads and parses the markdown case pages under src/content/work/*.md.
 *
 * Frontmatter here is a flat, known shape (see docs/_authoring.md) — a tiny
 * hand-rolled parser is enough and avoids pulling in a YAML lib that assumes
 * a Node Buffer global the browser doesn't have.
 */
import { marked, type Token, type Tokens } from "marked";

/**
 * Case markdown authors write image src as a plain root-relative path (e.g.
 * `/rideinsync-hero.png`), matching how every asset lives flat in public/.
 * The site itself deploys under a subpath (vite.config.ts's `base`), the
 * same reason Hero.tsx builds its <img src> from import.meta.env.BASE_URL
 * instead of a hardcoded "/" — a raw "/foo.png" would 404 in production.
 * Markdown can't run that interpolation inline, so this resolves it once,
 * here, instead of asking each case file to know about it.
 */
function resolveImageSrc(href: string): string {
  return /^https?:\/\//.test(href) ? href : `${import.meta.env.BASE_URL}${href.replace(/^\//, "")}`;
}

function renderImageTag({
  href,
  title,
  text,
}: {
  href: string;
  title?: string | null;
  text: string;
}): string {
  const titleAttr = title ? ` title="${title}"` : "";
  return `<img src="${resolveImageSrc(href)}" alt="${text}"${titleAttr} loading="lazy" />`;
}

const caseImageRenderer = new marked.Renderer();
caseImageRenderer.image = renderImageTag;

export type FrontmatterValue = string | string[];

function parseValue(raw: string): FrontmatterValue {
  const trimmed = raw.trim();
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    const inner = trimmed.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(",").map((item) => item.trim().replace(/^"|"$/g, ""));
  }
  return trimmed.replace(/^"|"$/g, "");
}

export function parseFrontmatter(raw: string): {
  data: Record<string, FrontmatterValue>;
  body: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };

  const [, block, body] = match;
  const data: Record<string, FrontmatterValue> = {};
  for (const line of block.split("\n")) {
    if (!line.trim()) continue;
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    data[key] = parseValue(line.slice(idx + 1));
  }
  return { data, body: body.trim() };
}

export interface CaseSection {
  id: string;
  title: string;
  html: string;
}

export interface CaseContent {
  slug: string;
  frontmatter: Record<string, FrontmatterValue>;
  preambleHtml: string;
  sections: CaseSection[];
}

function isSectionHeading(token: Token): token is Tokens.Heading {
  return token.type === "heading" && token.depth === 2;
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * A paragraph that's nothing but a single `![]()` — i.e. an image authored
 * on its own line. Consecutive ones (screenshots dropped one after another
 * in the markdown source) render as one side-by-side carousel instead of
 * separate full-width blocks; stacking differently-sized screenshots at
 * full width is what looked misaligned before this existed.
 */
function isImageOnlyParagraph(token: Token): token is Tokens.Paragraph {
  return (
    token.type === "paragraph" && token.tokens?.length === 1 && token.tokens[0]?.type === "image"
  );
}

/**
 * Renders a run of markdown block tokens to HTML, grouping any consecutive
 * image-only paragraphs into a `.case-carousel` instead of letting marked
 * emit each as its own `<p><img></p>`.
 */
function renderTokens(tokens: Token[]): string {
  let html = "";
  let textRun: Token[] = [];
  let imageRun: Tokens.Paragraph[] = [];

  const flushText = () => {
    if (!textRun.length) return;
    html += marked.parser(textRun, { async: false, gfm: true, renderer: caseImageRenderer });
    textRun = [];
  };
  const flushImages = () => {
    if (!imageRun.length) return;
    const items = imageRun.map((p) => renderImageTag(p.tokens[0] as Tokens.Image)).join("");
    html += `<div class="case-carousel" tabindex="0" role="group" aria-label="Screenshots">${items}</div>`;
    imageRun = [];
  };

  for (const token of tokens) {
    if (isImageOnlyParagraph(token)) {
      flushText();
      imageRun.push(token);
    } else if (token.type === "space" && imageRun.length) {
      // The standalone lexer emits a "space" token for every blank line
      // between blocks (marked.parse() collapses these; lexer()/parser()
      // don't). It renders as "" either way, so drop it here rather than
      // let it end an in-progress run of consecutive image paragraphs.
      continue;
    } else {
      flushImages();
      textRun.push(token);
    }
  }
  flushText();
  flushImages();

  return html;
}

/**
 * Splits the case body into one `CaseSection` per `##` heading — WorkDetail
 * renders exactly one of these at a time (picked from its left-hand index),
 * not the whole case as one long scroll. Each section's `html` is its own
 * content only (starting with the `<h2>`); WorkDetail supplies the wrapping
 * `<section id>` element itself. Any content before the first `##` (e.g. a
 * scaffold notice on an in-progress case) has nowhere to attach in an
 * index, so it's returned separately as `preambleHtml` and always shown.
 */
function renderCaseBody(body: string): { preambleHtml: string; sections: CaseSection[] } {
  // marked.parse() enables gfm (tables, etc.) by default; the standalone
  // lexer()/parser() calls don't inherit that default, so it must be passed
  // explicitly here or table syntax silently falls back to a plain paragraph.
  const tokens = marked.lexer(body, { async: false, gfm: true });
  const blocks: Token[][] = [];
  let current: Token[] = [];
  for (const token of tokens) {
    if (isSectionHeading(token)) {
      if (current.length) blocks.push(current);
      current = [token];
    } else {
      current.push(token);
    }
  }
  if (current.length) blocks.push(current);

  let preambleHtml = "";
  const sections: CaseSection[] = [];
  for (const block of blocks) {
    const heading = block[0];
    if (!isSectionHeading(heading)) {
      preambleHtml += renderTokens(block);
      continue;
    }
    sections.push({
      id: slugifyHeading(heading.text),
      title: heading.text,
      html: renderTokens(block),
    });
  }

  return { preambleHtml, sections };
}

const files = import.meta.glob("/src/content/work/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const cases = new Map<string, CaseContent>();

for (const [path, raw] of Object.entries(files)) {
  const slug = path.split("/").pop()?.replace(/\.md$/, "") ?? "";
  if (!slug || slug.startsWith("_")) continue; // defensive: skip any non-case file
  const { data, body } = parseFrontmatter(raw);
  const { preambleHtml, sections } = renderCaseBody(body);
  cases.set(slug, { slug, frontmatter: data, preambleHtml, sections });
}

export function getCaseContent(slug: string): CaseContent | undefined {
  return cases.get(slug);
}
