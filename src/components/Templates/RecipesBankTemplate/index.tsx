import Newsletter from "@/components/shared/newsletter/newsletter";
import SectionSeparator from "@/components/shared/section-separator";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdTop from "@/shared/components/ads/default/top";
import AdMid from "@/shared/components/ads/default/mid";
import { Suspense } from "react";
import Recipes from "./Recipes";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

const RecipesTemplate = ({ searchParams }: Props) => {
  return (
    <div className="">
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      <Recipes searchParams={searchParams} />
      <SectionSeparator />
      <Suspense fallback={<BannerSkeleton />}>
        <AdMid />
      </Suspense>

      <Newsletter />
    </div>
  );
};

export default RecipesTemplate;
