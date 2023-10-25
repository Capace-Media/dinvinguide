import { getRecipes } from "@/lib/queries/getRecipes";
import handleParse from "@/lib/utils/handleParse";
import Image from "next/image";
import Link from "next/link";
import HandleImage from "../image";

async function fetchRecipes() {
  const data = await getRecipes();

  return data;
}

const ExploreRecipes = async () => {
  const data = await fetchRecipes();

  return (
    <section className="relative w-full">
      <div className="layout min-h-[322px] py-4 md:py-11 lg:py-20  bg-brand-secondary lg:min-h-[448px]">
        <div className="flex flex-col justify-between min-h-[278px] lg:w-[40%]">
          <div className=" recipe_parse">
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

      <div className="recipe-grid layout py-4 md:py-11 lg:py-20">
        <div className=""></div>
        {data?.recipes?.nodes &&
          data.recipes.nodes.map((recipe: any) => {
            return (
              <Link href="/" key={recipe.id} className="relative">
                <HandleImage
                  srcProp={recipe?.featuredImage?.node?.mediaItemUrl}
                  altProp={recipe?.featuredImage?.node?.altText}
                  objectFitProp="cover"
                  classesProp="relative w-full h-full  recipe-overlay"
                />
                <div className="absolute top-0 right-0 text-white p-4 flex gap-2">
                  {recipe?.acf_recipe?.recepieCategories &&
                    recipe?.acf_recipe?.recepieCategories.map((tax: any) => {
                      switch (tax.slug) {
                        case "huvudratter":
                          return (
                            <p key={tax.slug} className="">
                              {tax.name}{" "}
                              <span className="flex w-full h-[3px] bg-white"></span>
                            </p>
                          );
                        case "frukost":
                          return (
                            <p key={tax.slug} className="">
                              {tax.name}{" "}
                              <span className="flex w-full h-[3px] bg-white"></span>
                            </p>
                          );
                        case "forratter":
                          return (
                            <p key={tax.slug} className="">
                              {tax.name}{" "}
                              <span className="flex w-full h-[3px] bg-white"></span>
                            </p>
                          );
                        case "efterratter":
                          return (
                            <p key={tax.slug} className="">
                              {tax.name}{" "}
                              <span className="flex w-full h-[3px] bg-white"></span>
                            </p>
                          );
                        case "specialkost":
                          return (
                            <p key={tax.slug} className="">
                              {tax.name}{" "}
                              <span className="flex w-full h-[3px] bg-white"></span>
                            </p>
                          );
                        case "tilltugg-snacks":
                          return (
                            <p key={tax.slug} className="">
                              {tax.name}{" "}
                              <span className="flex w-full h-[3px] bg-white"></span>
                            </p>
                          );
                        default:
                          break;
                      }
                    })}
                </div>
                <div className="absolute bottom-0 left-0 p-4 lg:w-[70%] z-10 text-white">
                  {recipe?.acf_recipe?.skrivetAv && (
                    <p className="text-[14px]">
                      {recipe.acf_recipe.skrivetAv[0].name}
                    </p>
                  )}
                  {recipe?.title && (
                    <h2 className="text-[20px] font-sub">{recipe.title}</h2>
                  )}
                </div>
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default ExploreRecipes;
