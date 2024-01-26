import Recipe from "./Recipe";

interface RecipePaginationProps {
  data: any[];
}

const RecipePagination = ({ data }: RecipePaginationProps) => {
  return (
    <>
      <div className="layout bg-white contain">
        <ul className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
          {data &&
            data.map((recipe: any, index: number) => {
              return (
                <li key={recipe?.node?.id} className="relative">
                  <Recipe recipe={recipe?.node} />
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default RecipePagination;
