import RecipeHero from "@/components/Blocks/Hero-Header/RecipeHero";
import RecipesTemplate from "@/components/Templates/RecipesTemplate";

import { getPage } from "@/lib/queries/getPage";
import { getRecipePage } from "@/lib/queries/getRecipePage";
import { Suspense } from "react";
import Loading from "../loading";

interface RecipesProps {}

const getRecipeData = async () => {
  const data = await getPage("recept");
  const recipes = getRecipePage();

  return { data, recipes };
};

const Recipes = async ({}: RecipesProps) => {
  const { data, recipes } = await getRecipeData();
  return (
    <>
      <Suspense fallback={<Loading />}>
        <RecipeHero promise={recipes} />
        <RecipesTemplate />
      </Suspense>
    </>
  );
};

export default Recipes;
