import Ad from '../ads/Ad';
import ClientAd from '../ads/ClientAd';
import ToplistItem from './ToplistItem';

const Toplist = ({ data, ads }) => {
  const currentCount = data.currentDrinks.length;
  console.log(data);
  const array = [
    ...data.currentDrinks,
    ...data.previousDrinks,
    ...data.fallbackDrinks,
  ];
  array.splice(3, 0, {
    node: { ad: true, component: <ClientAd position='mid' type='dl' /> },
  });

  let num = 0;

  return (
    <div className='space-y-20'>
      {array?.map(({ node: drink }, i) => {
        if (num < data.toplist.acf_toplists.maxAntal) {
          if (drink.ad) {
            if (currentCount > 0) {
              return drink.component;
            }
          } else {
            num = num + 1;
            return <ToplistItem data={drink} index={num} />;
          }
        }
      })}
    </div>
  );
};

export default Toplist;
