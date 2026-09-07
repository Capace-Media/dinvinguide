import { getTopAd } from "@/lib/fetchers/default-ads";
import Banner from "../banner";

export default async function AdTop() {
  const ad = await getTopAd();

  return ad ? <Banner ad={ad} priority /> : null;
}
