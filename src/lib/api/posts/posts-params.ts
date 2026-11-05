import { z } from "zod";
import type { RouteSearchParams } from "@/lib/utils/pagination-search-params";
import type { PostsQueryVariables } from "@/lib/wp/gql/graphql";

const DEFAULT_FIRST = 16;
const MAX_FIRST = 50;
const MAX_SEARCH_LENGTH = 100;

const positiveInt = z.coerce
  .number()
  .int()
  .positive()
  .optional()
  .catch(undefined);
const text = (maxLength: number) =>
  z.string().min(1).max(maxLength).optional().catch(undefined);

const postsParamsSchema = z.object({
  first: positiveInt,
  after: text(200),
  before: text(200),
  // Long searches are cut, not rejected, so a pasted paragraph still searches.
  search: z
    .string()
    .transform((value) => value.slice(0, MAX_SEARCH_LENGTH) || undefined)
    .optional()
    .catch(undefined),
  year: z.coerce.number().int().min(1000).max(9999).optional().catch(undefined),
  authorName: text(100),
});

// Turns the query string of `/api/posts` into WordPress query variables. The
// route is public, so it never throws: anything invalid falls back to its
// default instead of being sent to WordPress as NaN, 0 or a negative count.
export function parsePostsParams(searchParams: RouteSearchParams) {
  const { first, ...rest } = postsParamsSchema.parse(searchParams);
  return {
    ...rest,
    first: Math.min(first ?? DEFAULT_FIRST, MAX_FIRST),
  } satisfies PostsQueryVariables;
}
