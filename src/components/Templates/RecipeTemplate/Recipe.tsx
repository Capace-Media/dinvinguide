"use client";

import { Edit } from "@/components/icons";
import handleParse from "@/lib/utils/handleParse";
import { useMemo, useState } from "react";

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

  const [isPortions, setPortions] = useState<number>(parseInt(portions, 10));

  // Initialize baseline quantities
  const baselineQuantities = useMemo(() => {
    return ingredients.map((node: { ingredienser: any[] }) => ({
      ...node,
      ingredienser: node.ingredienser.map((ing) => ({
        ...ing,
        baselineAntal: ing.antal,
      })),
    }));
  }, [ingredients]);

  // Calculate adjusted quantities
  const adjustedQuantities = useMemo(() => {
    return baselineQuantities.map(
      (node: { ingredienser: { baselineAntal: any }[] }) => ({
        ...node,
        ingredienser: node.ingredienser.map((ing: { baselineAntal: any }) => ({
          ...ing,
          antal: +parseFloat((ing.baselineAntal! * isPortions).toFixed(1)),
        })),
      })
    );
  }, [baselineQuantities, isPortions]);

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
          <section className="bg-[#F5F5F5] p-4 rounded-[8px]">
            <div className="flex justify-between items-center pb-10">
              <h2>Ingredienser</h2>
              <div>
                <label htmlFor="portions" className="flex gap-3 items-center">
                  <select
                    value={isPortions}
                    onChange={(e: any) => setPortions(e.target.value)} // ... and update the state variable on any change!
                    id="portions"
                    className="select-plain"
                  >
                    <option value={1}>1 portion</option>
                    <option value={2}>2 portioner</option>
                    <option value={4}>4 portioner</option>
                    <option value={6}>6 portioner</option>
                    <option value={8}>8 portioner</option>
                  </select>
                  <Edit />
                </label>
              </div>
            </div>
            <ul className="flex flex-col gap-4">
              {adjustedQuantities &&
                adjustedQuantities.map((node: any, index: string | number) => {
                  return (
                    <li key={index + node?.rubrik}>
                      <h3 className="text-[23px] pb-4">{node?.rubrik}</h3>
                      <ol className="gap-1 flex flex-col">
                        {node?.ingredienser &&
                          node.ingredienser.map((ing: any, i: number) => {
                            return (
                              <li key={i + ing?.namn}>
                                <label
                                  className="text-[15px] recipe__label"
                                  htmlFor={node?.rubrik + i}
                                >
                                  <input
                                    type="checkbox"
                                    id={node?.rubrik + i}
                                  />
                                  {ing?.antal} {ing?.enhet?.name} {ing?.namn}
                                  <span className="checkmark"></span>
                                </label>
                              </li>
                            );
                          })}
                      </ol>
                    </li>
                  );
                })}
            </ul>
          </section>
        )}

        {isInstruction && (
          <section className="bg-[#F5F5F5] p-4 rounded-[8px]">
            <div className="flex justify-between items-center pb-10">
              <h2>Instruktioner</h2>
            </div>
            {!stepByStep && <>{handleParse(process)}</>}

            {stepByStep && (
              <>
                <ul>
                  {stepByStep &&
                    stepByStep.map((step: any) => {
                      return (
                        <li key={step.instruktion}>
                          <div>{handleParse(step.instruktion)}</div>
                        </li>
                      );
                    })}
                </ul>
              </>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default Recipe;
