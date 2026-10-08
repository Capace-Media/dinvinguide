import handleParse from "@/lib/utils/handleParse";
import Image, { type StaticImageData } from "next/image";

import champagne from "../../../../public/Images/champagne.webp";
import flaska_rott from "../../../../public/Images/flaska_rott.webp";
import flaska_vitt from "../../../../public/Images/flaska_vitt.webp";
import juldrycker from "../../../../public/Images/juldrycker.webp";
import mousserande_vin from "../../../../public/Images/mousserande_vin.webp";
import rose from "../../../../public/Images/rose.webp";

export interface DLHeroContent {
  title?: string | null;
  page_content?: { intro?: string | null } | null;
  acf_explorer?: { slogan?: string | null } | null;
  acf_toplists?: { slogan?: string | null; text?: string | null } | null;
  featuredImage?: {
    node?: { mediaItemUrl?: string | null; altText?: string | null } | null;
  } | null;
}

interface DLHeroProps {
  hero?: DLHeroContent | null;
  drinkType?: string;
  id?: string;
}

const drinkTypeToImage: Readonly<Record<string, StaticImageData>> = {
  champagne: champagne,
  "flaska-rott": flaska_rott,
  "glogg-och-gluhwein": juldrycker,
  "flaska-vitt": flaska_vitt,
  "rott-vin": flaska_rott,
  "vitt-vin": flaska_vitt,
  "mousserande-vin": mousserande_vin,
  rose: rose,
};

const DLHero = ({ hero, drinkType, id }: DLHeroProps) => {
  const determineImageSource = () => {
    if (drinkType && drinkTypeToImage[drinkType]) {
      return drinkTypeToImage[drinkType];
    } else if (hero?.featuredImage?.node?.mediaItemUrl) {
      return hero.featuredImage.node.mediaItemUrl;
    }
    return juldrycker;
  };

  const determineAltText = () => {
    return hero?.featuredImage?.node?.altText
      ? hero.featuredImage.node.altText
      : "Bild från DinVinguide";
  };

  return (
    <div className="w-full top-18 lg:h-[69vh] ">
      <div className="relative h-64 md:h-80 lg:h-[69vh] w-full">
        {/* Dark gradient overlay - left to right */}
        <div className="absolute w-full h-full z-5 bg-linear-to-r from-black/60 via-black/40 to-black/10"></div>
        <Image
          src={determineImageSource()}
          alt={determineAltText()}
          fill
          style={{ objectFit: "cover", objectPosition: "right" }}
          sizes="(min-width: 1880px) 1617px, (min-width: 1040px) calc(89.88vw - 55px), (min-width: 780px) calc(100vw - 88px), calc(100vw - 32px)"
          priority
        />

        <div className="layout hidden z-10 lg:block bg-transparent w-[50%] py-4 absolute  bottom-20 ">
          {hero?.page_content?.intro && !hero?.acf_explorer?.slogan ? (
            <div className="dl-hero-intro">
              {handleParse(hero?.page_content?.intro)}
            </div>
          ) : (
            <div>
              {drinkType || id === "dryckesutforskaren" ? (
                <h1 className=" flex flex-col text-white">
                  <span className="uppercase text-[18px] text-white font-main">
                    drycker
                  </span>
                  <span>{hero?.title}</span>
                </h1>
              ) : (
                <h1 className=" flex flex-col  text-white">
                  <span className="uppercase text-[18px] font-main">
                    topplista
                  </span>
                  <span>{hero?.acf_toplists?.slogan}</span>
                </h1>
              )}
              {hero?.acf_explorer?.slogan ? (
                <p className="text-white">{hero?.acf_explorer?.slogan}</p>
              ) : (
                <p className="text-white">{hero?.acf_toplists?.text}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="layout bg-[#F8F8F9] lg:hidden  py-4 ">
        {hero?.page_content?.intro && !hero?.acf_explorer?.slogan ? (
          handleParse(hero?.page_content?.intro)
        ) : (
          <div>
            {drinkType || id === "dryckesutforskaren" ? (
              <h1 className=" flex flex-col ">
                <span className="uppercase text-[18px] font-main">drycker</span>
                <span>{hero?.title}</span>
              </h1>
            ) : (
              <h1 className=" flex flex-col  ">
                <span className="uppercase text-[18px] font-main">
                  topplista
                </span>
                <span>{hero?.acf_toplists?.slogan}</span>
              </h1>
            )}
            {hero?.acf_explorer?.slogan ? (
              <p>{hero?.acf_explorer?.slogan}</p>
            ) : (
              <p>{hero?.acf_toplists?.text}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DLHero;
