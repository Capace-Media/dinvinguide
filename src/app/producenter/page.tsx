import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import PageHero from "@/components/Templates/HeroHeaders/PageHero";
import { getPage } from "@/lib/queries/getPage";
import { getSEOByPage } from "@/lib/queries/getSEOByPage";
import { Metadata, ResolvingMetadata } from "next";

import { MetaInfo } from "../../../types/MetaInfoTypes";
import Ads from "../components/ads";
import Newsletter from "../components/Newsletter";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { id: string };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getSEOByPage("/producenter");

  if (!page) {
    return {};
  }

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

export default async function ProducenterPage() {
  const data = await getPage("/producenter");
  return (
    <>
      <PageHero data={data} />
      <Ads pageType="default" position="TOP" />

      <Ads pageType="default" position="MID" />
      <Newsletter />
      <Ads pageType="default" position="BOTTOM" />
    </>
  );
}
