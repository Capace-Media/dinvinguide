import { describe, expect, test } from "vitest";
import { parsePostsParams } from "./posts-params";

describe("parsePostsParams", () => {
  test("defaults to 16 posts and no filters", () => {
    expect(parsePostsParams({})).toEqual({ first: 16 });
  });

  test("keeps valid values", () => {
    expect(
      parsePostsParams({
        first: "30",
        after: "abc",
        before: "def",
        search: "rioja",
        year: "2015",
        authorName: "magnus",
      }),
    ).toEqual({
      first: 30,
      after: "abc",
      before: "def",
      search: "rioja",
      year: 2015,
      authorName: "magnus",
    });
  });

  test("ignores params it does not know", () => {
    expect(parsePostsParams({ first: "5", cacheBuster: "1" })).toEqual({
      first: 5,
    });
  });

  test("never allows more than 50 posts", () => {
    expect(parsePostsParams({ first: "50" }).first).toBe(50);
    expect(parsePostsParams({ first: "51" }).first).toBe(50);
  });

  test("accepts years from 1000 to 9999 only", () => {
    expect(parsePostsParams({ year: "1000" }).year).toBe(1000);
    expect(parsePostsParams({ year: "9999" }).year).toBe(9999);
    expect(parsePostsParams({ year: "999" }).year).toBeUndefined();
    expect(parsePostsParams({ year: "10000" }).year).toBeUndefined();
  });

  test("cuts search at 100 characters", () => {
    expect(parsePostsParams({ search: "é".repeat(101) }).search).toBe(
      "é".repeat(100),
    );
  });

  test("drops cursors and author names that are too long", () => {
    expect(parsePostsParams({ after: "a".repeat(200) }).after).toHaveLength(
      200,
    );
    expect(parsePostsParams({ after: "a".repeat(201) }).after).toBeUndefined();
    expect(
      parsePostsParams({ before: "a".repeat(201) }).before,
    ).toBeUndefined();
    expect(
      parsePostsParams({ authorName: "a".repeat(101) }).authorName,
    ).toBeUndefined();
  });
});
