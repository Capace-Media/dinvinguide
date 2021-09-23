import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
const DrinkListItem = ({ dryck, loadMore, maxNodes, index }) => {
  console.log(dryck);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);
  return (
    <div
      ref={index === maxNodes ? ref : null}
      className='grid grid-cols-3 gap-5 p-5 bg-white rounded-sm'
    >
      <div className='relative col-span-1 aspect-w-1 aspect-h-1'>
        <figure>
          <figure className='hidden w-full h-full transform scale-90 translate-y-2 rounded-full bg-brand-red' />
          {dryck.featuredImage && (
            <Image
              src={dryck.featuredImage.node.mediaItemUrl}
              layout='fill'
              objectFit='contain'
            />
          )}
        </figure>
      </div>
      <div className='col-span-2'>
        <small className='font-semibold uppercase'>
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
    </div>
  );
};

export default DrinkListItem;
