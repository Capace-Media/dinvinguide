import { getToplistPaths } from "@/lib/api/drinks/get-drinks";
import { getToplistBySlug } from "@/lib/api/drinks/get-toplist-by-slug";
import { notFound } from "next/navigation";
import { BannerSkeleton } from "@/components/shared/ads/banner";
import DlTop from "@/components/shared/ads/dl/top";
import DlMid from "@/components/shared/ads/dl/mid";
import DlBottom from "@/components/shared/ads/dl/bottom";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { NewsletterSkeleton } from "@/components/shared/newsletter/newsletter-skeleton";
import DLHero from "@/components/shared/heroes/dl-hero";
import TopListLinks from "@/components/shared/top-list-links";
import TopListItems from "@/components/features/topplistor/top-list/top-list-items";

const Newsletter = dynamic(
  () => import("@/components/shared/newsletter/newsletter"),
  { loading: () => <NewsletterSkeleton /> },
);

export const dynamicParams = true;

export async function generateStaticParams() {
  const data = await getToplistPaths();

  return data.map((topList) => ({ slug: topList.slug }));
}
const SingelTopList = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  const topList = await getToplistBySlug(params.slug);

  if (!topList) {
    notFound();
  }

  return (
    <>
      <DLHero hero={topList.toplist} />
      <Suspense fallback={<BannerSkeleton tone="bg-brand-dl" />}>
        <DlTop />
      </Suspense>
      <TopListItems topList={topList} />
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

export default SingelTopList;
