import {
  AD_BOTTOM,
  AD_DL_BOTTOM,
  AD_DL_MID,
  AD_DL_TOP,
  AD_MID,
  AD_TOP,
} from "@/lib/queries/fragments/ads";
import { WPAdd } from "@/lib/wp";

import AdBanner from "./AdBanner";

const QUERY_MAP = {
  default: {
    TOP: AD_TOP,
    MID: AD_MID,
    BOTTOM: AD_BOTTOM,
  },
  DL: {
    TOP: AD_DL_TOP,
    MID: AD_DL_MID,
    BOTTOM: AD_DL_BOTTOM,
  },
};

interface AdsProps {
  pageType: "default" | "DL";
  position: "TOP" | "MID" | "BOTTOM";
}

export function getAdQuery(
  pageType: "default" | "DL" = "default",
  position: "TOP" | "MID" | "BOTTOM" = "TOP"
): string {
  if (!QUERY_MAP[pageType]) {
    console.error(`Invalid pageType provided: ${pageType}`);
    return "";
  }

  if (!QUERY_MAP[pageType][position]) {
    console.error(
      `Invalid position provided for pageType ${pageType}: ${position}`
    );
    return "";
  }

  return QUERY_MAP[pageType][position];
}

async function fetchAds(pageType: any, position: any) {
  const query = getAdQuery(pageType, position);

  try {
    const data = await WPAdd(query);
    return data.data;
  } catch (error) {
    console.error("Fetch Ads Error:", error);
    return null; // Adjusted to return null on error
  }
}

export default async function Ads({ pageType, position }: AdsProps) {
  const ads = await fetchAds(pageType, position);

  return (
    <div className="bg-white layout contain">
      <AdBanner ads={ads} position={position} pageType={pageType} />
    </div>
  );
}
