"use server";

import { DL_BOTTOM_AD, DL_MID_AD, DL_TOP_AD } from "@/lib/queries/getAds";
import { isFailure, isSuccess, tryCatch } from "@/lib/utils/try-catch";
import WP from "@/lib/wp";
import { getFallbackAd } from "./fallback";

async function getDlAd(query: string) {
  const ads = await tryCatch(WP(query, "ads"));

  if (!ads?.data?.data?.options?.settings?.ad[0]?.banner) {
    const fallbackAd = await getFallbackAd();
    return fallbackAd;
  }

  if (isFailure(ads)) {
    return {
      status: "error",
      message: "Failed to fetch fallback ad",
    };
  }

  if (isSuccess(ads)) {
    const data = {
      desktop: ads.data.data.options.settings.ad[0].banner[0].acf_ads.desktop,
      mobile: ads.data.data.options.settings.ad[0].banner[0].acf_ads.mobile,
      link: ads.data.data.options.settings.ad[0].banner[0].acf_ads.link,
      id: ads.data.data.options.settings.ad[0].banner[0].id,
      title: ads.data.data.options.settings.ad[0].banner[0].title,
    };
    return data;
  }
}

export async function getTopDlAds() {
  return getDlAd(DL_TOP_AD);
}

export async function getMidDlAds() {
  return getDlAd(DL_MID_AD);
}

export async function getBottomDlAds() {
  return getDlAd(DL_BOTTOM_AD);
}
