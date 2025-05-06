import Newsletter from "@/app/_components/Newsletter";
import Ads from "@/app/_components/ads";
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
      <Ads pageType="default" position="TOP" />
      <ChefsRecipes
        searchParams={searchParams}
        params={params}
        mainSlug={mainSlug}
      />
      <Meals />
      <Ads pageType="default" position="MID" />

      <Ingrediens />
      <Ads pageType="default" position="BOTTOM" />

      <Newsletter />
    </div>
  );
};

export default ChefTemplate;
