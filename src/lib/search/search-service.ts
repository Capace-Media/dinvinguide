import "server-only";
import { after } from "next/server";
import { getSearchRecords } from "@/lib/api/search/get-search-records";
import {
  createSearchIndex,
  getIndexVersion,
  searchContent,
  type SearchIndex,
  type SearchResults,
} from "./search-index";
import type { SearchRecord } from "./search-records";
import { SEARCH_TYPES, type SiteSearchParams } from "./search-params";
import { readSearchSnapshot, writeSearchSnapshot } from "./search-snapshot";

// How often a warm instance re-reads the records to see if content changed.
// Reading them hits the fetch cache, not WordPress, but is still ~80 lookups.
const RECHECK_INTERVAL_MS = 5 * 60 * 1000;

interface IndexState {
  readonly version: string;
  readonly index: SearchIndex;
  readonly checkedAt: number;
  // ETag of the stored snapshot this instance last read or wrote.
  readonly snapshotEtag: string | null;
}

// One index per server instance. Its size is bounded by the site's content,
// not by traffic, and it is replaced (never added to) when content changes.
let state: IndexState | null = null;
let pending: Promise<IndexState> | null = null;

function saveSnapshot(
  version: string,
  records: readonly SearchRecord[],
  ifMatch: string | null
): Promise<string | null> {
  const snapshot = { version, builtAt: new Date().toISOString(), records };
  return writeSearchSnapshot(snapshot, ifMatch ?? undefined);
}

const elapsedSince = (startedAt: number) => Math.round(performance.now() - startedAt);

// One line per new instance, so the logs show where a cold start's time goes.
// `uptime` is how long the server process had run before this load began.
function logColdStart(source: string, timings: Readonly<Record<string, number>>): void {
  const parts = Object.entries(timings).map(([name, ms]) => `${name} ${ms} ms`);
  console.info(`Search index cold start (${source}): ${parts.join(", ")}`);
}

// A new instance starts from the stored snapshot: one download instead of
// ~80 WordPress pages. Only without one does a visitor wait on WordPress.
async function loadInitialIndex(): Promise<IndexState> {
  const startedAt = performance.now();
  const uptime = Math.round(process.uptime() * 1000);

  const stored = await readSearchSnapshot();
  if (stored && stored !== "unchanged") {
    const { snapshot, etag } = stored;
    const age = Date.now() - Date.parse(snapshot.builtAt);
    const buildStartedAt = performance.now();
    const index = await createSearchIndex(snapshot.records);
    logColdStart(`snapshot, ${snapshot.records.length} records`, {
      uptime,
      download: stored.timings.downloadMs,
      decode: stored.timings.decodeMs,
      build: elapsedSince(buildStartedAt),
      total: elapsedSince(startedAt),
    });
    return {
      version: snapshot.version,
      index,
      // An older snapshot is rechecked against WordPress on the next search.
      checkedAt: age < RECHECK_INTERVAL_MS ? Date.now() : 0,
      snapshotEtag: etag,
    };
  }

  const fetchStartedAt = performance.now();
  const records = await getSearchRecords();
  const version = getIndexVersion(records);
  const fetchMs = elapsedSince(fetchStartedAt);
  const buildStartedAt = performance.now();
  const index = await createSearchIndex(records);
  const buildMs = elapsedSince(buildStartedAt);
  const saveStartedAt = performance.now();
  const snapshotEtag = await saveSnapshot(version, records, null);
  logColdStart(`WordPress, ${records.length} records`, {
    uptime,
    fetch: fetchMs,
    build: buildMs,
    save: elapsedSince(saveStartedAt),
    total: elapsedSince(startedAt),
  });
  return { version, index, checkedAt: Date.now(), snapshotEtag };
}

// Runs in the background on a warm instance. Picks up a snapshot another
// instance saved, then checks WordPress (through the fetch cache) and saves a
// new snapshot when the content changed.
async function recheckIndex(current: IndexState): Promise<IndexState> {
  let next = current;
  const stored = await readSearchSnapshot(current.snapshotEtag ?? undefined);
  if (stored && stored !== "unchanged") {
    next =
      stored.snapshot.version === current.version
        ? { ...current, snapshotEtag: stored.etag }
        : {
            version: stored.snapshot.version,
            index: await createSearchIndex(stored.snapshot.records),
            checkedAt: current.checkedAt,
            snapshotEtag: stored.etag,
          };
  }

  const records = await getSearchRecords();
  const version = getIndexVersion(records);
  if (version === next.version && next.snapshotEtag) {
    return { ...next, checkedAt: Date.now() };
  }

  const index = version === next.version ? next.index : await createSearchIndex(records);
  const snapshotEtag = await saveSnapshot(version, records, next.snapshotEtag);
  return {
    version,
    index,
    checkedAt: Date.now(),
    snapshotEtag: snapshotEtag ?? next.snapshotEtag,
  };
}

async function getSearchIndex(): Promise<SearchIndex> {
  const isFresh = state && Date.now() - state.checkedAt < RECHECK_INTERVAL_MS;
  if (state && isFresh) return state.index;

  // Concurrent requests share one load instead of each building an index.
  pending ??= (state ? recheckIndex(state) : loadInitialIndex())
    .then((next) => (state = next))
    .finally(() => {
      pending = null;
    });

  if (!state) return (await pending).index;

  // A warm instance keeps answering from the old index while it rechecks. If
  // the recheck fails (WordPress down), keep that index until the next interval.
  const stale = state;
  after(
    pending.catch((error: unknown) => {
      console.error("Search index refresh failed:", error);
      if (state === stale) state = { ...stale, checkedAt: Date.now() };
    })
  );
  return stale.index;
}

// False until this instance has its first index. Pages check this rather than
// make a visitor wait for the index to load.
export function isSearchIndexReady(): boolean {
  return state !== null;
}

// Starts loading the index without waiting for it. Later searches join it.
export function warmSearchIndex(): void {
  after(
    getSearchIndex().catch((error: unknown) => {
      console.error("Search index warm-up failed:", error);
    })
  );
}

// For the daily cron: saves a new snapshot when WordPress content changed, so
// the snapshot stays current even on days without searches.
export async function refreshSearchSnapshot(): Promise<{
  readonly version: string;
  readonly changed: boolean;
}> {
  const records = await getSearchRecords();
  const version = getIndexVersion(records);
  const stored = await readSearchSnapshot();
  const current = stored && stored !== "unchanged" ? stored : null;
  if (current?.snapshot.version === version) return { version, changed: false };

  const etag = await saveSnapshot(version, records, current?.etag ?? null);
  if (!etag) throw new Error("Search snapshot could not be saved");
  return { version, changed: true };
}

const EMPTY_COUNTS = Object.fromEntries(
  SEARCH_TYPES.map((type) => [type, 0])
) as SearchResults["countsByType"];

export function emptySearchResults(page = 1): SearchResults {
  return { hits: [], total: 0, page, pageCount: 0, countsByType: EMPTY_COUNTS };
}

export async function searchSite(params: SiteSearchParams): Promise<SearchResults> {
  if (!params.q) return emptySearchResults(params.page);
  const index = await getSearchIndex();
  return searchContent(index, { ...params, q: params.q });
}
