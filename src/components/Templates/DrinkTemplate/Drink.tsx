import { DlNextArrow } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";

interface DrinkProps {
  data: any;
}

const Drink = ({ data }: DrinkProps) => {
  return (
    <article className="lg:grid-cols-2 grid gap-8 lg:gap-0 relative z-10 dl-layout">
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

      <div className="flex justify-center items-center">
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
                      href={`/recept/${data.acf_drinks.passarTillRecept[0].slug}`}
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
            {data?.acf_drinks?.recension && (
              <div className="py-4">
                <h3 className="uppercase">Recension:</h3>
                <p>{data.acf_drinks?.recension}</p>
              </div>
            )}
          </div>
          {data?.acf_drinks?.bolagetAdress &&
          data?.acf_drinks?.bolagetAdress.includes("https://") ? (
            <a
              href={data.acf_drinks.bolagetAdress}
              className="flex items-center gap-3"
              target="_blank"
              rel="noreferrer"
            >
              <span>Beställ på Systembolaget</span>
              <DlNextArrow />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default Drink;
