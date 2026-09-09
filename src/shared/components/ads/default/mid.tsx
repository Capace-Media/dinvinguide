import { getMidAd } from "@/lib/fetchers/ads/default";
import Banner from "../banner";

export default async function AdMid() {
  const ad = await getMidAd();

  return ad ? <Banner ad={ad} /> : null;
}
