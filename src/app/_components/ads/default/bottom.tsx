import { getBottomAd } from "@/lib/fetchers/default-ads";
import Banner from "../banner";

export default async function AdBottom() {
  const ad = await getBottomAd();

  return ad ? <Banner ad={ad} /> : null;
}
