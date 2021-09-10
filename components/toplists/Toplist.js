import Ad from '../ads/Ad';
import ToplistItem from './ToplistItem';

const Toplist = ({ data, ads }) => {
  const currentCount = data.currentDrinks.length;

  const array = [
    ...data.currentDrinks,
    { node: { ad: true, component: <Ad ads={ads} position='top' /> } },
    ...data.fallbackDrinks,
  ];

  let num = 0;

  return (
    <div className='space-y-20'>
      {array.map(({ node: drink }, i) => {
        if (num < 5) {
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
