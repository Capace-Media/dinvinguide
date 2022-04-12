import { getToplistPaths, getToplists } from '../../lib/api/toplists';

import { Fragment } from 'react';
import PageIntro from '../../components/common/content/PageIntro';
import Toplist from '../../components/toplists/Toplist';
import slugify from 'slugify';

const SingleToplistPage = ({ data }) => {
  const { toplist } = data;

  return (
    <Fragment>
      <PageIntro
        title={toplist.toplist.title}
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
    const toplistType = toplist.toplist.acf_toplists.dryckestyper;

    const toplistPackaging = toplist.toplist.acf_toplists.forpackningar;
    console.log('MATCH', slugArray, toplistPackaging, toplistType);
    if (isArray) {
      if (params.slug.includes('julen')) {
        if (toplistType.includes('glogg')) {
          return true;
        }
      }

      // if (
      //   toplistType.includes(slugArray[1].split(' ')[0]) &&
      //   toplistPackaging.includes(slugArray[0].split(' ')[0])
      // ) {
      //   return true;
      // }
      toplistType.some((type) => {
        console.log(
          'IN SOME =>',
          type.name.split(' ')[0].toLowerCase(),
          slugArray[1]
        );
        return true;
      });

      if (
        toplistType.some(
          (type) =>
            slugify(type.name.split(' ')[0].toLowerCase()) === slugArray[1]
        ) &&
        toplistPackaging.some(
          (type) =>
            slugify(type.name.split(' ')[0].toLowerCase()) === slugArray[0]
        )
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
