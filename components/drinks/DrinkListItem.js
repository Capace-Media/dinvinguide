import React, { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

const DrinkListItem = React.memo(({ dryck, loadMore, last }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  useEffect(() => {
    if (inView && last) {
      loadMore();
    }
  }, [inView, loadMore, last]);
  return (
    <li
      ref={last ? ref : null}
      className='grid grid-cols-[1fr,2fr] gap-5 p-5 bg-white rounded-sm'
      key={dryck.title}
    >
      <div className='relative col-span-1 aspect-w-1 aspect-h-1'>
        <figure>
          <figure className='hidden w-full h-full transform scale-90 translate-y-2 rounded-full bg-brand-red' />
          {dryck.featuredImage && (
            <Image
              src={dryck.featuredImage.node.mediaItemUrl}
              layout='fill'
              objectFit='contain'
              alt={
                dryck.featuredImage.node.altText
                  ? dryck.featuredImage.node.altText
                  : dryck.title
              }
            />
          )}
        </figure>
      </div>
      <div className='flex flex-col justify-center'>
        <small className='text-xs font-semibold uppercase lg:text-xs'>
          Betyg {dryck.acf_drinks.betyg}
        </small>
        <Link href={dryck.uri}>
          <a>
            <h3 className='mb-1 text-sm text-brand-red lg:text-base'>
              {dryck.title}
            </h3>
          </a>
        </Link>
        <p className='text-sm lg:text-base'>
          {dryck.acf_drinks.dryckestyper && dryck.acf_drinks.dryckestyper.name}{' '}
          -{' '}
          {dryck.acf_drinks.forpackningar &&
            dryck.acf_drinks.forpackningar.name}
        </p>
        <p className='text-sm lg:text-base'>
          {dryck.acf_drinks.ekologiskt && 'Ekologisk'}
        </p>
      </div>
    </li>
  );
});
DrinkListItem.displayName = 'DrinkListItem';

export default DrinkListItem;
