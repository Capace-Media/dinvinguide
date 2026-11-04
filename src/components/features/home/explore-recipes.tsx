import HandleImage from "@/components/shared/handle-image";
import type { FrontPageRecipe } from "@/lib/api/pages/get-pages";
import { cn } from "@/lib/utils";
import handleParse from "@/lib/utils/handleParse";
import { mergeLatestWithHighlighted } from "@/lib/utils/merge-latest-with-highlighted";
import Link from "next/link";

const RECIPE_COUNT = 7;

const LARGE_SIZES =
  "(max-width: 768px) 90vw, (max-width: 1024px) 90vw, (max-width: 1790px) 44vw, 799px";
const SMALL_SIZES =
  "(max-width: 768px) 90vw, (max-width: 1024px) 48vw, (max-width: 1790px) 25vw, 390px";
const WIDE_SIZES =
  "(max-width: 768px) 90vw, (max-width: 1024px) 43vw, (max-width: 1790px) 44vw, 800px";

// Image `sizes` per grid position, matching `gridItemClasses` below.
const getSizeProp = (index: number): string => {
  if (index === 0) return LARGE_SIZES;
  if (index === 5) return WIDE_SIZES;
  return SMALL_SIZES;
};

// Per-item grid placement (mobile: 2 cols, desktop: 4 cols). Items past the
// list keep the grid's pointer-events-none, matching the original layout.
const gridItemClasses = [
  "col-span-2 lg:row-span-4",
  "lg:row-span-3",
  "lg:row-span-3",
  "lg:row-span-4",
  "row-span-2",
  "row-span-2 lg:col-span-2",
  "lg:row-span-2",
].map((classes) => `pointer-events-auto ${classes}`);

// The first category in this order is shown as the recipe's label.
const CATEGORY_ORDER = [
  "huvudratter",
  "frukost",
  "forratter",
  "efterratter",
  "tilltugg-snacks",
  "specialkost",
] as const;

const getDisplayCategory = (recipe: FrontPageRecipe) => {
  const categories = recipe.acf_recipe?.recepieCategories ?? [];
  const slug = CATEGORY_ORDER.find((orderSlug) =>
    categories.some((category) => category?.slug === orderSlug),
  );
  return categories.find((category) => category?.slug === slug);
};

interface ExploreRecipesProps {
  intro?: string | null;
  latest: readonly FrontPageRecipe[];
  highlighted: readonly FrontPageRecipe[];
}

const ExploreRecipes = ({
  intro,
  latest,
  highlighted,
}: ExploreRecipesProps) => {
  const recipes = mergeLatestWithHighlighted(latest, highlighted, RECIPE_COUNT);

  return (
    <section className="relative w-full">
      <div className="layout min-h-80.5 bg-brand-secondary py-4 md:py-11 lg:min-h-112 lg:py-20">
        <div className="flex min-h-69.5 flex-col justify-between lg:w-[40%]">
          <div className="recipe_parse">{handleParse(intro ?? undefined)}</div>
          <div className="flex flex-wrap gap-3">
            <Link
              className="flex flex-col items-center justify-center bg-white px-3 py-2 text-[14px] text-brand-secondary uppercase lg:duration-300 lg:ease-in-out lg:hover:scale-105"
              href="/recept/receptbanken"
            >
              Alla Recept
            </Link>
            <Link
              className="flex h-9.75 flex-col items-center justify-between gap-2 px-3 text-[14px] text-white uppercase lg:duration-300 lg:ease-in-out lg:hover:scale-105"
              href="/recept/maltider/frukost"
            >
              <span></span>
              frukost
              <span className="flex h-0.75 w-full bg-white"></span>
            </Link>
            <Link
              className="flex h-9.75 flex-col items-center justify-between gap-2 px-3 text-[14px] text-white uppercase lg:duration-300 lg:ease-in-out lg:hover:scale-105"
              href="/recept/maltider/efterratter"
            >
              <span></span>
              efterrätter
              <span className="flex h-0.75 w-full bg-white"></span>
            </Link>
            <Link
              className="flex h-9.75 flex-col items-center justify-between gap-2 px-3 text-[14px] text-white uppercase lg:duration-300 lg:ease-in-out lg:hover:scale-105"
              href="/recept/maltider/huvudratter"
            >
              <span></span>
              huvudrätter
              <span className="flex h-0.75 w-full bg-white"></span>
            </Link>
          </div>
        </div>
      </div>

      <div className="layout bg-white lg:h-180"></div>

      <div
        className={cn(
          "pointer-events-none grid grid-cols-2 grid-rows-[repeat(5,minmax(150px,1fr))] gap-2 md:gap-3",
          "lg:absolute lg:top-0 lg:left-1/2 lg:size-full lg:-translate-x-1/2 lg:grid-cols-4 lg:grid-rows-[repeat(8,minmax(109px,1fr))] lg:gap-5",
          "layout bg-white py-4 md:py-11 lg:bg-transparent lg:py-20",
        )}
      >
        {/* Empty cell that reserves the space under the intro text on desktop */}
        <div className="hidden lg:col-span-2 lg:row-span-3 lg:block"></div>
        {recipes.map((recipe, index) => {
          const category = getDisplayCategory(recipe);
          const author = recipe.acf_recipe?.skrivetAv?.[0];

          return (
            <Link
              href={`/recept/${recipe.slug}`}
              key={recipe.id}
              className={cn("relative", gridItemClasses[index])}
            >
              <HandleImage
                srcProp={recipe.featuredImage?.node.mediaItemUrl}
                altProp={recipe.featuredImage?.node.altText}
                objectFitProp="cover"
                classesProp={cn(
                  "relative h-full w-full overflow-hidden",
                  "[&_img]:transition-transform [&_img]:duration-300 [&_img]:ease-in-out [&_img]:hover:scale-[1.19]",
                  "after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.203)_100%)]",
                )}
                sizesProp={getSizeProp(index)}
              />
              <div className="absolute top-0 right-0 flex gap-2 p-4 text-white">
                {category && (
                  <p className="text-[12px] uppercase">
                    {category.name}
                    <span className="flex h-0.75 w-full bg-white"></span>
                  </p>
                )}
              </div>
              <div className="pointer-events-none absolute bottom-0 left-0 z-10 p-4 text-white lg:w-[70%]">
                {author && (
                  <p className="text-[12px] md:text-[12px] md:uppercase">
                    {author.name}
                  </p>
                )}
                <h2 className="font-sub text-[16px] leading-6 text-white lowercase md:text-[18px]">
                  {recipe.title}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ExploreRecipes;
