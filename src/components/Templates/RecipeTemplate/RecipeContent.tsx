import Recipe from "./Recipe";

interface RecipeContentProps {
  data: any;
}

const RecipeContent = ({ data }: RecipeContentProps) => {
  return (
    <div className="layout bg-white">
      <Recipe
        process={data?.acf_recipe?.processen}
        stepByStep={data?.acf_recipe?.beskrivningStegForSteg}
        ingredients={data?.acf_recipe?.receptdelar}
        others={data?.acf_recipe?.ingredienserOvrigt}
        portions={data?.acf_recipe?.antalPortioner}
      />
    </div>
  );
};

export default RecipeContent;
