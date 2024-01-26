"use client";

import { ArrowRight } from "@/components/icons";
import PrettyDate from "@/lib/utils/prettyDate";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface RecipeProps {
  recipe: any;
}

export const SkeletonLoader = () => {
  return (
    <div className="aspect-square animate-pulse h-full w-full overflow-hidden rounded-lg bg-brand-primary"></div>
  );
};

const Recipe = ({ recipe }: RecipeProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  console.log("recipe =====>", recipe);

  return (
    <div className="group">
      <Link
        href={`/recept/${recipe?.slug}`}
        aria-label={`Läs om ${recipe?.title}`}
        className={`block w-full relative h-[12.2rem] overlay`}
      >
        {recipe?.featuredImage?.node?.mediaItemUrl && (
          <>
            <Image
              src={recipe.featuredImage.node.mediaItemUrl}
              alt={
                recipe?.featuredImage?.node?.altText
                  ? recipe.featuredImage.node.altText
                  : `bild på ${recipe.title}`
              }
              onLoad={() => setImageLoaded(true)}
              fill
              style={{
                objectFit: "cover",
              }}
              sizes="(min-width: 1880px) 389px, (min-width: 1040px) calc(22.44vw - 28px), (min-width: 780px) calc(100vw - 88px), calc(100vw - 32px)"
            />

            {!imageLoaded && (
              <div className="absolute top-0 left-0 right-0 bottom-0">
                <SkeletonLoader />
              </div>
            )}
          </>
        )}
        <div className="absolute right-3 top-2 z-10 border-b-2 border-white ">
          <p className="text-white uppercase">{recipe?.author?.node?.name}</p>
        </div>
      </Link>

      <div className="h-[12.9rem] flex flex-col justify-between py-2">
        <div className="flex flex-col">
          {recipe?.modifiedGmt && (
            <p className="text-brand-gray text-[14px]">
              {PrettyDate(recipe.modifiedGmt)}
            </p>
          )}
          {recipe?.title && (
            <h2
              aria-label={recipe.title}
              className="heading_truncated font-sub mb-2 text-[22px] text-brand-dark"
            >
              {recipe.title}
            </h2>
          )}
          {recipe?.acf_recipes?.ingress && (
            <>
              <p
                className="truncated text-[13px] text-brand-gray"
                dangerouslySetInnerHTML={{ __html: recipe.acf_recipes.ingress }}
              />
            </>
          )}
        </div>

        {recipe?.uri && (
          <Link
            href={`/skribenter${recipe.uri}`}
            aria-label={`Läs om ${recipe?.title}`}
            className="flex items-center gap-3 lg:hover:underline text-brand-secondary"
          >
            <span>Läs hela artikeln</span>
            <span>
              <ArrowRight />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Recipe;
