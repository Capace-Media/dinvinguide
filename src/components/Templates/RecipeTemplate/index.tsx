"use client";

import RecipeHero from "@/app/recept/[slug]/Hero";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import RecipeContent from "./RecipeContent";

interface RecipeTemplateProps {
  promise: any;
}

const RecipeTemplate = ({ promise }: RecipeTemplateProps) => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <article>
      <RecipeHero
        title={promise?.title}
        image={promise?.featuredImage?.node}
        desc={promise?.acf_recipe?.desc}
        rating={promise?.acf_recipe?.recipeAverageRating}
        ratingAmount={promise?.acf_recipe?.recipeRatingCount}
        time={promise?.acf_recipe?.time}
        categories={promise?.acf_recipe?.recepieCategories}
        author={promise?.acf_recipe?.skrivetAv}
        handlePrint={handlePrint}
      />
      <div ref={componentRef}>
        <RecipeContent data={promise} />
      </div>
    </article>
  );
};

export default RecipeTemplate;
