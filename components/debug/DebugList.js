import { Fragment, useEffect, useState } from 'react';

import DebugListItem from './DebugListItem';

const DebugList = ({ array, type }) => {
  const [maxNodes, setMaxNodes] = useState(12);
  const [searchString, setSearchString] = useState('');
  const [filterString, setFilterString] = useState('');
  const [hasMissingImage, setHasMissingImage] = useState(true);
  const [hasOldSections, setHasOldSections] = useState(true);
  const handleIncrementNodes = () => {
    setMaxNodes((prev) => prev + 12);
  };

  useEffect(() => {
    let filterTimeout;
    filterTimeout = setTimeout(() => {
      setFilterString(searchString.toLowerCase());
    }, 300);
    return () => clearTimeout(filterTimeout);
  }, [searchString]);
  const filteredArray = array.filter((item) => {
    let shouldShow = true;

    if (filterString) {
      if (filterString === 'no:image') {
        if (!item.featuredImage) {
          shouldShow = true;
        } else {
          shouldShow = false;
        }
      } else {
        if (
          item.title.toLowerCase().includes(filterString) ||
          (item.content && item.content.includes(filterString)) ||
          (item.acf_oldcontent &&
            item.acf_oldcontent.oldContentAcf &&
            item.acf_oldcontent.oldContentAcf.includes(filterString))
        ) {
          shouldShow = true;
        } else {
          shouldShow = false;
        }
      }
    }
    return shouldShow;
  });
  return (
    <>
      <div className='flex items-center justify-between contain'></div>
      <div className='row contain'>
        <input
          type='text'
          className='w-full p-3'
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
      </div>
      <div className='row contain'>
        <h3 className='mb-3'>
          {type}, {filteredArray.length}
        </h3>
        <ul className='space-y-1'>
          {filteredArray.map((item, i) => {
            if (i < maxNodes) {
              return (
                <DebugListItem
                  type={type}
                  item={item}
                  last={i + 1 === maxNodes ? true : false}
                  incrementNodes={handleIncrementNodes}
                />
              );
            }
          })}
        </ul>
      </div>
    </>
  );
};

export default DebugList;
