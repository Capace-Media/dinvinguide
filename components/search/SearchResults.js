import React from 'react';
import SearchResultsItem from './SearchResultsItem';

const SearchResults = React.memo(
  ({ results, inViewFn, isSearching, hasMore, type }) => {
    return (
      <ul className='pb-20 space-y-1 contain-sm'>
        {results.map(({ node: item }, index) => {
          return (
            <SearchResultsItem
              isSearching={isSearching}
              hasMore={hasMore}
              key={item.id}
              item={item}
              last={results.length - 1 === index ? true : false}
              inViewFn={inViewFn}
              type={type}
            />
          );
        })}
      </ul>
    );
  }
);

export default SearchResults;
