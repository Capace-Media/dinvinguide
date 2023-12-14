import TopListTemplate from "@/components/Templates/TopListTemplate";
import { getPage } from "@/lib/queries/getPage";

interface TopListProps {}

async function getData() {
  const res = await getPage("/topplistor");

  return { page: res };
}

const TopList = async ({}: TopListProps) => {
  const { page } = await getData();

  const { seo, ...rest } = page;

  return (
    <>
      <TopListTemplate hero={rest} />
    </>
  );
};

export default TopList;
