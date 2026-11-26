import { Suspense } from "react";
import Newsletter from "@/components/shared/newsletter/newsletter";
import { BannerSkeleton } from "@/components/shared/ads/banner";
import AdTop from "@/components/shared/ads/default/top";
import AdMid from "@/components/shared/ads/default/mid";
import AdBottom from "@/components/shared/ads/default/bottom";
import PageHero from "@/components/shared/heroes/page-hero";
import { guideLinks } from "@/components/shared/heroes/guide-links";
import GuideListing from "@/components/features/guides/guide-listing";
import { getPage } from "@/lib/api/pages/get-pages";
const WineAtlases = async () => {
  const page = await getPage("/vinguide/vinatlas");

  return (
    <>
      <PageHero page={page} links={guideLinks} />
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      <GuideListing
        guide="atlas"
        title="Skolor hos DinVinguide"
        uri="/vinatlas"
        idString="wineAtlas"
      />
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
