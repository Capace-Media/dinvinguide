import { useEffect, useState } from 'react';

import PageIntro from '../components/common/content/PageIntro';
import SearchResults from '../components/search/SearchResults';
import useSearch from '../hooks/useSearch';

const types = [
  { label: 'Drycker', value: 'drinks' },
  { label: 'Dryckestips', value: 'drinktips' },
  { label: 'Artiklar', value: 'posts' },
  { label: 'Recept', value: 'recipes' },
  { label: 'Druvor', value: 'grapes' },
];
const SearchPage = () => {
  const {
    results,
    type,
    changeType,
    searchInput,
    setSearchInput,
    isSearching,
    hasMore,
    search,
  } = useSearch();

  const handleInView = () => {
    search();
  };
  return (
    <>
      <PageIntro title='Sök på DinVinguide' />
      <div className='flex items-center px-5 py-3 mb-5 space-x-3 text-center bg-white rounded contain-sm'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          className='w-5 h-5 fill-current text-black/50'
        >
          <path d='M0 0h24v24H0V0z' fill='none' />
          <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
        </svg>
        <input
          type='text'
          value={searchInput}
          placeholder='Sök...'
          className='w-full outline-none appearance-none'
          onChange={(event) => setSearchInput(event.target.value)}
        />
        {isSearching && (
          <figure className='block w-4 h-4 border-2 rounded-full border-black/20 border-t-black animate-spin' />
        )}
      </div>
      <ul className='grid grid-cols-5 mb-5 border-2 rounded contain-sm border-brand-red'>
        {types.map((item) => (
          <li key={item.value}>
            <button
              className={`px-3 py-1  text-center block w-full ${
                item.value === type && 'bg-brand-red text-white'
              }`}
              onClick={() => changeType(item.value)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      <SearchResults
        type={type}
        isSearching={isSearching}
        hasMore={hasMore}
        results={results}
        inViewFn={handleInView}
      />
    </>
  );
};

export default SearchPage;
