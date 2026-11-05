import Newsletter from "@/components/shared/newsletter/newsletter";
import SectionSeparator from "@/components/shared/section-separator";
import { BannerSkeleton } from "@/components/shared/ads/banner";
import AdTop from "@/components/shared/ads/default/top";
import AdMid from "@/components/shared/ads/default/mid";
import AdBottom from "@/components/shared/ads/default/bottom";
import { Suspense } from "react";
import Line from "@/components/shared/line";
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
