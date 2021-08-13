import Ad from '../components/ads/Ad';
import Featured from '../components/frontPage/Featured';
import Newsletter from '../components/section/Newsletter';
import PostBlocks from '../components/frontPage/PostBlocks';
import { getAds } from '../lib/api/ads';
import { getFrontPageData } from '../lib/api/frontPage';

export default function Home({ data }) {
  const { ads, page } = data;

  return (
    <div className='mb-5'>
      <div className='row'>
        <Ad ads={ads} position='top' />
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
  );
}
export const getStaticProps = async () => {
  const ads = await getAds();
  const page = await getFrontPageData();

  return {
    props: {
      data: {
        ads,
        page,
      },
    },
  };
};
