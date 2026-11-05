import { getTopAd } from "@/lib/api/ads/get-ads";
import Banner from "../banner";

export default async function AdTop() {
  const ad = await getTopAd();

  return ad ? <Banner ad={ad} priority /> : null;
}
