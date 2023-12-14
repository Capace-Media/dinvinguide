import Loading from "@/app/loading";
import DrinkTemplate from "@/components/Templates/DrinkTemplate";
import { Suspense } from "react";

interface DrinkProps {}

const Drink = ({}: DrinkProps) => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <DrinkTemplate />
      </Suspense>
    </>
  );
};

export default Drink;
