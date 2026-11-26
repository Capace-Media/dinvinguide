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

const WineSchools = async () => {
  const page = await getPage("/skolor");

  return (
    <>
      <PageHero page={page} links={guideLinks} guide="Alla Guider" />
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      <GuideListing
        guide="school"
        title="Skolor hos DinVinguide"
        uri="/vinskolan"
        idString="wineSchool"
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

export default WineSchools;
