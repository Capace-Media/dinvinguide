import { GRAPE_SINGLE, GRAPE_SINGLE_PREVIEW } from '../../lib/fragments/grapes';
import { getGrape, getGrapePaths } from '../../lib/api/grapes';

import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import Text from '../../components/acf/Text';
import { useRouter } from 'next/dist/client/router';
import wpFetch from '../../lib/wpFetch';

export default function DruvorPage({ data }) {
  console.log(data);
  return (
    <Fragment>
      <NextSeo title={`${data.title} - Druva`} />
      <div className='contain-sm row'>
        {data.featuredImage && (
          <div className='w-full aspect-w-1 aspect-h-1 lg:aspect-w-16 lg:aspect-h-9'>
            <Image
              src={data.featuredImage.node.mediaItemUrl}
              layout='fill'
              objectFit='cover'
            />
          </div>
        )}

        <div className='row '>
          <h1 className='text-center'>{data.title}</h1>
          <Text content={data.acf_grape} />
          <div className='text-center'>
            <Link href='/druvguiden'>
              <a className='underline '>Till alla druvor</a>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export const getStaticPaths = async () => {
  const paths = await getGrapePaths();

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context) => {
  console.log(context);
  if (context.preview) {
    const data = await wpFetch(GRAPE_SINGLE_PREVIEW, {
      id: context.params.druva,
    });
    return {
      props: {
        data: data.grape.preview.node,
      },
    };
  } else {
    const data = await wpFetch(GRAPE_SINGLE, { id: context.params.druva });
    if (!data) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        data: data.grape,
      },
    };
  }
};
