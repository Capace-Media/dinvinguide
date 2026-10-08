import FrontHero from "@/components/Blocks/Hero-Header/FrontHero";
import ExclusiveDrinks from "@/components/features/home/exclusive-drinks";
import ExploreRecipes from "@/components/features/home/explore-recipes";
import LatestArticles from "@/components/features/home/latest-articles";
import ExplorePages from "@/components/shared/explore-pages";
import Newsletter from "@/components/shared/newsletter/newsletter";
import { getFrontPage } from "@/lib/queries/get-front-page";
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
  const frontPage = await getFrontPage();
  if (!frontPage) {
    return notFound();
  }

  const { page, recipePage, posts, drinktips, recipes } = frontPage;
  const highlights = page.GQL_frontPageFields;

  return (
    <>
      <FrontHero data={page} />

      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>

      <LatestArticles
        latest={posts?.nodes ?? []}
        highlighted={highlights?.highlightedArticles ?? []}
      />

      <ExclusiveDrinks
        latest={drinktips?.nodes ?? []}
        highlighted={highlights?.highlightedDryckestips ?? []}
      />

      <Suspense fallback={<BannerSkeleton />}>
        <AdMid />
      </Suspense>

      <ExplorePages />

      <ExploreRecipes
        intro={recipePage?.page_content?.intro}
        latest={recipes?.nodes ?? []}
        highlighted={highlights?.highlightedRecept ?? []}
      />

      <Suspense fallback={<BannerSkeleton />}>
        <AdBottom />
      </Suspense>

      <Newsletter />
    </>
  );
}
