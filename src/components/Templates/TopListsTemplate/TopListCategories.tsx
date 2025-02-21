import { getTopLists } from "@/lib/queries/getTopLists";

import { TopList } from "../../../../types/toplists";
import TopListCategory from "./TopListCategory";

interface TopListCategoriesProps {}

async function getData(): Promise<TopList[]> {
  const res = await getTopLists();
  return res;
}

const TopListCategories = async ({}: TopListCategoriesProps) => {
  const data = await getData();

  return (
    <section className="relative z-10 ">
      <h2 className="pb-10 text-[22px]">Utforska Våra kategorier</h2>
      <ul className="grid gap-3 md:grid-cols-2 lg:gap-0">
        {data.slice(0, -2).map((item: TopList, index: number) => (
          <TopListCategory key={item.id} data={item} index={index} />
        ))}
      </ul>
    </section>
  );
};

export default TopListCategories;
