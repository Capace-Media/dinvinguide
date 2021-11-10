import React, { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

const imageClasses = `transition-all opacity-60 group-hover:scale-105`;
const ListItem = ({ data, last, increment, subtitle, inViewFn }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  useEffect(() => {
    if (inView && last) {
      increment();
      inViewFn();
    }
  }, [inView, increment, last, inViewFn]);
  return (
    <li
      ref={last ? ref : null}
      className='relative block overflow-hidden text-white bg-black group'
    >
      <Link href={data.uri}>
        <a className='relative block h-60'>
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

          <div className='relative p-5'>
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
