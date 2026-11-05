import Newsletter from "@/components/shared/newsletter/newsletter";
import PageHero from "@/components/shared/heroes/page-hero";
import { getSupplier } from "@/lib/api/suppliers/get-suppliers";
import handleParse from "@/lib/utils/handle-parse";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const Supplier = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  const data = await getSupplier(params.slug);

  if (!data) {
    notFound();
  }

  return (
    <>
      <PageHero page={data} />
      <article className="layout bg-white">
        <div className="py-10 lg:grid lg:grid-cols-2">
          {handleParse(data?.content || "")}

          <div></div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Bedömda viner</h2>
          <ul className="grid gap-4 border-t pt-4 md:grid-cols-3 lg:grid-cols-4">
            {data.drinks.map((wine) => {
              if (wine.__typename === "Drinktip") {
                return (
                  <li key={wine.id} className="group">
                    <Link
                      href={`/dryckestips/${wine?.slug}`}
                      className="flex"
                      aria-label={`läs mer om ${wine?.title}`}
                    >
                      <div className="relative h-37.5 min-w-25 lg:group-hover:animate-shake">
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
                      <div className="flex w-full flex-col justify-center gap-2 p-4">
                        <h3 className="text-[17px] lg:group-hover:underline">
                          {wine?.title}
                        </h3>

                        {wine.acf_dryckestips?.betyget && (
                          <p className="text-[12px]">
                            {wine.acf_dryckestips.betyget}/100
                          </p>
                        )}

                        <p className="flex text-[14px]">
                          {wine.acf_dryckestips?.dryckestyper} -{" "}
                          {wine.acf_dryckestips?.forpackningar}
                        </p>

                        {wine.acf_dryckestips?.pris && (
                          <p className="flex items-center gap-3 text-[14px]">
                            {/* <Dollar /> */}
                            {wine.acf_dryckestips.pris.includes("kr") ||
                            wine.acf_dryckestips.pris.includes("euro") ? (
                              <span>{wine.acf_dryckestips.pris}</span>
                            ) : (
                              <span>{wine.acf_dryckestips.pris}kr</span>
                            )}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              }
              return null;
            })}
          </ul>

          <h2 className="text-2xl font-bold">Viner</h2>

          <ul className="grid gap-4 border-t pt-4 md:grid-cols-3 lg:grid-cols-4">
            {data.drinks.map((wine) => {
              if (wine.__typename === "Drink") {
                return (
                  <li key={wine?.id} className="group">
                    <Link
                      href={`/drycker/${wine?.slug}`}
                      className="flex"
                      aria-label={`läs mer om ${wine?.title}`}
                    >
                      <div className="relative h-37.5 min-w-25 lg:group-hover:animate-shake">
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
                      <div className="flex w-full flex-col justify-center gap-2 p-4">
                        <h3 className="text-[17px] lg:group-hover:underline">
                          {wine?.title}
                        </h3>

                        <p className="flex text-[14px]">
                          {wine?.acf_drinks?.dryckestyper?.name} -{" "}
                          {wine?.acf_drinks?.forpackningar?.name}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </article>

      <Newsletter />
    </>
  );
};

export default Supplier;
