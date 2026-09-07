import { getBottomDlAd } from "@/lib/fetchers/dl-ads";
import Banner from "../banner";

export default async function DlBottom() {
  const ad = await getBottomDlAd();

  return ad ? <Banner ad={ad} /> : null;
}
