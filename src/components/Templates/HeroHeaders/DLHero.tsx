import handleParse from "@/lib/utils/handleParse";
import Image from "next/image";

import champagne from "../../../../public/Images/champagne.webp";
import flaska_rott from "../../../../public/Images/flaska_rott.webp";
import flaska_vitt from "../../../../public/Images/flaska_vitt.webp";
import juldrycker from "../../../../public/Images/juldrycker.webp";
import mousserande_vin from "../../../../public/Images/mousserande_vin.webp";
import rose from "../../../../public/Images/rose.webp";

interface DLHeroProps {
  hero?: any;
  drinkType?: string | undefined;
}

type ImageType = any; // Replace 'any' with a more specific type if available

const drinkTypeToImage: { [key in string]?: ImageType } = {
  champagne: champagne,
  "flaska-rott": flaska_rott,
  "glogg-och-gluhwein": juldrycker,
  "flaska-vitt": flaska_vitt,
  "rott-vin": flaska_rott,
  "vitt-vin": flaska_vitt,
  "mousserande-vin": mousserande_vin,
  rose: rose,
};
// Later in your code
// const image = drinkTypeToImage[drinkType as keyof typeof drinkTypeToImage];

const DLHero = ({ hero, drinkType }: DLHeroProps) => {
  console.log("drinkType =====>", hero);

  const determineImageSource = () => {
    // Correctly handling drinkType as a key
    if (drinkType && drinkTypeToImage[drinkType]) {
      return drinkTypeToImage[drinkType];
    } else if (hero?.featuredImage?.node?.mediaItemUrl) {
      return hero.featuredImage.node.mediaItemUrl;
    }
    return juldrycker; // Fallback
  };

  const determineAltText = () => {
    return hero?.featuredImage?.node?.altText
      ? hero.featuredImage.node.altText
      : "Bild från DinVinguide";
  };

  return (
    <div className="w-full top-[72px] lg:h-[52vh] ">
      <div className="relative h-[12rem] md:h-[20rem] lg:h-[52vh] w-full">
        <Image
          src={determineImageSource()}
          alt={determineAltText()}
          fill
          style={{ objectFit: "cover", objectPosition: "right" }}
          sizes="(min-width: 1880px) 1617px, (min-width: 1040px) calc(89.88vw - 55px), (min-width: 780px) calc(100vw - 88px), calc(100vw - 32px)"
          priority
        />
        <div className="layout hidden lg:block bg-transparent w-[50%] py-4 absolute  bottom-[5rem] ">
          {hero?.page_content?.intro ? (
            handleParse(hero?.page_content?.intro)
          ) : (
            <div>
              {!drinkType ? (
                <h1 className=" flex flex-col ">
                  <span className="uppercase text-[18px] font-main">
                    topplista
                  </span>
                  <span>{hero?.acf_toplists?.slogan}</span>
                </h1>
              ) : (
                <h1 className=" flex flex-col ">
                  <span className="uppercase text-[18px] font-main">
                    drycker
                  </span>
                  <span>{hero?.title}</span>
                </h1>
              )}
              <p>{hero?.acf_toplists?.text}</p>
            </div>
          )}
        </div>
      </div>

      <div className="layout bg-[#F8F8F9] lg:hidden  py-4 ">
        {hero?.page_content?.intro ? (
          handleParse(hero?.page_content?.intro)
        ) : (
          <div>
            <h1 className=" flex flex-col ">
              <span className="uppercase text-[18px] font-main">topplista</span>
              <span>{hero?.acf_toplists?.slogan}</span>
            </h1>
            <p>{hero?.acf_toplists?.text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DLHero;
