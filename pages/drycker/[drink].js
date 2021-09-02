import { getDrink, getDrinkPaths } from '../../lib/api/drinks';

import Ad from '../../components/ads/Ad';
import { Fragment } from 'react';
import Image from 'next/image';
import { getAds } from '../../lib/api/ads';

const DryckPage = ({ data }) => {
  const { drink, ads } = data;
  return (
    <Fragment>
      <div className='contain row'>
        <Ad ads={ads} position='top' />
      </div>
      <div className='grid grid-cols-3 gap-10 contain-md row'>
        <div>
          <figure className='relative aspect-w-1 aspect-h-1'>
            <figure className='absolute bottom-0 left-0 w-full h-full scale-90 translate-y-5 rounded-full bg-brand-red' />
            <Image
              src={drink.featuredImage.node.mediaItemUrl}
              layout='fill'
              objectFit='contain'
            />
          </figure>
        </div>
        <div>
          <h1 className='normal-case text-brand-red'>{drink.title}</h1>
        </div>
      </div>
    </Fragment>
  );
};
export default DryckPage;

export const getStaticPaths = async () => {
  const paths = await getDrinkPaths();

  return {
    paths,
    fallback: 'blocking',
  };
};
export const getStaticProps = async ({ params }) => {
  const resolved = await Promise.all([getDrink(params.drink), getAds()]);

  if (!resolved[0]) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        drink: resolved[0],
        ads: resolved[1],
      },
    },
  };
};
