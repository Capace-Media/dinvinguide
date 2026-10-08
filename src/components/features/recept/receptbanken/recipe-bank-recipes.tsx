import Search from "@/components/Blocks/Search";
import PaginationController from "@/components/Pagination/Controller";

import RecipePagination from "@/components/Pagination/Recipes";
import { getRecipes } from "@/lib/api/recipes/get-recipes";
import {
  parsePaginationSearchParams,
  type RouteSearchParams,
} from "@/lib/utils/pagination-search-params";

const RECIPES_PER_PAGE = 16;

interface RecipeBankRecipesProps {
  searchParams: RouteSearchParams;
}

const RecipeBankRecipes = async ({ searchParams }: RecipeBankRecipesProps) => {
  const { after, before, first, last, search = "" } =
    parsePaginationSearchParams(searchParams, RECIPES_PER_PAGE);

  const recipes = await getRecipes({
    after,
    before,
    first,
    last,
    search,
  });
  return (
    <section>
      <div className="layout bg-white flex justify-between items-center">
        <div>
          <p className="uppercase text-[14px]">receptbanken</p>
          <h1>Utforska alla recept</h1>
        </div>

        <div>
          <Search placeholder="sök efter recept" />
        </div>
      </div>
      {recipes?.edges && <RecipePagination data={recipes.edges} />}

      {recipes?.pageInfo?.hasNextPage === true ||
      recipes?.pageInfo?.hasPreviousPage === true ? (
        <PaginationController
          pageInfo={recipes.pageInfo}
          uri="/recept/receptbanken"
          search={search}
        />
      ) : null}
    </section>
  );
};

export default RecipeBankRecipes;
