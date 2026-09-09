import { getBottomAd } from "@/lib/fetchers/ads/default";
import Banner from "../banner";

export default async function AdBottom() {
  const ad = await getBottomAd();

  return ad ? <Banner ad={ad} /> : null;
}
