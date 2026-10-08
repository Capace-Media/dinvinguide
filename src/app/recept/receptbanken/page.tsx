import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import { getPage } from "@/lib/api/pages/get-pages";
import { Metadata, ResolvingMetadata } from "next";
import { MetaInfo } from "../../../../types/MetaInfoTypes";
import Newsletter from "@/components/shared/newsletter/newsletter";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdTop from "@/shared/components/ads/default/top";
import AdMid from "@/shared/components/ads/default/mid";
import { Suspense } from "react";
import SectionSeparator from "@/components/shared/section-separator";
import RecipeBankRecipes from "@/components/features/recept/receptbanken/recipe-bank-recipes";
import type { RouteSearchParams } from "@/lib/utils/pagination-search-params";

type Props = {
  searchParams: Promise<RouteSearchParams>;
};

export async function generateMetadata(
  _props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("/recept");

  const seo: any = page?.seo;

  const uri = `/recept/receptbanken`;

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

const RecipesBank = async (props: Props) => {
  const searchParams = await props.searchParams;

  return (
    <div>
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      <RecipeBankRecipes searchParams={searchParams} />
      <SectionSeparator />
      <Suspense fallback={<BannerSkeleton />}>
        <AdMid />
      </Suspense>
      <Newsletter />
    </div>
  );
};

export default RecipesBank;
