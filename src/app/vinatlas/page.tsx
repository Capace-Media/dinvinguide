import { Suspense } from "react";
import Newsletter from "@/components/shared/newsletter/newsletter";
import { BannerSkeleton } from "@/components/shared/ads/banner";
import AdTop from "@/components/shared/ads/default/top";
import AdMid from "@/components/shared/ads/default/mid";
import AdBottom from "@/components/shared/ads/default/bottom";
import PageHero from "@/components/shared/heroes/page-hero";
import { guideLinks } from "@/components/shared/heroes/guide-links";
import WineAtlasPagination from "@/components/features/vinatlas/wine-atlas-pagination";
import { getPage } from "@/lib/api/pages/get-pages";
import type { RouteSearchParams } from "@/lib/utils/pagination-search-params";
type Props = {
  searchParams: Promise<RouteSearchParams>;
};

const WineAtlases = async (props: Props) => {
  const searchParams = await props.searchParams;
  const page = await getPage("/vinguide/vinatlas");

  return (
    <>
      <PageHero page={page} links={guideLinks} />
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      <WineAtlasPagination searchParams={searchParams} />
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

export default WineAtlases;
