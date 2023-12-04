import RecipeHero from "@/components/Blocks/Hero-Header/RecipeHero";
import { getPage } from "@/lib/queries/getPage";
import { getRecipes } from "@/lib/queries/getRecipes";

interface RecipesProps {}

const getRecipeData = async () => {
  const data = await getPage("recept");
  const recipes = getRecipes();

  return { data, recipes };
};

const Recipes = async ({}: RecipesProps) => {
  const { data, recipes } = await getRecipeData();
  return (
    <>
      <RecipeHero promise={recipes} />
    </>
  );
};

export default Recipes;
