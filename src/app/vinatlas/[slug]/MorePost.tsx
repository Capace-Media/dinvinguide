import { getWhineAtlases } from "@/lib/queries/getWineAtlases";

import PaginationController from "@/components/Pagination/Controller";
import PaginationForGuides from "@/components/Pagination/Guider";

type DataArgs = {
  after?: string;
  before?: string;
  id?: string | null;
  search?: string;
  first?: number;
  last?: number | null;
};

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  pageId: string;
};

const MorePosts = async ({ params, searchParams, pageId }: Props) => {
  const postsPerPage: number =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 4 : 16;

  const startFirst: number = parseInt(
    searchParams?.first ? searchParams?.first : postsPerPage
  );
  const endLast: number = parseInt(searchParams?.last);

  const promise = await getWhineAtlases({
    after: searchParams?.after,
    before: searchParams?.before,
    first: startFirst,
    last: endLast,
    parent: pageId,
  });

  return (
    <section className="layout bg-white">
      <div>
        <h2 className="pb-10">Skolor hos DinVinguide</h2>
        <PaginationForGuides
          promise={promise?.edges}
          idString="wineAtlas"
          page={searchParams?.page || undefined}
          uri={`/vinatlas/${params.slug}`}
        />
        {promise?.pageInfo?.hasNextPage === true ||
        promise?.pageInfo?.hasPreviousPage === true ? (
          <PaginationController
            pageInfo={promise?.pageInfo}
            uri={`/vinatlas/${params.slug}`}
            id="wineAtlas"
          />
        ) : null}
      </div>
    </section>
  );
};

export default MorePosts;
