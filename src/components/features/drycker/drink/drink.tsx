import DrinkLayout from "@/components/shared/drink-layout/drink-layout";
import handleParse from "@/lib/utils/handleParse";
import PrettyDate from "@/lib/utils/prettyDate";
import Link from "next/link";
import type { Drink } from "./types";

interface DrinkDetailsProps {
  drink: Drink;
}

const DrinkDetails = ({ drink }: DrinkDetailsProps) => {
  const acf = drink.acf_drinks;
  const recipe = acf?.passarTillRecept?.[0];

  return (
    <DrinkLayout
      className="dl-layout"
      title={drink.title ?? ""}
      headingLevel="h2"
      uri={drink.uri}
      image={drink.featuredImage?.node}
      importer={drink.leverantorer_to_drink?.leverantorer?.[0]}
      orderUrl={acf?.bolagetAdress}
      eyebrow={
        <div>
          <p>{PrettyDate(drink.date)}</p>
        </div>
      }
    >
      <p className="flex items-center gap-3">
        {acf?.forpackningar?.name && <span>{acf.forpackningar.name}</span>}
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
          <div className="whitespace-normal wrap-anywhere">
            {handleParse(acf.recension)}
          </div>
        </div>
      )}
    </DrinkLayout>
  );
};

export default DrinkDetails;
