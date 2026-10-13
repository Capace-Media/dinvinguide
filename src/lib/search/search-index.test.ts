import { describe, expect, test } from "bun:test";
import {
  createSearchIndex,
  getIndexVersion,
  searchContent,
} from "./search-index";
import type { SearchRecord } from "./search-records";
import type { SearchType } from "./search-params";

const record = (
  id: string,
  type: SearchType,
  title: string,
  excerpt = "",
  modified = "2025-01-01T00:00:00"
): SearchRecord => ({
  id,
  type,
  title,
  excerpt,
  url: `/${type}/${id}`,
  date: "2025-01-01T00:00:00",
  modified,
});

const records: readonly SearchRecord[] = [
  record("chardonnay", "grape", "Chardonnay", "Grön druva från Bourgogne."),
  record("merlot", "grape", "Merlot", "Mjuk druva från Bordeaux."),
  record("tempranillo", "grape", "Tempranillo", "Spaniens viktigaste druva."),
  record("druva", "post", "Druva", "Om vinrankans frukt."),
  record("rioja-reserva", "drink", "Rioja Reserva", "Gjort på tempranillo."),
  record("rioja-crianza", "drink", "Rioja Crianza", "Ungt och fruktigt."),
  record("resa-rioja", "post", "Resa till Rioja", "Vingårdar i norra Spanien."),
  record("lammstek", "recipe", "Lammstek till rioja", "Långkokt lamm."),
  record("sommarvin", "drinktip", "Sommarvin", "Friskt och lätt."),
  record("pasta", "recipe", "Pasta carbonara", "Klassisk romersk pasta."),
];

const params = { page: 1, limit: 20 };

describe("searchContent matching", () => {
  test("finds an exact title match", async () => {
    const index = await createSearchIndex(records);
    const result = await searchContent(index, { ...params, q: "merlot" });
    expect(result.hits.map((hit) => hit.id)).toContain("merlot");
  });

  test("is case-insensitive", async () => {
    const index = await createSearchIndex(records);
    const result = await searchContent(index, { ...params, q: "MERLOT" });
    expect(result.hits[0]?.id).toBe("merlot");
  });

  test("tolerates a one-letter typo", async () => {
    const index = await createSearchIndex(records);
    const result = await searchContent(index, { ...params, q: "chardonay" });
    expect(result.hits[0]?.id).toBe("chardonnay");
  });

  // "druvor" and "druva" share a stem but are two edits apart, so this only
  // passes with Swedish stemming, not with typo tolerance.
  test("matches Swedish inflections", async () => {
    const index = await createSearchIndex(records);
    const result = await searchContent(index, { ...params, q: "druvor" });
    expect(result.hits.map((hit) => hit.id)).toContain("druva");
  });

  test("ranks a title match above an excerpt-only match", async () => {
    const index = await createSearchIndex(records);
    const result = await searchContent(index, { ...params, q: "tempranillo" });
    const ids = result.hits.map((hit) => hit.id);
    expect(ids[0]).toBe("tempranillo");
    expect(ids).toContain("rioja-reserva");
  });

  test("returns full records", async () => {
    const index = await createSearchIndex(records);
    const result = await searchContent(index, { ...params, q: "merlot" });
    expect(result.hits[0]).toEqual(records[1]);
  });

  test("returns an empty result when nothing matches", async () => {
    const index = await createSearchIndex(records);
    const result = await searchContent(index, { ...params, q: "xyzzyqw" });
    expect(result).toMatchObject({ hits: [], total: 0, pageCount: 0, page: 1 });
  });
});

describe("searchContent type filter", () => {
  test("returns only the requested type", async () => {
    const index = await createSearchIndex(records);
    const result = await searchContent(index, {
      ...params,
      q: "rioja",
      type: "drink",
    });
    expect(result.hits.length).toBeGreaterThan(0);
    expect(result.hits.every((hit) => hit.type === "drink")).toBe(true);
    expect(result.total).toBe(result.hits.length);
  });

  // The counts drive the type chips, so they ignore the active filter.
  test("counts every type regardless of the filter", async () => {
    const index = await createSearchIndex(records);
    const filtered = await searchContent(index, {
      ...params,
      q: "rioja",
      type: "drink",
    });
    const unfiltered = await searchContent(index, { ...params, q: "rioja" });

    expect(filtered.countsByType).toEqual(unfiltered.countsByType);
    expect(filtered.countsByType.drink).toBe(filtered.total);
    expect(filtered.countsByType.post).toBeGreaterThan(0);
    expect(filtered.countsByType.recipe).toBeGreaterThan(0);
  });

  test("includes every type in the counts, with 0 for no hits", async () => {
    const index = await createSearchIndex(records);
    const result = await searchContent(index, { ...params, q: "merlot" });
    expect(Object.keys(result.countsByType).sort()).toEqual(
      ["drink", "drinktip", "grape", "post", "recipe"]
    );
    expect(result.countsByType.recipe).toBe(0);
  });
});

describe("searchContent paging", () => {
  // Own fixture so typo tolerance cannot pull in unrelated records.
  const bordeaux = Array.from({ length: 12 }, (_, i) =>
    record(`bordeaux-${i}`, "drink", `Bordeaux ${String.fromCharCode(97 + i)}`)
  );

  test("reports the total and page count", async () => {
    const index = await createSearchIndex(bordeaux);
    const result = await searchContent(index, { q: "bordeaux", page: 1, limit: 5 });
    expect(result.total).toBe(12);
    expect(result.pageCount).toBe(3);
    expect(result.page).toBe(1);
    expect(result.hits).toHaveLength(5);
  });

  test("returns consecutive pages without overlap", async () => {
    const index = await createSearchIndex(bordeaux);
    const pages = await Promise.all(
      [1, 2, 3].map((page) =>
        searchContent(index, { q: "bordeaux", page, limit: 5 })
      )
    );
    const ids = pages.flatMap((result) => result.hits.map((hit) => hit.id));

    expect(pages.map((result) => result.hits.length)).toEqual([5, 5, 2]);
    expect(new Set(ids).size).toBe(12);
  });

  test("returns no hits past the last page but keeps the total", async () => {
    const index = await createSearchIndex(bordeaux);
    const result = await searchContent(index, { q: "bordeaux", page: 4, limit: 5 });
    expect(result.hits).toEqual([]);
    expect(result.total).toBe(12);
    expect(result.page).toBe(4);
  });
});

describe("getIndexVersion", () => {
  test("is stable for the same records", () => {
    expect(getIndexVersion(records)).toBe(getIndexVersion([...records]));
  });

  test("changes when a record is added", () => {
    const added = [...records, record("syrah", "grape", "Syrah")];
    expect(getIndexVersion(added)).not.toBe(getIndexVersion(records));
  });

  test("changes when a record is modified", () => {
    const edited = records.map((item) =>
      item.id === "merlot" ? { ...item, modified: "2026-06-01T00:00:00" } : item
    );
    expect(getIndexVersion(edited)).not.toBe(getIndexVersion(records));
  });
});
