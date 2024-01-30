import Newsletter from "@/app/components/Newsletter";
import Ads from "@/app/components/ads";
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
    <div className="">
      <Ads pageType="default" position="TOP" />
      <RecipeByCategory
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

export default RecipeCategoryTemplate;
