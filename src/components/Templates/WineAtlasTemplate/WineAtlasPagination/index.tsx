import { getWhineAtlases } from "@/lib/queries/getWineAtlases";

import Search from "@/components/Blocks/Search";
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
};

const WineAtlasPagination = async ({ params, searchParams }: Props) => {
  const postsPerPage: number =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 4 : 16;

  const startFirst: number = parseInt(
    searchParams?.first ? searchParams?.first : postsPerPage
  );
  const endLast: number = parseInt(searchParams?.last);
  const search: string = searchParams?.search ? searchParams.search : "";

  const promise = await getWhineAtlases({
    after: searchParams?.after,
    before: searchParams?.before,
    first: startFirst,
    last: endLast,
    search: search,
  });

  return (
    <section className="layout bg-white">
      <div>
        <div className="flex justify-between  items-center pb-10">
          <div>
            <h2 className="">Skolor hos DinVinguide</h2>
          </div>
          <div>
            <Search placeholder="sök" />
          </div>
        </div>
        <PaginationForGuides
          promise={promise?.edges}
          idString="wineAtlas"
          page={searchParams?.page || undefined}
          uri="/vinatlas"
        />

        {promise?.pageInfo?.hasNextPage === true ||
        promise?.pageInfo?.hasPreviousPage === true ? (
          <PaginationController
            pageInfo={promise?.pageInfo}
            uri="/vinatlas/"
            id="wineAtlas"
          />
        ) : null}
      </div>
    </section>
  );
};

export default WineAtlasPagination;
