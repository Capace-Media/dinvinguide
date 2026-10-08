"use client";
import useWindowSize from "@/hooks/useWindowSize";
import SuitableWines from "./suitable-wines";
import Nutritions from "./nutritions";
import Recipe from "./recipe";
import Instructions from "./instructions";
import Portions from "./portions";
import type { Recipe as RecipeData } from "./types";

interface RecipeContentProps {
  recipe: RecipeData;
}

const RecipeContent = ({ recipe }: RecipeContentProps) => {
  const width = useWindowSize();
  const mobileBreakpoint = 768;
  const acf = recipe.acf_recipe;
  return (
    <div className="layout bg-white py-5">
      {width && width < mobileBreakpoint ? (
        <div className="flex flex-col gap-10">
          <Recipe
            process={acf?.processen}
            stepByStep={acf?.beskrivningStegForSteg}
            ingredients={acf?.receptdelar}
            others={acf?.ingredienserOvrigt}
            portions={acf?.antalPortioner}
          />
          <Nutritions nutritions={acf?.nutritions} />
          <SuitableWines drinks={acf?.passandeDrycker} />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-11">
          <div className="col-span-1">
            <Portions
              ingredients={acf?.receptdelar}
              others={acf?.ingredienserOvrigt}
              portions={acf?.antalPortioner}
            />
            <Nutritions nutritions={acf?.nutritions} />
          </div>
          <div className="col-span-2 p-4">
            <Instructions
              process={acf?.processen}
              stepByStep={acf?.beskrivningStegForSteg}
            />
            <div className="my-14 w-full h-2.5 bg-[#F0F0CC]"></div>
            <SuitableWines drinks={acf?.passandeDrycker} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeContent;
