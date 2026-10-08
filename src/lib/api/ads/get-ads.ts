import "server-only";
import { cache } from "react";
import { wpQuery } from "@/lib/wp/client";
import { toAdSlots } from "./ad-slots";
import { DefaultAdsQuery, DlAdsQuery } from "./queries";

export type { Ad, AdImage, AdSlots } from "./ad-slots";

// One request per page type for all three slots, shared by every slot on the
// page. Call the preload before other awaits so the ads load in parallel with
// the rest of the page's data.

export const getDefaultAds = cache(async () => {
  const data = await wpQuery(DefaultAdsQuery, undefined, { tags: ["ads"] });
  return toAdSlots(data?.options?.settings);
});

export const preloadDefaultAds = () => {
  void getDefaultAds();
};

export const getDlAds = cache(async () => {
  const data = await wpQuery(DlAdsQuery, undefined, { tags: ["ads"] });
  return toAdSlots(data?.options?.settings);
});

export const preloadDlAds = () => {
  void getDlAds();
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

export async function getTopDlAd() {
  return (await getDlAds()).top;
}

export async function getMidDlAd() {
  return (await getDlAds()).mid;
}

export async function getBottomDlAd() {
  return (await getDlAds()).bottom;
}
