import { getTopAd } from "@/lib/fetchers/ads/default";
import Banner from "../banner";

export default async function AdTop() {
  const ad = await getTopAd();

  return ad ? <Banner ad={ad} priority /> : null;
}
