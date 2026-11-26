import { z } from "zod";
import type { RouteSearchParams } from "@/lib/utils/pagination-search-params";

export const GUIDES_PER_PAGE = 16;

// Guides are addressed by key so the client never sends a WordPress page id.
export const GUIDE_KEYS = ["atlas", "school"] as const;
export type GuideKey = (typeof GUIDE_KEYS)[number];

const MAX_SEARCH_LENGTH = 100;

const guideListParamsSchema = z.object({
  guide: z.enum(GUIDE_KEYS),
  after: z.string().min(1).max(200).optional(),
  // An empty search becomes `undefined`: WordPress ignores the parent filter
  // when it receives `search: ""`.
  search: z
    .string()
    .transform((value) => value.trim().slice(0, MAX_SEARCH_LENGTH) || undefined)
    .optional(),
});

export type GuideListParams = z.output<typeof guideListParamsSchema>;

// Turns the query string of `/api/guides` into validated params, or `null`
// when they are not valid (the route answers 400). The route is public, so
// the client can neither pick a WordPress page nor the page size.
export function parseGuideListParams(
  searchParams: RouteSearchParams,
): GuideListParams | null {
  const result = guideListParamsSchema.safeParse(searchParams);
  return result.success ? result.data : null;
}
