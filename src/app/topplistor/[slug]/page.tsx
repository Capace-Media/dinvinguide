import Loading from "@/app/loading";
import TopListTemplate from "@/components/Templates/TopListTemplate";
import { getToplistPaths } from "@/lib/queries/getTopListDrinks";
import { Suspense } from "react";

export const dynamicParams = false;

export async function generateStaticParams() {
  const data = await getToplistPaths();

  const paths: any[] = [];

  data &&
    data.map((topList: any) => {
      paths.push({ slug: topList.slug });
    });

  return paths;
}
const SingelTopList = ({ params }: { params: { slug: string } }) => {
  return (
    <Suspense fallback={<Loading />}>
      <TopListTemplate params={params} />
    </Suspense>
  );
};

export default SingelTopList;
