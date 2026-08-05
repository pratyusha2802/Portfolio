import { describe, expect, it } from "vitest";
import { pageUrl } from "./url";

describe("pageUrl", () => {
  it("returns BASE_URL when called with no hash", () => {
    expect(pageUrl()).toBe(import.meta.env.BASE_URL);
  });

  it("appends the hash to BASE_URL, separated by #", () => {
    expect(pageUrl("work")).toBe(`${import.meta.env.BASE_URL}#work`);
  });
});
