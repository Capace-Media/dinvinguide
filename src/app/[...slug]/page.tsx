import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import PostTemplate from "@/components/shared/post/post-template";
import { getPage } from "@/lib/api/pages/get-pages";
import { isWordPressInternalPath } from "@/lib/utils/wp-paths";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { MetaInfo } from "../../../types/MetaInfoTypes";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | any | undefined | null }>;
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  if (isWordPressInternalPath(params?.slug ?? [])) {
    notFound();
  }
  const uriString = params?.slug?.join("/");
  const post = await getPage(`/${uriString}`);

  const seo: any = post?.seo;

  const uri = `/${uriString}`;

  const authorNode = post?.author?.node;
  const author = authorNode?.slug
    ? {
        title: authorNode.name,
        slug: `${process.env.NEXT_PUBLIC_SITE_URL}/skribenter/${authorNode.slug}`,
      }
    : null;

  const previousMeta: MetaInfo = (await parent) as unknown as MetaInfo;

  const data = await dynamicSeo({ seo, previousMeta, author, uri });

  return data;
}

const AllPages = async (props: Props) => {
  const params = await props.params;
  const uri = params?.slug?.join("/");

  if (uri.startsWith("topplistor")) {
    return notFound(); // Return 404 if the route starts with 'topplistor'
  }

  if (isWordPressInternalPath(params?.slug ?? [])) {
    return notFound();
  }

  const data = await getPage(`/${uri}`);

  if (!data) {
    return notFound();
  }
  return (
    <div className="layout bg-white">
      <PostTemplate post={data} />
    </div>
  );
};

export default AllPages;
