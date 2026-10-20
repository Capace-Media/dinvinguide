import type { getDrinkTip } from "@/lib/api/drink-tips/get-drink-tips";
import DrinkLayout from "@/components/shared/drink-layout/drink-layout";
import handleParse from "@/lib/utils/handleParse";
import PrettyDate from "@/lib/utils/prettyDate";
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

      <DrinkLayout
        className="layout bg-white"
        title={drinkTip.title ?? ""}
        headingLevel="h1"
        uri={drinkTip.uri}
        image={image}
        importer={supplier}
        orderUrl={acf?.bolagetAdress}
      >
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
            <div className="whitespace-normal wrap-anywhere">{handleParse(acf.beskrivning)}</div>
          </div>
        )}
        {acf?.recension && (
          <div className="py-4">
            <h3 className="uppercase">Recension:</h3>
            <div className="whitespace-normal wrap-anywhere">{handleParse(acf.recension)}</div>
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
      </DrinkLayout>
    </>
  );
};

export default DrinkTipDetails;
