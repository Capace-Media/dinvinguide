import React, { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

const imageClasses = `transition-all opacity-60 group-hover:scale-105`;
const ListItem = ({ data, last, increment, subtitle }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  useEffect(() => {
    if (inView && last) {
      increment();
    }
  }, [inView, increment, last]);
  return (
    <li
      ref={last ? ref : null}
      className='relative block overflow-hidden text-white bg-black group'
    >
      <Link href={data.uri}>
        <a className='relative block aspect-w-16 aspect-h-8 md:aspect-w-16 md:aspect-h-9 lg:aspect-w-16 lg:aspect-h-10'>
          {data['featuredImage.node.mediaItemUrl'] && (
            <Image
              src={data['featuredImage.node.mediaItemUrl']}
              layout='fill'
              objectFit='cover'
              className={`${imageClasses}`}
              alt={
                data['featuredImage.node.altText']
                  ? data['featuredImage.node.altText']
                  : data.title
              }
            />
          )}

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
};

export default ListItem;
