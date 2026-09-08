import Newsletter from "@/app/_components/Newsletter";
import { BannerSkeleton } from "@/app/_components/ads/banner";
import AdTop from "@/app/_components/ads/default/top";
import AdMid from "@/app/_components/ads/default/mid";
import AdBottom from "@/app/_components/ads/default/bottom";
import { Suspense } from "react";
import Drycker from "./Drycker";
import Highlights from "./Highlights";
import Ingrediens from "./Ingrediens";
import Meals from "./Meals";

interface RecipesTemplateProps {}

const RecipesTemplate = ({}: RecipesTemplateProps) => {
  return (
    <div className="">
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      <Highlights />
      {/* Meals */}
      <Meals />
      <Suspense fallback={<BannerSkeleton />}>
        <AdMid />
      </Suspense>
      {/* Ingrediens */}
      <Ingrediens />
      {/* Drinks */}
      <Drycker />
      {/* Prepping */}
      <Suspense fallback={<BannerSkeleton />}>
        <AdBottom />
      </Suspense>
      {/* Country */}
      <Newsletter />
    </div>
  );
};

export default RecipesTemplate;
