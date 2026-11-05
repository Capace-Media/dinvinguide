import { describe, expect, test } from "vitest";
import { parseRevalidatePath } from "./revalidate-params";

describe("parseRevalidatePath", () => {
  test.each([null, undefined, "", "   "])(
    "treats %j as a missing path",
    (value) => {
      expect(parseRevalidatePath(value)).toEqual({ ok: true, path: null });
    },
  );

  test("keeps tag keywords and literal paths, trimmed", () => {
    expect(parseRevalidatePath("post")).toEqual({ ok: true, path: "post" });
    expect(parseRevalidatePath(" /recept/pasta ")).toEqual({
      ok: true,
      path: "/recept/pasta",
    });
  });

  test("keeps a word that is not a known keyword", () => {
    expect(parseRevalidatePath("something-new")).toEqual({
      ok: true,
      path: "something-new",
    });
  });

  test("accepts 1024 characters and rejects 1025", () => {
    expect(parseRevalidatePath("/".padEnd(1024, "a")).ok).toBe(true);
    expect(parseRevalidatePath("/".padEnd(1025, "a")).ok).toBe(false);
  });

  test.each(["/recept/[slug]", "/[...slug]", "/a/[id]/b"])(
    "rejects the dynamic pattern %s",
    (value) => {
      expect(parseRevalidatePath(value)).toEqual({ ok: false });
    },
  );
});
