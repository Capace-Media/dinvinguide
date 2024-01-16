import Loading from "@/app/loading";
import GrapeTemplate from "@/components/Templates/GrapeTemplate";
import { WPnext } from "@/lib/wp";
import { Suspense } from "react";

export async function generateStaticParams() {
  const { data } = await WPnext(
    `query getGrapes {
        grapes {
          nodes {
            slug
          }
        }
      }`
  );

  const paths: any[] = [];

  data?.grapes?.nodes &&
    data.grapes.nodes.map((grape: any) => {
      paths.push({ slug: grape.slug });
    });

  return paths;
}

const Grapes = ({ params }: { params: { slug: string } }) => {
  return (
    <Suspense fallback={<Loading />}>
      <GrapeTemplate params={params} />
    </Suspense>
  );
};

export default Grapes;
