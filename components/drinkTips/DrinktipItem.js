import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const DrinktipItem = ({
  title,
  featuredImage,
  index,
  loadMore,
  maxNodes,
  acf_dryckestips,
  uri,
}) => {
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);
  console.log(acf_dryckestips);
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
      <h3 className='mt-5 normal-case text-brand-red'>
        <Link href={uri}>
          <a>{title}</a>
        </Link>
      </h3>
      <p>
        {acf_dryckestips.forpackningar} - {acf_dryckestips.dryckestyper}
      </p>
      <p className='mt-5 font-semibold'>
        {acf_dryckestips.pris && acf_dryckestips.pris + ':-'}
      </p>
      {acf_dryckestips.passarTillRecept && (
        <div className='mt-3'>
          <p className='font-semibold text-brand-red'>Passar till</p>
          <Link href={acf_dryckestips.passarTillRecept[0].uri}>
            <a className='hover:underline'>
              {acf_dryckestips.passarTillRecept[0].title}
            </a>
          </Link>
        </div>
      )}
    </li>
  );
};

export default DrinktipItem;
