import { useEffect, useState } from 'react';

import Ad from '../ads/Ad';
import GrapeListItem from './GrapeListItem';
import Image from 'next/image';
import Link from 'next/link';
const increment = 16;
const GrapeList = ({ grapes, ads }) => {
  const [nodeCount, setNodeCount] = useState(increment);
  const [searchInput, setSearchInput] = useState('');
  const [filterString, setFilterString] = useState('');
  const handleIncrementsNodes = () => {
    setNodeCount((prev) => prev + increment);
  };

  useEffect(() => {
    let filterTimeout;
    filterTimeout = setTimeout(() => {
      setFilterString(searchInput.toLowerCase());
      // setMaxCount(27);
    }, 300);
    return () => clearTimeout(filterTimeout);
  }, [searchInput]);

  return (
    <>
      <div className='text-center contain-sm row'>
        <input
          type='text'
          placeholder='Sök'
          className='w-full px-5 py-3 lg:w-96'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <ul className='grid gap-3 mb-10 md:grid-cols-3 lg:grid-cols-4 contain'>
        {grapes
          .filter(({ node: grape }) => {
            if (!filterString) {
              return true;
            } else {
              if (
                (grape.title &&
                  grape.title
                    .toLowerCase()
                    .includes(filterString.toLowerCase())) ||
                (grape.acf_grape.druvtyp &&
                  grape.acf_grape.druvtyp.name
                    .toLowerCase()
                    .includes(filterString.toLowerCase()))
              ) {
                return true;
              } else {
                return false;
              }
            }
          })
          .map(({ node: grape }, index) => {
            if (index < nodeCount) {
              return (
                <GrapeListItem
                  last={index + 1 === nodeCount ? true : false}
                  grape={grape}
                  incrementNodes={handleIncrementsNodes}
                />
              );
            }
          })}
      </ul>
    </>
  );
};

export default GrapeList;
