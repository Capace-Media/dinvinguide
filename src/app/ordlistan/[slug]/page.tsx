import WordTemplate from "@/components/Templates/WordTemplate";
import { ParamsProps } from "../../../../types/Global";

interface WordProps {}

const Word = ({ searchParams, params }: ParamsProps) => {
  return (
    <>
      <WordTemplate searchParams={searchParams} params={params} />
    </>
  );
};

export default Word;
