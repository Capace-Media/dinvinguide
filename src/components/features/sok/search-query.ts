import type { SearchType } from "@/lib/search/search-types";

// Shared by the server prefetch in `app/sok/page.tsx` and the client query, so
// the hydrated first page is reused instead of fetched again.
export const searchQueryKey = (q: string | null, type: SearchType | undefined) =>
  ["search", q ?? "", type ?? "all"] as const;

export const SEARCH_PAGE_SIZE = 20;

export const SEARCH_TYPE_LABELS: Readonly<Record<SearchType, string>> = {
  post: "Artiklar",
  recipe: "Recept",
  drinktip: "Dryckestips",
  drink: "Drycker",
  grape: "Druvor",
};
