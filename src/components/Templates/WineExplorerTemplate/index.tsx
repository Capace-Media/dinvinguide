import { BannerSkeleton } from "@/shared/components/ads/banner";
import DlTop from "@/shared/components/ads/dl/top";
import DlMid from "@/shared/components/ads/dl/mid";
import DlBottom from "@/shared/components/ads/dl/bottom";
import { Suspense } from "react";
import DLHero from "../HeroHeaders/DLHero";
import TopListLinks from "../TopListsTemplate/TopListLinks";

import { getPage } from "@/lib/queries/getPage";
import PageIntro from "../Module/PageIntro";
import WineExplorer from "./WineExplorer";

async function getDrinksPage() {
  const data = await getPage("/dryckesutforskaren");
  return data;
}

const WineExplorerTemplate = async ({
  searchParams,
}: {
  [key: string]: string | string[] | any | undefined;
}) => {
  const data = await getDrinksPage();

  return (
    <>
      <DLHero hero={data} id="dryckesutforskaren" />
      <PageIntro data={data?.page_content?.intro} />
      <Suspense fallback={<BannerSkeleton tone="bg-brand-dl" />}>
        <DlTop />
      </Suspense>
      <WineExplorer searchParams={searchParams} />
      <Suspense fallback={<BannerSkeleton tone="bg-brand-dl" />}>
        <DlMid />
      </Suspense>
      <TopListLinks />
      <Suspense fallback={<BannerSkeleton tone="bg-brand-dl" />}>
        <DlBottom />
      </Suspense>
    </>
  );
};

export default WineExplorerTemplate;
