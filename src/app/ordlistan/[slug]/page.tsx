import Newsletter from "@/components/shared/newsletter/newsletter";

import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdMid from "@/shared/components/ads/default/mid";
import { Suspense } from "react";
import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import { getWord } from "@/lib/api/words/get-words";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";

import ExploreGuides from "@/components/shared/explore-guides";
import { MetaInfo } from "../../../../types/MetaInfoTypes";
import WordArticle from "@/components/features/ordlistan/word/word-article";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const page = await getWord(params.slug);

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
  const word = await getWord(params.slug);

  if (!word) {
    notFound();
  }

  return (
    <>
      <WordArticle word={word} />

      <ExploreGuides />
      <Suspense fallback={<BannerSkeleton />}>
        <AdMid />
      </Suspense>
      <Newsletter />
    </>
  );
};

export default WordDetailPage;
