import { ArrowRight, Printer, Time } from "@/components/icons";
import handleParse from "@/lib/utils/handleParse";
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
  excludeNames: string[]
): Category[] | null {
  if (!categories || categories.length === 0) {
    return null;
  }

  const filteredCategories = categories.filter(
    (category) => !excludeNames.includes(category.slug)
  );

  if (filteredCategories.length === 0) {
    return null;
  }

  return filteredCategories.map((category) => ({
    ...category,
    uri: category.uri.replace("/receptkategorier", ""),
  }));
}

//

const RecipeHero = async ({
  title,
  image,
  desc,
  rating,
  ratingAmount,
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
    parseInt(time?.cookingTime) + parseInt(time?.prepTime) || null;

  return (
    <div className="layout w-full py-[73px] md:pt-[172px] bg-white">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-[180px] order-last md:order-first">
        <div className="flex flex-col justify-between gap-2 min-h-[461px]">
          <div className="flex flex-col gap-3">
            <ul className="flex items-center gap-2 text-[14px] text-brand-secondary">
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
            <h1>{title}</h1>
            <div className="flex flex-col gap-6 ">
              <div className="">{handleParse(desc)}</div>
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
                  className="flex items-center gap-2 text-[14px] lg:hover:underline"
                  onClick={handlePrint}
                >
                  <p>Skriv ut recept</p>
                  <Printer />
                </button>
              </li>
            </ul>

            <ul className="flex flex-wrap gap-3 pt-4">
              {updatedCategories &&
                updatedCategories.map((node: any) => {
                  return (
                    <li
                      className="border-b-2 border-brand-primary"
                      key={node?.id}
                    >
                      <Link
                        className="uppercase text-brand-primary text-[14px]"
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
                className=" italic text-[14px] flex items-center gap-3 text-brand-secondary lg:hover:underline"
                href={`/recept/kockar/${author[0]?.slug}`}
              >
                recept av {author[0]?.name} <ArrowRight />
              </Link>
            )}
          </div>
        </div>

        <div className="w-full  order-first h-[370px] relative md:order-last lg:h-[520px]">
          <div className="absolute w-[85%] center-y left-0 h-[300px] lg:h-[430px] z-10">
            {image?.mediaItemUrl && (
              <div className="relative w-full h-full">
                <Image
                  src={image?.mediaItemUrl}
                  alt={image?.altText}
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
          <div className=" bg-brand-beige w-[85%] md:w-[100%] h-[100%] center-y absolute -right-4 md:-right-11 lg:-right-20"></div>
        </div>
      </div>
    </div>
  );
};

export default RecipeHero;
