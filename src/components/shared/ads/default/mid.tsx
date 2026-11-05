import { getMidAd } from "@/lib/api/ads/get-ads";
import Banner from "../banner";

export default async function AdMid() {
  const ad = await getMidAd();

  return ad ? <Banner ad={ad} /> : null;
}
