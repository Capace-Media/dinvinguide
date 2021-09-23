import Image from 'next/image';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const DrinktipItem = ({
  title,
  featuredImage,
  index,
  loadMore,
  maxNodes,
  acf_dryckestips,
}) => {
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);
  return (
    <li className='text-center' ref={index === maxNodes ? ref : null}>
      <div className='aspect-w-1 aspect-h-1'>
        <figure className='absolute top-0 left-0 w-full h-full scale-90 translate-y-4 rounded-full bg-brand-red' />
        <Image
          src={featuredImage.node.mediaItemUrl}
          layout='fill'
          objectFit='contain'
        />
      </div>
      <h3 className='mt-5 normal-case text-brand-red'>{title}</h3>
      <p>
        {acf_dryckestips.forpackningar} - {acf_dryckestips.dryckestyper}
      </p>
      <p className='mt-5 font-semibold'>
        {acf_dryckestips.pris && acf_dryckestips.pris + ':-'}
      </p>
    </li>
  );
};

export default DrinktipItem;
