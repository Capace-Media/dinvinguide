import DrinktipItem from './DrinktipItem';
import { useState } from 'react';

const DrinktipsList = ({ drinks, searchInput }) => {
  const nodeIncrement = 23;
  const [maxNodes, setMaxNodes] = useState(nodeIncrement);
  const handleLoadMoreNodes = () => {
    setMaxNodes((prev) => prev + nodeIncrement);
  };
  return (
    <ul className='grid gap-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 contain row'>
      {drinks
        .filter((drink) => {
          if (searchInput !== '') {
            if (
              drink.title.toLowerCase().includes(searchInput.toLowerCase()) ||
              drink.acf_dryckestips.dryckestyper
                .toLowerCase()
                .includes(searchInput.toLowerCase()) ||
              drink.acf_dryckestips.forpackningar
                .toLowerCase()
                .includes(searchInput.toLowerCase())
            ) {
              return true;
            } else {
              return false;
            }
          } else {
            return drink;
          }
        })
        .map((drink, index) => {
          if (index <= maxNodes) {
            return (
              <DrinktipItem
                key={drink.title}
                {...drink}
                index={index}
                maxNodes={maxNodes}
                loadMore={handleLoadMoreNodes}
              />
            );
          }
        })}
    </ul>
  );
};

export default DrinktipsList;
