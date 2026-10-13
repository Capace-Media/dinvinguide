import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { SiteSearch } from "@/components/features/sok/site-search";
import {
  SEARCH_PAGE_SIZE,
  searchQueryKey,
} from "@/components/features/sok/search-query";
import Newsletter from "@/components/shared/newsletter/newsletter";
import { getQueryClient } from "@/lib/get-query-client";
import { parseSearchParams } from "@/lib/search/search-params";
import { searchSite } from "@/lib/search/search-service";
import type { RouteSearchParams } from "@/lib/utils/pagination-search-params";

// Result pages are endless variations of the same content; keep them out of
// search engines (crawling is also disallowed in `app/robots.ts`).
export const metadata: Metadata = {
  title: "Sök",
  robots: { index: false, follow: true },
};

interface SearchPageProps {
  readonly searchParams: Promise<RouteSearchParams>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { search, type } = await searchParams;
  // The page keeps `?search=` in its URL; the search itself takes `q`.
  const params = parseSearchParams({ q: search, type, limit: String(SEARCH_PAGE_SIZE) });

  const queryClient = getQueryClient();
  if (params.q) {
    await queryClient.prefetchInfiniteQuery({
      queryKey: searchQueryKey(params.q, params.type),
      queryFn: () => searchSite({ ...params, page: 1 }),
      initialPageParam: 1,
    });
  }

  return (
    <div className="layout bg-white">
      <div className="pt-12 pb-8 lg:pt-16">
        <h2>Sök på DinVinguide.se</h2>
        <p className="mt-2 text-brand-gray">
          Sök bland recept, dryckestips, artiklar, drycker och druvor
        </p>
      </div>

      <div className="pb-16">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <SiteSearch initialSearch={params.q ?? ""} initialType={params.type} />
        </HydrationBoundary>
      </div>

      <Newsletter />
    </div>
  );
}
