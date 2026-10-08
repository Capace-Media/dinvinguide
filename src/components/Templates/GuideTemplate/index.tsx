import Newsletter from "@/components/shared/newsletter/newsletter";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdTop from "@/shared/components/ads/default/top";
import AdMid from "@/shared/components/ads/default/mid";
import AdBottom from "@/shared/components/ads/default/bottom";
import { Suspense } from "react";
import { getPage } from "@/lib/api/pages/get-pages";
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
