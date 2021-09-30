import Ad from '../../../components/ads/Ad';
import Image from 'next/image';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import { fetchAtlasPage } from '../../../lib/api/pages/pageData';
import { getAds } from '../../../lib/api/ads';
import { renderSection } from '../../../utils/acf';

const SingleAtlasPage = ({ page, ads }) => {
  return (
    <>
      <div className='text-center contain-sm row'>
        {page.featuredImage && (
          <figure className='relative aspect-w-16 aspect-h-9'>
            <Image
              src={page.featuredImage.node.mediaItemUrl}
              layout='fill'
              objectFit='cover'
            />
          </figure>
        )}
        <p className='pt-10'>
          Skriven av{' '}
          <Link href={`/${page.author.node.nicename}`}>
            <a className='underline'>Magnus Reuterdahl</a>
          </Link>
        </p>
        <h1 className='mt-5 mb-5 text-brand-red'>{page.title}</h1>
        {ReactHtmlParser(page.acf_posts.ingress)}
      </div>

      <Ad ads={ads} position='top' />
      <div className='contain-sm row'>
        {page.acf_posts.sektioner.map((section) => renderSection(section))}
      </div>
    </>
  );
};

export default SingleAtlasPage;

export const getStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [],
  };
};
export const getStaticProps = async ({ params }) => {
  const resolved = await Promise.all([
    fetchAtlasPage(params.slug.join('/')),
    getAds(),
  ]);

  if (!resolved[0]) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      page: resolved[0],
      ads: resolved[1],
    },
  };
};
