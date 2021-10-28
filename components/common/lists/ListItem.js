import React, { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

const ListItem = React.memo(({ data, last, increment, subtitle }) => {
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      increment();
    }
  }, [inView]);
  return (
    <li
      ref={last ? ref : null}
      className='block overflow-hidden text-white bg-black group'
    >
      <Link href={data.uri}>
        <a className='relative block aspect-w-16 aspect-h-8 md:aspect-w-16 md:aspect-h-9 lg:aspect-w-16 lg:aspect-h-10'>
          <figure className='transition-all opacity-60 group-hover:scale-105'>
            {data['featuredImage.node.mediaItemUrl'] && (
              <Image
                src={data['featuredImage.node.mediaItemUrl']}
                layout='fill'
                objectFit='cover'
              />
            )}
          </figure>

          <div className='p-5'>
            <div className='px-3 border-l-4 border-brand-bronze'>
              <h3>{data['title']}</h3>
              {subtitle && <p>{data[subtitle]}</p>}
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
});

export default ListItem;
