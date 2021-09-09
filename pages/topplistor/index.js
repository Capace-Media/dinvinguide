import Ad from '../../components/ads/Ad';
import { Fragment } from 'react';
import Link from 'next/link';
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
        {toplists.map(({ toplist, currentDrinks, fallbackDrinks }) => {
          console.log('TOPLIST =>', toplist);
          return (
            <div className='text-center'>
              <Link href='/'>
                <h2 className='mb-5 text-base cursor-pointer text-brand-red'>
                  {toplist.acf_toplists.ekologiskt
                    ? `Ekologiska drycker`
                    : toplist.acf_toplists.dryckestyper[0].name.includes(
                        'Alkoholfritt'
                      )
                    ? `Alkoholfria drycker`
                    : `${toplist.acf_toplists.dryckestyper[0].name} på ${toplist.acf_toplists.forpackningar[0].name}`}
                </h2>
              </Link>

              {currentDrinks.length > 0 ? (
                <ToplistPuff data={currentDrinks[0].node} />
              ) : (
                <ToplistPuff data={fallbackDrinks[0].node} />
              )}
            </div>
          );
        })}
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
    },
  };
};
