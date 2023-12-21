import TopListItem from "./TopListItme";

interface TopListItemsProps {
  data: any;
}

const TopListItems = ({ data }: TopListItemsProps) => {
  const currentDrinks = Array.isArray(data?.currentDrinks)
    ? data.currentDrinks
    : [];
  const previousDrinks = Array.isArray(data?.previousDrinks)
    ? data.previousDrinks
    : [];
  const fallbackDrinks = Array.isArray(data?.fallbackDrinks)
    ? data.fallbackDrinks
    : [];
  const array = [...currentDrinks, ...previousDrinks, ...fallbackDrinks];

  let num = 0;
  return (
    <section className="">
      <ul className="relative z-10 md:px-[14.2rem] layout grid gap-14">
        {data?.currentDrinks?.length > 0 || data?.previousDrinks?.length > 0 ? (
          <>
            {array &&
              array?.map(({ node: drink }, i) => {
                if (num < data.toplist.acf_toplists.maxAntal) {
                  num = num + 1;
                  return (
                    <TopListItem key={drink?.id} data={drink} index={i + 1} />
                  );
                }
              })}
          </>
        ) : (
          <div className="flex flex-col grid-cols-2 gap-16 lg:grid contain-sm">
            <p>Nya viner till topplistan kommer snart!</p>
          </div>
        )}
      </ul>
    </section>
  );
};

export default TopListItems;
