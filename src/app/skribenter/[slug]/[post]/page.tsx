import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import PostTemplate from "@/components/Templates/PostTemplate";
import { getPost, getPreviewPost } from "@/lib/queries/getPost";
import generateArticleSchema from "@/lib/utils/json-LD-Schemas/generateArticleSchema";

import WP from "@/lib/wp";
import { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";
import { MetaInfo } from "../../../../../types/MetaInfoTypes";
type Props = {
  params: Promise<{ slug: string; post: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | any | undefined }>;
};
export async function generateStaticParams() {
  const posts = await WP(`
    query getPosts {
        posts {
          nodes {
            slug
            author {
              node {
                slug
              }
            }
          }
        }
      }
    `);

  return (
    posts?.data?.posts?.nodes &&
    posts.data.posts.nodes.map((post: any) => ({
      slug: post?.author?.node?.slug,
      post: post.slug,
    }))
  );
}

async function getPostData(
  params: { post: string; slug: string },
  searchParams?: { [key: string]: string | string[] | any | undefined }
) {
  const { isEnabled } = await draftMode();
  const { post, slug } = params;

  const uri = `/${slug}/${post}`;

  if (!isEnabled) {
    const data = await getPost(uri);

    const postProps = {
      ...data,
      type: "published",
      author: data?.author?.node,
    };

    return postProps;
  }

  if (isEnabled) {
    const pid = parseInt(post);
    const preview = await getPreviewPost(pid);

    const postProps = {
      ...preview,
      type: "preview",
      author: preview?.author?.node,
    };

    return postProps;
  }
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
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

const Articlepost = async (props: Props) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const post = await getPostData(params, searchParams);

  const jsonLd = generateArticleSchema({
    title: post?.title,
    description: post?.acf_posts?.ingress,
    url: process.env.NEXT_PUBLIC_SITE_URL + post?.uri,
    images: [post?.featuredImage?.node?.mediaItemUrl],
    datePublished: post?.modifiedGmt,
    dateModified: post?.modifiedGmt,
    authorName: post?.author?.name,
    publisherName: "DinVinguide.se",
    publisherLogo:
      "https://media.dinvinguide.se/wp-content/uploads/2023/12/DinVinguidesLogo.png",
    articleBody: post?.acf_posts?.ingress,
  });

  return (
    <article className="layout bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PostTemplate post={post} />
    </article>
  );
};

export default Articlepost;
