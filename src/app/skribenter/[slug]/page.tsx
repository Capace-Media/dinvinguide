import AuthorPosts from "@/components/Blocks/skribenter/Posts";
import PaginationControls from "@/components/Pagination/PaginationControls";
import { getAuthor } from "@/lib/queries/getAuthor";
import { getAuthors } from "@/lib/queries/getAuthors";
import { getPostsByAuthor } from "@/lib/queries/getPostsByAuthor";

export async function generateStaticParams() {
  const authors = await getAuthors();

  return authors.skribenter.map((author: any) => ({
    slug: author.slug,
  }));
}

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined };
};
async function getAuthorData(params: { slug: string }) {
  const data = await getAuthor(params.slug);

  const authorProps = {
    ...data,
    posts: data?.posts?.pageInfo?.offsetPagination?.total,
  };

  return authorProps;
}

const Author = async ({ params, searchParams }: Props) => {
  const data = await getAuthorData(params);

  const { posts } = data;

  return (
    <div className="layout">
      <AuthorPosts
        params={params}
        searchParams={searchParams}
        postsCount={posts}
      />
    </div>
  );
};

export default Author;
