"use client";

import { useState } from "react";
import Instructions from "./instructions";
import Portions from "./portions";
import type { AcfRecipe } from "./types";

interface RecipeProps {
  process: AcfRecipe["processen"] | undefined;
  stepByStep: AcfRecipe["beskrivningStegForSteg"] | undefined;
  ingredients: AcfRecipe["receptdelar"] | undefined;
  others: AcfRecipe["ingredienserOvrigt"] | undefined;
  portions: AcfRecipe["antalPortioner"] | undefined;
}

const Recipe = ({
  process,
  stepByStep,
  ingredients,
  others,
  portions,
}: RecipeProps) => {
  const [isInstruction, setInstruction] = useState<boolean>(false);

  return (
    <div>
      <nav className="flex justify-center items-center gap-4 md:hidden">
        <button
          className={`w-[40%] py-2 border-2 border-b-0 border-brand-secondary rounded-t-[10px] ${
            isInstruction
              ? "bg-white text-brand-secondary"
              : "bg-brand-secondary text-white"
          }`}
          onClick={() => setInstruction(false)}
        >
          Ingredienser
        </button>
        <button
          className={`w-[40%] py-2 border-2 border-b-0 border-brand-secondary rounded-t-[10px] ${
            !isInstruction
              ? "bg-white text-brand-secondary"
              : "bg-brand-secondary text-white"
          }`}
          onClick={() => setInstruction(true)}
        >
          Instruktioner
        </button>
      </nav>
      <div className="md:hidden">
        {!isInstruction && (
          <Portions
            ingredients={ingredients}
            others={others}
            portions={portions}
          />
        )}

        {isInstruction && (
          <Instructions process={process} stepByStep={stepByStep} />
        )}
      </div>
    </div>
  );
};

export default Recipe;
