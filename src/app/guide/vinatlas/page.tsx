import Loading from "@/app/loading";
import WineAtlasTemplate from "@/components/Templates/WineAtlasTemplate";
import { Suspense } from "react";
type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

const WineAtlases = ({ searchParams }: Props) => {
  const params = { slug: "vinatlas" };
  return (
    <Suspense fallback={<Loading />}>
      <WineAtlasTemplate params={params} searchParams={searchParams} />
    </Suspense>
  );
};

export default WineAtlases;
