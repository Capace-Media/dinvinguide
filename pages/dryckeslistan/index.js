import ClientAd from '../../components/ads/ClientAd';
import ExplorerLinks from '../../components/common/explorer/explorerLinks';
import { Fragment, useState } from 'react';
import Image from 'next/image';
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
  const [loading, setLoading] = useState(false)

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
      <div className='grid gap-10 md:grid-cols-2 lg:grid-cols-4 contain-md row'>
        {toplists.map(
          ({ toplist, currentDrinks, previousDrinks, fallbackDrinks }) => {
            if (toplist.uri.includes('alkoholfritt')) {
              return (
                <Link href={'/dryckesutforskaren?filter=alkoholfritt'}>
                  <a className='relative overflow-hidden bg-black rounded-sm'>
                    <Image
                      src='/images/dryckesutforskaren.jpg'
                      objectFit='cover'
                      layout='fill'
                      alt=''
                      className='opacity-60'
                    />
                    <div className='relative z-10 flex flex-col justify-center h-full p-5 text-center text-white'>
                      <h2>Utforska alkoholfria drycker</h2>{' '}
                      <button className='self-center inline-block px-5 py-3 mt-5 text-white rounded bg-brand-red'>
                        Upptäck nu
                      </button>
                    </div>
                  </a>
                </Link>
              );
            }
            return (
              <div key={toplist.uri} className={`text-center relative`}>
                {!loading ? (
                <Link key={toplist.uri} href={toplist.uri}>
                  <a onClick={() => setLoading(true)} className='mb-5 inline-block font-semibold uppercase text-base cursor-pointer text-brand-red hover:underline'>
                    
                      {toplist.acf_toplists.slogan}
                    
                  </a>
                </Link>

                ) : ( 
                  <p className='mb-5 inline-block font-semibold uppercase text-base text-brand-red'>
                    {toplist.acf_toplists.slogan}
                  </p>
                )}

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
                  <>
                    {fallbackDrinks &&
                      fallbackDrinks[0] &&
                      fallbackDrinks[0].node && (
                        <ToplistPuff
                          toplistUri={toplist.uri}
                          data={fallbackDrinks[0].node}
                        />
                      )}
                  </>
                )}

                {loading && (
                <div className="absolute z-10 top-2/4 -translate-y-2/4 left-2/4 -translate-x-2/4">
                  <svg role="status" className="h-8 w-8 animate-spin mr-2 text-gray-200 dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                </div>
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
