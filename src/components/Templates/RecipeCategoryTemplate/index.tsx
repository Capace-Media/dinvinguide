import Newsletter from "@/app/components/Newsletter";
import Separater from "@/app/components/Separater";
import Ads from "@/app/components/ads";
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
      <Ads pageType="default" position="TOP" />
      <RecipeByCategory
        searchParams={searchParams}
        params={params}
        mainSlug={mainSlug}
      />

      <Separater />

      <Meals />
      <Ads pageType="default" position="MID" />

      <Ingrediens />
      <Ads pageType="default" position="BOTTOM" />

      <Newsletter />
    </>
  );
};

export default RecipeCategoryTemplate;
