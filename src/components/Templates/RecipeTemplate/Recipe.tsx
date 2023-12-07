"use client";

import handleParse from "@/lib/utils/handleParse";
import { useState } from "react";

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
  console.log("ingredients =====>", ingredients);
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
            </div>
            <ul>
              {ingredients &&
                ingredients.map((node: any, index: number) => {
                  return (
                    <li key={index + node?.rubrik}>
                      <h3>{node?.rubrik}</h3>
                      <ol>
                        {node?.ingredienser &&
                          node.ingredienser.map((ing: any, index: number) => {
                            return (
                              <li key={index + ing?.namn}>
                                <label
                                  className="flex items-center gap-3 text-[15px] recipe__label"
                                  htmlFor={
                                    index + ing?.enhet?.name + ing?.antal
                                  }
                                >
                                  <input
                                    type="checkbox"
                                    id={index + ing?.enhet?.name + ing?.antal}
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
              <div className="step_by_step">{handleParse(stepByStep)}</div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default Recipe;
