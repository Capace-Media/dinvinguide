import { Fragment, useState } from 'react';
import { getAuthorData, getAuthorPaths } from '../../lib/api/authors';

import Ad from '../../components/ads/Ad';
import Image from 'next/image';
import { getAds } from '../../lib/api/ads';

export default function AuthorPage({ data }) {
  const [isReadMore, setIsReadMore] = useState(false);
  const { author, ads } = data;

  return (
    <Fragment>
      <div className='contain section text-center'>
        <div className='relative w-52 h-52 rounded-full overflow-hidden mx-auto row'>
          <Image src={author.image} layout='fill' objectFit='cover' />
        </div>
        <h1 className='row'>{author.name}</h1>
        <p
          style={{ whiteSpace: 'break-spaces' }}
          className={`max-w-4xl mx-auto ${
            isReadMore ? 'line-clamp-none' : 'line-clamp-3'
          }`}
        >
          {author.description}
        </p>
        <button
          onClick={() => setIsReadMore(!isReadMore)}
          className='row font-semibold text-brand-red'
        >
          {isReadMore ? 'Läs mindre' : 'Läs mer'}
        </button>
        <div className='row'>FB / TW / IG / EMAIL</div>
        <div className='row'>
          <Ad ads={ads} position='top' />
        </div>
        <div className='row'>
          <h2>
            {`${author.firstName}${
              author.firstName.substring(
                author.firstName.length - 1,
                author.firstName.length
              ) === 's'
                ? ''
                : 's'
            }`}{' '}
            artiklar
          </h2>
        </div>
        <div className='row'>Senaste artiklen kommer här</div>
        <div className='row'>Resterande artiklar kommer här</div>
      </div>
    </Fragment>
  );
}

export const getStaticPaths = async () => {
  const paths = await getAuthorPaths();
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {
  const author = await getAuthorData(params.author);
  const ads = await getAds();

  if (!author) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: { author, ads },
    },
  };
};
