import { getTopDlAd } from "@/lib/fetchers/dl-ads";
import Banner from "../banner";

export default async function DlTop() {
  const ad = await getTopDlAd();

  return ad ? <Banner ad={ad} priority /> : null;
}
