import { describe, expect, test } from "vitest";
import { bearerToken, isValidSecret } from "./secret";

describe("isValidSecret", () => {
  test("accepts the matching secret", () => {
    expect(isValidSecret("s3cret", "s3cret")).toBe(true);
  });

  test.each([
    ["a different value", "other", "s3cret"],
    ["a prefix of the secret", "s3c", "s3cret"],
    ["the secret with extra characters", "s3cret!", "s3cret"],
    ["an empty value", "", "s3cret"],
    ["a missing value", null, "s3cret"],
    ["an undefined value", undefined, "s3cret"],
  ])("rejects %s", (_label, provided, expected) => {
    expect(isValidSecret(provided, expected)).toBe(false);
  });

  test("rejects everything when the expected secret is not configured", () => {
    expect(isValidSecret(undefined, undefined)).toBe(false);
    expect(isValidSecret("", "")).toBe(false);
    expect(isValidSecret("anything", undefined)).toBe(false);
  });
});

describe("bearerToken", () => {
  test("extracts the token", () => {
    expect(bearerToken("Bearer abc")).toBe("abc");
  });

  test.each([null, undefined, "", "abc", "Basic abc", "Bearer"])(
    "returns null for %p",
    (header) => {
      expect(bearerToken(header)).toBeNull();
    },
  );
});
