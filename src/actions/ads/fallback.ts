"use server";

import { FALLBACK_AD } from "@/lib/queries/getAds";
import { isFailure, isSuccess, tryCatch } from "@/lib/utils/try-catch";
import WP from "@/lib/wp";

export async function getFallbackAd() {
  const ads = await tryCatch(WP(FALLBACK_AD, "ads"));

  if (isFailure(ads)) {
    return {
      status: "error",
      message: "Failed to fetch fallback ad",
    };
  }

  if (isSuccess(ads)) {
    const data = {
      desktop: ads.data.data.options.settings.ad[0].acf_ads.desktop,
      mobile: ads.data.data.options.settings.ad[0].acf_ads.mobile,
      link: ads.data.data.options.settings.ad[0].acf_ads.link,
      id: ads.data.data.options.settings.ad[0].id,
      title: ads.data.data.options.settings.ad[0].title,
    };
    return data;
  }
}
