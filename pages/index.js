import Ad from '../components/ads/Ad';
import Featured from '../components/frontPage/Featured';
import Newsletter from '../components/section/Newsletter';
import { NextSeo } from 'next-seo';
import PostBlocks from '../components/frontPage/PostBlocks';
import { getAds } from '../lib/api/ads';
import { getFrontPageData } from '../lib/api/frontPage';

export default function Home({ data }) {
  const { ads, page } = data;
  const { seo } = page.page;

  return (
    <>
      <NextSeo title={seo.title} description={seo.description} />
      <div className='mb-5'>
        <div className='row'>
          <Ad ads={ads} position='top' priority />
        </div>
        <Featured items={page.first} />
        <div className='row'>
          <Ad ads={ads} position='mid' />
        </div>
        <PostBlocks items={page.second} />
        <div className='row'>
          <Ad ads={ads} position='bot' />
        </div>
        <Newsletter />
      </div>
    </>
  );
}
export const getStaticProps = async () => {
  const resolved = await Promise.all([getAds(), getFrontPageData()]);

  return {
    props: {
      data: {
        ads: resolved[0],
        page: resolved[1],
      },
    },
    revalidate: 60,
  };
};
