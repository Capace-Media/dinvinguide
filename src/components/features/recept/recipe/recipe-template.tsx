"use client";

import RecipeHero from "@/app/recept/Hero";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import RecipeContent from "./recipe-content";
import type { Recipe } from "./types";

interface RecipeTemplateProps {
  recipe: Recipe;
}

const RecipeTemplate = ({ recipe }: RecipeTemplateProps) => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  return (
    <article>
      <RecipeHero
        title={recipe.title}
        image={recipe.featuredImage?.node}
        desc={recipe.acf_recipe?.desc}
        rating={recipe.acf_recipe?.recipeAverageRating}
        ratingAmount={recipe.acf_recipe?.recipeRatingCount}
        time={recipe.acf_recipe?.time}
        categories={recipe.acf_recipe?.recepieCategories}
        author={recipe.acf_recipe?.skrivetAv}
        handlePrint={handlePrint}
      />
      <div ref={componentRef}>
        <RecipeContent recipe={recipe} />
      </div>
    </article>
  );
};

export default RecipeTemplate;
