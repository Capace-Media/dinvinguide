import { infiniteQueryOptions } from "@tanstack/react-query";
import { getGuideList } from "@/app/actions/guides";
import type { GuideKey } from "@/lib/api/guides/guide-list-params";

// Shared by the server (prefetch) and the client list so both use one cache key.
export function guideListQuery(guide: GuideKey, search: string) {
  return infiniteQueryOptions({
    queryKey: ["guides", guide, search],
    queryFn: ({ pageParam }) =>
      getGuideList({ guide, after: pageParam || undefined, search }),
    initialPageParam: "",
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNextPage
        ? (lastPage.pageInfo.endCursor ?? undefined)
        : undefined,
  });
}
