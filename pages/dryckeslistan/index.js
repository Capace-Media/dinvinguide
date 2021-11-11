import ClientAd from '../../components/ads/ClientAd';
import ExplorerLinks from '../../components/common/explorer/explorerLinks';
import { Fragment } from 'react';
import Link from 'next/link';
import Newsletter from '../../components/section/Newsletter';
import { PAGE_SINGLE } from '../../lib/fragments/pages';
import SEO from '../../components/common/SEO';
import dynamic from 'next/dynamic';
import { getToplists } from '../../lib/api/toplists';
import wpFetch from '../../lib/wpFetch';

const ToplistPuff = dynamic(() => import('../../components/toplists/Puff'));

const ToplistsPage = ({ data }) => {
  const { toplists, page } = data;

  return (
    <Fragment>
      <SEO
        title={page.page.seo.title}
        description={page.page.seo.description}
      />
      <div className='text-center row contain'>
        <h1 className='text-brand-red'>Topplistor</h1>
      </div>
      <div className='mb-5'>
        <ClientAd position='top' type='dl' />
      </div>
      <div className='grid gap-10 lg:grid-cols-4 contain-md row'>
        {toplists.map(
          ({ toplist, currentDrinks, previousDrinks, fallbackDrinks }) => {
            return (
              <div key={toplist.uri} className='text-center'>
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
  const resolved = await Promise.all([
    getToplists(),
    wpFetch(PAGE_SINGLE, { id: 'dryckeslistan' }),
  ]);

  return {
    props: {
      data: {
        page: resolved[1],
        toplists: resolved[0],
      },
    },
  };
};
