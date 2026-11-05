import { z } from "zod";
import type { RouteSearchParams } from "@/lib/utils/pagination-search-params";

export const DRAFT_TYPES = [
  "post",
  "recipe",
  "dryck",
  "druva",
  "dryckestips",
  "page",
] as const;

export type DraftType = (typeof DRAFT_TYPES)[number];

// One URL segment. Separators, query and fragment characters and whitespace are
// rejected so a value can never change where the preview redirect goes, for
// example `/evil.com` becoming the protocol-relative URL `//evil.com`.
const segment = z
  .string()
  .min(1)
  .max(200)
  .regex(/^[^/\\?#\s]+$/)
  .refine((value) => value !== "." && value !== "..");

// WordPress sends unused parents as empty strings (`parent1=`).
const optionalSegment = z.preprocess(
  (value) => (value === "" ? undefined : value),
  segment.optional(),
);

const draftParamsSchema = z.object({
  type: z.enum(DRAFT_TYPES),
  pid: segment,
  author: optionalSegment,
  parent1: optionalSegment,
  parent2: optionalSegment,
  parent3: optionalSegment,
});

// Validates the preview link parameters of `/api/draft`. Check the secret first:
// the caller of a route without a valid secret must learn nothing about which
// parameters it expects.
export function parseDraftParams(searchParams: RouteSearchParams) {
  return draftParamsSchema.safeParse(searchParams);
}
