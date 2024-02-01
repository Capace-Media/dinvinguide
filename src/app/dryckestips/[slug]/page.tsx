type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string };
};

const DrinkTipsPage = ({ searchParams, params }: Props) => {
  return (
    <div className="">
      <h2>dryckestips</h2>
    </div>
  );
};

export default DrinkTipsPage;
