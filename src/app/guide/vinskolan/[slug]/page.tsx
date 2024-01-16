import Loading from "@/app/loading";
import SingleWineSchoolTemplate from "@/components/Templates/SingleWineSchoolTemplate";
import { Suspense } from "react";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

const WineSchool = ({ params, searchParams }: Props) => {
  return (
    <Suspense fallback={<Loading />}>
      <SingleWineSchoolTemplate params={params} searchParams={searchParams} />
    </Suspense>
  );
};

export default WineSchool;
