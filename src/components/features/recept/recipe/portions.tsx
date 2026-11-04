"use client";

import handleParseClient from "@/lib/utils/handle-parse-client";
import { SquarePen } from "lucide-react";
import { useMemo, useState } from "react";
import type { AcfRecipe } from "./types";

// Custom checkbox: the native input is hidden and the checkmark span draws the box + tick
const checkboxLabelClasses =
  "group relative block pl-[35px] mb-3 cursor-pointer select-none text-[14px]";
const checkboxInputClasses = "peer absolute opacity-0 size-0 cursor-pointer";
const checkmarkClasses =
  "absolute top-0 left-0 size-5 bg-[#eee] border-2 border-brand-secondary rounded-[5px] group-hover:bg-[#ccc] after:absolute after:hidden after:left-1.5 after:top-[3.5px] after:w-1.25 after:h-2.5 after:border-brand-secondary after:border-r-[3px] after:border-b-[3px] after:rotate-45 peer-checked:after:block";

interface PortionsProps {
  ingredients: AcfRecipe["receptdelar"] | undefined;
  others: AcfRecipe["ingredienserOvrigt"] | undefined;
  portions: AcfRecipe["antalPortioner"] | undefined;
}

const Portions = ({ ingredients, others, portions }: PortionsProps) => {
  const initialPortions = parseInt(portions ?? "", 10);
  const [selectedPortions, setSelectedPortions] =
    useState<number>(initialPortions);

  const adjustedQuantities = useMemo(
    () =>
      (ingredients ?? []).map((section) => ({
        rubrik: section?.rubrik,
        ingredienser: (section?.ingredienser ?? []).map((ing) => ({
          ...ing,
          antal: +(
            ((ing?.antal ?? 0) / initialPortions) *
            selectedPortions
          ).toFixed(1),
        })),
      })),
    [ingredients, initialPortions, selectedPortions],
  );

  return (
    <section className="rounded-[8px] bg-[#F5F5F5] p-7">
      {ingredients ? (
        <>
          <div className="flex items-center justify-between pb-10">
            <h2 className="text-[24px]">Ingredienser</h2>
            <div>
              <label htmlFor="portions" className="flex items-center gap-3">
                <select
                  value={selectedPortions}
                  onChange={(e) => setSelectedPortions(Number(e.target.value))}
                  id="portions"
                  className="m-0 w-auto cursor-pointer appearance-none border-none bg-transparent p-0 outline-none"
                >
                  <option value={1}>1 portion</option>
                  <option value={2}>2 portioner</option>
                  <option value={4}>4 portioner</option>
                  <option value={6}>6 portioner</option>
                  <option value={8}>8 portioner</option>
                </select>
                <SquarePen className="size-5 text-brand-dark" aria-hidden />
              </label>
            </div>
          </div>
          <ul className="flex flex-col gap-4">
            {adjustedQuantities.map((node, index) => {
              return (
                <li key={`${index}${node.rubrik}`}>
                  <h3 className="pb-4 text-[23px]">{node.rubrik}</h3>
                  <ol className="flex flex-col gap-1">
                    {node.ingredienser.map((ing, i) => {
                      return (
                        <li key={`${i}${ing.namn}`}>
                          <label
                            className={checkboxLabelClasses}
                            htmlFor={`${node.rubrik}${i}`}
                          >
                            <input
                              type="checkbox"
                              id={`${node.rubrik}${i}`}
                              className={checkboxInputClasses}
                            />
                            {ing.antal === 0 ? "" : ing.antal}{" "}
                            {ing?.enhet?.name === "x"
                              ? ""
                              : !ing?.enhet?.name
                                ? ""
                                : ing.enhet.name}{" "}
                            {ing?.namn}{" "}
                            <span className={checkmarkClasses}></span>
                          </label>
                        </li>
                      );
                    })}
                  </ol>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p>Inga ingredienser tillgängliga.</p>
      )}
      {others && (
        <div className="py-4">
          <h3 className="pb-2 text-[19px]">Övrigt:</h3>
          <p>
            {" "}
            <label className={checkboxLabelClasses} htmlFor={others}>
              <input
                type="checkbox"
                id={others}
                className={checkboxInputClasses}
              />
              {handleParseClient(others)}
              <span className={checkmarkClasses}></span>
            </label>
          </p>
        </div>
      )}
    </section>
  );
};

export default Portions;
