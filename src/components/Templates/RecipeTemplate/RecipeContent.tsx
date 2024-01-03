"use client";
import useWindowSize from "@/hooks/useWindowSize";
import SuitableWines from "./ SuitableWines";
import Nutritions from "./Nutritions";
import Recipe from "./Recipe";

import InstructionComponent from "./InstructionComponent";
import PortionsComponent from "./PortionsComponent";

interface RecipeContentProps {
  data: any;
}

const RecipeContent = ({ data }: RecipeContentProps) => {
  const width = useWindowSize();
  const mobileBreakpoint = 768;
  return (
    <div className="layout bg-white py-5">
      {width && width < mobileBreakpoint ? (
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
      ) : (
        <div className="grid grid-cols-3 gap-11">
          <div className="col-span-1">
            <PortionsComponent
              ingredients={data?.acf_recipe?.receptdelar}
              others={data?.acf_recipe?.ingredienserOvrigt}
              portions={data?.acf_recipe?.antalPortioner}
            />
            <Nutritions data={data?.acf_recipe?.nutritions} />
          </div>
          <div className=" col-span-2 p-4">
            <InstructionComponent
              process={data?.acf_recipe?.processen}
              stepByStep={data?.acf_recipe?.beskrivningStegForSteg}
            />
            <div className="my-14 w-full h-[10px] bg-[#F0F0CC]"></div>
            <SuitableWines data={data?.acf_recipe?.passandeDrycker} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeContent;
