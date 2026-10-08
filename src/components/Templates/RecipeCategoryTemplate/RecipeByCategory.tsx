import Search from "@/components/Blocks/Search";
import PaginationController from "@/components/Pagination/Controller";

import RecipePagination from "@/components/Pagination/Recipes";
import {
  getRecipesBank,
  getRecipesByCategory,
} from "@/lib/queries/getRecipesBank";
import { getRecipeCategory } from "@/lib/queries/get-recipe-category";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string };
  mainSlug?: string;
};

const RecipeByCategory = async ({ searchParams, params, mainSlug }: Props) => {
  const postsPerPage: number =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 4 : 16;

  const startFirst: number = parseInt(
    searchParams?.first ? searchParams?.first : postsPerPage
  );
  const endLast: number = parseInt(searchParams?.last);
  const searchData: string = searchParams?.search || "";

  const idURI = mainSlug
    ? `/receptkategorier/${mainSlug}/${params.slug}`
    : `/receptkategorier/${params.slug}`;

  const title = (await getRecipeCategory(idURI))?.name;

  const uri = mainSlug
    ? `/recept/${mainSlug}/${params.slug}`
    : `/recept/${params.slug}`;

  const promise = await getRecipesByCategory({
    after: searchParams?.after,
    before: searchParams?.before,
    first: startFirst,
    last: endLast,
    search: searchData,
    id: idURI,
  });

  if (promise?.edges?.length < 1) {
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
    <section className="">
      <div className="layout bg-white flex justify-between items-center">
        <div>
          <p className="uppercase text-[14px]">{mainSlug}</p>
          <h1 className="capitalize">{title}</h1>
        </div>

        <div>
          <Search placeholder="sök efter recept" />
        </div>
      </div>
      {promise?.edges && <RecipePagination data={promise?.edges} />}

      {promise?.pageInfo?.hasNextPage === true ||
      promise?.pageInfo?.hasPreviousPage === true ? (
        <PaginationController
          pageInfo={promise?.pageInfo}
          uri={uri}
          search={searchData}
        />
      ) : null}
    </section>
  );
};

export default RecipeByCategory;
