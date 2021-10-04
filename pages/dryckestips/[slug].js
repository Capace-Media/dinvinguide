import {
  DRINKTIP_SINGLE,
  DRINKTIP_SINGLE_PREVIEW,
} from '../../lib/fragments/drinks';

import Ad from '../../components/ads/Ad';
import BreadCrumbs from '../../components/common/BreadCrumbs/Breadcrumbs';
import DryckesutforskarenImage from '../../public/images/dryckesutforskaren.jpg';
import ExplorerLinks from '../../components/common/explorer/explorerLinks';
import Image from 'next/image';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import ReceptutforskarenImage from '../../public/images/receptutforskaren.jpg';
import dayjs from 'dayjs';
import { fetchDrinktipsBySlug } from '../../lib/api/drinkTips/fetchDrinktipBySlug';
import { getAds } from '../../lib/api/ads';
import wpFetch from '../../lib/wpFetch';

const DryckesTipsSinglePage = ({ ads, drink }) => {
  console.log(drink);
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
      <div>
        <BreadCrumbs
          crumbs={[
            { text: 'Dryckestips', href: '/dryckestips' },
            { text: drink.title, current: true, href: '/' },
          ]}
        />
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
        <div></div>
        <div className='space-x-3'>
          {drink.acf_dryckestips.bolagetAdress && (
            <a
              href={drink.acf_dryckestips.bolagetAdress}
              target='_blank'
              className='px-6 py-3 uppercase bg-brand-red text-brand-bg'
            >
              Beställ på Systembolaget
            </a>
          )}
          {drink.acf_dryckestips.knappUrl && (
            <a
              href={drink.acf_dryckestips.knappUrl}
              target='_blank'
              className='px-6 py-3 uppercase bg-brand-red text-brand-bg'
            >
              Kan beställas här
            </a>
          )}
        </div>
      </div>
      <ExplorerLinks />
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
export const getStaticProps = async (context) => {
  console.log(context);
  let data;
  if (context.preview) {
    const res = await wpFetch(DRINKTIP_SINGLE_PREVIEW, {
      slug: context.params.slug,
    });
    if (!res.drinktip.preview) {
      data = null;
    } else {
      data = res.drinktip.preview.node;
    }
  } else {
    const res = await wpFetch(DRINKTIP_SINGLE, { slug: context.params.slug });
    data = res.drinktip;
  }

  const ads = await getAds();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ads,
      drink: data,
    },
  };
};
