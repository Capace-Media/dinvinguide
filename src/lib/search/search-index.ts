import { create, insertMultiple, search } from "@orama/orama";
import { stemmer } from "@orama/stemmers/swedish";
import { SEARCH_TYPES, type SearchType, type SiteSearchParams } from "./search-params";
import type { SearchRecord } from "./search-records";

// In-memory full-text index over the search records. Pure and synchronous in
// spirit, so it can be unit tested without a CMS or `server-only`.

const schema = {
  title: "string",
  excerpt: "string",
  type: "string",
} as const;

function createDatabase() {
  return create({
    schema,
    components: {
      tokenizer: {
        language: "swedish",
        stemming: true,
        stemmer,
        // `type` is an exact filter value, not text.
        stemmerSkipProperties: ["type"],
        tokenizeSkipProperties: ["type"],
      },
    },
  });
}

export interface SearchIndex {
  readonly db: ReturnType<typeof createDatabase>;
  readonly records: ReadonlyMap<string, SearchRecord>;
}

export type SearchContentParams = Omit<SiteSearchParams, "q"> & {
  readonly q: string;
};

export interface SearchResults {
  readonly hits: readonly SearchRecord[];
  readonly total: number;
  readonly page: number;
  readonly pageCount: number;
  readonly countsByType: Readonly<Record<SearchType, number>>;
}

export async function createSearchIndex(
  records: readonly SearchRecord[]
): Promise<SearchIndex> {
  const db = createDatabase();
  await insertMultiple(
    db,
    records.map(({ id, title, excerpt, type }) => ({ id, title, excerpt, type }))
  );
  return { db, records: new Map(records.map((record) => [record.id, record])) };
}

// Orama types `properties` as a mutable array, so this cannot be `as const`.
const TEXT_PROPERTIES: ("title" | "excerpt")[] = ["title", "excerpt"];
const TITLE_BOOST = { title: 3 };

export async function searchContent(
  index: SearchIndex,
  { q, type, page, limit }: SearchContentParams
): Promise<SearchResults> {
  const countByType = (tolerance: number) =>
    search(index.db, {
      properties: TEXT_PROPERTIES,
      boost: TITLE_BOOST,
      tolerance,
      term: q,
      limit: 0,
      facets: { type: {} },
    });

  // Typo tolerance only when nothing matches exactly: otherwise near misses
  // ("rio" for "rioja") outrank the exact matches.
  let all = await countByType(0);
  let tolerance = 0;
  if (all.count === 0) {
    tolerance = 1;
    all = await countByType(tolerance);
  }
  const TEXT_SEARCH = {
    properties: TEXT_PROPERTIES,
    boost: TITLE_BOOST,
    tolerance,
  };

  // The counts drive the type filter chips, so they ignore the active type.
  const facetValues = all.facets?.type?.values ?? {};
  const countsByType = Object.fromEntries(
    SEARCH_TYPES.map((searchType) => [searchType, facetValues[searchType] ?? 0])
  ) as Record<SearchType, number>;

  const results = type
    ? await search(index.db, {
        ...TEXT_SEARCH,
        term: q,
        where: { type },
        limit,
        offset: (page - 1) * limit,
      })
    : await search(index.db, {
        ...TEXT_SEARCH,
        term: q,
        limit,
        offset: (page - 1) * limit,
      });

  const total = type ? countsByType[type] : all.count;
  const hits = results.hits.flatMap((hit) => {
    const record = index.records.get(hit.id);
    return record ? [record] : [];
  });

  return {
    hits,
    total,
    page,
    pageCount: Math.ceil(total / limit),
    countsByType,
  };
}

// FNV-1a over every id and modified date: cheap, and changes whenever a record
// is added, removed or edited, so the server knows when to rebuild the index.
export function getIndexVersion(records: readonly SearchRecord[]): string {
  const keys = records.map(({ id, modified }) => `${id}|${modified}`).sort();
  let hash = 0x811c9dc5;
  for (const key of keys) {
    for (let i = 0; i < key.length; i++) {
      hash ^= key.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    hash ^= 0x0a;
    hash = Math.imul(hash, 0x01000193);
  }
  return `${records.length}-${(hash >>> 0).toString(16)}`;
}
