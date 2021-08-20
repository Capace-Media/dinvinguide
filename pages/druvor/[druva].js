import { getGrape, getGrapePaths } from '../../lib/api/grapes';

import Image from 'next/image';
import Link from 'next/link';
import Text from '../../components/acf/Text';

export default function DruvorPage({ data }) {
  const { grape } = data;
  console.log(grape);
  return (
    <div className='contain-sm row'>
      <div className='w-full aspect-w-1 aspect-h-1 lg:aspect-w-16 lg:aspect-h-9'>
        <Image src={grape.image} layout='fill' objectFit='cover' />
      </div>
      <div className='row '>
        <h1 className='text-center'>{grape.title}</h1>
        <Text content={grape} />
        <div className='text-center'>
          <Link href='/alla-druvor'>
            <a className='underline '>Till alla druvor</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
export const getStaticPaths = async () => {
  const paths = await getGrapePaths();

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {
  const grape = await getGrape(params.druva);
  return {
    props: {
      data: { grape },
    },
  };
};
