import { getRecipes } from "@/lib/queries/getRecipes";
import handleParse from "@/lib/utils/handleParse";
import Link from "next/link";
import HandleImage from "../image";

async function fetchRecipes() {
  const data = await getRecipes();

  return data;
}

type Recipe = {
  id: string;
  slug: string;
  featuredImage?: {
    node?: {
      mediaItemUrl: string;
      altText: string;
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
    0: "(min-width: 1880px) 799px, (min-width: 1040px) calc(45vw - 38px), (min-width: 780px) calc(100vw - 88px), calc(100vw - 32px)",
    1: "(min-width: 1880px) 389px, (min-width: 1040px) calc(22.44vw - 28px), (min-width: 780px) calc(50vw - 50px), calc(50vw - 20px)",
    5: "(min-width: 1880px) 799px, (min-width: 1040px) calc(45vw - 38px), (min-width: 780px) calc(50vw - 50px), calc(50vw - 20px)",
  };

  return sizesMapping[index] || sizesMapping[1];
};

const ExploreRecipes: React.FC = async () => {
  const data = await fetchRecipes();

  return (
    <section className="relative w-full ">
      <div className="layout min-h-[322px] py-4 md:py-11 lg:py-20 bg-brand-secondary lg:min-h-[448px]">
        <div className="flex flex-col justify-between min-h-[278px] lg:w-[40%]">
          <div className="recipe_parse">
            {handleParse(data?.page?.page_content?.intro)}
          </div>
          <div className="flex gap-3">
            <Link
              className="lg:hover:scale-105 lg:duration-300 lg:ease-in-out uppercase text-brand-secondary flex flex-col justify-center items-center text-[14px] bg-white px-3 py-2"
              href="/"
            >
              Alla Recept
            </Link>
            <Link
              className="lg:hover:scale-105 lg:duration-300 lg:ease-in-out uppercase flex flex-col justify-between gap-2 text-white text-[14px] px-3 items-center h-[39px]"
              href="/"
            >
              <span></span>
              frukost
              <span className="bg-white w-full h-[3px] flex"></span>
            </Link>
            <Link
              className="lg:hover:scale-105 lg:duration-300 lg:ease-in-out uppercase flex flex-col justify-between gap-2 text-white text-[14px] px-3 items-center h-[39px]"
              href="/"
            >
              <span></span>
              lunch
              <span className="bg-white w-full h-[3px] flex"></span>
            </Link>
            <Link
              className="lg:hover:scale-105 lg:duration-300 lg:ease-in-out uppercase flex flex-col justify-between gap-2 text-white text-[14px] px-3 items-center h-[39px]"
              href="/"
            >
              <span></span>
              middag
              <span className="bg-white w-full h-[3px] flex"></span>
            </Link>
          </div>
        </div>
      </div>

      <div className="layout lg:h-[720px] bg-white"></div>

      <div className="recipe-grid bg-white lg:bg-transparent layout py-4 md:py-11 lg:py-20">
        <div></div>
        {data?.recipes?.nodes &&
          data.recipes.nodes.map((recipe: Recipe, index: number) => (
            <Link
              href={`/recept/${recipe?.slug}`}
              key={recipe?.id}
              className="relative "
            >
              <HandleImage
                srcProp={recipe?.featuredImage?.node?.mediaItemUrl}
                altProp={recipe?.featuredImage?.node?.altText}
                objectFitProp="cover"
                classesProp="relative w-full h-full recipe-overlay"
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
                    {recipe.acf_recipe.skrivetAv[0].name}
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
