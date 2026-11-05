import type { Metadata, ResolvingMetadata } from "next";
import { getPage } from "@/lib/api/pages/get-pages";
import { notFound } from "next/navigation";
import { dynamicSeo } from "@/lib/utils/seo/dynamic-seo";
import type { MetaInfo } from "../../../types/MetaInfoTypes";
import Newsletter from "@/components/shared/newsletter/newsletter";
import { BannerSkeleton } from "@/components/shared/ads/banner";
import AdTop from "@/components/shared/ads/default/top";
import AdMid from "@/components/shared/ads/default/mid";
import AdBottom from "@/components/shared/ads/default/bottom";
import { Suspense } from "react";
import PageHero from "@/components/shared/heroes/page-hero";
import ExploreGuides from "@/components/shared/explore-guides";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getGuidePage() {
  const data = await getPage("/guide");
  return data;
}

export async function generateMetadata(
  _props: Props,
  parent: ResolvingMetadata,
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

const GuidePage = async () => {
  const page = await getGuidePage();

  if (!page) notFound();

  return (
    <>
      <PageHero page={page} />
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
