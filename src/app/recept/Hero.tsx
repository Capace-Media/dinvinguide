"use client";
import { ArrowRight, Printer, Time } from "@/components/icons";
import handleParseClient from "@/lib/utils/handle-parse-client";

import Image from "next/image";
import Link from "next/link";

interface RecipeHeroProps {
  title?: string | any;
  image?: string | any;
  desc?: string | any;
  rating?: string | any;
  ratingAmount?: string | any;
  time?: string | any;
  categories?: any;
  author?: any;
  handlePrint: any;
}

interface Category {
  id: string;
  slug: string;
  uri: string;
  name: string;
}

function updateCategoriesUri(
  categories: Category[] | null,
  excludeNames: string[],
): Category[] | null {
  if (!categories || categories.length === 0) {
    return null;
  }

  const filteredCategories = categories.filter(
    (category) => !excludeNames?.includes(category?.slug),
  );

  if (filteredCategories?.length === 0) {
    return null;
  }

  return filteredCategories?.map((category) => ({
    ...category,
    uri: category.uri.replace("/receptkategorier", ""),
  }));
}

const RecipeHero = ({
  title,
  image,
  desc,
  time,
  categories,
  author,
  handlePrint,
}: RecipeHeroProps) => {
  const excludeNames: string[] = [
    "drycker",
    "ingrediens",
    "maltider",
    "soppa",
    "tillagningssatt",
  ];
  const updatedCategories = updateCategoriesUri(categories, excludeNames);

  const cookingTime =
    parseInt(time?.cookingTime, 10) + parseInt(time?.prepTime, 10) || null;

  return (
    <div className="layout w-full bg-white py-18.25 md:pt-43">
      <div className="order-last grid gap-10 md:order-first md:grid-cols-2 lg:gap-45">
        <div className="flex flex-col justify-between gap-2 lg:min-h-115.25">
          <div className="flex flex-col gap-3">
            <ul className="flex items-center gap-2 text-[11px] text-brand-secondary md:text-[14px]">
              <li>
                <Link className="text-brand-secondary" href="/">
                  Hem
                </Link>
              </li>
              {"/"}
              <li>
                <Link className="text-brand-secondary" href="/recept">
                  Recept
                </Link>
              </li>
              {"/"}
              <li>
                <p className="text-brand-dark">{title}</p>
              </li>
            </ul>
            <h1 className="text-[24px] md:text-[32px] lg:text-[42px]">
              {title}
            </h1>
            <div className="flex flex-col gap-6">
              <div className="parsed text-[14px]">
                {handleParseClient(desc as string)}
              </div>
            </div>
            <ul className="flex items-center gap-3">
              {cookingTime && (
                <li className="flex items-center gap-2 text-[14px]">
                  <Time />
                  <p>{cookingTime} min</p>
                </li>
              )}
              {cookingTime && <span>/</span>}

              <li className="">
                <button
                  type="button"
                  className="flex items-center gap-2 text-[14px] lg:hover:underline"
                  onClick={handlePrint}
                >
                  <p>Skriv ut recept</p>
                  <Printer />
                </button>
              </li>
            </ul>

            <ul className="flex flex-wrap gap-3 pt-4">
              {updatedCategories?.map((node: any) => {
                return (
                  <li
                    className="border-b-2 border-brand-primary"
                    key={node?.id}
                  >
                    <Link
                      className="text-[14px] text-brand-primary uppercase"
                      href={`/recept${node?.uri}`}
                    >
                      {node?.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            {author && (
              <Link
                className={`flex items-center gap-3 pt-10 text-[14px] text-brand-secondary italic lg:hover:underline`}
                href={`/recept/kockar/${author[0]?.slug}`}
              >
                recept av {author[0]?.name} <ArrowRight />
              </Link>
            )}
          </div>
        </div>

        <div className="relative order-first h-92.5 w-full md:order-last lg:h-130">
          <div className="center-y absolute left-0 z-10 h-75 w-[85%] lg:h-107.5">
            {image?.mediaItemUrl && (
              <div className="relative h-full w-full">
                <Image
                  src={image?.mediaItemUrl}
                  alt={image?.altText ? image.altText : `Bild på ${title}`}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  sizes="(min-width: 1880px) 687px, (min-width: 1040px) calc(38.17vw - 23px), (min-width: 780px) calc(42.5vw - 38px), (min-width: 380px) calc(85vw - 27px), calc(25vw + 189px)"
                  priority
                />
              </div>
            )}
          </div>
          <div className="center-y absolute -right-4 h-full w-[85%] bg-brand-beige md:-right-11 md:w-full lg:-right-20"></div>
        </div>
      </div>
    </div>
  );
};

export default RecipeHero;
