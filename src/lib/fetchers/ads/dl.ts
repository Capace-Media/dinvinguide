import "server-only";
import { cache } from "react";
import { DL_ADS } from "../../queries/dl-ads";
import { getAds } from "./shape";

export type { Ad, AdImage, AdSlots } from "./shape";

// One request for all three slots, shared by every slot on the page.
export const getDlAds = cache(() => getAds(DL_ADS));

// Starts the ad request without waiting for it. Call it before other awaits so
// the ads load in parallel with the rest of the page's data.
export const preloadDlAds = () => {
  void getDlAds();
};

export async function getTopDlAd() {
  return (await getDlAds()).top;
}

export async function getMidDlAd() {
  return (await getDlAds()).mid;
}

export async function getBottomDlAd() {
  return (await getDlAds()).bottom;
}
