import { BannerSkeleton } from "@/shared/components/ads/banner";
import DlBottom from "@/shared/components/ads/dl/bottom";
import DlMid from "@/shared/components/ads/dl/mid";
import DlTop from "@/shared/components/ads/dl/top";
import Newsletter from "@/components/shared/newsletter/newsletter";
import { Suspense } from "react";
import DLHero from "../HeroHeaders/DLHero";
import TopListCategories from "./TopListCategories";
import TopListLinks from "./TopListLinks";
interface TopListsTemplateProps {
  hero: any;
}

const TopListsTemplate = ({ hero }: TopListsTemplateProps) => {
  return (
    <>
      <DLHero hero={hero} />

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

export default TopListsTemplate;
