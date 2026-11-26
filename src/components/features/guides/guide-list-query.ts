import { infiniteQueryOptions } from "@tanstack/react-query";
import type { GuideListPage } from "@/lib/api/guides/get-guide-list";
import type { GuideKey } from "@/lib/api/guides/guide-list-params";

export type GuideListFetcher = (request: {
  guide: GuideKey;
  after?: string;
  search: string;
}) => Promise<GuideListPage>;

// Shared by the server (prefetch) and the client list so both use one cache
// key and one paging rule. Each side passes the fetcher that suits it.
export function guideListQuery(
  guide: GuideKey,
  search: string,
  fetchPage: GuideListFetcher,
) {
  return infiniteQueryOptions({
    queryKey: ["guides", guide, search],
    queryFn: ({ pageParam }) =>
      fetchPage({ guide, after: pageParam || undefined, search }),
    initialPageParam: "",
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNextPage
        ? (lastPage.pageInfo.endCursor ?? undefined)
        : undefined,
  });
}
