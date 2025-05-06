import Newsletter from "@/app/_components/Newsletter";
import Ads from "@/app/_components/ads";
import Drycker from "./Drycker";
import Highlights from "./Highlights";
import Ingrediens from "./Ingrediens";
import Meals from "./Meals";

interface RecipesTemplateProps {}

const RecipesTemplate = ({}: RecipesTemplateProps) => {
  return (
    <div className="">
      <Ads pageType="default" position="TOP" />
      <Highlights />
      {/* Meals */}
      <Meals />
      <Ads pageType="default" position="MID" />
      {/* Ingrediens */}
      <Ingrediens />
      {/* Drinks */}
      <Drycker />
      {/* Prepping */}
      <Ads pageType="default" position="BOTTOM" />
      {/* Country */}
      <Newsletter />
    </div>
  );
};

export default RecipesTemplate;
