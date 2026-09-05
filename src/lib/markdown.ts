/**
 * Loads and parses the markdown case pages under src/content/work/*.md.
 *
 * Frontmatter here is a flat, known shape (see docs/_authoring.md) — a tiny
 * hand-rolled parser is enough and avoids pulling in a YAML lib that assumes
 * a Node Buffer global the browser doesn't have.
 */
import { marked, type Token, type Tokens } from "marked";

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

export interface CaseContent {
  slug: string;
  frontmatter: Record<string, FrontmatterValue>;
  html: string;
}

function isSectionHeading(token: Token): token is Tokens.Heading {
  return token.type === "heading" && token.depth === 2;
}

/**
 * Renders the case body with each `##` section wrapped in its own
 * `.case-card` — this is what lets WorkDetail reveal one section at a time
 * on scroll instead of the whole body appearing as one unbroken block. Any
 * content before the first `##` (e.g. the scaffold notice at the top of an
 * in-progress case) renders plain, outside any card.
 */
function renderCaseBody(body: string): string {
  // marked.parse() enables gfm (tables, etc.) by default; the standalone
  // lexer()/parser() calls don't inherit that default, so it must be passed
  // explicitly here or table syntax silently falls back to a plain paragraph.
  const tokens = marked.lexer(body, { async: false, gfm: true });
  const sections: Token[][] = [];
  let current: Token[] = [];
  for (const token of tokens) {
    if (isSectionHeading(token)) {
      if (current.length) sections.push(current);
      current = [token];
    } else {
      current.push(token);
    }
  }
  if (current.length) sections.push(current);

  return sections
    .map((section) => {
      const html = marked.parser(section, { async: false, gfm: true });
      return isSectionHeading(section[0])
        ? `<section class="case-card rise">${html}</section>`
        : html;
    })
    .join("");
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
  cases.set(slug, { slug, frontmatter: data, html: renderCaseBody(body) });
}

export function getCaseContent(slug: string): CaseContent | undefined {
  return cases.get(slug);
}
