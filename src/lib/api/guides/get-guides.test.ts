import { beforeEach, describe, expect, it, vi } from "vitest";

const wpQuery = vi.hoisted(() => vi.fn());
vi.mock("@/lib/wp/client", () => ({ wpQuery }));

import { getChildPages } from "./get-guides";

const PARENT = "cG9zdDo0NzcyMQ==";

describe("getChildPages", () => {
  beforeEach(() => {
    wpQuery.mockReset();
    wpQuery.mockResolvedValue({ pages: { edges: [] } });
  });

  // WordPress ignores the `parent` filter when `search` is an empty string
  // and returns every page on the site instead of the children.
  it("does not send an empty search string", async () => {
    await getChildPages(PARENT, { first: 16, search: "" });

    const variables = wpQuery.mock.calls[0]?.[1];
    expect(variables.parent).toBe(PARENT);
    expect(variables.search).toBeUndefined();
  });

  it("does not send a missing search", async () => {
    await getChildPages(PARENT, { first: 16 });

    expect(wpQuery.mock.calls[0]?.[1].search).toBeUndefined();
  });

  it("forwards a real search term", async () => {
    await getChildPages(PARENT, { first: 16, search: "alsace" });

    expect(wpQuery.mock.calls[0]?.[1]).toMatchObject({
      parent: PARENT,
      search: "alsace",
    });
  });
});
