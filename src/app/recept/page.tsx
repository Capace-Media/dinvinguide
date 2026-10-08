import RecipeHero from "@/components/Blocks/Hero-Header/RecipeHero";

import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import { getPage } from "@/lib/api/pages/get-pages";
import { getRecipePage } from "@/lib/api/pages/get-pages";
import { Metadata, ResolvingMetadata } from "next";
import { MetaInfo } from "../../../types/MetaInfoTypes";
import Newsletter from "@/components/shared/newsletter/newsletter";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdTop from "@/shared/components/ads/default/top";
import AdMid from "@/shared/components/ads/default/mid";
import AdBottom from "@/shared/components/ads/default/bottom";
import { Suspense } from "react";
import Drinks from "@/components/features/recept/drinks";
import Highlights from "@/components/features/recept/highlights";
import Ingredients from "@/components/features/recept/ingredients";
import Meals from "@/components/features/recept/meals";

export async function generateMetadata(
  _props: unknown,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("/recept");

  const seo: any = page?.seo;

  const uri = `/${page?.slug}`;

  const img = {
    url: seo?.opengraphImage?.mediaItemUrl
      ? seo.opengraphImage.mediaItemUrl
      : "",
    alt: seo?.opengraphImage?.altText ? seo.opengraphImage.altText : "",
  };

  const previousMeta: MetaInfo = (await parent) as unknown as MetaInfo;

  const data = await dynamicSeo({ seo, previousMeta, uri, img });

  return data;
}

const Recipes = async () => {
  const recipes = getRecipePage();

  return (
    <>
      <RecipeHero promise={recipes} />
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      <Highlights />
      <Meals />
      <Suspense fallback={<BannerSkeleton />}>
        <AdMid />
      </Suspense>
      <Ingredients />
      <Drinks />
      <Suspense fallback={<BannerSkeleton />}>
        <AdBottom />
      </Suspense>
      <Newsletter />
    </>
  );
};

export default Recipes;
