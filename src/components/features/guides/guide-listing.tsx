import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getGuideList } from "@/lib/api/guides/get-guide-list";
import { getQueryClient } from "@/lib/get-query-client";
import GuideList, { type GuideListProps } from "./guide-list";
import { guideListQuery } from "./guide-list-query";

// Prefetches the first page on the server so the list is in the HTML, then
// hands over to the client list for "Ladda fler" and search.
export default async function GuideListing(props: GuideListProps) {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery(
    guideListQuery(props.guide, "", async ({ guide, after, search }) => {
      const page = await getGuideList({
        guide,
        after,
        search: search || undefined,
      });
      if (!page) throw new Error("Kunde inte hämta guiderna");
      return page;
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GuideList {...props} />
    </HydrationBoundary>
  );
}
