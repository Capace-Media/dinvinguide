import { DlNextArrow } from "@/components/icons";
import handleParse from "@/lib/utils/handleParse";
import PrettyDate from "@/lib/utils/prettyDate";
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
            <div>
              <p>{PrettyDate(data?.date)}</p>
            </div>

            <h2 className="normal-case text-[38px] leading-10 font-display">
              {data.title}
            </h2>
            {data?.leverantorer_to_drink?.leverantorer?.length > 0 && (
              <div className="flex items-center gap-2 py-2">
                <h2 className="uppercase text-base">Importör: </h2>
                <Link
                  href={`/importorer/${data?.leverantorer_to_drink?.leverantorer[0].slug}`}
                  className="underline text-brand-primary"
                >
                  <span className="sr-only">Läs mer om </span>
                  {data?.leverantorer_to_drink?.leverantorer[0].title}
                </Link>
              </div>
            )}

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
              {data?.acf_drinks?.forpackningar?.name && (
                <span>{data?.acf_drinks?.forpackningar.name}</span>
              )}
              {data?.acf_drinks?.dryckestyper && (
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
                <div>{handleParse(data.acf_drinks?.recension)}</div>
              </div>
            )}
          </div>
          {data?.acf_drinks?.bolagetAdress &&
          data?.acf_drinks?.bolagetAdress.includes("https://") ? (
            <a
              href={data.acf_drinks.bolagetAdress}
              className="flex items-center gap-3 lg:hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                Beställ på{" "}
                {new URL(data.acf_drinks.bolagetAdress).hostname.replace(
                  "www.",
                  ""
                )}
              </span>
              <DlNextArrow />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default Drink;
