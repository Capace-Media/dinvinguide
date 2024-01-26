import Loading from "@/app/loading";
import DruvguidenTemplate from "@/components/Templates/DruvguidenTemplate";

import { Suspense } from "react";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

const Druvguiden = ({ searchParams }: Props) => {
  const params = { slug: "druvguiden" };
  return (
    <Suspense fallback={<Loading />}>
      <DruvguidenTemplate params={params} searchParams={searchParams} />
    </Suspense>
  );
};

export default Druvguiden;
