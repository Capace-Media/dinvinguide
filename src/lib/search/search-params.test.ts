import { describe, expect, test } from "bun:test";
import { parseSearchParams, SEARCH_TYPES } from "./search-params";

describe("parseSearchParams q", () => {
  test("trims, collapses whitespace and lowercases", () => {
    expect(parseSearchParams({ q: "  RIOJA   Reserva " }).q).toBe(
      "rioja reserva"
    );
  });

  test("lowercases Swedish characters", () => {
    expect(parseSearchParams({ q: "RÖDVIN ÅÄ" }).q).toBe("rödvin åä");
  });

  // Anything shorter than two characters is not worth searching for.
  test("is null when missing, too short or only whitespace", () => {
    expect(parseSearchParams({}).q).toBeNull();
    expect(parseSearchParams({ q: "a" }).q).toBeNull();
    expect(parseSearchParams({ q: "   " }).q).toBeNull();
    expect(parseSearchParams({ q: " a " }).q).toBeNull();
  });

  test("keeps a two character query", () => {
    expect(parseSearchParams({ q: "ek" }).q).toBe("ek");
  });

  test("cuts queries longer than 100 characters", () => {
    expect(parseSearchParams({ q: "x".repeat(250) }).q).toHaveLength(100);
  });

  test("uses the first value when a param is repeated", () => {
    expect(parseSearchParams({ q: ["merlot", "syrah"] }).q).toBe("merlot");
  });
});

describe("parseSearchParams page", () => {
  test("defaults to 1", () => {
    expect(parseSearchParams({ q: "vin" }).page).toBe(1);
  });

  test.each(["0", "-3", "abc", "1.5", ""])("falls back to 1 for %p", (page) => {
    expect(parseSearchParams({ q: "vin", page }).page).toBe(1);
  });

  test("accepts a positive integer", () => {
    expect(parseSearchParams({ q: "vin", page: "3" }).page).toBe(3);
  });
});

describe("parseSearchParams limit", () => {
  test("defaults to 20", () => {
    expect(parseSearchParams({ q: "vin" }).limit).toBe(20);
  });

  test("is capped at 50", () => {
    expect(parseSearchParams({ q: "vin", limit: "10000" }).limit).toBe(50);
  });

  test.each(["0", "-1", "abc"])("falls back to 20 for %p", (limit) => {
    expect(parseSearchParams({ q: "vin", limit }).limit).toBe(20);
  });

  test("accepts a value within range", () => {
    expect(parseSearchParams({ q: "vin", limit: "5" }).limit).toBe(5);
  });
});

describe("parseSearchParams type", () => {
  test("covers the five content types", () => {
    expect([...SEARCH_TYPES].sort()).toEqual(
      ["drink", "drinktip", "grape", "post", "recipe"]
    );
  });

  test.each([...SEARCH_TYPES])("accepts %p", (type) => {
    expect(parseSearchParams({ q: "vin", type }).type).toBe(type);
  });

  test("is undefined for an unknown or missing type", () => {
    expect(parseSearchParams({ q: "vin", type: "user" }).type).toBeUndefined();
    expect(parseSearchParams({ q: "vin" }).type).toBeUndefined();
  });
});

test("never throws on unexpected input", () => {
  expect(() =>
    parseSearchParams({ q: ["", ""], page: ["x"], limit: undefined, foo: "bar" })
  ).not.toThrow();
});
