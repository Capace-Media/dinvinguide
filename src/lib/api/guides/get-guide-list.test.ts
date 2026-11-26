import { beforeEach, describe, expect, it, vi } from "vitest";

const getWineAtlases = vi.hoisted(() => vi.fn());
const getWineSchools = vi.hoisted(() => vi.fn());
vi.mock("./get-guides", () => ({ getWineAtlases, getWineSchools }));

import { getGuideList } from "./get-guide-list";

const edge = (title: string) => ({ node: { id: title, slug: title, title } });
const page = (titles: string[], next?: string) => ({
  edges: titles.map(edge),
  pageInfo: {
    hasNextPage: next !== undefined,
    hasPreviousPage: false,
    startCursor: null,
    endCursor: next ?? null,
    total: titles.length,
  },
});

describe("getGuideList", () => {
  beforeEach(() => {
    getWineAtlases.mockReset();
    getWineSchools.mockReset();
  });

  it("returns a page of 16 after the cursor without a search", async () => {
    const result = page(["Vinlandet Italien"], "c2");
    getWineAtlases.mockResolvedValue(result);

    expect(await getGuideList({ guide: "atlas", after: "c1" })).toBe(result);
    expect(getWineAtlases).toHaveBeenCalledWith({ first: 16, after: "c1" });
    expect(getWineSchools).not.toHaveBeenCalled();
  });

  it("uses the wine schools for the school guide", async () => {
    getWineSchools.mockResolvedValue(page(["Alsace-skolan"]));

    await getGuideList({ guide: "school" });

    expect(getWineSchools).toHaveBeenCalledWith({
      first: 16,
      after: undefined,
    });
  });

  // WordPress ignores the `parent` filter when it searches, so the search
  // never goes to WordPress: titles are filtered here instead.
  describe("with a search", () => {
    it("filters the children of the guide by title", async () => {
      getWineSchools.mockResolvedValue(
        page(["Alsace-skolan", "Amarone-skolan", "Bordeauxskolan"]),
      );

      const result = await getGuideList({ guide: "school", search: "alsace" });

      expect(result?.edges.map((e) => e.node.title)).toEqual(["Alsace-skolan"]);
      expect(getWineSchools).toHaveBeenCalledWith({
        first: 100,
        after: undefined,
      });
    });

    it("ignores case and diacritics", async () => {
      getWineAtlases.mockResolvedValue(
        page(["Vinlandet Österrike", "Vinlandet Italien"]),
      );

      const result = await getGuideList({ guide: "atlas", search: "OSTERR" });

      expect(result?.edges.map((e) => e.node.title)).toEqual([
        "Vinlandet Österrike",
      ]);
    });

    it("returns a single page with the match count", async () => {
      getWineAtlases.mockResolvedValue(
        page(["Vinlandet Polen", "Vinlandet Portugal"]),
      );

      const result = await getGuideList({ guide: "atlas", search: "po" });

      expect(result?.pageInfo).toMatchObject({
        hasNextPage: false,
        hasPreviousPage: false,
        total: 2,
      });
    });

    it("looks through every page of children", async () => {
      getWineAtlases
        .mockResolvedValueOnce(page(["Vinlandet Chile"], "c1"))
        .mockResolvedValueOnce(page(["Vinlandet Chilena"]));

      const result = await getGuideList({ guide: "atlas", search: "chile" });

      expect(result?.edges).toHaveLength(2);
      expect(getWineAtlases).toHaveBeenLastCalledWith({
        first: 100,
        after: "c1",
      });
    });

    it("returns no edges when nothing matches", async () => {
      getWineAtlases.mockResolvedValue(page(["Vinlandet Chile"]));

      const result = await getGuideList({ guide: "atlas", search: "zzz" });

      expect(result?.edges).toEqual([]);
      expect(result?.pageInfo.total).toBe(0);
    });

    it("returns null when WordPress fails", async () => {
      getWineAtlases.mockResolvedValue(null);

      expect(await getGuideList({ guide: "atlas", search: "x" })).toBeNull();
    });
  });
});
