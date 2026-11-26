import { beforeEach, describe, expect, it, vi } from "vitest";

const getWineAtlases = vi.hoisted(() => vi.fn());
const getWineSchools = vi.hoisted(() => vi.fn());
vi.mock("@/lib/api/guides/get-guides", () => ({
  getWineAtlases,
  getWineSchools,
}));

import { getGuideList } from "./guides";

const PAGE = { edges: [], pageInfo: { hasNextPage: false } };

describe("getGuideList", () => {
  beforeEach(() => {
    getWineAtlases.mockReset().mockResolvedValue(PAGE);
    getWineSchools.mockReset().mockResolvedValue(PAGE);
  });

  it("loads 16 atlas pages after a cursor", async () => {
    await getGuideList({ guide: "atlas", after: "cursor", search: "" });

    expect(getWineAtlases).toHaveBeenCalledWith({
      first: 16,
      after: "cursor",
      search: undefined,
    });
    expect(getWineSchools).not.toHaveBeenCalled();
  });

  it("loads the schools for the school guide", async () => {
    await getGuideList({ guide: "school", search: "alsace" });

    expect(getWineSchools).toHaveBeenCalledWith({
      first: 16,
      after: undefined,
      search: "alsace",
    });
    expect(getWineAtlases).not.toHaveBeenCalled();
  });

  it("does not reach WordPress for invalid input", async () => {
    await expect(getGuideList({ guide: "other" })).rejects.toThrow();

    expect(getWineAtlases).not.toHaveBeenCalled();
    expect(getWineSchools).not.toHaveBeenCalled();
  });

  it("throws when WordPress fails so the list shows an error", async () => {
    getWineAtlases.mockResolvedValue(null);

    await expect(getGuideList({ guide: "atlas" })).rejects.toThrow(
      "Kunde inte hämta guiderna",
    );
  });
});
