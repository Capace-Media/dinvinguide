import Image from 'next/image';
import parse from 'react-html-parser';
const Drink = ({ data }) => {
  return (
    <div
      className={`contain-sm relative mx-auto prose-sm md:prose row-sm grid gap-5 md:gap-10 md:grid-cols-[3fr,1fr]`}
    >
      <div className='flex flex-col justify-center order-1 md:order-0'>
        <h3 className='!mt-0'>{data.name}</h3>
        {parse(data.text)}
        <a
          className='inline self-start !text-brand-red !no-underline font-bold'
          href={data.other.linkSystembolaget}
          target='_blank'
          rel='noreferrer'
        >
          Läs mer
        </a>
      </div>
      <figure className='relative h-52 md:h-auto order-0 md:order-1'>
        <Image
          src={data.bild.bild.mediaItemUrl}
          layout='fill'
          objectFit='contain'
          className={``}
          alt={data.bild.bild.altText}
        />
      </figure>
    </div>
  );
};

export default Drink;
