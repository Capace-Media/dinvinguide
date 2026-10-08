import type { getDrinkTip } from "@/lib/api/drink-tips/get-drink-tips";
import handleParse from "@/lib/utils/handleParse";
import PrettyDate from "@/lib/utils/prettyDate";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type DrinkTip = NonNullable<Awaited<ReturnType<typeof getDrinkTip>>>;

interface DrinkTipDetailsProps {
  drinkTip: DrinkTip;
}

const DrinkTipDetails = ({ drinkTip }: DrinkTipDetailsProps) => {
  const image = drinkTip.featuredImage?.node;
  const supplier = drinkTip.leverantorer_to_drink?.leverantorer?.[0];
  const acf = drinkTip.acf_dryckestips;

  return (
    <>
      <div className="flex justify-between gap-4 lg:flex-row flex-col layout bg-white pb-10">
        <ul className="flex gap-2 text-[14px] text-brand-secondary">
          <li>
            <Link className="text-brand-secondary lg:hover:underline" href="/">
              Hem
            </Link>
          </li>
          {" / "}
          <li>
            <Link
              className="text-brand-secondary lg:hover:underline"
              href="/dryckestips"
            >
              Dryckestips
            </Link>
          </li>
          {" / "}

          <li>
            <p className="text-brand-dark">{drinkTip.title}</p>
          </li>
        </ul>

        <time className="text-[14px]" dateTime={drinkTip.modifiedGmt ?? undefined}>
          {PrettyDate(drinkTip.modifiedGmt)}
        </time>
      </div>

      <article className="lg:grid-cols-2 grid gap-8 lg:gap-0 relative z-10 layout bg-white">
        <div className="relative">
          {image?.mediaItemUrl && (
            <Link href={drinkTip.uri ?? ""} className="flex justify-center">
              <figure className="relative w-50 h-130.5">
                <Image
                  src={image.mediaItemUrl}
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  alt={
                    image.altText ? image.altText : `Bild på ${drinkTip.title}`
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
              <h1 className="normal-case text-[38px] leading-10">
                {drinkTip.title}
              </h1>
              {supplier && (
                <div className="flex items-center gap-2 py-2">
                  <h2 className="uppercase text-base">Importör: </h2>
                  <Link
                    href={`/importorer/${supplier.slug}`}
                    className="underline text-brand-primary"
                  >
                    <span className="sr-only">Läs mer om </span>
                    {supplier.title}
                  </Link>
                </div>
              )}

              {acf?.betyget && <p className="text-[28px]">{acf.betyget}/100</p>}

              <p className="flex items-center gap-2">
                {acf?.forpackningar && <span>{acf.forpackningar}</span>}
                {acf?.forpackningar && acf.dryckestyper ? <span>-</span> : null}
                {acf?.dryckestyper && <span>{acf.dryckestyper}</span>}
              </p>
              {acf?.pris && (
                <p className="flex items-center gap-3">
                  {acf.pris.includes("kr") || acf.pris.includes("euro") ? (
                    <span>{acf.pris}</span>
                  ) : (
                    <span>{acf.pris}kr</span>
                  )}
                </p>
              )}
              {acf?.beskrivning && (
                <div className="py-4">
                  <h3 className="uppercase">beskrivning:</h3>
                  <div>{handleParse(acf.beskrivning)}</div>
                </div>
              )}
              {acf?.recension && (
                <div className="py-4">
                  <h3 className="uppercase">Recension:</h3>
                  <div>{handleParse(acf.recension)}</div>
                </div>
              )}

              <div>
                {acf?.betyget && (
                  <p>
                    Betyg - <span className="font-bold">{acf.betyget}</span>
                  </p>
                )}
                {acf?.potentielltBetyg && (
                  <p>
                    Potentiellt betyg -{" "}
                    <span className="font-bold">{acf.potentielltBetyg}</span>
                  </p>
                )}
              </div>
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
    </>
  );
};

export default DrinkTipDetails;
