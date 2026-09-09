import { getBottomDlAd } from "@/lib/fetchers/ads/dl";
import Banner from "../banner";

export default async function DlBottom() {
  const ad = await getBottomDlAd();

  return ad ? <Banner ad={ad} /> : null;
}
