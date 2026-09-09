import Newsletter from "@/app/_components/Newsletter";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import DlTop from "@/shared/components/ads/dl/top";
import DlMid from "@/shared/components/ads/dl/mid";
import { Suspense } from "react";
import Line from "@/components/graphic/Line";
import { DlNextArrow } from "@/components/icons";
import { fetchDrinktip } from "@/lib/queries/getDrinkTips";
import handleParse from "@/lib/utils/handleParse";
import PrettyDate from "@/lib/utils/prettyDate";
import Image from "next/image";
import Link from "next/link";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string };
};

const DrinkTipTemplate = async ({ searchParams, params }: Props) => {
  const data = await fetchDrinktip(`/dryckestips/${params?.slug}`);

  return (
    <>
      <div className="layout bg-white pt-28 ">
        <Line />
      </div>

      <Suspense fallback={<BannerSkeleton tone="bg-brand-dl" />}>
        <DlTop />
      </Suspense>

      <div className="flex justify-between gap-4 lg:flex-row flex-col layout bg-white pb-10">
        <ul className="flex gap-2 text-[14px] text-brand-secondary">
          <li>
            <Link className=" text-brand-secondary lg:hover:underline" href="/">
              Hem
            </Link>
          </li>
          {" / "}
          <li>
            <Link
              className=" text-brand-secondary lg:hover:underline"
              href="/dryckestips"
            >
              Dryckestips
            </Link>
          </li>
          {" / "}

          <li>
            <p className="text-brand-dark">{data?.title}</p>
          </li>
        </ul>

        <time className="text-[14px]" dateTime={data?.modifiedGmt}>
          {PrettyDate(data?.modifiedGmt)}
        </time>
      </div>

      <article className="lg:grid-cols-2 grid gap-8 lg:gap-0 relative z-10 layout bg-white">
        <div className={`relative `}>
          {data?.featuredImage && data?.featuredImage.node && (
            <Link href={data.uri} className={`flex justify-center `}>
              <figure className={`relative w-50 h-130.5`}>
                <Image
                  src={data?.featuredImage?.node?.mediaItemUrl}
                  fill
                  style={{
                    objectFit: "contain",
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
              <h1 className="normal-case text-[38px] leading-10 font-display">
                {data.title}
              </h1>
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

              {data?.acf_dryckestips?.betyget && (
                <p className="text-[28px]">
                  {data.acf_dryckestips.betyget}/100
                </p>
              )}

              {data?.acf_dryckestips?.land && (
                <p className="space-x-1">
                  {data?.acf_dryckestips?.land && (
                    <span>{data?.acf_dryckestips?.land}</span>
                  )}
                  {data?.acf_dryckestips?.argang && (
                    <span>{data?.acf_dryckestips?.argang}</span>
                  )}
                </p>
              )}
              <p className="flex items-center gap-2">
                {/* <Flaska /> */}
                {data?.acf_dryckestips?.forpackningar && (
                  <span>{data?.acf_dryckestips?.forpackningar}</span>
                )}
                {data?.acf_dryckestips?.forpackningar &&
                data?.acf_dryckestips?.dryckestyper ? (
                  <span>-</span>
                ) : null}
                {data?.acf_dryckestips?.dryckestyper && (
                  <span>{data?.acf_dryckestips?.dryckestyper}</span>
                )}
              </p>
              {/* test */}

              {data?.acf_dryckestips?.passarTillRecept &&
                data?.acf_dryckestips?.passarTillRecept?.length > 0 && (
                  <div className="flex items-baseline gap-3">
                    {/* <Passar /> */}

                    <p>
                      <span>Passar till: </span>
                      <Link
                        className="underline"
                        href={`/recept/${data.acf_dryckestips.passarTillRecept[0].slug}`}
                      >
                        {data.acf_dryckestips.passarTillRecept[0].title}
                      </Link>
                    </p>
                  </div>
                )}
              {data?.acf_dryckestips?.pris && (
                <p className="flex items-center gap-3">
                  {/* <Dollar /> */}
                  {data.acf_dryckestips.pris.includes("kr") ||
                  data.acf_dryckestips.pris.includes("euro") ? (
                    <span>{data.acf_dryckestips.pris}</span>
                  ) : (
                    <span>{data.acf_dryckestips.pris}kr</span>
                  )}
                </p>
              )}
              {data?.acf_dryckestips?.beskrivning && (
                <div className="py-4">
                  <h3 className="uppercase">beskrivning:</h3>
                  <div>{handleParse(data.acf_dryckestips?.beskrivning)}</div>
                </div>
              )}
              {data?.acf_dryckestips?.recension && (
                <div className="py-4">
                  <h3 className="uppercase">Recension:</h3>
                  <div>{handleParse(data.acf_dryckestips?.recension)}</div>
                </div>
              )}

              <div>
                {data?.acf_dryckestips?.betyget && (
                  <p>
                    Betyg -{" "}
                    <span className=" font-bold">
                      {data.acf_dryckestips.betyget}
                    </span>
                  </p>
                )}
                {data?.acf_dryckestips?.potentielltBetyg && (
                  <p>
                    Potentiellt betyg -{" "}
                    <span className=" font-bold">
                      {data.acf_dryckestips.potentielltBetyg}
                    </span>
                  </p>
                )}
              </div>
            </div>

            {data?.acf_dryckestips?.bolagetAdress &&
            data?.acf_dryckestips?.bolagetAdress.includes("https://") ? (
              <a
                href={data.acf_dryckestips.bolagetAdress}
                className="flex items-center gap-3 lg:hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  Beställ på{" "}
                  {new URL(data.acf_dryckestips.bolagetAdress).hostname.replace(
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
      <Suspense fallback={<BannerSkeleton tone="bg-brand-dl" />}>
        <DlMid />
      </Suspense>

      <Newsletter />
    </>
  );
};

export default DrinkTipTemplate;
