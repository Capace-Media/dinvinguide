import Newsletter from "@/app/components/Newsletter";
import Ads from "@/app/components/ads";
import Recipes from "./Recipes";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

const RecipesTemplate = ({ searchParams }: Props) => {
  return (
    <div className="">
      <Ads pageType="default" position="TOP" />
      <Recipes searchParams={searchParams} />
      <Ads pageType="default" position="MID" />

      <Ads pageType="default" position="BOTTOM" />

      <Newsletter />
    </div>
  );
};

export default RecipesTemplate;
