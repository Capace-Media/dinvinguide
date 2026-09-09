import { expect, test } from "bun:test";

// Point this at a Vercel preview URL in CI, or leave it for a local dev server.
const BASE = process.env.BASE_URL ?? "http://localhost:3000";

// These tests need a running site. Rather than 38 ConnectionRefused failures
// when you forget `bun run dev`, probe once and skip with a clear message.
//
// Done synchronously via curl because test.skipIf needs the answer before the
// tests are defined, and tsconfig targets es5, which disallows top-level await.
const reachable =
  Bun.spawnSync([
    "curl",
    "-s",
    "-o",
    "/dev/null",
    "-m",
    "5",
    ...(process.env.VERCEL_AUTOMATION_BYPASS_SECRET
      ? [
          "-H",
          `x-vercel-protection-bypass: ${process.env.VERCEL_AUTOMATION_BYPASS_SECRET}`,
        ]
      : []),
    BASE,
  ]).exitCode === 0;

// Nothing here skips. A skipped smoke test looks green while verifying
// nothing, so an unreachable site is a real failure — it just needs to say so
// in one line rather than 38 stack traces. Run with --bail to stop at the
// first one.
const smoke = test;

test("site under test is reachable and not behind an auth wall", async () => {
  if (!reachable) {
    throw new Error(
      `Nothing responding at ${BASE}\n` +
        `    • locally:  start it with  bun run dev\n` +
        `    • in CI:    set BASE_URL to the deployment under test\n` +
        `    Every test below will fail for this same reason.`
    );
  }

  // Vercel's SSO page answers 200, so "reachable" alone is not enough — every
  // ad assertion would fail with a confusing "expected 3, received 0".
  const { html } = await get("/");
  if (!html.includes('<html lang="sv"')) {
    throw new Error(
      `${BASE} responded, but it is not the site — most likely Vercel SSO.\n` +
        `    Set VERCEL_AUTOMATION_BYPASS_SECRET (Vercel → Settings →\n` +
        `    Deployment Protection → Protection Bypass for Automation)\n` +
        `    and expose it to this job as a secret.`
    );
  }
});

// Pages render server-side, so counting resolved ad slots tells us the queries
// returned data. A template that throws, or a query that returns null, drops
// the count and fails here.
// Vercel preview URLs sit behind SSO, which answers 200 with a login page
// rather than the site. This secret (Vercel → Deployment Protection →
// Protection Bypass for Automation) lets CI through.
//
// Header only — do NOT add x-vercel-set-bypass-cookie. That asks Vercel to
// redirect in order to set a cookie, and fetch() does not persist cookies
// between redirects, so it loops until TooManyRedirects. Sending the header on
// every request makes the cookie unnecessary.
const BYPASS = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
const HEADERS: Record<string, string> = BYPASS
  ? { "x-vercel-protection-bypass": BYPASS }
  : {};

async function get(path: string) {
  let res: Response;
  try {
    res = await fetch(BASE + path, { headers: HEADERS });
  } catch (cause) {
    // A bare stack trace says nothing useful, and there is one per test.
    // Surface the underlying reason — "connection refused" and "too many
    // redirects" need very different fixes.
    const why = cause instanceof Error ? cause.message : String(cause);
    throw new Error(`Could not reach ${BASE + path}\n    ${why}`, { cause });
  }
  const html = await res.text();
  return { status: res.status, html };
}

// Counts the data-ad-slot marker on <Banner>, not <picture> — other parts of
// the site are free to use <picture> without breaking these tests.
//
// Matches the rendered attribute exactly: React also echoes the markup into
// the RSC flight payload as \"data-ad-slot\":true, which would double-count.
const countAds = (html: string) =>
  html.split('data-ad-slot="true"').length - 1;

// Static routes, one per template family. Counts verified against the live CMS.
const ROUTES: Array<{ path: string; ads: number }> = [
  // default page type
  { path: "/", ads: 3 },
  { path: "/importorer", ads: 3 },
  { path: "/artiklar", ads: 2 },
  { path: "/skribenter", ads: 3 },
  { path: "/ordlistan", ads: 3 },
  { path: "/guide", ads: 3 },
  { path: "/recept", ads: 3 },
  { path: "/recept/receptbanken", ads: 2 },
  { path: "/recept/drycker", ads: 3 },
  { path: "/vinatlas", ads: 3 },
  { path: "/vin-tv", ads: 3 },
  { path: "/druvguiden", ads: 3 },
  { path: "/vinskolan", ads: 3 },

  // DL page type
  { path: "/dryckeslistan", ads: 3 },
  { path: "/dryckestips", ads: 2 },
  { path: "/dryckesutforskaren", ads: 3 },
];

for (const { path, ads } of ROUTES) {
  smoke(`${path} responds 200`, async () => {
    const { status } = await get(path);
    expect(status).toBe(200);
  });

  smoke(`${path} renders ${ads} ad slot(s)`, async () => {
    const { html } = await get(path);
    expect(countAds(html)).toBe(ads);
  });
}

// Dynamic routes: slugs come and go in the CMS, so discover one from its
// listing page instead of hardcoding. Skips rather than fails if the listing
// has no links — an empty section is a content problem, not a code problem.
const DYNAMIC: Array<{ listing: string; pattern: RegExp; ads: number }> = [
  { listing: "/ordlistan", pattern: /href="(\/ordlistan\/[^"]+)"/, ads: 1 },
  { listing: "/vinskolan", pattern: /href="(\/vinskolan\/[^"]+)"/, ads: 1 },
  { listing: "/skribenter", pattern: /href="(\/skribenter\/[^"]+)"/, ads: 3 },
  { listing: "/dryckeslistan", pattern: /href="(\/topplistor\/[^"]+)"/, ads: 3 },
  { listing: "/dryckestips", pattern: /href="(\/dryckestips\/[^"]+)"/, ads: 2 },
];

for (const { listing, pattern, ads } of DYNAMIC) {
  smoke(`a page under ${listing} renders ${ads} ad slot(s)`, async () => {
    const { html } = await get(listing);
    const slug = html.match(pattern)?.[1];

    if (!slug) {
      console.warn(`  skipped: no detail links found on ${listing}`);
      return;
    }

    const page = await get(slug);
    expect(page.status).toBe(200);
    expect(countAds(page.html)).toBe(ads);
  });
}

// Guards the migration itself: ads must come from the Next image optimizer,
// not raw WordPress URLs. Catches someone reverting to a plain <img src>.
smoke("ad images go through the Next image optimizer", async () => {
  const { html } = await get("/");
  expect(html).toContain("/_next/image?url=");
});
