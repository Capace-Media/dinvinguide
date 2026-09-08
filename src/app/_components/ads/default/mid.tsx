import { getMidAd } from "@/lib/fetchers/default-ads";
import Banner from "../banner";

export default async function AdMid() {
  const ad = await getMidAd();

  return ad ? <Banner ad={ad} /> : null;
}
