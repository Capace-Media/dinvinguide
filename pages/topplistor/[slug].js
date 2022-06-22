import { getToplistPaths, getToplists } from '../../lib/api/toplists';

import ExplorerLinks from '../../components/common/explorer/explorerLinks';
import { Fragment } from 'react';
import Newsletter from '../../components/section/Newsletter';
import PageIntro from '../../components/common/content/PageIntro';
import Toplist from '../../components/toplists/Toplist';
import slugify from 'slugify';

const SingleToplistPage = ({ data }) => {
  const { toplist } = data;
  return (
    <Fragment>
      <PageIntro
        title={toplist.toplist.title}
        text={toplist.toplist.acf_toplists.text}
        ad
        adType='dl'
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
        <Toplist data={toplist} />
      </div>
      <ExplorerLinks />
      <div className='mb-2'>
        <Newsletter />
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
    const slug = toplist.toplist.uri.split('/')[2];
    if (slug === params.slug) {
      return true;
    }

    const isEco = toplist.toplist.acf_toplists.ekologiskt;
    const toplistType = toplist.toplist.acf_toplists.dryckestyper;

    const toplistPackaging = toplist.toplist.acf_toplists.forpackningar;

    if (isArray) {
      if (params.slug.includes('julen')) {
        if (toplistType.includes('glogg')) {
          return true;
        }
      }

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

  if (!toplist[0]) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        toplist: toplist[0],
      },
    },
  };
};
