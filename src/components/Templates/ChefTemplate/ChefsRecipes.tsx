import Search from "@/components/Blocks/Search";
import PaginationController from "@/components/Pagination/Controller";

import RecipePagination from "@/components/Pagination/Recipes";
import { getChefRecipes } from "@/lib/queries/getRecipesBank";
import WP from "@/lib/wp";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string };
  mainSlug?: string;
};

const ChefsRecipes = async ({ searchParams, params, mainSlug }: Props) => {
  const postsPerPage: number =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 4 : 16;

  const startFirst: number = parseInt(
    searchParams?.first ? searchParams?.first : postsPerPage
  );
  const endLast: number = parseInt(searchParams?.last);
  const searchData: string = searchParams?.search || "";

  const idURI = `/gastskribent/${params.slug}`;

  const uri = mainSlug
    ? `/recept/${mainSlug}/${params.slug}`
    : `/recept/${params.slug}`;

  const promise = await getChefRecipes({
    after: searchParams?.after,
    before: searchParams?.before,
    first: startFirst,
    last: endLast,
    search: searchData,
    id: idURI,
  });
  return (
    <section className="">
      <div className="layout bg-white flex justify-between items-center">
        <div>
          <p className="uppercase text-[14px]">{mainSlug}</p>
          <h1 className="capitalize">{promise.name}</h1>
        </div>

        <div>
          <Search placeholder="sök efter recept" />
        </div>
      </div>
      {promise?.recipes?.edges && (
        <RecipePagination data={promise?.recipes?.edges} />
      )}

      {promise?.recipes?.pageInfo?.hasNextPage === true ||
      promise?.recipes?.pageInfo?.hasPreviousPage === true ? (
        <PaginationController
          pageInfo={promise?.recipes?.pageInfo}
          uri={uri}
          search={searchData}
        />
      ) : null}
    </section>
  );
};

export default ChefsRecipes;
