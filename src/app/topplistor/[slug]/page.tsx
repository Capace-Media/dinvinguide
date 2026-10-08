import { getToplistPaths } from "@/lib/api/drinks/get-drinks";
import { getToplistBySlug } from "@/lib/api/drinks/get-toplist-by-slug";
import { notFound } from "next/navigation";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import DlTop from "@/shared/components/ads/dl/top";
import DlMid from "@/shared/components/ads/dl/mid";
import DlBottom from "@/shared/components/ads/dl/bottom";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { NewsletterSkeleton } from "@/components/shared/newsletter/newsletter-skeleton";
import DLHero from "@/components/shared/heroes/dl-hero";
import TopListLinks from "@/components/shared/top-list-links";
import TopListItems from "@/components/features/topplistor/top-list/top-list-items";

const Newsletter = dynamic(
  () => import("@/components/shared/newsletter/newsletter"),
  { loading: () => <NewsletterSkeleton /> }
);

export const dynamicParams = true;

export async function generateStaticParams() {
  const data = await getToplistPaths();

  const paths: any[] = [];

  data &&
    data.map((topList: any) => {
      paths.push({ slug: topList.slug });
    });

  return paths;
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
