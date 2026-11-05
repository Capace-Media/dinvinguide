import Search from "@/components/shared/search-bar";
import PaginationController from "@/components/shared/pagination/pagination-controller";

import RecipePagination from "@/components/features/recept/recipe-list/recipe-pagination";
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
  const {
    after,
    before,
    first,
    last,
    search = "",
  } = parsePaginationSearchParams(searchParams, RECIPES_PER_PAGE);

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
      <div className="layout flex items-center justify-between bg-white">
        <div>
          {chef?.name && (
            <>
              <p className="text-[14px] uppercase">{mainSlug}</p>
              <h1 className="capitalize">{chef.name}</h1>
            </>
          )}
        </div>

        <div>
          <Search placeholder="sök efter recept" />
        </div>
      </div>
      {chef?.recipes?.edges && <RecipePagination data={chef.recipes.edges} />}

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
