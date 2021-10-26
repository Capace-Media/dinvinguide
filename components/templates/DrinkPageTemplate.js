import 'dayjs/locale/sv';

import Ad from '../ads/Ad';
import Image from 'next/image';
import dayjs from 'dayjs';
const DrinkPageTemplate = ({ data }) => {
  const { page: drink, ads } = data;
  const details = [
    { label: 'Betyg', value: `${drink.acf_drinks.betyg} / 100` },
    { label: 'Ekologiskt', value: drink.acf_drinks.ekologiskt ? 'Ja' : 'Nej' },
    { label: 'Veganvin', value: drink.acf_drinks.vagn ? 'Ja' : 'Nej' },
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
          <p className='mt-6 text-3xl'>
            {drink.acf_drinks.pris && `${drink.acf_drinks.pris}:-`}
          </p>
          {drink.acf_drinks.beskrivning && (
            <div className='mt-5'>
              <strong className='font-semibold'>Beskrivning</strong>
              <p>{drink.acf_drinks.beskrivning}</p>
            </div>
          )}
          {drink.acf_drinks.recension && (
            <div className='mt-5 '>
              <strong className='font-semibold'>Recension</strong>
              <p>{drink.acf_drinks.recension}</p>
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
          <div className='row'>Social Share</div>
          <div className='flex items-center'>
            {drink.acf_drinks.knappUrl && (
              <a
                href={drink.acf_drinks.knappUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='px-5 py-3 text-white bg-brand-red'
              >
                Kan beställas här
              </a>
            )}
            {drink.acf_drinks.bolagetAdress && (
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
    </>
  );
};

export default DrinkPageTemplate;
