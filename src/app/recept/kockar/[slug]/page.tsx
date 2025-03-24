import ChefTemplate from "@/components/Templates/ChefTemplate";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | any | undefined | null }>;
  params: Promise<{ slug: string }>;
};

const Chef = async (props: Props) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
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
