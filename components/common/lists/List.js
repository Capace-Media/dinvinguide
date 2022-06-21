import { useEffect, useState } from 'react';

import ClientAd from '../../ads/ClientAd';
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

  // const addMoreItems = (item) => {
  //   //let newNodes = item + maxNodes
  //   setNodeCount((prev) => prev + maxNodes)
  // }

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
  }, [searchInput, maxNodes]);

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

      <ul className={`grid relative gap-2 row contain mb-14 ${printColumns()}`}>
        {array
          ?.filter((item) => {
            item = flattenObject(item);
            if (filterString) {
              let match = false;
              if (filterString === 'no:image') {
                if (!item['featuredImage.node.mediaItemUrl']) {
                  match = true;
                }
              } else {
                filterKeys.map((key) => {
                  if (
                    item[key] &&
                    item[key].toLowerCase().includes(filterString)
                  ) {
                    match = true;
                  }
                });
              }

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
                        <ClientAd position='mid' />
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

          {/* {nodeCount <= array.length + 1 && (
            <button  className="z-10 text-brand-dark-700 flex font-bold flex-col pointer-events-auto justify-center items-center space-y-3 min-w-[150px] min-h-[70px] cursor-pointer absolute left-2/4 -translate-x-2/4 -bottom-8" onClick={() => addMoreItems(nodeCount)} >
              <span>Visa mer</span>
              <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_i_1_3278)">
                <path d="M20.7669 4.76099C21.7429 3.78431 21.7422 2.20139 20.7656 1.22546C19.7889 0.249517 18.206 0.250121 17.23 1.2268L20.7669 4.76099ZM11.0015 10.9969L9.23443 12.7654C10.2111 13.7413 11.794 13.7407 12.77 12.764L11.0015 10.9969ZM4.76557 1.23156C3.78888 0.255619 2.20597 0.256223 1.23003 1.23291C0.254096 2.20959 0.2547 3.7925 1.23138 4.76844L4.76557 1.23156ZM17.23 1.2268L9.23309 9.22985L12.77 12.764L20.7669 4.76099L17.23 1.2268ZM12.7686 9.22851L4.76557 1.23156L1.23138 4.76844L9.23443 12.7654L12.7686 9.22851Z" fill="#444444"/>
                </g>
                <defs>
                <filter id="filter0_i_1_3278" x="0.498474" y="0.493896" width="21" height="17.0029" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1_3278"/>
                </filter>
                </defs>
                </svg>
            </button>
          )} */}
      </ul>
    </>
  );
};

export default List;
