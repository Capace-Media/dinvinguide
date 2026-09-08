import Newsletter from "@/app/_components/Newsletter";
import { BannerSkeleton } from "@/app/_components/ads/banner";
import AdTop from "@/app/_components/ads/default/top";
import AdMid from "@/app/_components/ads/default/mid";
import AdBottom from "@/app/_components/ads/default/bottom";
import { Suspense } from "react";
import { getPage } from "@/lib/queries/getPage";
import { notFound } from "next/navigation";
import PageHero from "../HeroHeaders/PageHero";
import ExploreGuides from "./ExploreGuides";
import links from "./guideLinks.json";

interface GuideTemplateProps {}

async function getGuidePage() {
  const data = await getPage("/guide");
  return data;
}

const GuideTemplate = async ({}: GuideTemplateProps) => {
  const data = await getGuidePage();

  if (!data) return notFound();
  return (
    <>
      <PageHero data={data} links={links} />
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

export default GuideTemplate;
