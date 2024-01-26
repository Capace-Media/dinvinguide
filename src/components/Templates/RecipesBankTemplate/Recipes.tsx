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

  const promise = await getRecipesBank({
    after: searchParams?.after,
    before: searchParams?.before,
    first: startFirst,
    last: endLast,
    search: "",
  });
  return (
    <section className="layout bg-white">
      <div>
        <h2 className="pb-10">Skolor hos DinVinguide</h2>

        {promise?.edges && <RecipePagination data={promise?.edges} />}

        {promise?.pageInfo?.hasNextPage === true ||
        promise?.pageInfo?.hasPreviousPage === true ? (
          <PaginationController
            pageInfo={promise?.pageInfo}
            uri="/recept/receptbanken"
          />
        ) : null}
      </div>
    </section>
  );
};

export default Recipes;
