import { dynamicSeo } from "@/lib/utils/seo/dynamic-seo";
import { getPage } from "@/lib/api/pages/get-pages";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import type { MetaInfo } from "../../../types/MetaInfoTypes";
import Newsletter from "@/components/shared/newsletter/newsletter";
import { BannerSkeleton } from "@/components/shared/ads/banner";
import DlTop from "@/components/shared/ads/dl/top";
import DlMid from "@/components/shared/ads/dl/mid";
import DlBottom from "@/components/shared/ads/dl/bottom";
import { Suspense } from "react";
import DLHero from "@/components/shared/heroes/dl-hero";
import TopListLinks from "@/components/shared/top-list-links";
import TopListCategories from "@/components/features/dryckeslistan/top-list-categories";

export async function generateMetadata(
  _props: unknown,
  parent: ResolvingMetadata,
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

const TopList = async () => {
  const page = await getPage("/topplistor");
  if (!page) notFound();

  return (
    <>
      <DLHero hero={page} />
      <Suspense fallback={<BannerSkeleton tone="bg-brand-dl" />}>
        <DlTop />
      </Suspense>
      <TopListCategories />
      <Suspense fallback={<BannerSkeleton tone="bg-brand-dl" />}>
        <DlMid />
      </Suspense>
      <TopListLinks />
      <Suspense fallback={<BannerSkeleton tone="bg-brand-dl" />}>
        <DlBottom />
      </Suspense>
      <Newsletter />
    </>
  );
};

export default TopList;
