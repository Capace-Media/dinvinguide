"use client";

import { SkeletonLoader } from "@/components/Blocks/skribenter/Posts/post";
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

  const [isSrc, setSrc] = useState<string>("");
  const [isHref, setHref] = useState<string>("");

  const [imageLoaded, setImageLoaded] = useState(false);

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
    const adField: string = adMapping[position][pageType];

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
        : bannerType === "mobilbanner"
        ? fallbackAd?.acf_ads["mobilbanner"]?.mediaItemUrl
        : fallbackAd?.acf_ads["toppbanner"]?.mediaItemUrl,
    };
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

  useEffect(() => {
    if (isSmall) {
      const { href, src } = getAdData("mobile");
      setHref(href);
      setSrc(src);
    } else {
      const { href, src } = getAdData("desktop");

      setHref(href);
      setSrc(src);
    }

    return () => {
      setHref("");
      setSrc("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSmall]);

  return (
    <div className="flex justify-center items-center">
      <div className="relative lg:hover:scale-105 lg:duration-300 lg:ease-in-out block w-[280px] h-64 lg:w-[980px] lg:h-[200px]">
        {isHref && (
          <a
            href={isHref}
            target="_blank"
            className="block relative w-full h-full"
            rel="noreferrer"
          >
            <>
              <Image
                src={isSrc}
                fill
                style={{ objectFit: "contain" }}
                alt="Annons för viner"
                onLoad={() => setImageLoaded(true)}
                sizes="(min-width: 1040px) 980px, 280px"
              />
              {!imageLoaded && (
                <div className="absolute top-0 left-0 right-0 bottom-0">
                  <div className="aspect-square animate-pulse h-full w-full overflow-hidden bg-brand-primary"></div>
                </div>
              )}
            </>
          </a>
        )}
      </div>
    </div>
  );
};

export default AdBanner;
