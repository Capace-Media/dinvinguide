import { useCallback, useEffect, useState } from 'react';

const useSearch = () => {
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [cursor, setCursor] = useState('');
  const [hasNextPage, setHasNextPage] = useState(true);
  const [type, setType] = useState('drinks');
  const [searchInput, setSearchInput] = useState('');

  const search = useCallback(async () => {
    if (searchInput && searchInput.length > 2) {
      if (hasNextPage) {
        setIsSearching(true);
        const res = await fetch('/api/search', {
          method: 'POST',
          body: JSON.stringify({
            input: searchInput,
            cursor,
            type,
            batch: 10,
          }),
        });
        const json = await res.json();

        setHasNextPage(json.data.pageInfo.hasNextPage);
        setCursor(json.data.pageInfo.endCursor);
        setResults([...results, ...json.data.edges]);
        setIsSearching(false);
      }
    } else {
      reset();
    }
  }, [cursor, hasNextPage, reset, results, searchInput, type]);
  const reset = useEffect(() => {
    setResults([]);
    setHasNextPage(true);
    setCursor('');
  }, []);
  const changeType = (type) => {
    reset();
    setType(type);
  };
  useEffect(() => {
    reset();
    let searchTimeout;
    searchTimeout = setTimeout(() => {
      search();
    }, 300);
    return () => clearTimeout(searchTimeout);
  }, [searchInput, search, reset]);
  useEffect(() => {
    search();
  }, [type, search]);

  return {
    results,
    isSearching,
    setSearchInput,
    searchInput,
    changeType,
    type,
    hasMore: hasNextPage,
    search,
  };
};

export default useSearch;
