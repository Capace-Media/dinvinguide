import { expect, test } from "bun:test";
import { createSearchIndex, searchContent, type SearchIndex } from "./search-index";
import type { SearchRecord } from "./search-records";

// The index lives for the whole server instance, so anything a search adds to
// it is kept until content changes. Unique queries (bots) must not grow it.

const records: readonly SearchRecord[] = Array.from({ length: 50 }, (_, i) => ({
  id: `drink:vin-${i}`,
  type: "drink",
  title: `Rött vin nummer ${i}`,
  excerpt: "Fruktigt och kryddigt med toner av körsbär.",
  url: `/drycker/vin-${i}`,
  date: "2025-01-01T00:00:00",
  modified: "2025-01-01T00:00:00",
}));

// Orama memoizes normalized tokens on the default tokenizer.
const tokenCacheSize = (index: SearchIndex) =>
  (index.db.tokenizer as unknown as { normalizationCache: Map<string, string> })
    .normalizationCache.size;

test("unique searches do not grow the index's token cache", async () => {
  const index = await createSearchIndex(records);
  await searchContent(index, { q: "vin", page: 1, limit: 20 });
  const before = tokenCacheSize(index);

  for (let i = 0; i < 1000; i++) {
    await searchContent(index, { q: `bot${i} spam${i}x`, page: 1, limit: 20 });
  }

  expect(tokenCacheSize(index)).toBe(before);
});

test("searching still works after many unique queries", async () => {
  const index = await createSearchIndex(records);
  for (let i = 0; i < 200; i++) {
    await searchContent(index, { q: `slump${i}`, page: 1, limit: 20 });
  }
  const result = await searchContent(index, { q: "körsbär", page: 1, limit: 5 });
  expect(result.total).toBe(50);
});
