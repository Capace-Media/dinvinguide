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
    <div className="layout w-full bg-white py-17">
      <div className="order-last grid gap-10 md:order-first md:grid-cols-2 lg:gap-45">
        <div className="flex min-h-115.25 flex-col justify-between">
          <div className="flex flex-col gap-6">
            <div className="">
              {handleParse(data?.page?.page_content?.intro)}
            </div>
            <ul className="flex flex-wrap gap-4 font-main font-medium whitespace-nowrap text-brand-primary uppercase">
              {links?.recipeCategories?.map((link: any) => {
                return (
                  <li
                    key={link.id}
                    className="flex flex-col items-center justify-center lg:duration-300 lg:ease-in-out lg:hover:scale-105"
                  >
                    <Link href={link.uri}>{link.title}</Link>
                    <span className="block h-0.5 w-full bg-brand-primary"></span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="relative order-first h-92.5 w-full md:order-last lg:h-130">
          <ul className="center-y pointer-events-none absolute left-0 z-10 grid h-[89%] w-full grid-cols-2 grid-rows-2 gap-2">
            {data?.recipes?.nodes?.map((recipe: any, index: number) => {
              return (
                <li
                  key={recipe.id}
                  className={cn(
                    "pointer-events-auto",
                    index === 0 && "row-span-2",
                  )}
                >
                  <Link
                    href={`/recept/${recipe?.slug}`}
                    className="relative block h-full w-full overflow-hidden"
                  >
                    <HandleImage
                      srcProp={recipe?.featuredImage?.node?.mediaItemUrl}
                      altProp={recipe?.featuredImage?.node?.altText}
                      objectFitProp="cover"
                      classesProp={cn(
                        "relative h-full w-full overflow-hidden",
                        "after:pointer-events-none after:absolute after:inset-0 after:content-['']",
                        "after:bg-linear-to-b after:from-transparent after:to-black/30",
                        "[&_img]:transition-transform [&_img]:duration-300 [&_img]:ease-in-out",
                        "hover:[&_img]:scale-119",
                      )}
                    />
                    <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-full p-4">
                      {recipe?.acf_recipe?.skrivetAv?.[0]?.name && (
                        <p className="line-clamp-1 text-[12px] text-white md:text-[12px] md:uppercase">
                          {recipe.acf_recipe.skrivetAv[0].name}
                        </p>
                      )}
                      {recipe?.title && (
                        <h2
                          className={cn(
                            "font-sub text-[16px] leading-6 text-white lowercase md:text-[18px]",
                            // långa titlar får inte växa ut ur kortet
                            index === 0
                              ? "line-clamp-5 lg:line-clamp-6"
                              : "line-clamp-2 lg:line-clamp-4",
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
          <div className="center-y absolute -right-4 h-full w-[85%] bg-brand-beige md:-right-11 md:w-full lg:-right-20"></div>
        </div>
      </div>
    </div>
  );
};

export default RecipeHero;
