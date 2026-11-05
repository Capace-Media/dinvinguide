import { dynamicSeo } from "@/lib/utils/seo/dynamic-seo";
import { getPage } from "@/lib/api/pages/get-pages";
import type { Metadata, ResolvingMetadata } from "next";
import type { MetaInfo } from "../../../types/MetaInfoTypes";
import Newsletter from "@/components/shared/newsletter/newsletter";
import { BannerSkeleton } from "@/components/shared/ads/banner";
import DlTop from "@/components/shared/ads/dl/top";
import DlMid from "@/components/shared/ads/dl/mid";
import { Suspense } from "react";
import DrinkTipsHero from "@/components/features/dryckestips/drink-tips-hero";
import ExploreWineTips from "@/components/features/dryckestips/explore-wine-tips";
import type { RouteSearchParams } from "@/lib/utils/pagination-search-params";

type Props = {
  searchParams: Promise<RouteSearchParams>;
};

export async function generateMetadata(
  _props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const page = await getPage("/dryckestips");

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

const DrinkTips = async (props: Props) => {
  const searchParams = await props.searchParams;
  const page = await getPage("/dryckestips");

  return (
    <>
      <DrinkTipsHero page={page} />
      <Suspense fallback={<BannerSkeleton tone="bg-brand-dl" />}>
        <DlTop />
      </Suspense>
      <ExploreWineTips searchParams={searchParams} />
      <Suspense fallback={<BannerSkeleton tone="bg-brand-dl" />}>
        <DlMid />
      </Suspense>
      <Newsletter />
    </>
  );
};

export default DrinkTips;
