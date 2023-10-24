"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface AdBannerProps {
  ads: any;
  position: "TOP" | "MID";
  pageType: "default" | "DL";
}

const AdBanner: React.FC<AdBannerProps> = ({ ads, position, pageType }) => {
  // const [isSmall, setIsSmall] = useState(
  //   window.innerWidth < 1024 ? false : true
  // );

  const [isSmall, setIsSmall] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );

  const getAdData = (device: string) => {
    let ad;

    if (position === "TOP") {
      if (pageType === "DL") {
        ad =
          ads?.acfOptionsAnnonsplaceringar?.acf_adsettings?.adToppbannerDl[0]
            ?.banner[0];
      } else {
        ad =
          ads?.acfOptionsAnnonsplaceringar?.acf_adsettings?.adToppbanner[0]
            ?.banner[0];
      }
    } else if (position === "MID") {
      if (pageType === "DL") {
        ad =
          ads?.acfOptionsAnnonsplaceringar?.acf_adsettings?.adMittenbannerDl[0]
            ?.banner[0];
      } else {
        ad =
          ads?.acfOptionsAnnonsplaceringar?.acf_adsettings?.adMittenbanner[0]
            ?.banner[0];
      }
    }

    if (!ad && position === "TOP") {
      if (pageType === "DL") {
        ad =
          ads?.acfOptionsAnnonsplaceringar?.acf_adsettings?.fallbackannonsDl[0]
            ?.banner[0];
      } else {
        ad = ads.acfOptionsAnnonsplaceringar.acf_adsettings.fallbackannons[0];
      }
    } else if (!ad && position === "MID") {
      if (pageType === "DL") {
        ad =
          ads?.acfOptionsAnnonsplaceringar?.acf_adsettings?.fallbackannonsDl[0]
            ?.banner[0];
      } else {
        ad = ads.acfOptionsAnnonsplaceringar.acf_adsettings.fallbackannons[0];
      }
    }

    const bannerType =
      device === "desktop" && position === "TOP"
        ? "toppbanner"
        : device === "desktop" && position === "MID"
        ? "mittenbanner"
        : "mobilbanner";

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

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth < 1024) {
  //       setIsSmall(false);
  //     } else {
  //       setIsSmall(true);
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);

  //   // Cleanup listener on unmount
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  useEffect(() => {
    // Adjust the ad based on actual client window size
    setIsSmall(window.innerWidth < 1024);

    const handleResize = () => {
      setIsSmall(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className=" flex justify-center items-center">
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
