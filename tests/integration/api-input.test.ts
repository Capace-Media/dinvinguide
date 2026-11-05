import { NextRequest } from "next/server";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { backend, resetBackend } from "../../test-utils/backend-mocks";
import { TEST_ENV } from "../../test-utils/env";

vi.mock(
  "next/cache",
  async () => (await import("../../test-utils/backend-mocks")).nextCacheMock,
);
vi.mock(
  "next/headers",
  async () => (await import("../../test-utils/backend-mocks")).nextHeadersMock,
);
vi.mock(
  "next/navigation",
  async () =>
    (await import("../../test-utils/backend-mocks")).nextNavigationMock,
);
vi.mock(
  "@/lib/wp/client",
  async () => (await import("../../test-utils/backend-mocks")).wpClientMock,
);

function get(
  path: string,
  params: Record<string, string> = {},
  headers?: Record<string, string>,
) {
  const query = new URLSearchParams(params).toString();
  return new NextRequest(
    `https://site.test${path}${query ? `?${query}` : ""}`,
    {
      headers,
    },
  );
}

beforeEach(() => {
  resetBackend();
});

// What the route asked WordPress for. The mocked client returns null, so the
// route itself answers 502; only the variables matter here.
async function postsVariables(params: Record<string, string>) {
  const { GET } = await import("../../src/app/api/posts/route");
  resetBackend();
  await GET(get("/api/posts", params));
  const [call] = backend.wpQuery.mock.calls as unknown as unknown[][];
  return call?.[1];
}

describe("/api/posts input", () => {
  test("uses defaults when no params are given", async () => {
    expect(await postsVariables({})).toEqual({ first: 16 });
  });

  test("passes valid params on to WordPress", async () => {
    expect(
      await postsVariables({
        first: "20",
        after: "cursor-a",
        before: "cursor-b",
        search: "rioja",
        year: "2020",
        authorName: "fredrikschelin",
      }),
    ).toEqual({
      first: 20,
      after: "cursor-a",
      before: "cursor-b",
      search: "rioja",
      year: 2020,
      authorName: "fredrikschelin",
    });
  });

  test("caps first at 50", async () => {
    expect(await postsVariables({ first: "500" })).toEqual({ first: 50 });
  });

  test.each(["-5", "0", "1.5", "abc", ""])(
    "falls back to 16 for first=%j",
    async (first) => {
      expect(await postsVariables({ first })).toEqual({ first: 16 });
    },
  );

  test.each(["abc", "", "20.5", "-2020", "99999"])(
    "drops an invalid year=%j instead of sending NaN or 0",
    async (year) => {
      expect(await postsVariables({ year })).toEqual({ first: 16 });
    },
  );

  test("cuts search at 100 characters and ignores an empty search", async () => {
    expect(await postsVariables({ search: "x".repeat(250) })).toEqual({
      first: 16,
      search: "x".repeat(100),
    });
    expect(await postsVariables({ search: "" })).toEqual({ first: 16 });
  });
});

