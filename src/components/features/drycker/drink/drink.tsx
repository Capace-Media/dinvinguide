import handleParse from "@/lib/utils/handleParse";
import PrettyDate from "@/lib/utils/prettyDate";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Drink } from "./types";

interface DrinkDetailsProps {
  drink: Drink;
}

const DrinkDetails = ({ drink }: DrinkDetailsProps) => {
  const acf = drink.acf_drinks;
  const importer = drink.leverantorer_to_drink?.leverantorer?.[0];
  const recipe = acf?.passarTillRecept?.[0];

  return (
    <article className="lg:grid-cols-2 grid gap-8 lg:gap-0 relative z-10 dl-layout">
      <div className="relative">
        {drink.featuredImage?.node.mediaItemUrl && (
          <Link href={drink.uri ?? ""} className="flex justify-center">
            <figure className="relative w-50 h-130.5">
              <Image
                src={drink.featuredImage.node.mediaItemUrl}
                fill
                style={{
                  objectFit: "contain",
                  alignContent: "end",
                }}
                alt={
                  drink.featuredImage.node.altText
                    ? drink.featuredImage.node.altText
                    : `Bild på ${drink.title}`
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
              <p>{PrettyDate(drink.date)}</p>
            </div>

            <h2 className="normal-case text-[38px] leading-10">
              {drink.title}
            </h2>
            {importer && (
              <div className="flex items-center gap-2 py-2">
                <h2 className="uppercase text-base">Importör: </h2>
                <Link
                  href={`/importorer/${importer.slug}`}
                  className="underline text-brand-primary"
                >
                  <span className="sr-only">Läs mer om </span>
                  {importer.title}
                </Link>
              </div>
            )}

            <p className="flex items-center gap-3">
              {acf?.forpackningar?.name && (
                <span>{acf.forpackningar.name}</span>
              )}
              {acf?.dryckestyper && <span>- {acf.dryckestyper.name}</span>}
            </p>

            {recipe && (
              <div className="flex items-baseline gap-3">
                <p>
                  <span>Passar till: </span>
                  <Link className="underline" href={`/recept/${recipe.slug}`}>
                    {recipe.title}
                  </Link>
                </p>
              </div>
            )}
            {acf?.pris && (
              <p className="flex items-center gap-3">
                <span>{acf.pris}:-</span>
              </p>
            )}
            {acf?.recension && (
              <div className="py-4">
                <h3 className="uppercase">Recension:</h3>
                <div>{handleParse(acf.recension)}</div>
              </div>
            )}
          </div>
          {acf?.bolagetAdress?.includes("https://") ? (
            <a
              href={acf.bolagetAdress}
              className="flex items-center gap-3 lg:hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                Beställ på{" "}
                {new URL(acf.bolagetAdress).hostname.replace(
                  "www.",
                  ""
                )}
              </span>
              <ArrowRight className="size-3" strokeWidth={1.2} aria-hidden />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default DrinkDetails;
