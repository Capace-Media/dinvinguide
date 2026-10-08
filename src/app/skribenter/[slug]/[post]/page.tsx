import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import PostTemplate from "@/components/shared/post/post-template";
import { getPost, getPostPaths, getPreviewPost } from "@/lib/api/posts/get-posts";
import generateArticleSchema from "@/lib/utils/json-LD-Schemas/generateArticleSchema";

import { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";
import { MetaInfo } from "../../../../../types/MetaInfoTypes";
type Props = {
  params: Promise<{ slug: string; post: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | any | undefined }>;
};
export async function generateStaticParams() {
  const posts = await getPostPaths();
  return posts.map((post) => ({
    slug: post.author?.node?.slug,
    post: post.slug,
  }));
}

async function getPostData(params: { post: string; slug: string }) {
  const { isEnabled } = await draftMode();
  const { post, slug } = params;

  if (isEnabled) {
    const preview = await getPreviewPost(parseInt(post));
    return preview
      ? { ...preview, type: "preview", author: preview.author?.node }
      : null;
  }

  const data = await getPost(`/${slug}/${post}`);
  return data ? { ...data, type: "published", author: data.author?.node } : null;
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const post = await getPostData(params);

  const seo = post && "seo" in post ? post.seo : null;

  const uri = `/skribenter/${post?.uri}`;

  const author = post
    ? {
        title: post?.author?.name,
        slug: `${process.env.NEXT_PUBLIC_SITE_URL}/skribenter/${post?.author?.username}`,
      }
    : null;

  const previousMeta: MetaInfo = (await parent) as unknown as MetaInfo;

  const data = await dynamicSeo({ seo, previousMeta, author, uri });

  return data;
}

const Articlepost = async (props: Props) => {
  const params = await props.params;
  const post = await getPostData(params);

  const jsonLd = generateArticleSchema({
    title: post?.title,
    description: post?.acf_posts?.ingress,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${post?.uri}`,
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
