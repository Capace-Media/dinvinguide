import Loading from "@/app/loading";
import SingleWineSchoolTemplate from "@/components/Templates/SingleWineSchoolTemplate";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | any | undefined | null }>;
};

const WineSchool = async (props: Props) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  return (
    <Suspense fallback={<Loading />}>
      <SingleWineSchoolTemplate params={params} searchParams={searchParams} />
    </Suspense>
  );
};

export default WineSchool;
