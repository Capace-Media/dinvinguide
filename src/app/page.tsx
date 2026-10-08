import FrontHero from "@/components/Blocks/Hero-Header/FrontHero";
import ExclusiveDrinks from "@/components/features/home/exclusive-drinks";
import ExploreRecipes from "@/components/features/home/explore-recipes";
import LatestArticles from "@/components/features/home/latest-articles";
import ExplorePages from "@/components/shared/explore-pages";
import Newsletter from "@/components/shared/newsletter/newsletter";
import { preloadDefaultAds } from "@/lib/api/ads/get-ads";
import { getFrontPage } from "@/lib/api/pages/get-pages";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdBottom from "@/shared/components/ads/default/bottom";
import AdMid from "@/shared/components/ads/default/mid";
import AdTop from "@/shared/components/ads/default/top";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const FALLBACK_TITLE = "DinVinguide - Upptäck vin och mat";
const FALLBACK_DESCRIPTION = "Din guide till vin, mat och dryckestips";

export async function generateMetadata(): Promise<Metadata> {
  const frontPage = await getFrontPage();
  const page = frontPage?.page;
  const image = page?.featuredImage?.node;

  return {
    title: page?.seo?.title || FALLBACK_TITLE,
    description: page?.seo?.metaDesc || FALLBACK_DESCRIPTION,
    openGraph: image?.mediaItemUrl
      ? {
        images: [
          {
            url: image.mediaItemUrl,
            width: image.mediaDetails?.width ?? undefined,
            height: image.mediaDetails?.height ?? undefined,
            alt: image.altText || "DinVinguide",
          },
        ],
      }
      : undefined,
  };
}

export default async function Home() {
  // Start the ad request now so it runs alongside the front page fetch
  preloadDefaultAds();
  const frontPage = await getFrontPage();
  if (!frontPage) {
    return notFound();
  }


  return (
    <>
      <FrontHero data={frontPage.page} />

      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>

      <LatestArticles
        latest={frontPage.latestPosts}
        highlighted={frontPage.highlightedPosts}
      />

      <ExclusiveDrinks
        latest={frontPage.latestDrinktips}
        highlighted={frontPage.highlightedDrinktips}
      />

      <Suspense fallback={<BannerSkeleton />}>
        <AdMid />
      </Suspense>

      <ExplorePages />

      <ExploreRecipes
        intro={frontPage.recipeIntro}
        latest={frontPage.latestRecipes}
        highlighted={frontPage.highlightedRecipes}
      />

      <Suspense fallback={<BannerSkeleton />}>
        <AdBottom />
      </Suspense>

      <Newsletter />
    </>
  );
}
