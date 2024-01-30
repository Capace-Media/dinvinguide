import RecipeCategoryTemplate from "@/components/Templates/RecipeCategoryTemplate";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

const Drycker = ({ searchParams }: Props) => {
  const params = { slug: "drycker" };
  return (
    <>
      <RecipeCategoryTemplate searchParams={searchParams} params={params} />
    </>
  );
};

export default Drycker;
