import WineTipsTemplate from "@/components/Templates/WineTipsTemplate";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string };
};

const DrinkTips = ({ searchParams, params }: Props) => {
  return (
    <div className="">
      <WineTipsTemplate searchParams={searchParams} params={params} />
    </div>
  );
};

export default DrinkTips;
