import { getMidDlAd } from "@/lib/fetchers/dl-ads";
import Banner from "../banner";

export default async function DlMid() {
  const ad = await getMidDlAd();

  return ad ? <Banner ad={ad} /> : null;
}
