import SuitableWines from "./ SuitableWines";
import Nutritions from "./Nutritions";
import Recipe from "./Recipe";

interface RecipeContentProps {
  data: any;
}

const RecipeContent = ({ data }: RecipeContentProps) => {
  return (
    <div className="layout bg-white py-5">
      <div className="flex flex-col gap-10">
        <Recipe
          process={data?.acf_recipe?.processen}
          stepByStep={data?.acf_recipe?.beskrivningStegForSteg}
          ingredients={data?.acf_recipe?.receptdelar}
          others={data?.acf_recipe?.ingredienserOvrigt}
          portions={data?.acf_recipe?.antalPortioner}
        />
        <Nutritions data={data?.acf_recipe?.nutritions} />
        <SuitableWines data={data?.acf_recipe?.passandeDrycker} />
      </div>
    </div>
  );
};

export default RecipeContent;
