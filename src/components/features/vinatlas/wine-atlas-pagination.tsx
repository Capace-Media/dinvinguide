import { getWineAtlases } from "@/lib/api/guides/get-guides";

import Search from "@/components/shared/search-bar";
import PaginationController from "@/components/shared/pagination/pagination-controller";
import PaginationForGuides from "@/components/shared/pagination/guide-pagination";

import {
  parsePaginationSearchParams,
  type RouteSearchParams,
} from "@/lib/utils/pagination-search-params";

const GUIDES_PER_PAGE = 16;

interface WineAtlasPaginationProps {
  searchParams: RouteSearchParams;
}

const WineAtlasPagination = async ({
  searchParams,
}: WineAtlasPaginationProps) => {
  const {
    after,
    before,
    first,
    last,
    search = "",
    page,
  } = parsePaginationSearchParams(searchParams, GUIDES_PER_PAGE);

  const wineAtlases = await getWineAtlases({
    after,
    before,
    first,
    last,
    search,
  });

  return (
    <section className="layout bg-white">
      <div>
        <div className="flex items-center justify-between pb-10">
          <div>
            <h2>Skolor hos DinVinguide</h2>
          </div>
          <div>
            <Search placeholder="sök" />
          </div>
        </div>
        <PaginationForGuides
          promise={wineAtlases?.edges}
          idString="wineAtlas"
          page={page || undefined}
          uri="/vinatlas"
        />

        {wineAtlases?.pageInfo?.hasNextPage === true ||
        wineAtlases?.pageInfo?.hasPreviousPage === true ? (
          <PaginationController
            pageInfo={wineAtlases.pageInfo}
            uri="/vinatlas/"
            id="wineAtlas"
          />
        ) : null}
      </div>
    </section>
  );
};

export default WineAtlasPagination;
