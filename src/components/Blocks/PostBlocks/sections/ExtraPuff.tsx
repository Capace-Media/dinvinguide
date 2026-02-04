
import handleParse from "@/lib/utils/handleParse";
import Image from "next/image";
import Link from "next/link";

interface ExtraPuffProps {
  content: any;
}

const ExtraPuff = ({ content }: ExtraPuffProps) => {
  if (!content?.extraPuff) {
    return null;
  }

  const data = content && content?.extraPuff && content?.extraPuff[0];

  if (!data) {
    return null;
  }

  if (data?.__typename === "Grape") {
    return <GrapeComponent data={data} />;
  } else if (data?.__typename === "Drink") {
    return <DrinkComponent data={data} />;
  } else if (data?.__typename === "Recipe") {
    return <RecipeComponent data={data} />;
  } else if (data?.__typename === "Drinktip") {
    return <DrinktipComponent data={data} />;
  } else {
    return null;
  }
};

export default ExtraPuff;

function GrapeComponent({ data }: any) {
  return (
    <section
      className="relative w-full gap-10 flex h-[330px] py-8 odd:flex-row even:flex-row-reverse"
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
        className="relative w-full group lg:w-[60%]"
      >

        <Image
          src={data?.featuredImage?.node?.mediaItemUrl}
          alt={
            data?.featuredImage?.node?.altText
              ? data.featuredImage.node.altText
              : `bild på ${data?.title}`
          }
          width={data?.featuredImage?.node?.mediaDetails?.width}
          height={data?.featuredImage?.node?.mediaDetails?.height}
          className="object-cover w-full h-full"
          sizes="(max-width: 1024px) 93vw, (max-width: 1790px) 29vw, 549px"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/15 to-transparent" />
        <div className="absolute bottom-0 pointer-events-none left-0 p-4 lg:w-[70%] z-10 text-white">
          <p className="text-[12px] text-white group-hover:underline">
            Druva
          </p>

          {data?.title && (
            <h2 className="md:text-[18px] leading-6 text-[16px] lowercase font-sub text-white group-hover:underline">
              {data.title}
            </h2>
          )}
        </div>
      </Link>
    </section>
  );
}

function DrinktipComponent({ data }: any) {
  return (
    <section className="flex justify-center group odd:flex-row even:flex-row-reverse">
      <div className="min-w-[200px] h-[350px] relative shake-image">
        <Image
          unoptimized
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
            href={`/dryckestips/${data?.slug}`}
            aria-label={`Läs mer om ${data?.title}`}
          >
            <span className="group-hover:underline font-main uppercase text-[13px]">
              Exklusiva dryckestips
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
          href={`/dryckestips/${data?.slug}`}
          aria-label={`Läs mer om ${data?.title}`}
          className="btn w-[142px] mt-8"
        >
          Läs mer <span className="sr-only">om {data?.title}</span>
        </Link>
      </div>
    </section>
  );
}

// DrinkComponent.js
function DrinkComponent({ data }: any) {
  return (
    <section className="flex justify-center group odd:flex-row even:flex-row-reverse">
      <div className="min-w-[200px] h-[350px] relative shake-image">
        <Image
          unoptimized
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
    </section>
  );
}

// RecipeComponent.js
function RecipeComponent({ data }: any) {
  return (
    <section
      className="relative w-full gap-10 flex h-[330px] py-8 odd:flex-row even:flex-row-reverse"
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

      <Link
        href={`/druvor/${data?.slug}`}
        aria-label={`Läs mer om ${data?.title}`}
        className="relative w-full group lg:w-[60%]"
      >

        <Image
          src={data?.featuredImage?.node?.mediaItemUrl}
          alt={data?.featuredImage?.node?.altText}
          width={data?.featuredImage?.node?.mediaDetails?.width}
          height={data?.featuredImage?.node?.mediaDetails?.height}
          className="object-cover w-full h-full"
          sizes="(max-width: 1024px) 93vw, (max-width: 1790px) 29vw, 549px"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/15 to-transparent" />
        <div className="absolute bottom-0 left-0 p-2 z-4 text-white">
          <p className="flex flex-col group-hover:underline">
            {data?.acf_data?.skrivetAv &&
              (

                <span className="group-hover:underline font-main uppercase text-[12px]">
                  {data.acf_data.skrivetAv[0].name}
                </span>
              )}
            <span className="group-hover:underline font-sub text-[16px]">
              {data.title}
            </span>
          </p>
        </div>

      </Link>
    </section>
  );
}
