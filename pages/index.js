import ClientAd from '../components/ads/ClientAd';
import Featured from '../components/frontPage/Featured';
import Newsletter from '../components/section/Newsletter';
import PostBlocks from '../components/frontPage/PostBlocks';
import SEO from '../components/common/SEO';
import { getFrontPageData } from '../lib/api/frontPage';

export default function Home({ data }) {
  const { page } = data;
  const { seo } = page.page;

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.metaDesc}
        image={{
          mediaItemUrl: 'https://dinvinguide.se/images/dinvinguide-image.png',
          mediaDetails: { width: 763, height: 454 },
          altText: 'DinVinguide.se',
        }}
      />
      <div className='mb-5'>
        <div className='row'>
          <ClientAd position='top' />
        </div>
        <Featured items={page.first} />
        <div className='row'>
          <ClientAd position='mid' />
        </div>
        <PostBlocks items={page.second} />
        <div className='row'>
          <ClientAd position='mid' />
        </div>
        <Newsletter />
      </div>
    </>
  );
}
export const getStaticProps = async () => {
  const resolved = await Promise.all([getFrontPageData()]);

  return {
    props: {
      data: {
        page: resolved[0],
      },
      revalidate: 60,
    },
  };
};
