import { parseSearchParams } from "@/lib/search/search-params";
import { searchSite } from "@/lib/search/search-service";
import type { SearchResults } from "@/lib/search/search-index";

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
