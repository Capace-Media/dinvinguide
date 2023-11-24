import Await from "@/app/skribenter/await";
import Skeleton from "@/app/skribenter/skeleton";
import { getPostsByAuthor } from "@/lib/queries/getPostsByAuthor";
import { Suspense } from "react";
import { v4 as uuid } from "uuid";
import PostList from "./PostList";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined };
  postsCount: number;
  search?: string;
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
const AuthorPosts = async ({
  params,
  searchParams,
  postsCount,
  search,
}: Props) => {
  const postsPerPage: number =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 4 : 8;

  const startFirst: number = parseInt(
    searchParams?.first ? searchParams?.first : postsPerPage
  );
  const endLast: number = parseInt(searchParams?.last);
  const promise = getData({
    after: searchParams?.nextCursor,
    before: searchParams?.previousCursor,
    authorName: params?.slug,
    search: search,
    first: startFirst,
    last: endLast,
  });

  // const { posts, startCursor, endCursor, hasNextPage, hasPreviousPage } = data;

  return (
    <div className="" key={uuid()}>
      <Suspense fallback={<Skeleton />}>
        <Await promise={promise}>
          {({
            posts,
            startCursor,
            endCursor,
            hasNextPage,
            hasPreviousPage,
          }: any) => (
            <PostList
              posts={posts}
              params={params}
              startCursor={startCursor}
              endCursor={endCursor}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
              postsCount={postsCount}
              postsPerPage={postsPerPage}
              search={search}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default AuthorPosts;
