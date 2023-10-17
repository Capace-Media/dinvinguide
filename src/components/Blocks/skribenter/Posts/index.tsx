import { getPostsByAuthor } from "@/lib/queries/getPostsByAuthor";
import PostList from "./PostList";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined };
  postsCount: number;
};

type DataArgs = {
  after?: string;
  before?: string;
  authorName?: string;
  search?: string;
  first?: number;
  last?: number | null;
};

async function getData(args: DataArgs) {
  const { after, before, authorName, search = "", first, last } = args;
  const data = await getPostsByAuthor(
    after,
    before,
    authorName,
    search,
    first,
    last
  );

  return {
    posts: data.edges,
    startCursor: data.pageInfo.startCursor,
    endCursor: data.pageInfo.endCursor,
    hasNextPage: data.pageInfo.hasNextPage,
    hasPreviousPage: data.pageInfo.hasPreviousPage,
  };
}
const AuthorPosts = async ({ params, searchParams, postsCount }: Props) => {
  const postsPerPage: number =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 4 : 8;

  const startFirst: number = parseInt(
    searchParams?.first ? searchParams?.first : postsPerPage
  );
  const endLast: number = parseInt(searchParams?.last);
  const data = await getData({
    after: searchParams?.nextCursor,
    before: searchParams?.previousCursor,
    authorName: params?.slug,
    first: startFirst,
    last: endLast,
  });
  const { posts, startCursor, endCursor, hasNextPage, hasPreviousPage } = data;

  return (
    <div className="">
      <PostList
        posts={posts}
        params={params}
        startCursor={startCursor}
        endCursor={endCursor}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        postsCount={postsCount}
        postsPerPage={postsPerPage}
      />
    </div>
  );
};

export default AuthorPosts;
