import { parseSearchParams } from "@/lib/search/search-params";
import { searchSite } from "@/lib/search/search-service";
import type { SearchResults } from "@/lib/search/search-index";

// Without a stored snapshot the first search on an instance builds the index
// from WordPress, which took over 60 s once; let it finish rather than time out.
export const maxDuration = 300;

export type SearchResponse = SearchResults;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = parseSearchParams(Object.fromEntries(searchParams));

  try {
    const results = await searchSite(params);
    return Response.json(results satisfies SearchResponse);
  } catch (error) {
    console.error("Search failed:", error);
    return Response.json({ error: "Search is unavailable" }, { status: 503 });
  }
}
