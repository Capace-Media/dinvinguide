import Newsletter from "@/app/_components/Newsletter";
import { getSupplier } from "@/app/actions/suppliers";
import PageHero from "@/components/Templates/HeroHeaders/PageHero";
import handleParse from "@/lib/utils/handleParse";
import Image from "next/image";
import Link from "next/link";


import { DrinkTip } from "../../../../types/suppliers";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string };
};

const Supplier = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  const { data, error } = await getSupplier({ slug: params.slug });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Type guard function
  const isDrinkTip = (wine: any): wine is DrinkTip => {
    return wine?.__typename === "Drinktip";
  };

  return (
    <>
      <PageHero data={data} />
      <article className="layout bg-white">
        <div className="lg:grid lg:grid-cols-2 py-10">
          {handleParse(data?.content || "")}

          <div></div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Bedömda viner</h2>
          <ul className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 border-t pt-4">
            {data?.drycker_to_leverantor?.drycker?.map((wine) => {
              if (wine.__typename === "Drinktip") {
                return (
                  <li key={wine.id} className="group">
                    <Link
                      href={`/dryckestips/${wine?.slug}`}
                      className="flex"
                      aria-label={`läs mer om ${wine?.title}`}
                    >
                      <div className="min-w-25 h-37.5 relative shake-image">
                        {wine?.featuredImage?.node?.mediaItemUrl && (
                          <Image
                            src={wine.featuredImage.node.mediaItemUrl}
                            alt={
                              wine?.featuredImage?.node?.altText
                                ? wine.featuredImage.node.altText
                                : `bild på ${wine?.title}`
                            }
                            fill
                            style={{
                              objectFit: "contain",
                            }}
                            sizes="(min-width: 1200px) 300px, (min-width: 768px) 384px, 100vw"
                            className=""
                          />
                        )}
                      </div>
                      <div className=" flex gap-2 flex-col justify-center w-full p-4 ">
                        <h3 className="text-[17px] lg:group-hover:underline">
                          {wine?.title}
                        </h3>

                        {isDrinkTip(wine) && wine.acf_dryckestips?.betyget && (
                          <p className="text-[12px]">
                            {wine.acf_dryckestips.betyget}/100
                          </p>
                        )}

                        <p className="text-[14px] flex">
                          {isDrinkTip(wine) &&
                            wine.acf_dryckestips?.dryckestyper}{" "}
                          -{" "}
                          {isDrinkTip(wine) &&
                            wine.acf_dryckestips?.forpackningar}
                        </p>

                        {isDrinkTip(wine) && wine.acf_dryckestips?.pris && (
                          <p className="flex items-center gap-3 text-[14px]">
                            {/* <Dollar /> */}
                            {isDrinkTip(wine) &&
                              (wine.acf_dryckestips.pris.includes("kr") ||
                              wine.acf_dryckestips.pris.includes("euro") ? (
                                <span>{wine.acf_dryckestips.pris}</span>
                              ) : (
                                <span>{wine.acf_dryckestips.pris}kr</span>
                              ))}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              }
            })}
          </ul>

          <h2 className="text-2xl font-bold">Viner</h2>

          <ul className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 border-t pt-4">
            {data?.drycker_to_leverantor?.drycker?.map((wine) => {
              if (wine.__typename === "Drink") {
                return (
                  <li key={wine?.id} className="group">
                    <Link
                      href={`/drycker/${wine?.slug}`}
                      className="flex"
                      aria-label={`läs mer om ${wine?.title}`}
                    >
                      <div className="min-w-25 h-37.5 relative shake-image">
                        {wine?.featuredImage?.node?.mediaItemUrl && (
                          <Image
                            src={wine.featuredImage.node.mediaItemUrl}
                            alt={
                              wine?.featuredImage?.node?.altText
                                ? wine.featuredImage.node.altText
                                : `bild på ${wine?.title}`
                            }
                            fill
                            style={{
                              objectFit: "contain",
                            }}
                            sizes="(min-width: 1200px) 300px, (min-width: 768px) 384px, 100vw"
                            className=""
                          />
                        )}
                      </div>
                      <div className=" flex gap-2 flex-col justify-center w-full p-4 ">
                        <h3 className="text-[17px] lg:group-hover:underline">
                          {wine?.title}
                        </h3>

                        <p className="text-[14px] flex">
                          {wine?.acf_drinks?.dryckestyper?.name} -{" "}
                          {wine?.acf_drinks?.forpackningar?.name}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </article>

      <Newsletter />
    </>
  );
};

export default Supplier;
