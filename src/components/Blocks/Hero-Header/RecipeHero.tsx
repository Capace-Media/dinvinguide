import HandleImage from "@/app/_components/image";
import handleParse from "@/lib/utils/handleParse";
import Image from "next/image";
import Link from "next/link";
import links from "./recipeTax.json";
interface RecipeHeroProps {
  promise?: any;
}

const RecipeHero = async ({ promise }: RecipeHeroProps) => {
  const data = await promise;

  return (
    <div className="layout w-full py-[73px] md:pt-[172px] bg-white">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-[180px] order-last md:order-first">
        <div className="flex flex-col justify-between min-h-[461px]">
          <div className="flex flex-col gap-6 ">
            <div className="">
              {handleParse(data?.page?.page_content?.intro)}
            </div>
            <ul className="font-main text-brand-primary uppercase flex whitespace-nowrap flex-wrap gap-4 font-medium">
              {links?.recipeCategories &&
                links.recipeCategories.map((link: any) => {
                  return (
                    <li
                      key={link.id}
                      className="flex flex-col lg:hover:scale-105 lg:ease-in-out lg:duration-300 justify-center items-center"
                    >
                      <Link href={link.uri}>{link.title}</Link>
                      <span className="w-full  h-[2px] block bg-brand-primary"></span>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>

        <div className="w-full  order-first h-[370px] relative md:order-last lg:h-[520px]">
          <ul className="absolute recipe_page_grid w-[100%] center-y left-0 h-[89%] z-10">
            {data?.recipes?.nodes &&
              data.recipes.nodes.map((recipe: any, index: number) => {
                return (
                  <li key={recipe.id + index}>
                    <Link href={`/recept/${recipe?.slug}`} className="relative">
                      <HandleImage
                        srcProp={recipe?.featuredImage?.node?.mediaItemUrl}
                        altProp={recipe?.featuredImage?.node?.altText}
                        objectFitProp="cover"
                        classesProp="relative w-full h-full recipe-overlay"
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
                            <p
                              key={displayTax.slug}
                              className="text-[12px] uppercase"
                            >
                              {displayTax.name}
                              <span className="flex w-full h-[3px] bg-white"></span>
                            </p>
                          ) : null;
                        })()}
                      </div>
                      <div className="absolute bottom-0 pointer-events-none w-[300px] left-0 p-4 z-10">
                        {recipe?.acf_recipe?.skrivetAv && (
                          <p className="md:text-[12px] md:uppercase text-white text-[12px]">
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
                  </li>
                );
              })}
          </ul>
          <div className=" bg-brand-beige w-[85%] md:w-[100%] h-[100%] center-y absolute -right-4 md:-right-11 lg:-right-20"></div>
        </div>
      </div>
    </div>
  );
};

export default RecipeHero;
