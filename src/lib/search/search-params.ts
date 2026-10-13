import { z } from "zod";
import type { RouteSearchParams } from "@/lib/utils/pagination-search-params";
import { normalizeQuery, SEARCH_TYPES, type SearchType } from "./search-types";

export { SEARCH_TYPES, type SearchType };

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

// Repeated params (`?q=a&q=b`) arrive as arrays; only the first one counts.
const firstValue = (value: unknown) =>
  Array.isArray(value) ? value[0] : value;

const positiveInt = z.preprocess(
  firstValue,
  z.coerce.number().int().positive().optional().catch(undefined)
);

const searchParamsSchema = z.object({
  q: z.preprocess(
    firstValue,
    z.string().transform(normalizeQuery).catch(null).default(null)
  ),
  type: z.preprocess(firstValue, z.enum(SEARCH_TYPES).optional().catch(undefined)),
  page: positiveInt,
  limit: positiveInt,
});

export interface SiteSearchParams {
  readonly q: string | null;
  readonly type?: SearchType;
  readonly page: number;
  readonly limit: number;
}

// Normalizes search input from the URL. Never throws: anything invalid falls
// back to its default, so the result is safe to use as a cache key.
export function parseSearchParams(
  searchParams: RouteSearchParams
): SiteSearchParams {
  const { q, type, page, limit } = searchParamsSchema.parse(searchParams);
  return {
    q,
    type,
    page: page ?? 1,
    limit: Math.min(limit ?? DEFAULT_LIMIT, MAX_LIMIT),
  };
}
