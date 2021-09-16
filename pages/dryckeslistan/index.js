import Ad from '../../components/ads/Ad';
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
        {toplists.map(({ toplist, currentDrinks, fallbackDrinks }) => {
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
              ) : (
                <ToplistPuff
                  toplistUri={toplist.uri}
                  data={fallbackDrinks[0].node}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className='grid gap-2 mt-10 mb-2 lg:mt-20 lg:grid-cols-2 contain'>
        <Link href='/dryckesutforskaren'>
          <a className='relative overflow-hidden bg-black aspect-w-16 aspect-h-9 group'>
            <figure className='transition-all opacity-70 group-hover:scale-110'>
              <Image
                src={'/images/dryckesutforskaren.jpg'}
                layout='fill'
                objectFit='cover'
              />
            </figure>
            <div className='p-10'>
              <h3 className='pl-5 text-white border-l-4 lg:text-2xl border-brand-bronze'>
                Dryckesutforskaren
              </h3>
            </div>
          </a>
        </Link>
        <Link href='/dryckesutforskaren'>
          <a className='relative overflow-hidden bg-black aspect-w-16 aspect-h-9 group'>
            <figure className='transition-all opacity-70 group-hover:scale-110'>
              <Image
                src={'/images/receptutforskaren.jpg'}
                layout='fill'
                objectFit='cover'
              />
            </figure>
            <div className='p-10'>
              <h3 className='pl-5 text-white border-l-4 lg:text-2xl border-brand-bronze'>
                Receptutforskaren
              </h3>
            </div>
          </a>
        </Link>
      </div>
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
    },
  };
};
