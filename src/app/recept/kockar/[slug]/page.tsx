import ChefTemplate from "@/components/Templates/ChefTemplate";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string };
};

const Chef = ({ searchParams, params }: Props) => {
  return (
    <>
      <ChefTemplate
        searchParams={searchParams}
        params={params}
        mainSlug="kockar"
      />
    </>
  );
};

export default Chef;
