import RecipeHero from "@/components/Blocks/Hero-Header/RecipeHero";
import RecipesTemplate from "@/components/Templates/RecipesTemplate";

import { getPage } from "@/lib/queries/getPage";
import { getRecipePage } from "@/lib/queries/getRecipePage";

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
      <RecipeHero promise={recipes} />
      <RecipesTemplate />
    </>
  );
};

export default Recipes;
