import Search from "@/components/shared/search-bar";
import PaginationController from "@/components/shared/pagination/pagination-controller";
import PaginationForGuides from "@/components/shared/pagination/guide-pagination";

import { getWineSchools } from "@/lib/api/guides/get-guides";

import {
  parsePaginationSearchParams,
  type RouteSearchParams,
} from "@/lib/utils/pagination-search-params";

const GUIDES_PER_PAGE = 16;

interface WineSchoolPaginationProps {
  searchParams: RouteSearchParams;
}

const WineSchoolPagination = async ({
  searchParams,
}: WineSchoolPaginationProps) => {
  const {
    after,
    before,
    first,
    last,
    search = "",
  } = parsePaginationSearchParams(searchParams, GUIDES_PER_PAGE);

  const wineSchools = await getWineSchools({
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

        {wineSchools?.edges && (
          <PaginationForGuides
            promise={wineSchools.edges}
            idString="wineSchool"
            uri="/vinskolan"
          />
        )}

        {wineSchools?.pageInfo?.hasNextPage === true ||
        wineSchools?.pageInfo?.hasPreviousPage === true ? (
          <PaginationController
            pageInfo={wineSchools.pageInfo}
            uri="/vinskolan"
            id="wineSchool"
          />
        ) : null}
      </div>
    </section>
  );
};

export default WineSchoolPagination;
