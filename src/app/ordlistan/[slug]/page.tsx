import Newsletter from "@/app/components/Newsletter";
import Ads from "@/app/components/ads";
import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import ExploreGuides from "@/components/Templates/GuideTemplate/ExploreGuides";
import WordTemplate from "@/components/Templates/WordTemplate";
import { getWordSEO } from "@/lib/queries/SEO/getWordSEO";
import { Metadata, ResolvingMetadata } from "next";
import { ParamsProps } from "../../../../types/Global";
import { MetaInfo } from "../../../../types/MetaInfoTypes";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getWordSEO(`/glossary/${params.slug}`);

  const seo: any = page?.seo;

  const uri = `/ordlistan/${page?.slug}`;

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

const Word = ({ searchParams, params }: ParamsProps) => {
  return (
    <>
      <WordTemplate params={params} />

      <ExploreGuides />
      <Ads pageType="default" position="MID" />
      <Newsletter />
    </>
  );
};

export default Word;
