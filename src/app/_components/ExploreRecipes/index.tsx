import { getHighlightedRecipes, getRecipes } from "@/lib/queries/getRecipes";
import handleParse from "@/lib/utils/handleParse";
import { cn } from "@/lib/utils";
import Link from "next/link";
import HandleImage from "../image";

async function fetchRecipes() {
  const data = await getRecipes();

  const recipe = await getHighlightedRecipes();

  return {
    data: data,
    recipe: recipe,
  };
}

type Recipe = {
  id: string;
  slug: string;
  featuredImage?: {
    node?: {
      mediaItemUrl: string;
      altText: string;
      mediaDetails?: {
        width?: number;
        height?: number;
      };
    };
  };
  acf_recipe?: {
    recepieCategories?: Array<{
      slug: string;
      name: string;
    }>;
    skrivetAv?: Array<{ name: string }>;
  };
  title?: string;
};

// Helper function to determine the size property based on index.
const getSizeProp = (index: number): string => {
  const sizesMapping: any = {
    0: "(max-width: 768px) 90vw, (max-width: 1024px) 90vw, (max-width: 1790px) 44vw, 799px",
    1: "(max-width: 768px) 90vw, (max-width: 1024px) 48vw, (max-width: 1790px) 25vw, 390px",
    2: "(max-width: 768px) 90vw, (max-width: 1024px) 48vw, (max-width: 1790px) 25vw, 390px",
    3: "(max-width: 768px) 90vw, (max-width: 1024px) 48vw, (max-width: 1790px) 25vw, 390px",
    4: "(max-width: 768px) 90vw, (max-width: 1024px) 48vw, (max-width: 1790px) 25vw, 390px",
    5: "(max-width: 768px) 90vw, (max-width: 1024px) 43vw, (max-width: 1790px) 44vw, 800px",
  };

  return sizesMapping[index] || sizesMapping[1];
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

const ExploreRecipes: React.FC = async () => {
  const res = await fetchRecipes();

  const { data, recipe } = res;

  const highlightedRecipe: any[] = recipe;

  const latestRecipe: any[] = data?.recipes?.nodes;

  let initialLatestCount = 7 - Math.min(7, highlightedRecipe.length);

  // Ensure we do not add more latestArticles than available or exceed the total count of 8
  let combinedArticles = latestRecipe.slice(0, initialLatestCount);

  // Calculate remaining slots after adding the initial set of latestRecipe
  let remainingSlots = 8 - combinedArticles.length;

  // Add highlightedRecipe to fill up the remaining slots, ensuring not to exceed 8 in total
  let additionalHighlighted = highlightedRecipe.slice(0, remainingSlots);

  combinedArticles = [...combinedArticles, ...additionalHighlighted];
  return (
    <section className="relative w-full ">
      <div className="layout min-h-[322px] py-4 md:py-11 lg:py-20 bg-brand-secondary lg:min-h-[448px]">
        <div className="flex flex-col justify-between min-h-[278px] lg:w-[40%]">
          <div className="recipe_parse">
            {handleParse(data?.page?.page_content?.intro)}
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link
              className="lg:hover:scale-105 lg:duration-300 lg:ease-in-out uppercase text-brand-secondary flex flex-col justify-center items-center text-[14px] bg-white px-3 py-2"
              href="/recept/receptbanken"
            >
              Alla Recept
            </Link>
            <Link
              className="lg:hover:scale-105 lg:duration-300 lg:ease-in-out uppercase flex flex-col justify-between gap-2 text-white text-[14px] px-3 items-center h-[39px]"
              href="/recept/maltider/frukost"
            >
              <span></span>
              frukost
              <span className="bg-white w-full h-[3px] flex"></span>
            </Link>
            <Link
              className="lg:hover:scale-105 lg:duration-300 lg:ease-in-out uppercase flex flex-col justify-between gap-2 text-white text-[14px] px-3 items-center h-[39px]"
              href="/recept/maltider/efterratter"
            >
              <span></span>
              efterrätter
              <span className="bg-white w-full h-[3px] flex"></span>
            </Link>
            <Link
              className="lg:hover:scale-105 lg:duration-300 lg:ease-in-out uppercase flex flex-col justify-between gap-2 text-white text-[14px] px-3 items-center h-[39px]"
              href="/recept/maltider/huvudratter"
            >
              <span></span>
              huvudrätter
              <span className="bg-white w-full h-[3px] flex"></span>
            </Link>
          </div>
        </div>
      </div>

      <div className="layout lg:h-[720px] bg-white"></div>

      <div
        className={cn(
          "grid gap-2 grid-cols-2 grid-rows-[repeat(5,minmax(150px,1fr))] pointer-events-none md:gap-3",
          "lg:gap-5 lg:absolute lg:top-0 lg:left-1/2 lg:-translate-x-1/2 lg:size-full lg:grid-cols-4 lg:grid-rows-[repeat(8,minmax(109px,1fr))]",
          "bg-white lg:bg-transparent layout py-4 md:py-11 lg:py-20"
        )}
      >
        {/* Empty cell that reserves the space under the intro text on desktop */}
        <div className="hidden lg:block lg:col-span-2 lg:row-span-3"></div>
        {combinedArticles &&
          combinedArticles.map((recipe: Recipe, index: number) => (
            <Link
              href={`/recept/${recipe?.slug}`}
              key={recipe?.id}
              className={cn("relative", gridItemClasses[index])}
            >
              <HandleImage
                srcProp={recipe?.featuredImage?.node?.mediaItemUrl}
                altProp={recipe?.featuredImage?.node?.altText}
                objectFitProp="cover"
                classesProp={cn(
                  "relative w-full h-full overflow-hidden",
                  "[&_img]:transition-transform [&_img]:duration-300 [&_img]:ease-in-out [&_img]:hover:scale-[1.19]",
                  "after:absolute after:inset-0 after:pointer-events-none after:bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.203)_100%)]"
                )}
                sizesProp={getSizeProp(index)}
              />
              <div className="absolute top-0 right-0 text-white p-4 flex gap-2">
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

                  const displayTax =
                    recipe?.acf_recipe?.recepieCategories?.find(
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
              <div className="absolute bottom-0 pointer-events-none left-0 p-4 lg:w-[70%] z-10 text-white">
                {recipe?.acf_recipe?.skrivetAv && (
                  <p className="md:text-[12px] md:uppercase text-[12px]">
                    {recipe?.acf_recipe?.skrivetAv[0]?.name}
                  </p>
                )}
                {recipe?.title && (
                  <h2 className="md:text-[18px] leading-6 text-[16px] text-white lowercase font-sub">
                    {recipe.title}
                  </h2>
                )}
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default ExploreRecipes;
