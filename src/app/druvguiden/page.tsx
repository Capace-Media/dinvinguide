import { getPage } from "@/lib/api/pages/get-pages";
import { Metadata, ResolvingMetadata } from "next";

import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import { Suspense } from "react";
import { MetaInfo } from "../../../types/MetaInfoTypes";
import Newsletter from "@/components/shared/newsletter/newsletter";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdTop from "@/shared/components/ads/default/top";
import AdMid from "@/shared/components/ads/default/mid";
import AdBottom from "@/shared/components/ads/default/bottom";
import PageHero from "@/components/shared/heroes/page-hero";
import { guideLinks } from "@/components/shared/heroes/guide-links";
import GrapePagination from "@/components/features/druvguiden/grape-pagination";
import type { RouteSearchParams } from "@/lib/utils/pagination-search-params";

type Props = {
  searchParams: Promise<RouteSearchParams>;
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("/druvguiden");

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

const Druvguiden = async (props: Props) => {
  const searchParams = await props.searchParams;
  const page = await getPage("/druvguiden");

  return (
    <>
      <PageHero page={page} links={guideLinks} />
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      <GrapePagination searchParams={searchParams} />
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

export default Druvguiden;
