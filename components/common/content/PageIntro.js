import Image from "next/image";
import Ad from "../../ads/Ad";
import ClientAd from "../../ads/ClientAd";
import BreadCrumbs from "../BreadCrumbs/Breadcrumbs";
import Intro from "./Intro";

const PageIntro = ({ title, text, ad, crumbs, type, image, alt, adType }) => {
  return (
    <>
      {crumbs && <BreadCrumbs crumbs={crumbs} />}
      <div className="text-center contain-sm row">
        {image && (
          <figure className="relative mb-10 aspect-w-16 aspect-h-9">
            <Image
              src={image}
              layout="fill"
              objectFit="cover"
              alt={alt ? alt : title ? title : "Bild från DinVinGuide"}
            />
          </figure>
        )}
        {type && <p className="mb-5">{type}</p>}
        <h1 className="mb-5 break-words text-brand-red">{title}</h1>
        {text && <Intro content={text} />}
      </div>
      {ad && (
        <div className="mb-10">
          <ClientAd position="top" type={adType} />
        </div>
      )}
    </>
  );
};

export default PageIntro;
