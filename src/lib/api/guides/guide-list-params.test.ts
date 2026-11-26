import { describe, expect, it } from "vitest";
import { parseGuideListInput } from "./guide-list-params";

describe("parseGuideListInput", () => {
  it("accepts the known guides", () => {
    expect(parseGuideListInput({ guide: "atlas" }).guide).toBe("atlas");
    expect(parseGuideListInput({ guide: "school" }).guide).toBe("school");
  });

  // The action is a public endpoint: the client must not be able to point it
  // at an arbitrary WordPress parent page.
  it("rejects an unknown guide or a raw parent id", () => {
    expect(() => parseGuideListInput({ guide: "cG9zdDo0NzcyMQ==" })).toThrow();
    expect(() => parseGuideListInput({})).toThrow();
    expect(() => parseGuideListInput(null)).toThrow();
  });

  it("turns an empty or blank search into no search", () => {
    // WordPress drops the parent filter for `search: ""`.
    expect(
      parseGuideListInput({ guide: "atlas", search: "" }).search,
    ).toBeUndefined();
    expect(
      parseGuideListInput({ guide: "atlas", search: "   " }).search,
    ).toBeUndefined();
  });

  it("trims a search and cuts it at 100 characters", () => {
    expect(
      parseGuideListInput({ guide: "atlas", search: "  alsace " }).search,
    ).toBe("alsace");
    expect(
      parseGuideListInput({ guide: "atlas", search: "a".repeat(500) }).search,
    ).toHaveLength(100);
  });

  it("rejects an empty or oversized cursor", () => {
    expect(() => parseGuideListInput({ guide: "atlas", after: "" })).toThrow();
    expect(() =>
      parseGuideListInput({ guide: "atlas", after: "x".repeat(201) }),
    ).toThrow();
    expect(parseGuideListInput({ guide: "atlas", after: "abc" }).after).toBe(
      "abc",
    );
  });

  it("ignores page sizes sent by the client", () => {
    const parsed = parseGuideListInput({ guide: "atlas", first: 5000 });
    expect(parsed).not.toHaveProperty("first");
  });
});
