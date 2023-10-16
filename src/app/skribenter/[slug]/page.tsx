import PaginationControls from "@/components/Pagination/PaginationControls";
import { getAuthors } from "@/lib/queries/getAuthors";
import { getPostsByAuthor } from "@/lib/queries/getPostsByAuthor";

export async function generateStaticParams() {
  const authors = await getAuthors();

  return authors.skribenter.map((author: any) => ({
    slug: author.slug,
  }));
}
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

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined };
};
const Author = async ({ params, searchParams }: Props) => {
  console.log("searchParams =====>", parseInt(searchParams?.first));

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10";

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page); // 5, 10, 15 ...

  const startFrist: number = parseInt(searchParams?.first);
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

  console.log("data =====>", data);
  return (
    <div className="layout">
      {posts.map((post: any) => (
        <div key={post.node.id}>
          <h2>{post.node.title}</h2>
        </div>
      ))}
      <div>
        <PaginationControls
          params={params}
          startCursor={startCursor}
          endCursor={endCursor}
          first={10}
          last={10}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
        />
      </div>
    </div>
  );
};

export default Author;
