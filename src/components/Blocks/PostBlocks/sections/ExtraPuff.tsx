import HandleImage from "@/app/components/image";
import handleParse from "@/lib/utils/handleParse";
import Image from "next/image";
import Link from "next/link";

interface ExtraPuffProps {
  content: any;
}

const ExtraPuff = ({ content }: ExtraPuffProps) => {
  const data = content && content?.extraPuff && content?.extraPuff[0];

  // const grapeRegex = new RegExp("^/druvor/");
  // const drinkRegex = new RegExp("^/drycker/");
  // const recipeRegex = new RegExp("^/recept/");

  if (data?.__typename === "Grape") {
    return <GrapeComponent data={data} />;
  } else if (data?.__typename === "Drink") {
    return <DrinkComponent data={data} />;
  } else if (data?.__typename === "Recipe") {
    return <RecipeComponent data={data} />;
  } else {
    // Fallback or default content
    return <div>Default Content for {data.title}</div>;
  }
};

export default ExtraPuff;

function GrapeComponent({ data }: any) {
  return (
    <section
      id="extraPuff"
      className="relative w-full gap-10 flex h-[330px] py-[2rem]"
    >
      <div className="lg:w-[40%] hidden lg:flex lg:flex-col justify-center">
        {data?.title && (
          <Link
            className="flex flex-col group"
            href={`/druvor/${data?.slug}`}
            aria-label={`Läs mer om ${data?.title}`}
          >
            <span className="group-hover:underline font-main uppercase text-[13px]">
              druvor
            </span>
            <span className="group-hover:underline font-sub text-[22px]">
              {data.title}
            </span>
          </Link>
        )}
        {data?.acf_grape?.kortBeskrivning && (
          <p className="text-[14px]">{data.acf_grape.kortBeskrivning}</p>
        )}

        <Link
          href={`/druvor/${data?.slug}`}
          aria-label={`Läs mer om ${data?.title}`}
          className="btn w-[142px] mt-8"
        >
          Läs mer
        </Link>
      </div>
      <Link
        href={`/druvor/${data?.slug}`}
        aria-label={`Läs mer om ${data?.title}`}
        className="relative w-full lg:w-[60%]"
      >
        <HandleImage
          srcProp={data?.featuredImage?.node?.mediaItemUrl}
          altProp={data?.featuredImage?.node?.altText}
          objectFitProp="cover"
          classesProp="relative w-full h-full recipe-overlay"
        />
        <div className="absolute top-0 right-0 text-white p-4 flex gap-2"></div>
        <div className="absolute bottom-0 pointer-events-none left-0 p-4 lg:w-[70%] z-10 text-white">
          <p className="md:text-[12px] md:uppercase text-[12px] text-white">
            Druva
          </p>

          {data?.title && (
            <h2 className="md:text-[18px] leading-6 text-[16px] lowercase font-sub text-white">
              {data.title}
            </h2>
          )}
        </div>
      </Link>
    </section>
  );
}

// DrinkComponent.js
function DrinkComponent({ data }: any) {
  return (
    <div id="extraPuffDrink" className="flex justify-center group">
      <div className="min-w-[200px] h-[350px] relative shake-image">
        <Image
          src={data.featuredImage.node.mediaItemUrl}
          alt={
            data?.featuredImage?.node?.altText
              ? data.featuredImage.node.altText
              : `bild på ${data?.title}`
          }
          fill
          style={{
            objectFit: "contain",
          }}
          sizes="(min-width: 1200px) 300px, (min-width: 768px) 384px, 100vw"
          className=""
        />
      </div>
      <div className="w-[50%] flex flex-col justify-center">
        {data?.title && (
          <Link
            className="flex flex-col group"
            href={`/drycker/${data?.slug}`}
            aria-label={`Läs mer om ${data?.title}`}
          >
            <span className="group-hover:underline font-main uppercase text-[13px]">
              drycker
            </span>
            <span className="group-hover:underline font-sub text-[22px]">
              {data.title}
            </span>
          </Link>
        )}
        {/* {data?.acf_data?.skrivetAv && (
          <p className="md:text-[12px] md:uppercase text-[12px] ">
            {data.acf_data.skrivetAv[0].name}
          </p>
        )} */}
        {data?.acf_recipe?.desc && (
          <div className="md:text-[12px] text-[12px] ">
            {handleParse(data.acf_recipe.desc)}
          </div>
        )}
        <Link
          href={`/drycker/${data?.slug}`}
          aria-label={`Läs mer om ${data?.title}`}
          className="btn w-[142px] mt-8"
        >
          Läs mer
        </Link>
      </div>
    </div>
  );
}

// RecipeComponent.js
function RecipeComponent({ data }: any) {
  return (
    <section
      id="extraPuffRecipe"
      className="relative w-full gap-10 flex h-[330px] py-[2rem] "
    >
      <div className="md:w-[50%] w-full flex flex-col justify-center">
        {data?.title && (
          <Link
            className="flex flex-col group"
            href={`/recept/${data?.slug}`}
            aria-label={`Läs mer om ${data?.title}`}
          >
            <span className="group-hover:underline font-main uppercase text-[13px]">
              recept
            </span>
            <span className="group-hover:underline font-sub text-[22px]">
              {data.title}
            </span>
          </Link>
        )}
        {/* {data?.acf_data?.skrivetAv && (
          <p className="md:text-[12px] md:uppercase text-[12px] ">
            {data.acf_data.skrivetAv[0].name}
          </p>
        )} */}
        {data?.acf_recipe?.desc && (
          <div className="md:text-[12px] text-[12px] ">
            {handleParse(data.acf_recipe.desc)}
          </div>
        )}
        <Link
          href={`/recept/${data?.slug}`}
          aria-label={`Läs mer om ${data?.title}`}
          className="btn w-[142px] mt-8"
        >
          Läs mer
        </Link>
      </div>

      <div className="w-[50%] h-full hidden md:block">
        <div className="relative w-full h-full recipe-overlay">
          <Image
            src={data?.featuredImage?.node?.mediaItemUrl}
            alt={data?.featuredImage?.node?.altText}
            style={{ objectFit: "cover" }}
            fill
          />
          <div className="absolute bottom-0 left-0 p-2 z-[4]">
            <p className="flex flex-col ">
              <span className="text-white group-hover:underline font-main uppercase text-[12px]">
                {data?.acf_data?.skrivetAv
                  ? data.acf_data.skrivetAv[0].name
                  : "-"}
              </span>
              <span className="text-white group-hover:underline font-sub text-[16px]">
                {data.title}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
