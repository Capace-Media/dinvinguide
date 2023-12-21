import Image from "next/image";
import Link from "next/link";

interface DrinkProps {
  data: any;
}

const Drink = ({ data }: DrinkProps) => {
  return (
    <article className="lg:grid-cols-2 grid gap-8 relative z-10 layout">
      <div className={`relative `}>
        {data?.featuredImage && data?.featuredImage.node && (
          <Link href={data.uri} className={`flex justify-center `}>
            <figure className={`relative w-[200px] h-[522px]  `}>
              <Image
                src={data?.featuredImage?.node?.mediaItemUrl}
                fill
                style={{
                  objectFit: "contain",
                  alignContent: "end",
                }}
                alt={
                  data.featuredImage.node.altText
                    ? data.featuredImage.node.altText
                    : `Bild på ${data?.title}`
                }
                sizes="200px"
              />
            </figure>
          </Link>
        )}
      </div>

      <div className="flex justify-center items-center ">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-1">
            <Link href={data.uri}>
              <h2 className="normal-case text-[38px] leading-10 font-display">
                {data.title}
              </h2>
            </Link>

            {data?.acf_drinks?.land && (
              <p className="space-x-1">
                {data?.acf_drinks?.land && (
                  <span>{data?.acf_drinks?.land}</span>
                )}
                {data?.acf_drinks?.argang && (
                  <span>{data?.acf_drinks?.argang}</span>
                )}
              </p>
            )}
            <p className="flex items-center gap-3">
              {/* <Flaska /> */}
              {data.acf_drinks.forpackningar.name && (
                <span>{data?.acf_drinks?.forpackningar.name}</span>
              )}
              {data.acf_drinks.dryckestyper && (
                <span>- {data?.acf_drinks?.dryckestyper.name}</span>
              )}
            </p>
            {/* test */}

            {data.acf_drinks.passarTillRecept &&
              data.acf_drinks.passarTillRecept.length > 0 && (
                <div className="flex items-baseline gap-3">
                  {/* <Passar /> */}

                  <p>
                    <span>Passar till: </span>
                    <Link
                      className="underline"
                      href={data.acf_drinks.passarTillRecept[0].uri}
                    >
                      {data.acf_drinks.passarTillRecept[0].title}
                    </Link>
                  </p>
                </div>
              )}
            {data.acf_drinks.pris && (
              <p className="flex items-center gap-3">
                {/* <Dollar /> */}
                <span>{data.acf_drinks.pris}:-</span>
              </p>
            )}
          </div>

          <Link href={data.uri} className="flex items-center gap-3">
            <span>Läs mer om vinet</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Drink;
