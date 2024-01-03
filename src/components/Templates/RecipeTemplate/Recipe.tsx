"use client";

import { Edit } from "@/components/icons";
import handleParse from "@/lib/utils/handleParse";
import { useMemo, useState } from "react";
import InstructionComponent from "./InstructionComponent";
import PortionsComponent from "./PortionsComponent";

interface RecipeProps {
  process?: any;
  stepByStep?: any;
  ingredients?: any;
  others?: any;
  portions?: any;
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
    <div className="">
      <nav className="flex justify-center items-center gap-4 md:hidden">
        <button
          className={`w-[40%] py-2 border-[2px] border-b-0 border-brand-secondary rounded-t-[10px] ${
            isInstruction
              ? "bg-white text-brand-secondary"
              : "bg-brand-secondary text-white"
          }`}
          onClick={() => setInstruction(false)}
        >
          Ingredienser
        </button>
        <button
          className={`w-[40%] py-2 border-[2px] border-b-0 border-brand-secondary rounded-t-[10px] ${
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
          <PortionsComponent
            ingredients={ingredients}
            others={others}
            portions={portions}
          />
        )}

        {isInstruction && (
          <InstructionComponent process={process} stepByStep={stepByStep} />
        )}
      </div>
    </div>
  );
};

export default Recipe;
