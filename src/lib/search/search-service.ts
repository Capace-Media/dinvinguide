import "server-only";
import { getSearchRecords } from "@/lib/api/search/get-search-records";
import {
  createSearchIndex,
  getIndexVersion,
  searchContent,
  type SearchIndex,
  type SearchResults,
} from "./search-index";
import { SEARCH_TYPES, type SiteSearchParams } from "./search-params";

// How often a warm instance re-reads the records to see if content changed.
// Reading them hits the fetch cache, not WordPress, but is still ~20 lookups.
const RECHECK_INTERVAL_MS = 5 * 60 * 1000;

interface IndexState {
  readonly version: string;
  readonly index: SearchIndex;
  readonly checkedAt: number;
}

// One index per server instance. Its size is bounded by the site's content,
// not by traffic, and it is replaced (never added to) when content changes.
let state: IndexState | null = null;
let pending: Promise<IndexState> | null = null;

async function loadIndex(previous: IndexState | null): Promise<IndexState> {
  const records = await getSearchRecords();
  const version = getIndexVersion(records);
  const index =
    previous?.version === version ? previous.index : await createSearchIndex(records);
  return { version, index, checkedAt: Date.now() };
}

async function getSearchIndex(): Promise<SearchIndex> {
  const isFresh = state && Date.now() - state.checkedAt < RECHECK_INTERVAL_MS;
  if (state && isFresh) return state.index;

  // Concurrent requests share one load instead of each building an index.
  pending ??= loadIndex(state)
    .then((next) => (state = next))
    .finally(() => {
      pending = null;
    });

  if (!state) return (await pending).index;

  // A warm instance keeps answering from the old index while it rechecks. If
  // the recheck fails (WordPress down), keep that index until the next interval.
  const stale = state;
  pending.catch((error: unknown) => {
    console.error("Search index refresh failed:", error);
    if (state === stale) state = { ...stale, checkedAt: Date.now() };
  });
  return stale.index;
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
