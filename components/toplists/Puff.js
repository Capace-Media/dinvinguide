import Image from 'next/image';
import Link from 'next/link';
import MedalImage from '../../public/images/no1.png';

const ToplistPuff = ({ data, toplistUri }) => {
  return (
    <div className='relative'>
      <figure className='relative block h-56 mb-5'>
        <figure className='absolute top-0 left-0 w-full h-full scale-[60%] -translate-y-8 md:-translate-y-20 lg:-translate-y-7 md:scale-50 lg:scale-75 rounded-full max-h-56 aspect-w-1 aspect-h-1 bg-brand-red' />
        {data?.featuredImage?.node?.mediaItemUrl && (
          <Image
            src={data.featuredImage.node.mediaItemUrl}
            layout='fill'
            objectFit='contain'
            alt={
              data.featuredImage.node.altText
                ? data.featuredImage.node.altText
                : data.title
            }
          />
        )}
      </figure>
      <figure className='absolute right-0 w-24 h-24 top-10'>
        <Image
          src={MedalImage}
          width={100}
          height={100}
          objectFit='contain'
          alt='Medalj guld'
        />
      </figure>
      <Link href={toplistUri}>
        <a>
          <h3 className='normal-case text-brand-red'>{data.title}</h3>
        </a>
      </Link>
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
        {data.acf_drinks.passarTillRecept &&
          data.acf_drinks.passarTillRecept[0] && (
            <p>
              Passar till receptet:
              <Link href={data.acf_drinks.passarTillRecept[0].uri}>
                <a className='block font-semibold'>
                  {data.acf_drinks.passarTillRecept[0].title}
                </a>
              </Link>
            </p>
          )}
        <Link href={toplistUri}>
          <a className='inline-block px-5 py-3 text-white rounded bg-brand-red'>
            Till topplistan
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ToplistPuff;
