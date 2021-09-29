import AtlasListItem from './AtlasListItem';
import { useState, useEffect } from 'react';

const AtlasList = ({ posts }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filterString, setFilterString] = useState('');

  useEffect(() => {
    let filterTimeout;
    filterTimeout = setTimeout(() => {
      console.log('Timeout Triggered!');
      setFilterString(searchInput.toLowerCase());
    }, 300);
    return () => clearTimeout(filterTimeout);
  }, [searchInput]);
  return (
    <>
      <div className='text-center contain row'>
        <input
          type='text'
          value={searchInput}
          placeholder='Sök..'
          className='w-full px-5 py-3 lg:w-96'
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <ul className='grid gap-3 md:grid-cols-3 lg:grid-cols-4 contain row'>
        {posts
          .filter((post) => {
            if (!filterString) {
              return true;
            } else {
              if (post.title.toLowerCase().includes(filterString)) {
                return true;
              } else {
                return false;
              }
            }
          })
          .map((post) => {
            return <AtlasListItem post={post} />;
          })}
      </ul>
    </>
  );
};

export default AtlasList;
