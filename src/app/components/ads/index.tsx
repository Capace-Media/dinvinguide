import {
  AD_DL_MID,
  AD_DL_TOP,
  AD_MID,
  AD_TOP,
} from "@/lib/queries/fragments/ads";
import WP from "@/lib/wp";
import { AdsData } from "../../../../types/AdTypes";
import AdBanner from "./AdBanner";

const QUERY_MAP = {
  default: {
    TOP: AD_TOP,
    MID: AD_MID,
  },
  DL: {
    TOP: AD_DL_TOP,
    MID: AD_DL_MID,
  },
};

interface AdsProps {
  pageType: "default" | "DL";
  position: "TOP" | "MID";
}

export function getAdQuery(
  pageType: "default" | "DL" = "default",
  position: "TOP" | "MID" = "TOP"
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

async function fetchAds(
  pageType: "default" | "DL",
  position: "TOP" | "MID"
): Promise<AdsData> {
  const query = getAdQuery(pageType, position);

  const data = await WP(query);

  return data.data;
}

export default async function Ads({ pageType, position }: AdsProps) {
  const ads = await fetchAds(pageType, position);

  return (
    <div className="bg-white layout contain">
      <AdBanner ads={ads} position={position} />
    </div>
  );
}
