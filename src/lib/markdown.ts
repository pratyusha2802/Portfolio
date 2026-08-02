/**
 * Loads and parses the markdown case pages under src/content/work/*.md.
 *
 * Frontmatter here is a flat, known shape (see _authoring.md) — a tiny
 * hand-rolled parser is enough and avoids pulling in a YAML lib that assumes
 * a Node Buffer global the browser doesn't have.
 */
import { marked } from "marked";

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

const files = import.meta.glob("/src/content/work/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const cases = new Map<string, CaseContent>();

for (const [path, raw] of Object.entries(files)) {
  const slug = path.split("/").pop()?.replace(/\.md$/, "") ?? "";
  if (!slug || slug.startsWith("_")) continue; // skip _authoring.md
  const { data, body } = parseFrontmatter(raw);
  cases.set(slug, { slug, frontmatter: data, html: marked.parse(body, { async: false }) });
}

export function getCaseContent(slug: string): CaseContent | undefined {
  return cases.get(slug);
}
