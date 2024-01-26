import RecipesTemplate from "@/components/Templates/RecipesBankTemplate";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

const RecipesBank = ({ searchParams }: Props) => {
  return (
    <div className="">
      <RecipesTemplate searchParams={searchParams} />
    </div>
  );
};

export default RecipesBank;
