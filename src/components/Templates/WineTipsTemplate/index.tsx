import Newsletter from "@/components/shared/newsletter/newsletter";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import DlTop from "@/shared/components/ads/dl/top";
import DlMid from "@/shared/components/ads/dl/mid";
import { Suspense } from "react";
import Line from "@/components/graphic/Line";
import { getPage } from "@/lib/queries/getPage";
import DrinkTipsHero from "./DrinkTipsHero";
import ExploreWineTips from "./ExploreWineTips";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string };
};

const WineTipsTemplate = async ({ params, searchParams }: Props) => {
  const data = await getPage("/dryckestips");

  return (
    <>
      <DrinkTipsHero data={data} />
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

export default WineTipsTemplate;
