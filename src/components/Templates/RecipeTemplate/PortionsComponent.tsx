"use client";

import { Edit } from "@/components/icons";
import handleParse from "@/lib/utils/handleParse";
import { useMemo, useState } from "react";
interface PortionsComponentProps {
  ingredients?: any;
  others?: any;
  portions?: any;
}

const PortionsComponent = ({
  ingredients,
  others,
  portions,
}: PortionsComponentProps) => {
  const initialPortions = parseInt(portions, 10);
  const [isPortions, setPortions] = useState<number>(initialPortions);

  const baselineQuantities = useMemo(() => {
    return (ingredients ?? []).map((node: { ingredienser: any[] | null }) => ({
      ...node,
      ingredienser: node.ingredienser
        ? node.ingredienser.map((ing) => ({
            ...ing,
            baselineAntal: ing.antal / initialPortions,
          }))
        : [],
    }));
  }, [ingredients, initialPortions]);

  const adjustedQuantities = useMemo(() => {
    return baselineQuantities.map(
      (node: { ingredienser: { baselineAntal: any }[] | null }) => ({
        ...node,
        ingredienser: node.ingredienser
          ? node.ingredienser.map((ing: { baselineAntal: any }) => ({
              ...ing,
              antal: +parseFloat((ing.baselineAntal! * isPortions).toFixed(1)),
            }))
          : [],
      })
    );
  }, [baselineQuantities, isPortions]);

  return (
    <section className="bg-[#F5F5F5] p-7 rounded-[8px]">
      {ingredients ? (
        <>
          <div className="flex justify-between items-center pb-10">
            <h2 className="text-[24px]">Ingredienser</h2>
            <div>
              <label htmlFor="portions" className="flex gap-3 items-center">
                <select
                  value={isPortions}
                  onChange={(e: any) => setPortions(e.target.value)} // ... and update the state variable on any change!
                  id="portions"
                  className="select-plain text-[14px]"
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
                                className="text-[14px] recipe__label"
                                htmlFor={node?.rubrik + i}
                              >
                                <input type="checkbox" id={node?.rubrik + i} />
                                {ing?.antal === 0 ? "" : ing.antal}{" "}
                                {ing?.enhet?.name === "x"
                                  ? ""
                                  : !ing?.enhet?.name
                                  ? ""
                                  : ing.enhet.name}{" "}
                                {ing?.namn} <span className="checkmark"></span>
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
          <h3 className="text-[19px] pb-2">Övrigt:</h3>
          <p>
            {" "}
            <label className="text-[14px] recipe__label" htmlFor={others}>
              <input type="checkbox" id={others} />
              {handleParse(others)}
              <span className="checkmark"></span>
            </label>
          </p>
        </div>
      )}
    </section>
  );
};

export default PortionsComponent;
