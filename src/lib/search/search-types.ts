// Dependency-free search primitives, shared with the client bundle.

export const SEARCH_TYPES = [
  "post",
  "recipe",
  "drinktip",
  "drink",
  "grape",
] as const;

export type SearchType = (typeof SEARCH_TYPES)[number];

const MIN_QUERY_LENGTH = 2;
const MAX_QUERY_LENGTH = 100;

// Trimmed, single-spaced and lowercased, so equivalent input shares one cache
// entry. `null` when too short to be worth searching for.
export function normalizeQuery(value: string): string | null {
  const query = value
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .slice(0, MAX_QUERY_LENGTH);
  return query.length >= MIN_QUERY_LENGTH ? query : null;
}
