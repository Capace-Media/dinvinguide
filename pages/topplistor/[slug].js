import Ad from '../../components/ads/Ad';
import { Fragment } from 'react';
import { getAds } from '../../lib/api/ads';
import { getToplists } from '../../lib/api/toplists';
import ToplistItem from '../../components/toplists/ToplistItem';
import Toplist from '../../components/toplists/Toplist';

const SingleToplistPage = ({ data }) => {
  const { ads, toplist } = data;

  return (
    <Fragment>
      <div className='row'>
        <Ad ads={ads} position='top' />
      </div>
      <div className='text-center row contain'>
        <h1 className='text-brand-red'>{toplist.toplist.title}</h1>
      </div>
      <div className='row '>
        <Toplist ads={ads} data={toplist} />
      </div>
    </Fragment>
  );
};

export default SingleToplistPage;

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { slug: 'flaska-vitt' } }],
    fallback: 'blocking',
  };
};
export const getStaticProps = async ({ params }) => {
  const slugArray = params.slug.includes('-')
    ? params.slug.split('-')
    : params.slug;
  const packaging = slugArray[0];
  const type = slugArray[1];

  const resolved = await Promise.all([getAds(), getToplists()]);
  const toplist = resolved[1].filter((toplist) => {
    if (
      toplist.toplist.acf_toplists.dryckestyper[0].name
        .toLowerCase()
        .includes(type.split(' ')[0]) &&
      toplist.toplist.acf_toplists.forpackningar[0].name
        .toLowerCase()
        .includes(packaging.split(' ')[0])
    ) {
      return true;
    }
  });
  console.log(toplist);
  return {
    props: {
      data: {
        ads: resolved[0],
        toplist: toplist[0],
      },
    },
  };
};
