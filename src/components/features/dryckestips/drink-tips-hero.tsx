import handleParse from "@/lib/utils/handle-parse";
import Image from "next/image";
import Link from "next/link";
import type { PageHeroContent } from "@/components/shared/heroes/page-hero";
import headerimage from "./dryckestipbetyg.jpg";

interface DrinkTipsHeroProps {
  page: PageHeroContent | null;
}

const DrinkTipsHero = ({ page }: DrinkTipsHeroProps) => {
  return (
    <div className="layout w-full bg-white py-18.25 md:pt-43">
      <div className="order-last grid gap-10 md:order-first md:grid-cols-2 lg:gap-45">
        <div className="flex flex-col justify-between gap-2 lg:min-h-115.25">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-6">
              <div className="text-[14px]">
                <p>Dryckestips</p>

                {page?.page_content?.intro ? (
                  handleParse(page?.page_content?.intro)
                ) : page?.acf_grape?.kortBeskrivning ? (
                  <>
                    <h1>{page?.title}</h1>
                    <p>{page?.acf_grape?.kortBeskrivning}</p>
                  </>
                ) : (
                  <h1>{page?.title}</h1>
                )}
              </div>
            </div>

            <menu className="flex flex-wrap gap-3 pt-4">
              <li className="border-b-2 border-brand-primary">
                <Link
                  className="bg-brand-primary px-3 py-[6.5px] text-[14px] text-white uppercase"
                  href="/dryckeslistan"
                >
                  dryckeslistan
                </Link>
              </li>
              <li className="border-b-2 border-brand-primary">
                <Link
                  className="text-[14px] text-brand-primary uppercase"
                  href="/dryckesutforskaren"
                >
                  Dryckesutforskaren
                </Link>
              </li>
              <li className="border-b-2 border-brand-primary">
                <Link
                  className="text-[14px] text-brand-primary uppercase"
                  href="/recept/receptbanken"
                >
                  Receptbanken
                </Link>
              </li>
              <li className="border-b-2 border-brand-primary">
                <Link
                  className="text-[14px] text-brand-primary uppercase"
                  href="/importorer"
                >
                  Svenska importörer
                </Link>
              </li>
            </menu>
          </div>
        </div>

        <div className="relative order-first h-92.5 w-full md:order-last lg:h-130">
          <div className="center-y absolute left-0 z-10 h-75 w-[95%] lg:h-107.5">
            <div className="relative flex h-full w-full bg-brand-secondary p-4 shadow-xl lg:p-8">
              <div className="h-full w-full lg:w-[55%] lg:pr-8">
                <h2 className="flex flex-col border-b-2 pb-3 text-white lg:pb-6">
                  <span className="font-main text-[12px] uppercase">
                    betygsskala
                  </span>
                  <span className="text-[22px] lg:text-[26px]">
                    Vad betyder betygen?
                  </span>
                </h2>
                <ul className="flex flex-col gap-2 pt-3 text-white lg:gap-4 lg:pt-6">
                  <li className="flex items-center justify-between">
                    <span className="font-sub">96-100</span>
                    <span>Exceptionellt</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-sub">90-95</span>
                    <span>Enastående</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-sub">80-89</span>
                    <span>Mycket bra - fynd</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-sub">70-79</span>
                    <span>Medel - prisvärt</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-sub">60-69</span>
                    <span>Under medel</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-sub">50-59</span>
                    <span>Oacceptabelt</span>
                  </li>
                </ul>
              </div>
              <div className="relative hidden h-full w-[45%] bg-white lg:block">
                <Image
                  src={headerimage}
                  alt="bild från DinVinguide"
                  fill
                  sizes="(min-width: 1860px) 278px, calc(19.63vw - 83px)"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
          <div className="center-y absolute -right-4 h-full w-[85%] bg-brand-beige md:-right-11 md:w-full lg:-right-20">
            {page?.featuredImage?.node?.mediaItemUrl && (
              <Image
                src={page.featuredImage.node.mediaItemUrl}
                alt={
                  page.featuredImage.node.altText
                    ? page.featuredImage.node.altText
                    : "Bild från DinVinguide"
                }
                fill
                style={{
                  objectFit: "cover",
                }}
                sizes="(min-width: 1880px) 687px, (min-width: 1040px) calc(38.17vw - 23px), (min-width: 780px) calc(42.5vw - 38px), (min-width: 380px) calc(85vw - 27px), calc(25vw + 189px)"
                priority
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkTipsHero;
