import Newsletter from "@/components/shared/newsletter/newsletter";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdTop from "@/shared/components/ads/default/top";
import AdMid from "@/shared/components/ads/default/mid";
import AdBottom from "@/shared/components/ads/default/bottom";
import { Suspense } from "react";
import ChefRecipes from "@/components/features/recept/kockar/chef/chef-recipes";
import Ingredients from "@/components/features/recept/ingredients";
import Meals from "@/components/features/recept/meals";
import type { RouteSearchParams } from "@/lib/utils/pagination-search-params";

type Props = {
  searchParams: Promise<RouteSearchParams>;
  params: Promise<{ slug: string }>;
};

const Chef = async (props: Props) => {
  const params = await props.params;
  const searchParams = await props.searchParams;

  return (
    <div>
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      <ChefRecipes
        searchParams={searchParams}
        params={params}
        mainSlug="kockar"
      />
      <Meals />
      <Suspense fallback={<BannerSkeleton />}>
        <AdMid />
      </Suspense>
      <Ingredients />
      <Suspense fallback={<BannerSkeleton />}>
        <AdBottom />
      </Suspense>
      <Newsletter />
    </div>
  );
};

export default Chef;
