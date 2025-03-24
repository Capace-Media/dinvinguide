import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import ArticleTemplate from "@/components/Templates/ArticleTemplate";
import Line from "@/components/graphic/Line";
import { getSEOByPage } from "@/lib/queries/getSEOByPage";
import { Metadata, ResolvingMetadata } from "next";
import { revalidateTag } from "next/cache";
import { MetaInfo } from "../../../types/MetaInfoTypes";
import Newsletter from "../components/Newsletter";
import Ads from "../components/ads";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | any | undefined | null }>;
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getSEOByPage("/artiklar");

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

const Articles = async (props: Props) => {
  const searchParams = await props.searchParams;
  return (
    <>
      <div className="layout bg-white pt-20">
        <Line />
      </div>
      <Ads pageType="default" position="TOP" />
      <ArticleTemplate searchParams={searchParams} />
      <Ads pageType="default" position="MID" />
      <Newsletter />
    </>
  );
};

export default Articles;
