"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import HandleImage from "../image";

interface AdBannerProps {
  ads: any;
  position: "TOP" | "MID";
}

const AdBanner: React.FC<AdBannerProps> = ({ ads, position }) => {
  const [isSmall, setIsSmall] = useState(true);
  const getAdData = (device: string) => {
    let ad;

    if (position === "TOP") {
      ad = ads.acfOptionsAnnonsplaceringar.acf_adsettings.adToppbanner?.banner;
    } else if (position === "MID") {
      ad =
        ads.acfOptionsAnnonsplaceringar.acf_adsettings.adMittenbanner?.banner;
    }

    if (!ad && position === "TOP") {
      ad = ads.acfOptionsAnnonsplaceringar.acf_adsettings.fallbackannons[0];
    } else if (!ad && position === "MID") {
      ad = ads.acfOptionsAnnonsplaceringar.acf_adsettings.fallbackannons[0];
    }

    const bannerType = device === "desktop" ? "toppbanner" : "mobilbanner";

    return {
      href: ad?.acf_ads?.link,
      src: ad?.acf_ads[bannerType]?.mediaItemUrl,
    };
  };

  const renderAd = (device: string) => {
    const { href, src } = getAdData(device);

    return (
      <a
        href={href}
        target="_blank"
        className="block w-full h-full"
        rel="noreferrer"
      >
        {/* <Image
          src={src}
          fill
          style={{ objectFit: "contain" }}
          alt="Annons"
          sizes="(min-width: 1040px) 980px, 280px"
        /> */}
        <HandleImage
          srcProp={src}
          altProp="Annons"
          sizesProp="(min-width: 1040px) 980px, 280px"
          objectFitProp="contain"
        />
      </a>
    );
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSmall(false);
      } else {
        setIsSmall(true);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="mt-5">
      {!isSmall ? (
        <div className="relative block w-[280px] h-64 lg:hidden">
          {renderAd("mobile")}
        </div>
      ) : (
        <div className="hidden lg:block w-[980px] h-[200px] relative">
          {renderAd("desktop")}
        </div>
      )}
    </div>
  );
};

export default AdBanner;
