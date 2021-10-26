import Ad from '../../components/ads/Ad';
import ExplorerLinks from '../../components/common/explorer/explorerLinks';
import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Newsletter from '../../components/section/Newsletter';
import ToplistPuff from '../../components/toplists/Puff';
import { getAds } from '../../lib/api/ads';
import { getToplists } from '../../lib/api/toplists';

const ToplistsPage = ({ data }) => {
  const { ads, toplists } = data;

  return (
    <Fragment>
      <div className='text-center row contain'>
        <h1 className='text-brand-red'>Topplistor</h1>
      </div>
      <div className='mb-5'>
        <Ad ads={ads} position='top' />
      </div>
      <div className='grid gap-10 lg:grid-cols-4 contain-md row'>
        {toplists.map(
          ({ toplist, currentDrinks, previousDrinks, fallbackDrinks }) => {
            console.log('TOPLIST =>', toplist);
            return (
              <div className='text-center'>
                <Link href={toplist.uri}>
                  <a>
                    <h2 className='mb-5 text-base cursor-pointer text-brand-red hover:underline'>
                      {toplist.acf_toplists.slogan}
                    </h2>
                  </a>
                </Link>

                {currentDrinks.length > 0 ? (
                  <ToplistPuff
                    toplistUri={toplist.uri}
                    data={currentDrinks[0].node}
                  />
                ) : previousDrinks.length > 0 ? (
                  <ToplistPuff
                    toplistUri={toplist.uri}
                    data={previousDrinks[0].node}
                  />
                ) : (
                  <ToplistPuff
                    toplistUri={toplist.uri}
                    data={fallbackDrinks[0].node}
                  />
                )}
              </div>
            );
          }
        )}
      </div>
      <ExplorerLinks />
      <div className='mb-2'>
        <Newsletter />
      </div>
    </Fragment>
  );
};

export default ToplistsPage;

export const getStaticProps = async () => {
  const resolved = await Promise.all([getAds(), getToplists()]);

  return {
    props: {
      data: {
        ads: resolved[0],
        toplists: resolved[1],
      },
      revalidate: 60,
    },
  };
};
