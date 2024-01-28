import WordsTemplate from "@/components/Templates/WordsTemplate";
import { ParamsProps } from "../../../types/Global";

const Words = ({ searchParams, params }: ParamsProps) => {
  return (
    <>
      <WordsTemplate searchParams={searchParams} />
    </>
  );
};

export default Words;
