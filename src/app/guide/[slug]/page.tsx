import Loading from "@/app/loading";
import SingleGuideTemplate from "@/components/Templates/SingleGuideTemplate";
import { Suspense } from "react";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined };
};

export function generateStaticParams() {
  return [
    { slug: "druvor" },
    { slug: "vinatlas" },
    { slug: "vinskola" },
    { slug: "oldlista" },
  ];
}

const SingleGuidePage = ({ params, searchParams }: Props) => {
  return (
    <Suspense fallback={<Loading />}>
      <SingleGuideTemplate params={params} searchParams={searchParams} />
    </Suspense>
  );
};

export default SingleGuidePage;
