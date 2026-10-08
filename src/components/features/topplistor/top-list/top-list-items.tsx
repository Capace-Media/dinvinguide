import type { ExtendedToplist } from "@/lib/api/drinks/get-drinks";
import TopListItem from "./top-list-item";

interface TopListItemsProps {
  topList: ExtendedToplist;
}

const TopListItems = ({ topList }: TopListItemsProps) => {
  const { currentDrinks, previousDrinks, fallbackDrinks } = topList;
  const drinks = [...currentDrinks, ...previousDrinks, ...fallbackDrinks].slice(
    0,
    topList.toplist.acf_toplists?.maxAntal ?? 0
  );

  return (
    <section>
      <ul className="relative z-10 md:px-[14.2rem] layout grid gap-14">
        {currentDrinks.length > 0 || previousDrinks.length > 0 ? (
          drinks.map(({ node: drink }, i) => (
            <TopListItem key={drink.id} drink={drink} index={i + 1} />
          ))
        ) : (
          <div className="flex flex-col grid-cols-2 gap-16 lg:grid">
            <p>Nya viner till topplistan kommer snart!</p>
          </div>
        )}
      </ul>
    </section>
  );
};

export default TopListItems;
