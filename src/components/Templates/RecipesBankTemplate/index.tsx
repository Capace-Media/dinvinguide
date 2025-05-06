import Newsletter from "@/app/_components/Newsletter";
import Separater from "@/app/_components/Separater";
import Ads from "@/app/_components/ads";
import Recipes from "./Recipes";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

const RecipesTemplate = ({ searchParams }: Props) => {
  return (
    <div className="">
      <Ads pageType="default" position="TOP" />
      <Recipes searchParams={searchParams} />
      <Separater />
      <Ads pageType="default" position="MID" />

      <Newsletter />
    </div>
  );
};

export default RecipesTemplate;
