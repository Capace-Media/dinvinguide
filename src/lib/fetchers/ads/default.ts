import {
  DEFAULT_BOTTOM_AD,
  DEFAULT_MID_AD,
  DEFAULT_TOP_AD,
} from "../../queries/default-ads";
import { getAd } from "./shape";

export type { Ad, AdImage } from "./shape";

export function getTopAd() {
  return getAd(DEFAULT_TOP_AD);
}

export function getMidAd() {
  return getAd(DEFAULT_MID_AD);
}

export function getBottomAd() {
  return getAd(DEFAULT_BOTTOM_AD);
}
