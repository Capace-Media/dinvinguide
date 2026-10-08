import "server-only";
import { cache } from "react";
import { DEFAULT_ADS } from "../../queries/default-ads";
import { getAds } from "./shape";

export type { Ad, AdImage, AdSlots } from "./shape";

// One request for all three slots, shared by every slot on the page.
export const getDefaultAds = cache(() => getAds(DEFAULT_ADS));

// Starts the ad request without waiting for it. Call it before other awaits so
// the ads load in parallel with the rest of the page's data.
export const preloadDefaultAds = () => {
  void getDefaultAds();
};

export async function getTopAd() {
  return (await getDefaultAds()).top;
}

export async function getMidAd() {
  return (await getDefaultAds()).mid;
}

export async function getBottomAd() {
  return (await getDefaultAds()).bottom;
}
