import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const SearchResultsItem = ({
  item,
  last,
  inViewFn,
  isSearching,
  hasMore,
  type,
}) => {
  const hasImage =
    item.featuredImage &&
    item.featuredImage.node &&
    item.featuredImage.node.mediaItemUrl;
  const containImage =
    type === 'drinks' ? true : type === 'drinktips' ? true : false;

  return (
    <>
      <li className=''>
        <Link href={item.uri}>
          <a className='hover:ring-4 transition-all ring-brand-red block p-2 bg-white rounded grid gap-5 grid-cols-[80px,1fr,32px]'>
            <figure className='relative w-20 h-20'>
              {hasImage && (
                <Image
                  src={item.featuredImage.node.mediaItemUrl}
                  layout='fill'
                  objectFit={containImage ? 'contain' : 'cover'}
                />
              )}
            </figure>
            <div className='flex items-center'>
              <h2 className='text-base normal-case'>{item.title}</h2>
            </div>
            <div className='flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-8 h-8 fill-current text-brand-red'
                viewBox='0 0 24 24'
              >
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z' />
              </svg>
            </div>
          </a>
        </Link>
      </li>
      {last && hasMore && (
        <li className='flex justify-center '>
          <button
            className='px-3 py-2 mt-10 text-white rounded bg-brand-red'
            onClick={() => inViewFn()}
          >
            {isSearching ? 'Laddar' : 'Visa fler'}
          </button>
        </li>
      )}
    </>
  );
};

export default SearchResultsItem;
