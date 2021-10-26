import { useEffect, useState } from 'react';

import Ad from '../../ads/Ad';
import ListItem from './ListItem';
import flattenObject from '../../../utils/flattenObject';

const List = ({
  array,
  columns = 4,
  maxNodes = columns * 3,
  ads,
  filterKeys = ['title'],
  subtitle = null,
  search = true,
  chunksize = columns * 5,
  heading = '',
}) => {
  const [nodeCount, setNodeCount] = useState(maxNodes);
  const [searchInput, setSearchInput] = useState('');
  const [filterString, setFilterString] = useState('');

  const incrementNodeCount = () => {
    setNodeCount((prev) => prev + maxNodes);
  };

  const printColumns = () => {
    switch (columns) {
      case 5:
        return 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
        break;
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
        break;
      case 3:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3';
        break;
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
        break;
    }
  };
  useEffect(() => {
    let filterTimeout;
    filterTimeout = setTimeout(() => {
      setNodeCount(maxNodes);
      setFilterString(searchInput.toLowerCase());
    }, 300);
    return () => clearTimeout(filterTimeout);
  }, [searchInput]);

  return (
    <>
      {heading && (
        <div className='text-center contain'>
          <h2 className='text-brand-red'>{heading}</h2>
        </div>
      )}
      {search && (
        <div className='text-center contain'>
          <input
            type='text'
            value={searchInput}
            placeholder='Sök...'
            onChange={(e) => setSearchInput(e.target.value)}
            className='w-full max-w-lg px-5 py-3 rounded-sm'
          />
        </div>
      )}

      <ul className={`grid gap-2 row contain ${printColumns()}`}>
        {array
          .filter((item) => {
            item = flattenObject(item);

            if (filterString) {
              let match = false;
              filterKeys.map((key) => {
                console.log(item[key]);
                if (
                  item[key] &&
                  item[key].toLowerCase().includes(filterString)
                ) {
                  match = true;
                }
              });
              return match;
            } else {
              return true;
            }
          })
          .map((item, index) => {
            if (index < nodeCount) {
              if ((index + 1) % chunksize === 0) {
                return (
                  <>
                    <ListItem
                      data={flattenObject(item)}
                      maxNodes={maxNodes}
                      last={index + 1 === nodeCount ? true : false}
                      increment={incrementNodeCount}
                      subtitle={subtitle}
                      key={item.id}
                    />
                    {ads && (
                      <li className='col-span-full row'>
                        <Ad ads={ads} position='mid' />
                      </li>
                    )}
                  </>
                );
              } else {
                return (
                  <ListItem
                    data={flattenObject(item)}
                    maxNodes={maxNodes}
                    last={index + 1 === nodeCount ? true : false}
                    increment={incrementNodeCount}
                    subtitle={subtitle}
                    key={item.id}
                  />
                );
              }
            }
          })}
      </ul>
    </>
  );
};

export default List;
