import HandleImage from "@/components/shared/handle-image";
import handleParse from "@/lib/utils/handleParse";
import { cn } from "@/lib/utils";
import Link from "next/link";
import links from "./recipeTax.json";
interface RecipeHeroProps {
  promise?: any;
}

const RecipeHero = async ({ promise }: RecipeHeroProps) => {
  const data = await promise;

  return (
    <div className="layout w-full py-17 bg-white">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-45 order-last md:order-first">
        <div className="flex flex-col justify-between min-h-115.25">
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
                      <span className="w-full  h-0.5 block bg-brand-primary"></span>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>

        <div className="w-full  order-first h-92.5 relative md:order-last lg:h-130">
          <ul className="absolute grid grid-cols-2 grid-rows-2 gap-2 pointer-events-none w-full center-y left-0 h-[89%] z-10">
            {data?.recipes?.nodes &&
              data.recipes.nodes.map((recipe: any, index: number) => {
                return (
                  <li
                    key={recipe.id + index}
                    className={cn(
                      "pointer-events-auto",
                      index === 0 && "row-span-2"
                    )}
                  >
                    <Link
                      href={`/recept/${recipe?.slug}`}
                      className="relative block w-full h-full overflow-hidden"
                    >
                      <HandleImage
                        srcProp={recipe?.featuredImage?.node?.mediaItemUrl}
                        altProp={recipe?.featuredImage?.node?.altText}
                        objectFitProp="cover"
                        classesProp={cn(
                          "relative w-full h-full overflow-hidden",
                          "after:content-[''] after:absolute after:inset-0 after:pointer-events-none",
                          "after:bg-linear-to-b after:from-transparent after:to-black/30",
                          "[&_img]:transition-transform [&_img]:duration-300 [&_img]:ease-in-out",
                          "hover:[&_img]:scale-119"
                        )}
                      />
                      <div className="absolute bottom-0 pointer-events-none w-full left-0 p-4 z-10">
                        {recipe?.acf_recipe?.skrivetAv?.[0]?.name && (
                          <p className="md:text-[12px] md:uppercase text-white text-[12px] line-clamp-1">
                            {recipe.acf_recipe.skrivetAv[0].name}
                          </p>
                        )}
                        {recipe?.title && (
                          <h2
                            className={cn(
                              "md:text-[18px] leading-6 text-[16px] text-white lowercase font-sub",
                              // långa titlar får inte växa ut ur kortet
                              index === 0 ? "line-clamp-5 lg:line-clamp-6" : "line-clamp-2 lg:line-clamp-4"
                            )}
                          >
                            {recipe.title}
                          </h2>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
          </ul>
          <div className=" bg-brand-beige w-[85%] md:w-full h-full center-y absolute -right-4 md:-right-11 lg:-right-20"></div>
        </div>
      </div>
    </div>
  );
};

export default RecipeHero;
