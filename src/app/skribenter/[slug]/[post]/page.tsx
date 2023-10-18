import WP from "@/lib/wp";
type Props = {
  params: { post: string };
  searchParams: { [key: string]: string | string[] | any | undefined };
};
export async function generateStaticParams() {
  const posts = await WP(`
    query getPosts {
        posts {
          nodes {
            slug
            uri
            title
          }
        }
      }
    `);

  return (
    posts?.data?.posts?.nodes &&
    posts.data.posts.nodes.map((post: any) => ({
      post: post.slug,
    }))
  );
}

const ArticlePage = ({ params, searchParams }: Props) => {
  return (
    <div className="">
      <h2 className="">Hello ArticlePage</h2>
    </div>
  );
};

export default ArticlePage;
