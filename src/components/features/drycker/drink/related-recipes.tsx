import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { DrinkRecipe } from "./types";

interface RelatedRecipesProps {
  recipe: DrinkRecipe;
}

const RelatedRecipes = ({ recipe }: RelatedRecipesProps) => {
  return (
    <section className="relative w-full lg:h-125 z-10 h-175">
      <div className="absolute bg-[#F8F8F9] h-full lg:w-[calc(100%+10rem)] md:w-[calc(100%+5.5rem)] w-[calc(100%+2rem)] center-x center-y dl-layout">
        <div className="grid lg:grid-cols-2 h-full md:py-20 py-10 gap-10">
          <div className="w-full h-full flex flex-col justify-between md:w-[80%]">
            <div className="lg:pr-20">
              <p>Passar med</p>
              <h2>{recipe.title}</h2>
              {recipe.acf_recipe?.desc && <p>{recipe.acf_recipe.desc}</p>}
            </div>

            <Link
              className="relative flex items-center gap-2 cursor-pointer lg:hover:underline lg:ease-in-out lg:duration-300"
              href={`/recept/${recipe.slug}`}
            >
              <span>Gå till recept</span>{" "}
              <ArrowRight className="size-3" strokeWidth={1.2} aria-hidden />
            </Link>
          </div>
          <div className="w-full h-full">
            <div className="relative w-full md:w-[80%] h-67.5 lg:h-full">
              {recipe.featuredImage?.node.mediaItemUrl?.includes("https://") ? (
                <Image
                  src={recipe.featuredImage.node.mediaItemUrl}
                  alt={
                    recipe.featuredImage.node.altText
                      ? recipe.featuredImage.node.altText
                      : `Bild på ${recipe.title}`
                  }
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedRecipes;
