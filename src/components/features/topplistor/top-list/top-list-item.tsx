import { Bronz, Guld, Silver } from "@/components/icons";
import type { ExtendedToplist } from "@/lib/api/drinks/get-drinks";
import PrettyDate from "@/lib/utils/prettyDate";
import { cleanUrl } from "@/lib/utils/urlUtils";
import Image from "next/image";
import Link from "next/link";
import type { JSX } from "react";

type TopListDrink = ExtendedToplist["currentDrinks"][number]["node"];

interface TopListItemProps {
  drink: TopListDrink;
  index: number;
}

const medalClassNames: Readonly<Record<string, string>> = {
  "2-Flaska": " top-[16%] left-[50%] translate-x-[-70%] rotate-12",
  Flaska: " top-[16%] left-[50%] translate-x-[-30%] -rotate-12",
  "2-Box": " bottom-[16%] left-[10%] translate-x-[-30%] -rotate-12",
  Box: " bottom-[18%] left-[10%] translate-x-[-30%] rotate-12",
  "2-Papp": " bottom-[18%] left-[10%] rotate-12",
  "2-Påse": " bottom-[18%] left-[10%] rotate-12",
  "PET-flaska": "top-[16%] left-[50%] translate-x-[-30%] -rotate-12",
  "2-PET-flaska": " top-[16%] left-[50%] translate-x-[-70%] rotate-12",
  default: " top-[16%] left-[50%] translate-x-[-30%] -rotate-12",
};

const getMedal = (index: number): JSX.Element | null => {
  switch (index) {
    case 1:
      return <Guld />;
    case 2:
      return <Silver />;
    case 3:
      return <Bronz />;
    default:
      return null;
  }
};

// Second place sits on the other side of the bottle so it does not overlap.
const getMedalClassName = (index: number, packagingName?: string | null) => {
  if (index > 3) return "";
  const key = !packagingName
    ? "default"
    : index === 2
      ? `${index}-${packagingName}`
      : packagingName;
  return medalClassNames[key] || medalClassNames.default;
};

const TopListItem = ({ drink, index }: TopListItemProps) => {
  const acf = drink.acf_drinks;
  const importer = drink.leverantorer_to_drink?.leverantorer?.[0];
  const recipe = acf?.passarTillRecept?.[0];
  const medalClassName = getMedalClassName(index, acf?.forpackningar?.name);

  return (
    <li className="lg:grid-cols-2 grid gap-8">
      <div
        className={`relative ${index % 2 === 0 ? "lg:order-1" : "lg:order-0"}`}
      >
        {drink.featuredImage?.node.mediaItemUrl && (
          <Link href={`/drycker/${drink.slug}`} className="flex justify-center">
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
            {index <= 3 && (
              <div className={`absolute ${medalClassName}`}>
                {getMedal(index)}
              </div>
            )}
          </Link>
        )}
      </div>

      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-1">
              <p className="font-bold text-[18px] uppercase">Nr {index}</p>
              <p className="text-[14px] text-brand-gray">
                {"-"} {PrettyDate(drink.date)}
              </p>
            </div>

            <Link href={`/drycker/${drink.slug}`}>
              <h2 className="normal-case text-[38px] leading-10">
                {drink.title}
              </h2>
            </Link>
            {importer && (
              <div className="flex items-center gap-2 py-2">
                <h3 className="uppercase text-base">Importör: </h3>
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
                  <Link className="underline" href={cleanUrl(recipe.uri ?? "")}>
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
          </div>

          <Link href={drink.uri ?? ""} className="flex items-center gap-3">
            <span>Läs mer om drycken</span>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default TopListItem;
