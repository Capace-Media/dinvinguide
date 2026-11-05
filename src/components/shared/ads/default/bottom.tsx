import { getBottomAd } from "@/lib/api/ads/get-ads";
import Banner from "../banner";

export default async function AdBottom() {
  const ad = await getBottomAd();

  return ad ? <Banner ad={ad} /> : null;
}
