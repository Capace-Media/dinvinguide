type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string };
};

const RecipeCategoryTemplate = ({ searchParams, params }: Props) => {
  return (
    <div className="">
      <h2 className="">Hello RecipeCategoryTemplate</h2>
    </div>
  );
};

export default RecipeCategoryTemplate;
