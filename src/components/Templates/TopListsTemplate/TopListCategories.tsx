import { getTopLists } from "@/lib/queries/getTopLists";
import Image from "next/image";
import TopListCategory from "./TopListCategory";

interface TopListCategoriesProps {}

async function getData() {
  const res = await getTopLists();

  return { data: res };
}

const TopListCategories = async ({}: TopListCategoriesProps) => {
  const { data } = await getData();

  const elements = [];
  for (let i = 0; i < data.length - 2; i++) {
    elements.push(
      <TopListCategory key={data[i].id} data={data[i]} index={i} />
    );
  }
  return (
    <section className="relative z-10 ">
      <h2 className="pb-10 text-[22px]">Utforska Våra kategorier</h2>
      <ul className="grid gap-3 md:grid-cols-2 lg:gap-0">{elements}</ul>
    </section>
  );
};

export default TopListCategories;
