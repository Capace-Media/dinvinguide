"use client";
import { scrollToPosts } from "@/lib/utils/scrollToPosts";
import { useEffect } from "react";
import Recipe from "./Recipe";

interface RecipePaginationProps {
  data: any[];
  idString?: string;
}

const RecipePagination = ({ data, idString }: RecipePaginationProps) => {
  useEffect(() => {
    if (idString && data) {
      scrollToPosts(idString);
    }
  }, [data]);
  return (
    <>
      <div className="layout bg-white contain">
        <ul id={idString} className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
          {data &&
            data.map((recipe: any, index: number) => {
              return (
                <li key={recipe?.node?.id} className="relative">
                  <Recipe recipe={recipe?.node} />
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default RecipePagination;
