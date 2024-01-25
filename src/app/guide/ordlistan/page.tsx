import WordTemplate from "@/components/Templates/WordTemplate";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

const Words = ({ searchParams }: Props) => {
  return (
    <>
      <WordTemplate searchParams={searchParams} />
    </>
  );
};

export default Words;
