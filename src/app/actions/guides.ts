"use server";

import { getWineAtlases, getWineSchools } from "@/lib/api/guides/get-guides";
import {
  GUIDES_PER_PAGE,
  parseGuideListInput,
} from "@/lib/api/guides/guide-list-params";

// Server action so the client-side guide lists can load more pages. Throws on
// failure so React Query shows its error state.
export async function getGuideList(input: unknown) {
  const { guide, after, search } = parseGuideListInput(input);
  const variables = { first: GUIDES_PER_PAGE, after, search };

  const pages =
    guide === "atlas"
      ? await getWineAtlases(variables)
      : await getWineSchools(variables);
  if (!pages) throw new Error("Kunde inte hämta guiderna");
  return pages;
}
