import { readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { NextRequest } from "next/server";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { TEST_ENV } from "../../test-utils/env";
import {
  backendWasTouched,
  resetBackend,
} from "../../test-utils/backend-mocks";

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
vi.mock(
  "@/lib/search/search-service",
  async () =>
    (await import("../../test-utils/backend-mocks")).searchServiceMock,
);

const API_DIR = join(process.cwd(), "src", "app", "api");
const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;

/**
 * Routes that are intentionally open to anyone. DinVinguide has no user
 * accounts, so "logged out" means "without the route's secret": every other
 * route must answer 401 to such a request.
 *
 * Adding a route here needs the repository owner's approval.
 */
const PUBLIC_ROUTES: Readonly<Record<string, string>> = {
  "/api/posts": "Read-only list of published posts for the article feed.",
  "/api/search": "Read-only site search over published content.",
  "/api/disable-draft": "Only turns draft mode off; grants nothing.",
};

function findRoutes(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return findRoutes(path);
    return entry.name === "route.ts" || entry.name === "route.tsx"
      ? [path]
      : [];
  });
}

const routes = findRoutes(API_DIR).map((file) => ({
  file,
  path: `/api/${relative(API_DIR, file).split(sep).slice(0, -1).join("/")}`,
}));

const protectedRoutes = routes.filter(({ path }) => !(path in PUBLIC_ROUTES));

function request(
  path: string,
  init?: { headers?: Record<string, string>; query?: string },
) {
  return new NextRequest(`https://site.test${path}${init?.query ?? ""}`, {
    headers: init?.headers,
  });
}

type Handler = (request: NextRequest) => Promise<Response | undefined>;

async function handlersOf(file: string): Promise<[string, Handler][]> {
  const mod: Record<string, unknown> = await import(/* @vite-ignore */ file);
  return METHODS.flatMap((method) =>
    typeof mod[method] === "function"
      ? [[method, mod[method] as Handler] as [string, Handler]]
      : [],
  );
}

beforeEach(() => {
  resetBackend();
});

describe("api route discovery", () => {
  test("finds the API routes", () => {
    expect(routes.length).toBeGreaterThan(0);
  });

  test.each(Object.keys(PUBLIC_ROUTES))(
    "public route %s still exists (remove stale allowlist entries)",
    (path) => {
      expect(routes.map((route) => route.path)).toContain(path);
    },
  );
});

describe.each(protectedRoutes)("protected route $path", ({ file, path }) => {
  test("has at least one HTTP handler", async () => {
    expect((await handlersOf(file)).length).toBeGreaterThan(0);
  });

  test("answers 401 without a secret and touches nothing", async () => {
    for (const [method, handler] of await handlersOf(file)) {
      resetBackend();
      const response = await handler(request(path));
      expect(response?.status, `${method} ${path}`).toBe(401);
      expect(backendWasTouched(), `${method} ${path} touched the backend`).toBe(
        false,
      );
    }
  });

  test("answers 401 for a wrong secret and touches nothing", async () => {
    const wrong = {
      query: "?secret=wrong&path=ads&pid=1&type=post",
      headers: {
        authorization: "Bearer wrong",
        "x-revalidate-secret": "wrong",
      },
    };
    for (const [method, handler] of await handlersOf(file)) {
      resetBackend();
      const response = await handler(request(path, wrong));
      expect(response?.status, `${method} ${path}`).toBe(401);
      expect(backendWasTouched(), `${method} ${path} touched the backend`).toBe(
        false,
      );
    }
  });
});

describe("secret-protected routes accept their own secret", () => {
  test("/api/search/refresh accepts the cron bearer token", async () => {
    const { GET } = await import("../../src/app/api/search/refresh/route");
    const response = await GET(
      request("/api/search/refresh", {
        headers: { authorization: `Bearer ${TEST_ENV.CRON_SECRET}` },
      }),
    );
    expect(response.status).toBe(200);
  });

  test("/api/revalidate accepts the secret as a header", async () => {
    const { GET } = await import("../../src/app/api/revalidate/route");
    const response = await GET(
      request("/api/revalidate", {
        query: "?path=ads",
        headers: { "x-revalidate-secret": TEST_ENV.REVALIDATION_SECRET_TOKEN },
      }),
    );
    expect(response.status).toBe(200);
  });

  test("/api/revalidate still accepts the legacy ?secret= parameter", async () => {
    const { GET } = await import("../../src/app/api/revalidate/route");
    const response = await GET(
      request("/api/revalidate", {
        query: `?path=ads&secret=${TEST_ENV.REVALIDATION_SECRET_TOKEN}`,
      }),
    );
    expect(response.status).toBe(200);
  });
});
