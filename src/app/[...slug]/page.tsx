import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import PostTemplate from "@/components/Templates/PostTemplate";
import { getPage } from "@/lib/queries/getPage";
import { getSEOByPage } from "@/lib/queries/getSEOByPage";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { MetaInfo } from "../../../types/MetaInfoTypes";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string[] };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const uriString = params?.slug?.join("/");
  const post = await getSEOByPage(`/${uriString}`);

  const seo: any = post?.seo;

  const uri = `/${uriString}`;

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

const AllPages = async ({ params, searchParams }: Props) => {
  const uri = params?.slug?.join("/");

  const data = await getPage(`/${uri}`);

  if (!data) {
    return notFound();
  }
  return (
    <article className="layout bg-white">
      <PostTemplate post={data} />
    </article>
  );
};

export default AllPages;
