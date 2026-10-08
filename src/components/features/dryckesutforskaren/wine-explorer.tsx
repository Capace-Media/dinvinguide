import { getDrinks } from "@/lib/api/drinks/get-drinks";
import {
  parsePaginationSearchParams,
  type RouteSearchParams,
} from "@/lib/utils/pagination-search-params";
import WineExplorerController from "./wine-explorer-controller";
import WineExplorerList from "./wine-explorer-list";

const DRINKS_PER_PAGE = 16;

interface WineExplorerProps {
  searchParams: RouteSearchParams;
}

const WineExplorer = async ({ searchParams }: WineExplorerProps) => {
  const { after, before, first, last } = parsePaginationSearchParams(
    searchParams,
    DRINKS_PER_PAGE
  );

  const drinks = await getDrinks({ after, before, first, last });
  const edges = drinks?.edges ?? [];
  const pageInfo = drinks?.pageInfo;

  return (
    <div className="dl-layout relative z-10">
      <h2 className="pb-10 md:pb-20 text-center">
        Utforska de viner som redaktionen har testat
      </h2>
      <WineExplorerList drinks={edges} />

      {pageInfo && <WineExplorerController pageInfo={pageInfo} />}
    </div>
  );
};

export default WineExplorer;
