import Newsletter from "@/components/shared/newsletter/newsletter";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdTop from "@/shared/components/ads/default/top";
import AdMid from "@/shared/components/ads/default/mid";
import AdBottom from "@/shared/components/ads/default/bottom";
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
