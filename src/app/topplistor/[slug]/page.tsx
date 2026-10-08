import Loading from "@/app/loading";
import TopListTemplate from "@/components/Templates/TopListTemplate";
import { getToplistPaths } from "@/lib/api/drinks/get-drinks";
import { Suspense } from "react";

export const dynamicParams = true;

export async function generateStaticParams() {
  const data = await getToplistPaths();

  const paths: any[] = [];

  data &&
    data.map((topList: any) => {
      paths.push({ slug: topList.slug });
    });

  return paths;
}
const SingelTopList = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  return (
    <Suspense fallback={<Loading />}>
      <TopListTemplate params={params} />
    </Suspense>
  );
};

export default SingelTopList;
