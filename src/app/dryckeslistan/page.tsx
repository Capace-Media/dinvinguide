import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import TopListsTemplate from "@/components/Templates/TopListsTemplate";
import { getPage } from "@/lib/api/pages/get-pages";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { MetaInfo } from "../../../types/MetaInfoTypes";

interface TopListProps {}

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | any | undefined | null;
  }>;
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("/topplistor");

  const seo: any = page?.seo;

  const uri = `/dryckeslistan`;

  const img = {
    url: seo?.opengraphImage?.mediaItemUrl
      ? seo.opengraphImage.mediaItemUrl
      : "",
    alt: seo?.opengraphImage?.altText ? seo.opengraphImage.altText : "",
  };

  const previousMeta: MetaInfo = (await parent) as unknown as MetaInfo;

  const data = await dynamicSeo({ seo, previousMeta, uri, img });

  return data;
}

const TopList = async ({}: TopListProps) => {
  const page = await getPage("/topplistor");
  if (!page) notFound();

  const { seo, ...rest } = page;

  return (
    <>
      <TopListsTemplate hero={rest} />
    </>
  );
};

export default TopList;
