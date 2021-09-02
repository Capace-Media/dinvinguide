import Image from 'next/image';
import Link from 'next/link';
import ResultsItem from './ResultsItem';
import { useState } from 'react';

const Results = ({ heading, data, search, currentFilter, value }) => {
  if (!data) {
    return null;
  } else {
    const results =
      data &&
      data.filter(({ node: item }) =>
        item.title.toLowerCase().includes(search)
      );
    const incrementCount = 12;
    const [maxCount, setMaxCount] = useState(12);

    const increaseCount = () => {
      setMaxCount((prev) => prev + incrementCount);
    };

    return results.length > 0 ? (
      <div>
        <h2 className='mb-5'>
          {heading}{' '}
          <small className='text-base font-normal normal-case'>
            {results.length}st
          </small>
        </h2>
        <ul className='space-y-2'>
          {results.map(({ node: item }, i) => {
            if (i < maxCount) {
              return (
                <ResultsItem
                  key={item.id}
                  item={item}
                  maxCount={maxCount}
                  index={i}
                  type={value}
                />
              );
            }
          })}
        </ul>
        <div className='flex justify-center'>
          {maxCount < results.length && (
            <button
              className='px-4 py-2 mt-5 text-white uppercase bg-brand-red'
              onClick={() => increaseCount()}
            >
              Visa fler {heading}
            </button>
          )}
        </div>
      </div>
    ) : currentFilter === value ? (
      <h2>Inga resultat</h2>
    ) : null;
  }
};
export default Results;
