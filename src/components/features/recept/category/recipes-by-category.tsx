import Search from "@/components/Blocks/Search";
import PaginationController from "@/components/Pagination/Controller";

import RecipePagination from "@/components/Pagination/Recipes";
import {
  getRecipeCategory,
  getRecipesByCategory,
} from "@/lib/api/recipes/get-recipes";
import {
  parsePaginationSearchParams,
  type RouteSearchParams,
} from "@/lib/utils/pagination-search-params";

const RECIPES_PER_PAGE = 16;

interface RecipesByCategoryProps {
  searchParams: RouteSearchParams;
  params: { slug: string };
  mainSlug?: string;
}

const RecipesByCategory = async ({
  searchParams,
  params,
  mainSlug,
}: RecipesByCategoryProps) => {
  const { after, before, first, last, search = "" } =
    parsePaginationSearchParams(searchParams, RECIPES_PER_PAGE);

  const idURI = mainSlug
    ? `/receptkategorier/${mainSlug}/${params.slug}`
    : `/receptkategorier/${params.slug}`;

  const title = (await getRecipeCategory(idURI))?.name;

  const uri = mainSlug
    ? `/recept/${mainSlug}/${params.slug}`
    : `/recept/${params.slug}`;

  const recipes = await getRecipesByCategory(idURI, {
    after,
    before,
    first,
    last,
    search,
  });

  if (!recipes?.edges?.length) {
    return (
      <div className="layout bg-white">
        <div>
          <p className="uppercase text-[14px]">{mainSlug}</p>
          <h1 className="capitalize">{title}</h1>
        </div>
        <p>Inga recept hittades...</p>
      </div>
    );
  }
  return (
    <section>
      <div className="layout bg-white flex justify-between items-center">
        <div>
          <p className="uppercase text-[14px]">{mainSlug}</p>
          <h1 className="capitalize">{title}</h1>
        </div>

        <div>
          <Search placeholder="sök efter recept" />
        </div>
      </div>
      <RecipePagination data={recipes.edges} />

      {recipes.pageInfo?.hasNextPage === true ||
      recipes.pageInfo?.hasPreviousPage === true ? (
        <PaginationController
          pageInfo={recipes.pageInfo}
          uri={uri}
          search={search}
        />
      ) : null}
    </section>
  );
};

export default RecipesByCategory;
