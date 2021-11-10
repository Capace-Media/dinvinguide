import { getToplistPaths, getToplists } from '../../lib/api/toplists';

import Ad from '../../components/ads/Ad';
import { Fragment } from 'react';
import PageIntro from '../../components/common/content/PageIntro';
import Toplist from '../../components/toplists/Toplist';
import ToplistItem from '../../components/toplists/ToplistItem';
import { getAds } from '../../lib/api/ads';
import slugify from 'slugify';

const SingleToplistPage = ({ data }) => {
  const { toplist } = data;

  return (
    <Fragment>
      <PageIntro
        title={toplist.toplist.title}
        ad
        crumbs={[
          { href: '/dryckeslistan', text: 'Topplistor' },
          {
            href: toplist.toplist.uri,
            text: toplist.toplist.title,
            current: true,
          },
        ]}
      />

      <div className='row '>
        <Toplist ads={ads} data={toplist} />
      </div>
    </Fragment>
  );
};

export default SingleToplistPage;

export const getStaticPaths = async () => {
  const paths = await getToplistPaths();
  return {
    paths,
    fallback: 'blocking',
  };
};
export const getStaticProps = async ({ params }) => {
  const slugArray = params.slug.includes('-')
    ? params.slug.split('-')
    : params.slug;

  const isArray = Array.isArray(slugArray);

  const resolved = await Promise.all([getToplists()]);
  const toplist = resolved[0].filter((toplist) => {
    const isEco = toplist.toplist.acf_toplists.ekologiskt;
    const toplistType = slugify(
      toplist.toplist.acf_toplists.dryckestyper[0].name.toLowerCase()
    );
    const toplistPackaging = slugify(
      toplist.toplist.acf_toplists.forpackningar[0].name.toLowerCase()
    );

    if (isArray) {
      if (
        toplistType.includes(slugArray[1].split(' ')[0]) &&
        toplistPackaging.includes(slugArray[0].split(' ')[0])
      ) {
        return true;
      }
    } else {
      if (slugArray === 'ekologiskt' && isEco) {
        return true;
      } else {
        if (toplistType.includes(slugArray)) {
          return true;
        }
      }
    }
  });

  return {
    props: {
      data: {
        toplist: toplist[0],
      },
    },
  };
};
