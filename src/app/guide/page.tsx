import GuideTemplate from "@/components/Templates/GuideTemplate";
import { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";
import Loading from "../loading";
import { getPage } from "@/lib/api/pages/get-pages";
import PageHero from "@/components/Templates/HeroHeaders/PageHero";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdTop from "@/shared/components/ads/default/top";
import ExploreGuides from "@/components/Templates/GuideTemplate/ExploreGuides";
import AdMid from "@/shared/components/ads/default/mid";
import Newsletter from "@/components/shared/newsletter/newsletter";
import AdBottom from "@/shared/components/ads/default/bottom";
import { notFound } from "next/navigation";
import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import { MetaInfo } from "../../../types/MetaInfoTypes";

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

async function getGuidePage() {
  const data = await getPage("/guide");
  return data;
}

export async function generateMetadata(
  _props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getGuidePage();
  if (!page) return {};

  const seo: any = page.seo;
  return dynamicSeo({
    seo,
    previousMeta: (await parent) as unknown as MetaInfo,
    uri: "/guide",
    img: {
      url: seo?.opengraphImage?.mediaItemUrl ?? "",
      alt: seo?.opengraphImage?.altText ?? "",
    },
  });
}


const GuidePage = async (props: Props) => {
  const data = await getGuidePage();

  if (!data) return notFound();

  return (
    <>
      <PageHero data={data} />
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      <ExploreGuides />

      <Suspense fallback={<BannerSkeleton />}>
        <AdMid />
      </Suspense>
      <Newsletter />
      <Suspense fallback={<BannerSkeleton />}>
        <AdBottom />
      </Suspense>
    </>
  );
};

export default GuidePage;
