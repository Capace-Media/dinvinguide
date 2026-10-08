import Newsletter from "@/components/shared/newsletter/newsletter";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdTop from "@/shared/components/ads/default/top";
import AdMid from "@/shared/components/ads/default/mid";
import AdBottom from "@/shared/components/ads/default/bottom";
import { Suspense } from "react";
import Ingrediens from "../RecipesTemplate/Ingrediens";
import Meals from "../RecipesTemplate/Meals";
import ChefsRecipes from "./ChefsRecipes";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string };
  mainSlug?: string;
};

const ChefTemplate = async ({ searchParams, params, mainSlug }: Props) => {
  return (
    <div className="">
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      <ChefsRecipes
        searchParams={searchParams}
        params={params}
        mainSlug={mainSlug}
      />
      <Meals />
      <Suspense fallback={<BannerSkeleton />}>
        <AdMid />
      </Suspense>

      <Ingrediens />
      <Suspense fallback={<BannerSkeleton />}>
        <AdBottom />
      </Suspense>

      <Newsletter />
    </div>
  );
};

export default ChefTemplate;
