import Ad from "../ads/Ad";
import ClientAd from "../ads/ClientAd";
import { LeftSplash, RightSplash } from "../icons";
import ToplistItem from "./ToplistItem";

const Toplist = ({ data, ads }) => {
  const currentCount = data.currentDrinks.length;

  const array = [
    ...data.currentDrinks,
    ...data.previousDrinks,
    ...data.fallbackDrinks,
  ];
  array.splice(3, 0, {
    node: { ad: true, component: <ClientAd position="mid" type="dl" /> },
  });

  let num = 0;

  return (
    <div className="relative space-y-20 py-[101px] overflow-x-hidden overflow-y-hidden">
      <RightSplash className="absolute right-0 top-[400px] md:-top-[30px] -z-10" />
      <LeftSplash className="absolute left-0 -top-[350px] -z-10" />
      {array?.map(({ node: drink }, i) => {
        if (num < data.toplist.acf_toplists.maxAntal) {
          if (drink.ad) {
            if (currentCount > 0) {
              return drink.component;
            }
          } else {
            num = num + 1;
            return <ToplistItem key={i} data={drink} index={num} />;
          }
        }
      })}
    </div>
  );
};

export default Toplist;
