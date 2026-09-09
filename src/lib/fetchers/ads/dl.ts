import { DL_BOTTOM_AD, DL_MID_AD, DL_TOP_AD } from "../../queries/dl-ads";
import { getAd } from "./shape";

export type { Ad, AdImage } from "./shape";

export function getTopDlAd() {
  return getAd(DL_TOP_AD);
}

export function getMidDlAd() {
  return getAd(DL_MID_AD);
}

export function getBottomDlAd() {
  return getAd(DL_BOTTOM_AD);
}
