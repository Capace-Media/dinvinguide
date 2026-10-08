import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import { getDrink, getPreviewDrink } from "@/lib/api/drinks/get-drinks";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { MetaInfo } from "../../../../types/MetaInfoTypes";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import DlTop from "@/shared/components/ads/dl/top";
import DlMid from "@/shared/components/ads/dl/mid";
import DlBottom from "@/shared/components/ads/dl/bottom";
import { Suspense } from "react";
import DLHero from "@/components/shared/heroes/dl-hero";
import TopListLinks from "@/components/shared/top-list-links";
import DrinkDetails from "@/components/features/drycker/drink/drink";
import RelatedRecipes from "@/components/features/drycker/drink/related-recipes";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const page = await getDrink(`/drycker/${params.slug}`);

  const seo: any = page?.seo;

  const uri = `/drycker/${page?.slug}`;

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

async function getDrinkData(slug: string) {
  const { isEnabled } = await draftMode();
  if (isEnabled) {
    return getPreviewDrink(parseInt(slug));
  }
  return getDrink(`/drycker/${slug}`);
}

const Drink = async (props: Props) => {
  const params = await props.params;
  const drink = await getDrinkData(params.slug);

  if (!drink) {
    notFound();
  }

  const recipes = drink.acf_drinks?.passarTillRecept;

  return (
    <>
      <DLHero
        hero={drink}
        drinkType={drink.acf_drinks?.dryckestyper?.slug ?? undefined}
      />
      <Suspense fallback={<BannerSkeleton tone="bg-brand-dl" />}>
        <DlTop />
      </Suspense>
      <DrinkDetails drink={drink} />
      <Suspense fallback={<BannerSkeleton tone="bg-brand-dl" />}>
        <DlMid />
      </Suspense>
      {recipes && (
        <>
          {recipes[0] && <RelatedRecipes recipe={recipes[0]} />}
          <Suspense fallback={<BannerSkeleton tone="bg-brand-dl" />}>
            <DlBottom />
          </Suspense>
        </>
      )}
      <TopListLinks />
    </>
  );
};

export default Drink;
