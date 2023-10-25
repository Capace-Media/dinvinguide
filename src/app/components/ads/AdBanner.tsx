"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface AdBannerProps {
  ads: any;
  position: "TOP" | "MID" | "BOTTOM";
  pageType: "default" | "DL";
}

const AdBanner: React.FC<AdBannerProps> = ({ ads, position, pageType }) => {
  // Constants
  const TOP = "TOP";
  const MID = "MID";
  const BOTTOM = "BOTTOM";
  const DL = "DL";
  const DEFAULT = "default";

  // Initial State
  const [isSmall, setIsSmall] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );

  // Mapping for positions and page types to retrieve ad data
  const adMapping = {
    [TOP]: {
      [DL]: "adToppbannerDl",
      [DEFAULT]: "adToppbanner",
    },
    [MID]: {
      [DL]: "adMittenbannerDl",
      [DEFAULT]: "adMittenbanner",
    },
    [BOTTOM]: {
      [DL]: "adSidobannerDl",
      [DEFAULT]: "adSidobanner",
    },
  };

  const getAdData = (device: string) => {
    const adField = adMapping[position][pageType];

    const ad =
      ads?.acfOptionsAnnonsplaceringar?.acf_adsettings?.[adField] &&
      ads?.acfOptionsAnnonsplaceringar?.acf_adsettings?.[adField]?.[0]
        ?.banner?.[0];

    // Simplified fallbackAd assignment
    const fallbackField =
      pageType === "DL" ? "fallbackannonsDl" : "fallbackannons";
    const fallbackAd =
      ads?.acfOptionsAnnonsplaceringar?.acf_adsettings?.[fallbackField]?.[0];

    const bannerType =
      device === "desktop" && position === TOP
        ? "toppbanner"
        : device === "desktop" && position === MID
        ? "mittenbanner"
        : device === "desktop" && position === BOTTOM
        ? "sidobanner"
        : "mobilbanner";

    return {
      href: ad ? ad?.acf_ads?.link : fallbackAd?.acf_ads?.link,
      src: ad
        ? ad?.acf_ads[bannerType]?.mediaItemUrl
        : fallbackAd?.acf_ads["toppbanner"]?.mediaItemUrl,
    };
  };

  const renderAd = (device: string) => {
    const { href, src } = getAdData(device);
    return (
      <a
        href={href}
        target="_blank"
        className="block relative w-full h-full"
        rel="noreferrer"
      >
        <Image
          src={src}
          fill
          style={{ objectFit: "contain" }}
          alt="Annons"
          sizes="(min-width: 1040px) 980px, 280px"
        />
      </a>
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex justify-center items-center">
      {isSmall ? (
        <div className="relative lg:hover:scale-105 lg:duration-300 lg:ease-in-out block w-[280px] h-64 lg:hidden">
          {renderAd("mobile")}
        </div>
      ) : (
        <div className="hidden lg:block w-[980px] lg:hover:scale-105 lg:duration-300 lg:ease-in-out h-[200px] relative">
          {renderAd("desktop")}
        </div>
      )}
    </div>
  );
};

export default AdBanner;
