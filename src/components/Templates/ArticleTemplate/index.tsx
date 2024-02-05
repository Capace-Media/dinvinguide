import PaginationController from "@/components/Pagination/Controller";
import Posts from "@/components/Pagination/Posts";
import { getAllArticles } from "@/lib/queries/getPostsByAuthor";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

const ArticleTemplate = async ({ searchParams }: Props) => {
  const postsPerPage: number =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 4 : 16;

  const startFirst: number = parseInt(
    searchParams?.first ? searchParams?.first : postsPerPage
  );
  const endLast: number = parseInt(searchParams?.last);
  const search = searchParams?.search ? searchParams?.search : "";

  const promise = await getAllArticles({
    after: searchParams?.after,
    before: searchParams?.before,
    first: startFirst,
    search: search,
    last: endLast,
  });
  return (
    <>
      <h2 className="layout bg-white">Utforska alla våra artiklar</h2>
      {promise?.edges && <Posts posts={promise?.edges} />}
      {promise?.pageInfo?.hasNextPage === true ||
      promise?.pageInfo?.hasPreviousPage === true ? (
        <PaginationController
          pageInfo={promise?.pageInfo}
          uri="/artiklar"
          id="articles"
        />
      ) : null}
    </>
  );
};

export default ArticleTemplate;
