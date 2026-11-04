"use client";

import { ArrowRight } from "@/components/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface RecipeProps {
  recipe: any;
}

export const SkeletonLoader = () => {
  return (
    <div className="aspect-square h-full w-full animate-pulse overflow-hidden rounded-lg bg-brand-primary"></div>
  );
};

const Recipe = ({ recipe }: RecipeProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group">
      <Link
        href={`/recept/${recipe?.slug}`}
        aria-label={`Läs om ${recipe?.title}`}
        className={cn(
          "relative block h-[13.2rem] w-full",
          // ersätter .overlay: mörk toning upptill så badgen syns mot bilden
          "after:absolute after:inset-0 after:content-['']",
          "after:bg-linear-to-b after:from-black/40 after:from-[16.35%]",
          "after:to-transparent after:to-[49.69%]",
        )}
      >
        {recipe?.featuredImage?.node?.mediaItemUrl && (
          <>
            <Image
              unoptimized
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
              <div className="absolute top-0 right-0 bottom-0 left-0">
                <SkeletonLoader />
              </div>
            )}
          </>
        )}
        <div className="absolute top-2 right-3 z-10 border-b-2 border-white"></div>
        <div className="absolute top-0 right-0 z-2 flex gap-2 p-4 text-white">
          <p className="text-[12px] uppercase">
            Recept
            <span className="flex h-px w-full bg-white"></span>
          </p>
        </div>
      </Link>

      <div className="flex h-24 flex-col gap-1 rounded-b-[10px] bg-[#F5F5F5] px-2 py-2">
        <p className="text-[12px] text-[#333] uppercase">
          {recipe?.acf_recipe?.skrivetAv
            ? recipe?.acf_recipe?.skrivetAv[0]?.name
            : "DinVinguide"}
        </p>

        {recipe?.title && (
          <h2>
            <Link
              href={`/recept/${recipe?.slug}`}
              aria-label={`Läs om ${recipe?.title}`}
              className="mb-2 line-clamp-2 font-sub text-[18px] text-brand-dark lg:group-hover:underline"
            >
              {recipe.title}
            </Link>
          </h2>
        )}

        {recipe?.uri && (
          <Link
            href={`/skribenter${recipe.uri}`}
            aria-label={`Läs om ${recipe?.title}`}
            className="flex items-center gap-3 text-brand-secondary lg:hover:underline"
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
