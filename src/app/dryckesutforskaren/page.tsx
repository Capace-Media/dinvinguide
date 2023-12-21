import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import WineExplorerTemplate from "@/components/Templates/WineExplorerTemplate";

import { getSEOByPage } from "@/lib/queries/getSEOByPage";
import { Metadata, ResolvingMetadata } from "next";
import { MetaInfo } from "../../../types/MetaInfoTypes";
async function getSEO() {
  const data = await getSEOByPage("/dryckesutforskaren");
  return data;
}

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getSEO();

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

const Drinks = ({ searchParams, params }: Props) => {
  return (
    <>
      <WineExplorerTemplate searchParams={searchParams} />
    </>
  );
};

export default Drinks;
