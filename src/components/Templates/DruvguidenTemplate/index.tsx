import Newsletter from "@/components/shared/newsletter/newsletter";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdTop from "@/shared/components/ads/default/top";
import AdMid from "@/shared/components/ads/default/mid";
import AdBottom from "@/shared/components/ads/default/bottom";
import { Suspense } from "react";
import { getPage } from "@/lib/queries/getPage";
import links from "../GuideTemplate/guideLinks.json";
import PageHero from "../HeroHeaders/PageHero";
import GuidePagination from "./GuidePagination.tsx";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

async function getSingleGuidePage({ params }: { params: { slug: string } }) {
  const data = await getPage(`/${params.slug}`);
  return data;
}

const DruvguidenTemplate = async ({ params, searchParams }: Props) => {
  const data = await getSingleGuidePage({ params });
  return (
    <>
      <PageHero data={data} links={links} />
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      <GuidePagination searchParams={searchParams} params={params} />
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

export default DruvguidenTemplate;
