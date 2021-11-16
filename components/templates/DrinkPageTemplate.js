import 'dayjs/locale/sv';

import BreadCrumbs from '../common/BreadCrumbs/Breadcrumbs';
import ClientAd from '../ads/ClientAd';
import ExplorerLinks from '../common/explorer/explorerLinks';
import Image from 'next/image';
import SEO from '../common/SEO';
import dayjs from 'dayjs';
import parse from 'html-react-parser';

const DrinkPageTemplate = ({ data }) => {
  const { page: drink } = data;

  const details = [
    {
      label: 'Ekologiskt',
      value: drink?.acf_drinks?.ekologiskt ? 'Ja' : 'Nej',
    },
    { label: 'Veganvin', value: drink?.acf_drinks?.vagn ? 'Ja' : 'Nej' },
    {
      label: 'Publiceringsdatum',
      value: dayjs(drink?.date).locale('sv').format('D MMMM, YYYY'),
    },
  ];

  return (
    <>
      <SEO
        title={drink?.seo?.title}
        description={drink?.seo?.metaDesc}
        image={drink?.featuredImage?.node}
      />
      <BreadCrumbs
        crumbs={[
          { text: 'Drycker', href: '/dryckesutforskaren' },
          { text: drink.title, href: drink.uri, current: true },
        ]}
      />
      <div className='row'>
        <ClientAd position='top' />
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
                priority
                alt={
                  drink.featuredImage.node.altText
                    ? drink.featuredImage.node.altText
                    : drink.seo.title
                }
              />
            )}
          </figure>
        </div>
        <div className='lg:col-span-2'>
          <h1 className='normal-case text-brand-red'>{drink.title}</h1>
          <p className='mt-3 space-x-1'>
            {drink?.acf_drinks?.land && <span>{drink.acf_drinks.land}</span>}
            {drink?.acf_drinks?.argang && (
              <span>{drink.acf_drinks.argang},</span>
            )}
            {drink?.acf_drinks?.dryckestyper?.name && (
              <span>{drink.acf_drinks.dryckestyper.name},</span>
            )}
            {drink?.acf_drinks?.forpackningar?.name && (
              <span>{drink.acf_drinks.forpackningar.name}</span>
            )}
          </p>
          {drink.acf_drinks?.pris && (
            <p className='mt-6 text-3xl'>{drink.acf_drinks.pris}:-</p>
          )}

          {drink.acf_drinks?.beskrivning && (
            <div className='mt-5'>
              <strong className='block font-semibold'>Beskrivning</strong>
              {parse(drink.acf_drinks.beskrivning)}
            </div>
          )}
          {drink.acf_drinks?.recension && (
            <div className='mt-5 '>
              <strong className='block font-semibold'>Recension</strong>
              {parse(drink.acf_drinks.recension)}
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

          <div className='flex items-center row'>
            {drink?.acf_drinks?.knappUrl && (
              <a
                href={drink?.acf_drinks?.knappUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='px-5 py-3 text-white bg-brand-red'
              >
                Kan beställas här
              </a>
            )}
            {drink?.acf_drinks?.bolagetAdress && (
              <a
                href={drink.acf_drinks.bolagetAdress}
                target='_blank'
                rel='noopener noreferrer'
                className='px-5 py-3 text-white bg-brand-red'
              >
                Beställ på Systembolaget
              </a>
            )}
          </div>
        </div>
      </div>
      <ExplorerLinks />
    </>
  );
};

export default DrinkPageTemplate;
