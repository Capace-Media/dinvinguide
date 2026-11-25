import { describe, expect, it } from "vitest";
import { parsePaginationSearchParams } from "./pagination-search-params";

describe("parsePaginationSearchParams", () => {
  it("defaults to the first page of `defaultFirst` items", () => {
    expect(parsePaginationSearchParams({}, 16)).toMatchObject({
      first: 16,
      last: null,
    });
  });

  it("pages forward with first and after", () => {
    expect(
      parsePaginationSearchParams(
        { first: "16", last: "null", after: "cursor" },
        16,
      ),
    ).toMatchObject({ first: 16, last: null, after: "cursor" });
  });

  // WPGraphQL rejects `first` and `last` together, which renders an empty
  // listing. The previous-page link sends `first=null`, so a default `first`
  // must not be added when paging backward.
  it("does not add a default first when paging backward", () => {
    const params = parsePaginationSearchParams(
      { last: "16", first: "null", before: "cursor" },
      16,
    );

    expect(params.last).toBe(16);
    expect(params.before).toBe("cursor");
    expect(params.first).toBeUndefined();
  });

  it("drops first when a stale link carries both first and last", () => {
    const params = parsePaginationSearchParams(
      { first: "16", last: "16", before: "cursor" },
      16,
    );

    expect(params.first).toBeUndefined();
    expect(params.last).toBe(16);
  });

  it("does not add a default first when only last is given", () => {
    expect(
      parsePaginationSearchParams({ last: "16", before: "cursor" }, 16).first,
    ).toBeUndefined();
  });
});
