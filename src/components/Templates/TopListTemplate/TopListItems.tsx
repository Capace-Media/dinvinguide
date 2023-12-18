import TopListItem from "./TopListItme";

interface TopListItemsProps {
  data: any;
}

const TopListItems = ({ data }: TopListItemsProps) => {
  const currentCount = data?.currentDrinks?.length;

  const array = [...data?.currentDrinks, ...data?.previousDrinks];

  console.log("currentCount =====>", array);
  let num = 0;
  return (
    <section className="">
      <ul className="relative z-10 md:px-[14.2rem] layout grid gap-14">
        {data?.currentDrinks?.length > 0 ||
        data?.previousDrinks?.length > 0 ||
        data?.fallbackDrinks?.length > 0 ? (
          <>
            {array?.map(({ node: drink }, i) => {
              if (num < data.toplist.acf_toplists.maxAntal) {
                if (drink.ad) {
                  if (currentCount > 0) {
                    return drink.component;
                  }
                } else {
                  num = num + 1;
                  return <TopListItem key={i} data={drink} index={num} />;
                }
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
