import Search from "@/components/Blocks/Search";
import PaginationController from "@/components/Pagination/Controller";

import RecipePagination from "@/components/Pagination/Recipes";
import { getChefRecipes } from "@/lib/api/recipes/get-recipes";
import {
  parsePaginationSearchParams,
  type RouteSearchParams,
} from "@/lib/utils/pagination-search-params";

const RECIPES_PER_PAGE = 16;

interface ChefRecipesProps {
  searchParams: RouteSearchParams;
  params: { slug: string };
  mainSlug?: string;
}

const ChefRecipes = async ({
  searchParams,
  params,
  mainSlug,
}: ChefRecipesProps) => {
  const { after, before, first, last, search = "" } =
    parsePaginationSearchParams(searchParams, RECIPES_PER_PAGE);

  const idURI = `/gastskribent/${params.slug}`;

  const uri = mainSlug
    ? `/recept/${mainSlug}/${params.slug}`
    : `/recept/${params.slug}`;

  const chef = await getChefRecipes(idURI, {
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
          {chef?.name && (
            <>
              <p className="uppercase text-[14px]">{mainSlug}</p>
              <h1 className="capitalize">{chef.name}</h1>
            </>
          )}
        </div>

        <div>
          <Search placeholder="sök efter recept" />
        </div>
      </div>
      {chef?.recipes?.edges && (
        <RecipePagination data={chef.recipes.edges} />
      )}

      {chef?.recipes?.pageInfo?.hasNextPage === true ||
      chef?.recipes?.pageInfo?.hasPreviousPage === true ? (
        <PaginationController
          pageInfo={chef.recipes.pageInfo}
          uri={uri}
          search={search}
        />
      ) : null}
    </section>
  );
};

export default ChefRecipes;
