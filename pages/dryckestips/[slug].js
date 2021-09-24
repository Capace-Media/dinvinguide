import Ad from '../../components/ads/Ad';
import Image from 'next/image';
import ReactHtmlParser from 'react-html-parser';
import dayjs from 'dayjs';
import { fetchDrinktipsBySlug } from '../../lib/api/drinkTips/fetchDrinktipBySlug';
import { getAds } from '../../lib/api/ads';

const DryckesTipsSinglePage = ({ ads, drink }) => {
  const details = [
    {
      label: 'Ekologiskt',
      value: drink.acf_dryckestips.ekologiskt ? 'Ja' : 'Nej',
    },
    { label: 'Veganvin', value: drink.acf_dryckestips.vagn ? 'Ja' : 'Nej' },
    {
      label: 'Publiceringsdatum',
      value: dayjs(drink.date).locale('sv').format('D MMMM, YYYY'),
    },
  ];
  return (
    <>
      <div className='contain row'>
        <Ad ads={ads} position='top' />
      </div>
      <div className='grid gap-10 lg:grid-cols-3 contain-md row'>
        <div className='relative'>
          <figure className='aspect-w-1 aspect-h-1'>
            <div className='absolute top-0 left-0 w-full h-full scale-90 translate-y-5 rounded-full bg-brand-red' />
            {drink?.featuredImage?.node?.mediaItemUrl && (
              <Image
                src={drink.featuredImage.node.mediaItemUrl}
                layout='fill'
                objectFit='contain'
              />
            )}
          </figure>
        </div>
        <div className='lg:col-span-2'>
          <h1 className='normal-case text-brand-red'>{drink.title}</h1>
          <p className='mt-3 space-x-1'>
            {drink?.acf_dryckestips?.dryckestyper && (
              <span>{drink.acf_dryckestips.dryckestyper},</span>
            )}
            {drink?.acf_dryckestips?.forpackningar && (
              <span>{drink.acf_dryckestips.forpackningar}</span>
            )}
          </p>
          <p className='mt-6 text-3xl'>
            {drink.acf_dryckestips.pris && `${drink.acf_dryckestips.pris}:-`}
          </p>
          {drink.acf_dryckestips.beskrivning && (
            <div className='mt-5'>
              <strong className='font-semibold'>Beskrivning</strong>
              <p>{drink.acf_dryckestips.beskrivning}</p>
            </div>
          )}
          {drink.acf_dryckestips.recension && (
            <div className='mt-5 '>
              <strong className='font-semibold'>Recension</strong>
              <p>{ReactHtmlParser(drink.acf_dryckestips.recension)}</p>
            </div>
          )}
          <ul className='space-y-2 mt-7'>
            {details.map((item) => {
              if (item.value) {
                return (
                  <li className='grid grid-cols-2 gap-5'>
                    <strong className='font-semibold'>{item.label}</strong>
                    <span>{item.value}</span>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DryckesTipsSinglePage;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
export const getStaticProps = async ({ params }) => {
  const resolved = await Promise.all([
    getAds(),
    fetchDrinktipsBySlug(params.slug),
  ]);

  if (!resolved[1]) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      ads: resolved[0],
      drink: resolved[1],
    },
  };
};
