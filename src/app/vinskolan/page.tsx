import Loading from "@/app/loading";
import WineSchoolTemplate from "@/components/Templates/WineSchoolTemplate";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | any | undefined | null }>;
};

const WineSchools = async (props: Props) => {
  const searchParams = await props.searchParams;
  const params = { slug: "skolor" };
  return (
    <Suspense fallback={<Loading />}>
      <WineSchoolTemplate params={params} searchParams={searchParams} />
    </Suspense>
  );
};

export default WineSchools;
