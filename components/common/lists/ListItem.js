import React, { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import RecipePlaceholder from '../../../public/images/recipe-placeholder.jpg';
import { useInView } from 'react-intersection-observer';

const imageClasses = `transition-all opacity-60 group-hover:scale-105`;
const ListItem = ({ data, last, increment, subtitle, setReady, ready }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  useEffect(() => {
    if (inView && last) {
      increment();
    }
  }, [inView, increment, last]);

  return (
    <Link key={data.uri} href={data.uri}>
      <a>
      
        <li
          ref={last ? ref : null}
          className='relative block overflow-hidden text-white bg-black group'
        >
          
            <div className='relative block h-60'>
              {data['featuredImage.node.mediaItemUrl'] ? (
                <Image
                  src={data['featuredImage.node.mediaItemUrl']}
                  placeholder="blur"
                  blurDataURL={RecipePlaceholder}
                  layout='fill'
                  objectFit='cover'
                  className={`${imageClasses}`}
                  alt={
                    data['featuredImage.node.altText']
                      ? data['featuredImage.node.altText']
                      : data.title
                  }
                />
              ) : (
                <Image
                  src={RecipePlaceholder}
                  layout='fill'
                  objectFit='cover'
                  className={`${imageClasses}`}
                  alt={data.title}
                />
              )}

              <div className='relative p-5'>
                <div className='px-3 border-l-4 border-brand-bronze'>
                  <h3>{data['title']}</h3>
                  {subtitle && <p>{data[subtitle]}</p>}
                </div>
              </div>
            </div>
          
        </li>
      </a>
    </Link>
  );
};

export default ListItem;