describe("/api/draft input", () => {
  const secret = { secret: TEST_ENV.PREVIEW_TOKEN };

  async function draft(params: Record<string, string>) {
    const { GET } = await import("../../src/app/api/draft/route");
    return GET(get("/api/draft", { ...secret, ...params }));
  }

  test.each([
    [{ type: "post", author: "anders", pid: "123" }, "/skribenter/anders/123"],
    [{ type: "recipe", pid: "123" }, "/recept/123"],
    [{ type: "dryck", pid: "rioja-reserva" }, "/drycker/rioja-reserva"],
    [{ type: "druva", pid: "merlot" }, "/druvor/merlot"],
    [{ type: "dryckestips", pid: "42" }, "/dryckestips/42"],
    [{ type: "page", pid: "om-oss" }, "/om-oss"],
    [{ type: "page", parent1: "skolor", pid: "grunder" }, "/vinskolan/grunder"],
    [
      { type: "page", parent1: "", parent2: "vinatlas", parent3: "", pid: "x" },
      "/vinatlas/x",
    ],
    [
      { type: "page", parent2: "vinatlas", parent3: "spanien", pid: "rioja" },
      "/vinatlas/spanien/rioja",
    ],
  ])("redirects %j to %s", async (params, destination) => {
    await draft(params);
    expect(backend.draftEnable).toHaveBeenCalledOnce();
    expect(backend.redirect).toHaveBeenCalledWith(destination);
  });

  test.each([
    [
      "a pid that would make a protocol-relative redirect",
      { pid: "/evil.com" },
    ],
    ["a pid with two leading slashes", { pid: "//evil.com" }],
    ["a pid with a path separator", { pid: "a/b" }],
    ["a pid with a backslash", { pid: "a\\b" }],
    ["a pid with a query string", { pid: "a?x=1" }],
    ["a pid with a fragment", { pid: "a#x" }],
    ["a pid with whitespace", { pid: "a b" }],
    ["a very long pid", { pid: "x".repeat(300) }],
    ["a missing pid", { pid: undefined }],
    ["an unknown type", { type: "nope" }],
    ["a missing type", { type: undefined }],
    ["a parent with a path separator", { parent2: "vinatlas", parent3: "a/b" }],
  ])("answers 400 for %s and does not redirect", async (_name, override) => {
    const params: Record<string, string> = { type: "page", pid: "ok" };
    for (const [key, value] of Object.entries(override)) {
      if (value === undefined) delete params[key];
      else params[key] = value;
    }
    const response = await draft(params);
    expect(response.status).toBe(400);
    expect(backend.draftEnable).not.toHaveBeenCalled();
    expect(backend.redirect).not.toHaveBeenCalled();
  });

  test("answers 400 for a post author with a path separator", async () => {
    const response = await draft({ type: "post", pid: "1", author: "a/b" });
    expect(response.status).toBe(400);
    expect(backend.redirect).not.toHaveBeenCalled();
  });
});

describe("/api/revalidate input", () => {
  const headers = { "x-revalidate-secret": TEST_ENV.REVALIDATION_SECRET_TOKEN };

  async function revalidate(params: Record<string, string>) {
    const { GET } = await import("../../src/app/api/revalidate/route");
    return GET(get("/api/revalidate", params, headers));
  }

  test.each([
    ["post", "post"],
    ["ads", "ads"],
    ["supplier", "supplier"],
  ])("path=%s refreshes the %s tag", async (path, tag) => {
    const response = await revalidate({ path });
    expect((await response.json()).revalidated).toBe(true);
    expect(backend.revalidateTag).toHaveBeenCalledWith(tag, "max");
  });

  test("path=/front-page refreshes the front page", async () => {
    await revalidate({ path: "/front-page" });
    expect(backend.revalidatePath).toHaveBeenCalledWith("/");
  });

  test("a literal path is revalidated", async () => {
    const response = await revalidate({ path: "/recept/pasta" });
    expect((await response.json()).revalidated).toBe(true);
    expect(backend.revalidatePath).toHaveBeenCalledWith("/recept/pasta");
  });

  test("a word that is not a known tag still refreshes collections but is not passed to revalidatePath", async () => {
    const response = await revalidate({ path: "something-new" });
    expect((await response.json()).revalidated).toBe(true);
    expect(backend.revalidateTag).toHaveBeenCalledWith("collections", "max");
    expect(backend.revalidatePath).not.toHaveBeenCalled();
  });

  test.each([
    ["a dynamic route pattern", "/recept/[slug]"],
    ["a catch-all pattern", "/[...slug]"],
    ["a path over 1024 characters", `/${"a".repeat(1100)}`],
  ])("rejects %s with 400 and revalidates nothing", async (_name, path) => {
    const response = await revalidate({ path });
    expect(response.status).toBe(400);
    expect((await response.json()).revalidated).toBe(false);
    expect(backend.revalidateTag).not.toHaveBeenCalled();
    expect(backend.revalidatePath).not.toHaveBeenCalled();
  });

  test.each(["", "   "])(
    "reports a missing path for path=%j and revalidates nothing",
    async (path) => {
      const response = await revalidate({ path });
      expect((await response.json()).message).toBe(
        "Missing path to revalidate",
      );
      expect(backend.revalidateTag).not.toHaveBeenCalled();
      expect(backend.revalidatePath).not.toHaveBeenCalled();
    },
  );
});
