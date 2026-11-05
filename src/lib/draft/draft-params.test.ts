import { describe, expect, test } from "vitest";
import { DRAFT_TYPES, parseDraftParams } from "./draft-params";

describe("parseDraftParams", () => {
  test.each(DRAFT_TYPES)("accepts type %s", (type) => {
    const result = parseDraftParams({ type, pid: "123" });
    expect(result.success && result.data.type).toBe(type);
  });

  test("keeps the optional segments and drops everything else", () => {
    const result = parseDraftParams({
      secret: "do-not-keep",
      type: "page",
      pid: "rioja",
      author: "anders",
      parent1: "skolor",
      parent2: "vinatlas",
      parent3: "spanien",
    });
    expect(result.success && result.data).toEqual({
      type: "page",
      pid: "rioja",
      author: "anders",
      parent1: "skolor",
      parent2: "vinatlas",
      parent3: "spanien",
    });
  });

  test("treats empty parents as absent", () => {
    const result = parseDraftParams({
      type: "page",
      pid: "x",
      parent1: "",
      parent2: "",
      parent3: "",
    });
    expect(result.success && result.data).toEqual({ type: "page", pid: "x" });
  });

  test("accepts numeric ids and slugs with Swedish letters", () => {
    expect(parseDraftParams({ type: "post", pid: "12345" }).success).toBe(true);
    expect(parseDraftParams({ type: "dryck", pid: "rödvin-åäö" }).success).toBe(
      true,
    );
  });

  test.each([
    ["a missing pid", { type: "post" }],
    ["a missing type", { pid: "1" }],
    ["an unknown type", { type: "user", pid: "1" }],
    ["an empty pid", { type: "post", pid: "" }],
    ["a pid starting with a slash", { type: "page", pid: "/evil.com" }],
    ["a pid with a slash inside", { type: "page", pid: "a/b" }],
    ["a pid with a backslash", { type: "page", pid: "a\\b" }],
    ["a pid with a query", { type: "page", pid: "a?b" }],
    ["a pid with a fragment", { type: "page", pid: "a#b" }],
    ["a pid with a space", { type: "page", pid: "a b" }],
    ["a pid of dots", { type: "page", pid: ".." }],
    ["a pid over 200 characters", { type: "page", pid: "a".repeat(201) }],
    ["an author with a slash", { type: "post", pid: "1", author: "a/b" }],
    ["a parent with a slash", { type: "page", pid: "1", parent3: "a/b" }],
  ])("rejects %s", (_name, params) => {
    expect(parseDraftParams(params).success).toBe(false);
  });
});
