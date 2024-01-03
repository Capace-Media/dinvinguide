import GuideTemplate from "@/components/Templates/GuideTemplate";

import { Suspense } from "react";
import Loading from "../loading";

interface GuiderProps {}

const Guider = ({}: GuiderProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <GuideTemplate />
    </Suspense>
  );
};

export default Guider;
