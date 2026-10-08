import Newsletter from "@/components/shared/newsletter/newsletter";
import SectionSeparator from "@/components/shared/section-separator";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdTop from "@/shared/components/ads/default/top";
import AdMid from "@/shared/components/ads/default/mid";
import AdBottom from "@/shared/components/ads/default/bottom";
import { Suspense } from "react";
import Line from "@/components/graphic/Line";
import Ingredients from "@/components/features/recept/ingredients";
import Meals from "@/components/features/recept/meals";
import type { RouteSearchParams } from "@/lib/utils/pagination-search-params";
import RecipesByCategory from "./recipes-by-category";

interface RecipeCategoryTemplateProps {
  searchParams: RouteSearchParams;
  params: { slug: string };
  mainSlug?: string;
}

const RecipeCategoryTemplate = ({
  searchParams,
  params,
  mainSlug,
}: RecipeCategoryTemplateProps) => {
  return (
    <>
      <div className="layout bg-white pt-28">
        <Line />
      </div>
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      <RecipesByCategory
        searchParams={searchParams}
        params={params}
        mainSlug={mainSlug}
      />

      <SectionSeparator />

      <Meals />
      <Suspense fallback={<BannerSkeleton />}>
        <AdMid />
      </Suspense>

      <Ingredients />
      <Suspense fallback={<BannerSkeleton />}>
        <AdBottom />
      </Suspense>

      <Newsletter />
    </>
  );
};

export default RecipeCategoryTemplate;
