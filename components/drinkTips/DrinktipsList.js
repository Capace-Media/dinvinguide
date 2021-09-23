import DrinktipItem from './DrinktipItem';
import { useState } from 'react';

const DrinktipsList = ({ drinks }) => {
  const nodeIncrement = 23;
  const [maxNodes, setMaxNodes] = useState(nodeIncrement);
  const handleLoadMoreNodes = () => {
    setMaxNodes((prev) => prev + nodeIncrement);
  };
  return (
    <ul className='grid grid-cols-4 gap-10 contain row'>
      {drinks.map((drink, index) => {
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
