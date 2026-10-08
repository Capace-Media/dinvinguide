import { getTopLists } from "@/lib/api/pages/get-pages";

import TopListCategory from "./TopListCategory";

interface TopListCategoriesProps {}

const TopListCategories = async ({}: TopListCategoriesProps) => {
  const data = await getTopLists();

  return (
    <section className="relative z-10 ">
      <h2 className="pb-10 text-[22px]">Utforska Våra kategorier</h2>
      <ul className="grid gap-3 md:grid-cols-2 lg:gap-0">
        {data.slice(0, -2).map((item, index) => (
          <TopListCategory key={item.id} data={item} index={index} />
        ))}
      </ul>
    </section>
  );
};

export default TopListCategories;
