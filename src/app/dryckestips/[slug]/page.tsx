import DrinkTipTemplate from "@/components/Templates/DrinkTipTemplate";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string };
};

const DrinkTipsPage = ({ searchParams, params }: Props) => {
  return (
    <div className="">
      <DrinkTipTemplate searchParams={searchParams} params={params} />
    </div>
  );
};

export default DrinkTipsPage;
