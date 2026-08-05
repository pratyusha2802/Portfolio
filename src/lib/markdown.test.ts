import { describe, expect, it } from "vitest";
import { parseFrontmatter } from "./markdown";

describe("parseFrontmatter", () => {
  it("parses string and array fields out of the frontmatter block", () => {
    const raw = `---
slug: "bangalore-food-bank"
title: "Bangalore Food Bank"
tools: ["React", "Node.js", "Express"]
---

## Body

Some content.`;

    const { data, body } = parseFrontmatter(raw);

    expect(data).toEqual({
      slug: "bangalore-food-bank",
      title: "Bangalore Food Bank",
      tools: ["React", "Node.js", "Express"],
    });
    expect(body).toBe("## Body\n\nSome content.");
  });

  it("returns an empty array for an empty bracket value", () => {
    const raw = `---
tools: []
---
body`;

    expect(parseFrontmatter(raw).data.tools).toEqual([]);
  });

  it("treats content with no frontmatter block as plain body", () => {
    const raw = "Just a plain markdown file, no frontmatter.";

    expect(parseFrontmatter(raw)).toEqual({ data: {}, body: raw });
  });
});
