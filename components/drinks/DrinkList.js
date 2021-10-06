import DrinkListItem from './DrinkListItem';
import { useState } from 'react';

const DrinkList = ({ drycker }) => {
  const [maxNodes, setMaxNodes] = useState(23);
  const [searchInput, setSearchInput] = useState('');
  const [onlyEco, setOnlyEco] = useState(false);
  const [alcoholFree, setAlcoholFree] = useState(false);

  const handleLoadMore = () => {
    setMaxNodes((prev) => prev + 23);
  };
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
      <div className='grid gap-5 lg:grid-cols-3 area row contain'>
        {drycker
          .filter(({ node: dryck }) => {
            if (searchInput) {
              if (
                (dryck.title &&
                  dryck.title
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())) ||
                (dryck.acf_drinks.dryckestyper &&
                  dryck.acf_drinks.dryckestyper.name
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())) ||
                (dryck.acf_drinks.forpackningar &&
                  dryck.acf_drinks.forpackningar.name
                    .toLowerCase()
                    .includes(searchInput.toLowerCase()))
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
          })
          .map(({ node: dryck }, index) => {
            if (index <= maxNodes) {
              return (
                <DrinkListItem
                  key={dryck.title}
                  dryck={dryck}
                  loadMore={handleLoadMore}
                  maxNodes={maxNodes}
                  index={index}
                />
              );
            }
          })}
      </div>
    </>
  );
};

export default DrinkList;
