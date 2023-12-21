import Loading from "@/app/loading";
import DrinkTemplate from "@/components/Templates/DrinkTemplate";
import { Suspense } from "react";

interface DrinkProps {}

const Drink = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <DrinkTemplate params={params} />
      </Suspense>
    </>
  );
};

export default Drink;
