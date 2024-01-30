import Loading from "@/app/loading";
import VinTVTemplate from "@/components/Templates/VinTVTemplate";

import { Suspense } from "react";
type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

const VinTV = ({ searchParams }: Props) => {
  const params = { slug: "vin-tv" };
  return (
    <Suspense fallback={<Loading />}>
      <VinTVTemplate params={params} searchParams={searchParams} />
    </Suspense>
  );
};

export default VinTV;
