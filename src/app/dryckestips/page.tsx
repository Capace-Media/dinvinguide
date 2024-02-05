import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import WineTipsTemplate from "@/components/Templates/WineTipsTemplate";
import { getSEOByPage } from "@/lib/queries/getSEOByPage";
import { Metadata, ResolvingMetadata } from "next";
import { MetaInfo } from "../../../types/MetaInfoTypes";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getSEOByPage("/dryckestips");

  const seo: any = page?.seo;

  const uri = `/${page?.slug}`;

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

const DrinkTips = ({ searchParams, params }: Props) => {
  return (
    <>
      <WineTipsTemplate searchParams={searchParams} params={params} />
    </>
  );
};

export default DrinkTips;
