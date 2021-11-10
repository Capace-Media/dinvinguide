import { useEffect, useState } from 'react';

import Ad from '../ads/Ad';
import ClientAd from '../ads/ClientAd';
import DrinkListItem from './DrinkListItem';
import flattenObject from '../../utils/flattenObject';

const DrinkList = ({ drycker }) => {
  const [maxNodes, setMaxNodes] = useState(23);
  const [searchInput, setSearchInput] = useState('');
  const [filterString, setFilterString] = useState('');
  const [onlyEco, setOnlyEco] = useState(false);
  const [alcoholFree, setAlcoholFree] = useState(false);
  const chunksize = 3 * 5;

  const handleLoadMore = () => {
    setMaxNodes((prev) => prev + 23);
  };

  useEffect(() => {
    let filterTimeout;
    filterTimeout = setTimeout(() => {
      setFilterString(searchInput.toLowerCase());
    }, 300);
    return () => clearTimeout(filterTimeout);
  }, [searchInput]);

  return (
    <>
      <div className='flex flex-col items-center contain row'>
        <div className='w-full text-center'>
          <input
            type='text'
            className='w-full max-w-lg px-5 py-3 rounded-sm'
            placeholder='Sök drycker'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className='flex items-center mt-4 space-x-6'>
          <span className='flex items-center space-x-3'>
            <input
              type='checkbox'
              name='ekologiskt'
              checked={onlyEco}
              onChange={() => setOnlyEco(!onlyEco)}
            />
            <label htmlFor='ekologiskt'>Ekologiskt</label>
          </span>
          <span className='flex items-center space-x-3'>
            <input
              type='checkbox'
              name='alkoholfri'
              checked={alcoholFree}
              onChange={() => setAlcoholFree(!alcoholFree)}
            />
            <label htmlFor='alkoholfri'>Alkoholfritt</label>
          </span>
        </div>
      </div>
      <ul className='grid gap-2 lg:gap-5 lg:grid-cols-3 area row contain'>
        {drycker
          .filter(({ node: dryck }) => {
            if (filterString === 'no:image') {
              if (!dryck.featuredImage) {
                return true;
              } else {
                return false;
              }
            } else {
              if (filterString) {
                if (
                  (dryck.title &&
                    dryck.title
                      .toLowerCase()
                      .includes(filterString.toLowerCase())) ||
                  (dryck.acf_drinks.dryckestyper &&
                    dryck.acf_drinks.dryckestyper.name
                      .toLowerCase()
                      .includes(filterString.toLowerCase())) ||
                  (dryck.acf_drinks.forpackningar &&
                    dryck.acf_drinks.forpackningar.name
                      .toLowerCase()
                      .includes(filterString.toLowerCase()))
                ) {
                  if (onlyEco && alcoholFree) {
                    if (
                      dryck.acf_drinks.ekologiskt &&
                      dryck.acf_drinks.dryckestyper &&
                      dryck.acf_drinks.dryckestyper.name === 'Alkoholfritt'
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  } else {
                    if (onlyEco) {
                      if (dryck.acf_drinks.ekologiskt) {
                        return true;
                      } else {
                        return false;
                      }
                    }
                    if (alcoholFree) {
                      if (
                        dryck.acf_drinks.dryckestyper &&
                        dryck.acf_drinks.dryckestyper.name === 'Alkoholfritt'
                      ) {
                        return true;
                      } else {
                        return false;
                      }
                    }
                  }

                  return true;
                }
              } else {
                if (onlyEco && alcoholFree) {
                  if (
                    dryck.acf_drinks.ekologiskt &&
                    dryck.acf_drinks.dryckestyper &&
                    dryck.acf_drinks.dryckestyper.name === 'Alkoholfritt'
                  ) {
                    return true;
                  } else {
                    return false;
                  }
                } else {
                  if (onlyEco) {
                    if (dryck.acf_drinks.ekologiskt) {
                      return true;
                    } else {
                      return false;
                    }
                  }
                  if (alcoholFree) {
                    if (
                      dryck.acf_drinks.dryckestyper &&
                      dryck.acf_drinks.dryckestyper.name === 'Alkoholfritt'
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }
                }

                return true;
              }
            }
          })
          .map(({ node: dryck }, index) => {
            if (index <= maxNodes) {
              if ((index + 1) % chunksize === 0) {
                return (
                  <>
                    <DrinkListItem
                      key={dryck.id}
                      dryck={dryck}
                      loadMore={handleLoadMore}
                      last={index + 1 === maxNodes ? true : false}
                    />
                    <li className='col-span-full row'>
                      <ClientAd position='mid' />
                    </li>
                  </>
                );
              } else {
                return (
                  <DrinkListItem
                    key={dryck.id}
                    dryck={dryck}
                    loadMore={handleLoadMore}
                    last={index + 1 === maxNodes ? true : false}
                  />
                );
              }
            }
          })}
      </ul>
    </>
  );
};

export default DrinkList;
