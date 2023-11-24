import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import PostTemplate from "@/components/Templates/PostTemplate";
import { getPost } from "@/lib/queries/getPost";
import WP from "@/lib/wp";
import { Metadata, ResolvingMetadata } from "next";
import { MetaInfo } from "../../../../../types/MetaInfoTypes";
type Props = {
  params: { slug: string; post: string };
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

async function getPostData(params: { post: string; slug: string }) {
  const { post, slug } = params;

  const uri = `/${slug}/${post}/`;
  const data = await getPost(uri);

  const postProps = {
    ...data,
    author: data?.author?.node,
  };

  return postProps;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPostData(params);

  const seo: any = post?.seo;

  const uri = `/skribenter/${post?.uri}`;

  const img = {
    url: post?.acf_user?.bild?.mediaItemUrl
      ? post.acf_user.bild.mediaItemUrl
      : "",
    alt: post?.acf_user?.bild?.altText ? post.acf_user.bild.altText : "",
  };
  const author = post
    ? {
        title: post?.author?.name,
        slug: `${process.env.NEXT_PUBLIC_SITE_URL}/skribenter/${post?.author?.username}`,
      }
    : null;

  const previousMeta: MetaInfo = (await parent) as unknown as MetaInfo;

  const data = await dynamicSeo({ seo, previousMeta, author, uri, img });

  return data;
}

const Articlepost = async ({ params, searchParams }: Props) => {
  const post = await getPostData(params);

  console.log("post =====>", post);

  return (
    <article className="layout">
      <PostTemplate post={post} />
    </article>
  );
};

export default Articlepost;
