import { BannerSkeleton } from "@/shared/components/ads/banner";
import DlTop from "@/shared/components/ads/dl/top";
import DlMid from "@/shared/components/ads/dl/mid";
import DlBottom from "@/shared/components/ads/dl/bottom";
import { Suspense } from "react";
import { getDrink, getPreviewDrink } from "@/lib/api/drinks/get-drinks";
import PrettyDate from "@/lib/utils/prettyDate";
import { draftMode } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import DLHero from "../HeroHeaders/DLHero";
import TopListLinks from "../TopListsTemplate/TopListLinks";
import Drink from "./Drink";
import RelatedRecipes from "./RelatedRecipes";

async function getDrinkData({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { isEnabled } = await draftMode();

  if (isEnabled) {
    return getPreviewDrink(parseInt(slug));
  }

  return getDrink(`/drycker/${slug}`);
}

const DrinkTemplate = async ({ params }: { params: { slug: string } }) => {
  const data = await getDrinkData({ params });

  if (!data) {
    return notFound();
  }

  const passarTillRecept = data.acf_drinks?.passarTillRecept;

  return (
    <>
      <DLHero hero={data} drinkType={data.acf_drinks?.dryckestyper?.slug ?? undefined} />
      <Suspense fallback={<BannerSkeleton tone="bg-brand-dl" />}>
        <DlTop />
      </Suspense>

      <Drink data={data} />
      <Suspense fallback={<BannerSkeleton tone="bg-brand-dl" />}>
        <DlMid />
      </Suspense>
      {passarTillRecept && (
        <>
          <RelatedRecipes data={passarTillRecept[0]} />
          <Suspense fallback={<BannerSkeleton tone="bg-brand-dl" />}>
            <DlBottom />
          </Suspense>
        </>
      )}

      <TopListLinks />
    </>
  );
};

export default DrinkTemplate;
