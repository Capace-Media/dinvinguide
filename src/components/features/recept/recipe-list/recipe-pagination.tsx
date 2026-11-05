"use client";
import { scrollToPosts } from "@/lib/utils/scrollToPosts";
import { useEffect } from "react";
import Recipe from "./recipe-list-item";

interface RecipePaginationProps {
  data: any[];
  idString?: string;
}

const RecipePagination = ({ data, idString }: RecipePaginationProps) => {
  useEffect(() => {
    if (idString && data) {
      scrollToPosts(idString);
    }
  }, [data, idString]);
  return (
    <div className="layout contain bg-white">
      <ul id={idString} className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {data?.map((recipe: any) => {
          return (
            <li key={recipe?.node?.id} className="relative">
              <Recipe recipe={recipe?.node} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecipePagination;
