import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { DrinkRecipe } from "./types";

interface RelatedRecipesProps {
  recipe: DrinkRecipe;
}

const RelatedRecipes = ({ recipe }: RelatedRecipesProps) => {
  return (
    <section className="relative z-10 h-175 w-full lg:h-125">
      <div className="center-x center-y dl-layout absolute h-full w-[calc(100%+2rem)] bg-[#F8F8F9] md:w-[calc(100%+5.5rem)] lg:w-[calc(100%+10rem)]">
        <div className="grid h-full gap-10 py-10 md:py-20 lg:grid-cols-2">
          <div className="flex h-full w-full flex-col justify-between md:w-[80%]">
            <div className="lg:pr-20">
              <p>Passar med</p>
              <h2>{recipe.title}</h2>
              {recipe.acf_recipe?.desc && <p>{recipe.acf_recipe.desc}</p>}
            </div>

            <Link
              className="relative flex cursor-pointer items-center gap-2 lg:duration-300 lg:ease-in-out lg:hover:underline"
              href={`/recept/${recipe.slug}`}
            >
              <span>Gå till recept</span>{" "}
              <ArrowRight className="size-3" strokeWidth={1.2} aria-hidden />
            </Link>
          </div>
          <div className="h-full w-full">
            <div className="relative h-67.5 w-full md:w-[80%] lg:h-full">
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
