import Image from 'next/image';
import parse from 'react-html-parser';
const Drink = ({ data }) => {
  console.log(data);
  const { layout } = data.bild;
  return (
    <div
      className={`contain-sm mx-auto prose-sm md:prose row-sm grid gap-5 md:gap-10  ${
        layout === 'left' ? 'md:grid-cols-[1fr,3fr]' : 'md:grid-cols-[3fr,1fr]'
      }`}
    >
      <Image
        src={data.bild.bild.mediaItemUrl}
        layout='fill'
        objectFit='contain'
        className={`aspect-w-1 aspect-h-1 ${
          layout === 'left' ? 'order-0' : 'order-0 md:order-1'
        }`}
        alt={data.bild.bild.altText}
      />

      <div className='flex flex-col justify-center'>
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
    </div>
  );
};

export default Drink;
