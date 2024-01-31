import HandleImage from "@/app/components/image";
import Link from "next/link";

interface ExtraPuffProps {
  content: any;
}

const ExtraPuff = ({ content }: ExtraPuffProps) => {
  const data = content && content?.extraPuff && content?.extraPuff[0];

  const grapeRegex = new RegExp("^/druvor/");
  const drinkRegex = new RegExp("^/drinks/");
  const recipeRegex = new RegExp("^/recept/");

  if (grapeRegex.test(data.uri)) {
    return <GrapeComponent data={data} />;
  } else if (drinkRegex.test(data.uri)) {
    return <DrinkComponent data={data} />;
  } else if (recipeRegex.test(data.uri)) {
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
      <div className="lg:w-[40%] hidden lg:flex lg:flex-col">
        <h2 className="text-[28px]">{data?.title}</h2>
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
    <div>
      <h2>{data.title}</h2>
      {/* Render other drink-specific details here */}
    </div>
  );
}

// RecipeComponent.js
function RecipeComponent({ data }: any) {
  return (
    <section className="py-[2rem]">
      <div className="relative w-full h-[330px]">
        <Link
          href={`/recept/receptbanken/${data?.slug}`}
          aria-label={`Läs mer om ${data?.title}`}
          className="relative"
        >
          <HandleImage
            srcProp={data?.featuredImage?.node?.mediaItemUrl}
            altProp={data?.featuredImage?.node?.altText}
            objectFitProp="cover"
            classesProp="relative w-full h-full recipe-overlay"
          />
          <div className="absolute top-0 right-0 text-white p-4 flex gap-2"></div>
          <div className="absolute bottom-0 pointer-events-none left-0 p-4 lg:w-[70%] z-10 text-white">
            {data?.acf_data?.skrivetAv && (
              <p className="md:text-[12px] md:uppercase text-[12px] text-white">
                {data.acf_data.skrivetAv[0].name}
              </p>
            )}
            {data?.title && (
              <h2 className="md:text-[18px] leading-6 text-[16px] lowercase font-sub text-white">
                {data.title}
              </h2>
            )}
          </div>
        </Link>
      </div>
    </section>
  );
}
