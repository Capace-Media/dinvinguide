import { z } from "zod";

export const GUIDES_PER_PAGE = 16;

// Guides are addressed by key so the client never sends a WordPress page id.
export const GUIDE_KEYS = ["atlas", "school"] as const;
export type GuideKey = (typeof GUIDE_KEYS)[number];

const MAX_SEARCH_LENGTH = 100;

const guideListInputSchema = z.object({
  guide: z.enum(GUIDE_KEYS),
  after: z.string().min(1).max(200).optional(),
  // An empty search becomes `undefined`: WordPress ignores the parent filter
  // when it receives `search: ""`.
  search: z
    .string()
    .transform((value) => value.trim().slice(0, MAX_SEARCH_LENGTH) || undefined)
    .optional(),
});

// Validates the input of the guide list server action. Server actions can be
// called directly, so anything that is not a known guide throws.
export function parseGuideListInput(input: unknown) {
  return guideListInputSchema.parse(input);
}
