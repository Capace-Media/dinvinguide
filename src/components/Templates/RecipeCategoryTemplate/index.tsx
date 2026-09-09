import Newsletter from "@/app/_components/Newsletter";
import Separater from "@/app/_components/Separater";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdTop from "@/shared/components/ads/default/top";
import AdMid from "@/shared/components/ads/default/mid";
import AdBottom from "@/shared/components/ads/default/bottom";
import { Suspense } from "react";
import Line from "@/components/graphic/Line";
import Ingrediens from "../RecipesTemplate/Ingrediens";
import Meals from "../RecipesTemplate/Meals";
import RecipeByCategory from "./RecipeByCategory";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string };
  mainSlug?: string;
};

const RecipeCategoryTemplate = ({ searchParams, params, mainSlug }: Props) => {
  return (
    <>
      <div className="layout bg-white pt-28">
        <Line />
      </div>
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      <RecipeByCategory
        searchParams={searchParams}
        params={params}
        mainSlug={mainSlug}
      />

      <Separater />

      <Meals />
      <Suspense fallback={<BannerSkeleton />}>
        <AdMid />
      </Suspense>

      <Ingrediens />
      <Suspense fallback={<BannerSkeleton />}>
        <AdBottom />
      </Suspense>

      <Newsletter />
    </>
  );
};

export default RecipeCategoryTemplate;
