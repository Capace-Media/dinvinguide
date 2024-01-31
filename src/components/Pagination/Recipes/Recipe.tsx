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
  console.log("recipe?.acf_recipe =====>", recipe?.acf_recipe);
  return (
    <div className="group">
      <Link
        href={`/recept/${recipe?.slug}`}
        aria-label={`Läs om ${recipe?.title}`}
        className={`block w-full relative h-[13.2rem] overlay`}
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
        <div className="absolute right-3 top-2 z-10 border-b-2 border-white "></div>
        <div className="absolute top-0 right-0 text-white p-4 z-[2] flex gap-2">
          {(() => {
            const desiredOrder = [
              "huvudratter",
              "frukost",
              "forratter",
              "efterratter",
              "tilltugg-snacks",
              "specialkost",
            ];

            const matchingTax = desiredOrder.find((slug) => {
              return recipe?.acf_recipe?.recepieCategories?.some(
                (tax: any) => tax.slug === slug
              );
            });

            const displayTax = recipe?.acf_recipe?.recepieCategories?.find(
              (tax: any) => tax.slug === matchingTax
            );

            return displayTax ? (
              <p key={displayTax.slug} className="text-[12px] uppercase">
                {displayTax.name}
                <span className="flex w-full h-[3px] bg-white"></span>
              </p>
            ) : null;
          })()}
        </div>
      </Link>

      <div className="h-[6rem] rounded-b-[10px] flex flex-col justify-between py-2 px-2 bg-[#F5F5F5]">
        <div className="flex flex-col">
          <p className="text-[#333] text-[12px] uppercase">
            {recipe?.acf_recipe?.skrivetAv
              ? recipe?.acf_recipe?.skrivetAv[0]?.name
              : "-"}
          </p>

          {recipe?.title && (
            <Link
              href={`/recept/${recipe?.slug}`}
              aria-label={`Läs om ${recipe?.title}`}
              className="heading_truncated font-sub mb-2 text-[18px] text-brand-dark lg:group-hover:underline"
            >
              {recipe.title}
            </Link>
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
