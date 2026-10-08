import { getTopLists } from "@/lib/api/pages/get-pages";

import TopListCategory from "@/components/shared/top-list-category";

const TopListCategories = async () => {
  const topLists = await getTopLists();

  return (
    <section className="relative z-10 ">
      <h2 className="pb-10 text-[22px]">Utforska Våra kategorier</h2>
      <ul className="grid gap-3 md:grid-cols-2 lg:gap-0">
        {topLists.slice(0, -2).map((topList, index) => (
          <TopListCategory key={topList.id} topList={topList} index={index} />
        ))}
      </ul>
    </section>
  );
};

export default TopListCategories;
