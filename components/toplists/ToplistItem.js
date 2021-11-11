import Image from 'next/image';
import Link from 'next/link';
import MedalOne from '../../public/images/no1.png';
import MedalThree from '../../public/images/no3.png';
import MedalTwo from '../../public/images/no2.png';
import ReactHtmlParser from 'react-html-parser';
import dayjs from 'dayjs';
import { useRouter } from 'next/dist/client/router';
const ToplistItem = ({ data, index }) => {
  const router = useRouter();
  const isDebug = router?.query?.debug ? true : false;

  return (
    <div className='flex flex-col grid-cols-2 gap-10 lg:grid contain-sm'>
      <div
        className={`relative ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-0'}`}
      >
        {data.featuredImage && data.featuredImage.node && (
          <>
            <Link href={data.uri}>
              <a>
                <figure className='relative aspect-w-1 aspect-h-1'>
                  <figure className='absolute w-full h-full scale-75 translate-y-16 rounded-full bg-brand-red' />
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
                </figure>
                {index <= 3 && (
                  <div className='absolute right-0 w-32 h-32 top-64'>
                    <Image
                      src={
                        index === 1
                          ? MedalOne
                          : index === 2
                          ? MedalTwo
                          : MedalThree
                      }
                      objectFit='contain'
                      alt='Medalj'
                    />
                  </div>
                )}
              </a>
            </Link>
          </>
        )}
      </div>
      <div>
        <strong className='block mb-5 text-2xl uppercase text-brand-red'>
          Nr {index}
        </strong>
        <Link href={data.uri}>
          <a>
            <h2 className='normal-case text-brand-red'>{data.title}</h2>
          </a>
        </Link>
        <p className='mt-5 space-x-1'>
          {data.acf_drinks.land && <span>{data?.acf_drinks?.land}</span>}
          {data.acf_drinks.argang && <span>{data?.acf_drinks?.argang}</span>}
        </p>
        <p className='mt-5 space-x-1'>
          {data.acf_drinks.forpackningar.name && (
            <span>{data?.acf_drinks?.forpackningar.name}</span>
          )}
          {data.acf_drinks.dryckestyper && (
            <span>- {data?.acf_drinks?.dryckestyper.name}</span>
          )}
        </p>
        {data.acf_drinks.pris && (
          <p className='block mt-3 text-2xl font-semibold text-brand-red'>
            {data.acf_drinks.pris}:-
          </p>
        )}
        {data.acf_drinks.recension && (
          <div className='mt-5'>
            {ReactHtmlParser(data.acf_drinks.recension)}
          </div>
        )}
        {data.acf_drinks.passarTillRecept &&
          data.acf_drinks.passarTillRecept.length > 0 && (
            <>
              <Link href={data.acf_drinks.passarTillRecept[0].uri}>
                <a className='relative block group'>
                  <div className='mt-5 overflow-hidden bg-black'>
                    <figure className='relative transition-all aspect-w-16 aspect-h-8 opacity-70 group-hover:scale-110'>
                      <Image
                        src={
                          data.acf_drinks?.passarTillRecept[0].featuredImage
                            ?.node?.mediaItemUrl
                            ? data.acf_drinks.passarTillRecept[0].featuredImage
                                .node.mediaItemUrl
                            : '/images/recipe-placeholder.jpg'
                        }
                        layout='fill'
                        objectFit='cover'
                        alt={
                          data.acf_drinks.passarTillRecept[0].featuredImage
                            ?.node.altText
                            ? data.acf_drinks.passarTillRecept[0].featuredImage
                                .node.altText
                            : data.acf_drinks.passarTillRecept[0].title
                        }
                      />
                    </figure>
                    <div className='absolute top-0 left-0 p-3 text-white'>
                      <p>Passar med</p>
                      <strong className='block'>
                        {data.acf_drinks.passarTillRecept[0].title}
                      </strong>
                    </div>
                  </div>
                  {isDebug && (
                    <p>
                      {dayjs(data.date).format('YYYY-MM-DD')} -{' '}
                      {data.acf_drinks.betyg}
                    </p>
                  )}
                </a>
              </Link>
            </>
          )}
      </div>
    </div>
  );
};

export default ToplistItem;
