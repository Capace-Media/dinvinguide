"use client";

import { ArrowRight } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Divide } from "lucide-react";
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

  return (
    <div className="group">
      <Link
        href={`/recept/${recipe?.slug}`}
        aria-label={`Läs om ${recipe?.title}`}
        className={cn(
          "block w-full relative h-[13.2rem]",
          // ersätter .overlay: mörk toning upptill så badgen syns mot bilden
          "after:content-[''] after:absolute after:inset-0",
          "after:bg-linear-to-b after:from-black/40 after:from-[16.35%]",
          "after:to-transparent after:to-[49.69%]"
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
              <div className="absolute top-0 left-0 right-0 bottom-0">
                <SkeletonLoader />
              </div>
            )}
          </>
        )}
        <div className="absolute right-3 top-2 z-10 border-b-2 border-white "></div>
        <div className="absolute top-0 right-0 text-white p-4 z-2 flex gap-2">
          <p className="text-[12px] uppercase">
            Recept
            <span className="flex w-full h-px bg-white"></span>
          </p>
        </div>
      </Link>

      <div className="h-24 rounded-b-[10px] flex flex-col gap-1 py-2 px-2 bg-[#F5F5F5]">

          <p className="text-[#333] text-[12px] uppercase">
            {recipe?.acf_recipe?.skrivetAv
              ? recipe?.acf_recipe?.skrivetAv[0]?.name
              : "DinVinguide"}
          </p>

          {recipe?.title && (
            <h2>

              <Link
                href={`/recept/${recipe?.slug}`}
                aria-label={`Läs om ${recipe?.title}`}
                className="line-clamp-2 font-sub mb-2 text-[18px] text-brand-dark lg:group-hover:underline"
              >
                {recipe.title}
              </Link>
            </h2>
          )}


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
