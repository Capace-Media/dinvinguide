import FrontHero from "@/components/Blocks/Hero-Header/FrontHero";
import { getFrontPage } from "@/lib/queries/getFrontPage";

import { notFound } from "next/navigation";

import ExclusiveDrinks from "./_components/ExclusiveDrinks";
import Newsletter from "./_components/Newsletter";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdBottom from "@/shared/components/ads/default/bottom";
import AdMid from "@/shared/components/ads/default/mid";
import AdTop from "@/shared/components/ads/default/top";
import ExplorePages from "./_components/ExplorePages";
import ExploreRecipes from "./_components/ExploreRecipes";
import LatestArticles from "./_components/latest-articles";
import { Metadata } from "next";
import { Suspense } from "react";

import { Spinner } from "@/components/ui/spinner";

async function getData() {
  try {
    const res = await getFrontPage();

    // Check if we got an error message back
    if (res?.message) {
      console.error("Front page data error:", res.message);
      return null;
    }

    return res;
  } catch (error) {
    console.error("Failed to fetch front page data:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();
  if (!data?.page) {
    return {
      title: "DinVinguide - Upptäck vin och mat",
      description: "Din guide till vin, mat och dryckestips",
    };
  }
  return {
    title: data.page.seo?.title || "DinVinguide - Upptäck vin och mat",
    description:
      data.page.seo?.metaDesc || "Din guide till vin, mat och dryckestips",
    openGraph: data.page.featuredImage?.node?.mediaItemUrl
      ? {
        images: [
          {
            url: data.page.featuredImage.node.mediaItemUrl,
            width: data.page.featuredImage.node.mediaDetails?.width,
            height: data.page.featuredImage.node.mediaDetails?.height,
            alt: data.page.featuredImage.node.altText || "DinVinguide",
          },
        ],
      }
      : undefined,
  };
}

export default async function Home() {
  const data = await getData();
  if (!data) {
    return notFound();
  }

  return (
    <>
      <FrontHero data={data?.page} />

      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>

      <Suspense fallback={<Spinner className="size-4 animate-spin" />}>
        <LatestArticles />
      </Suspense>

      <ExclusiveDrinks />

      <Suspense fallback={<BannerSkeleton />}>
        <AdMid />
      </Suspense>

      <ExplorePages />


      <ExploreRecipes />

      <Suspense fallback={<BannerSkeleton />}>
        <AdBottom />
      </Suspense>

      <Newsletter />
    </>
  );
}
