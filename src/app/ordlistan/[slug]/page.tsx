import Newsletter from "@/app/_components/Newsletter";

import { BannerSkeleton } from "@/app/_components/ads/banner";
import AdMid from "@/app/_components/ads/default/mid";
import { Suspense } from "react";
import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import WordTemplate from "@/components/Templates/WordTemplate";
import { getWordSEO } from "@/lib/queries/SEO/getWordSEO";
import { Metadata, ResolvingMetadata } from "next";

import ExploreGuides from "@/components/Templates/GuideTemplate/ExploreGuides";
import { MetaInfo } from "../../../../types/MetaInfoTypes";

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | any | undefined | null;
  }>;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
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

const WordDetailPage = async (props: Props) => {
  const params = await props.params;
  //const searchParams = await props.searchParams;

  return (
    <>
      <WordTemplate params={params} />

      <ExploreGuides />
      <Suspense fallback={<BannerSkeleton />}>
        <AdMid />
      </Suspense>
      <Newsletter />
    </>
  );
};

export default WordDetailPage;
