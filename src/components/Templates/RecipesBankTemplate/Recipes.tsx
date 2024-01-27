import Search from "@/components/Blocks/Search";
import PaginationController from "@/components/Pagination/Controller";

import RecipePagination from "@/components/Pagination/Recipes";
import { getRecipesBank } from "@/lib/queries/getRecipesBank";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

const Recipes = async ({ searchParams }: Props) => {
  const postsPerPage: number =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 4 : 16;

  const startFirst: number = parseInt(
    searchParams?.first ? searchParams?.first : postsPerPage
  );
  const endLast: number = parseInt(searchParams?.last);
  const searchData: string = searchParams?.search || "";

  const promise = await getRecipesBank({
    after: searchParams?.after,
    before: searchParams?.before,
    first: startFirst,
    last: endLast,
    search: searchData,
  });
  return (
    <section className="">
      <div className="layout bg-white flex justify-between items-center">
        <div>
          <p className="uppercase text-[14px]">receptbanken</p>
          <h1>Utforska alla recept</h1>
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
          uri="/recept/receptbanken"
          search={searchData}
        />
      ) : null}
    </section>
  );
};

export default Recipes;
