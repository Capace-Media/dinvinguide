import PaginationControls from "@/components/Pagination/PaginationControls";
import { getPostsByAuthor } from "@/lib/queries/getPostsByAuthor";
import AuthorPost from "./post";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined };
  postsCount: number;
};

async function getData(
  after?: string,
  before?: string,
  authorName?: string,
  search?: string,
  start?: number | null,
  end?: number | null
) {
  const data = await getPostsByAuthor(
    after,
    before,
    authorName,
    (search = ""),
    start,
    end
  );

  const propsData = {
    posts: data.edges,
    startCursor: data.pageInfo.startCursor,
    endCursor: data.pageInfo.endCursor,
    hasNextPage: data.pageInfo.hasNextPage,
    hasPreviousPage: data.pageInfo.hasPreviousPage,
  };
  return propsData;
}

const AuthorPosts = async ({ params, searchParams, postsCount }: Props) => {
  const page = searchParams["page"] ?? "1";

  const startFrist: number = parseInt(
    searchParams?.first ? searchParams?.first : 8
  );
  const endLast: number = parseInt(searchParams?.last);
  const data = await getData(
    searchParams?.nextCursor,
    searchParams?.previousCursor,
    params?.slug,
    "",
    startFrist,
    endLast
  );
  const { posts, startCursor, endCursor, hasNextPage, hasPreviousPage }: any =
    data;

  return (
    <div className="">
      <ul className="lg:grid lg:grid-cols-4 lg:gap-5">
        {posts.map((post: any) => (
          <li key={post.node.id}>
            <AuthorPost post={post?.node} />
          </li>
        ))}
      </ul>
      <div>
        <PaginationControls
          params={params}
          startCursor={startCursor}
          endCursor={endCursor}
          first={8}
          last={8}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          postsCount={postsCount}
        />
      </div>
    </div>
  );
};

export default AuthorPosts;
