import WordsTemplate from "@/components/Templates/WordsTemplate";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

const Words = ({ searchParams }: Props) => {
  return (
    <>
      <WordsTemplate searchParams={searchParams} />
    </>
  );
};

export default Words;
