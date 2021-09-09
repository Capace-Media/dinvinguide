import Image from 'next/image';
import Link from 'next/link';
import MedalImage from '../../public/images/no1.png';
import dayjs from 'dayjs';
const ToplistPuff = ({ data }) => {
  console.log(data);
  console.log('PUFF=>', data);
  return (
    <Link href='/'>
      <a className='relative block'>
        <figure className='relative block mb-5 aspect-w-1 aspect-h-1'>
          <figure className='absolute top-0 left-0 w-full h-full scale-90 translate-y-5 rounded-full bg-brand-red' />
          {data?.featuredImage?.node?.mediaItemUrl && (
            <Image
              src={data.featuredImage.node.mediaItemUrl}
              layout='fill'
              objectFit='contain'
            />
          )}
        </figure>
        <figure className='absolute right-0 w-24 h-24 top-10'>
          <Image
            src={MedalImage}
            width={100}
            height={100}
            objectFit='contain'
          />
        </figure>
        <h3 className='normal-case text-brand-red'>{data.title}</h3>
        <div className='space-y-3'>
          <p className='space-x-2'>
            {data.acf_drinks.land && <span>{data.acf_drinks.land}</span>}
            {data.acf_drinks.argang && <span>{data.acf_drinks.argang}</span>}
          </p>
          <p className='font-semibold'>
            {data.acf_drinks.forpackningar && (
              <span>{data.acf_drinks.forpackningar.name} - </span>
            )}
            {data.acf_drinks.dryckestyper && (
              <span>{data.acf_drinks.dryckestyper.name}</span>
            )}
          </p>
          {data.acf_drinks.pris && (
            <p className='text-xl text-brand-red'>{data.acf_drinks.pris}:-</p>
          )}
          {data.acf_drinks.passarTillRecept && (
            <p>
              Passar till receptet:
              <span className='block font-semibold'>
                {data.acf_drinks.passarTillRecept[0].title}
              </span>
            </p>
          )}
          <small className='block'>
            {dayjs(data.date).format('D MMMM YYYY')} - {data.acf_drinks.betyg}
          </small>
        </div>
      </a>
    </Link>
  );
};

export default ToplistPuff;
