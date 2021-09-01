import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
const ResultsItem = ({ item, maxCount, index, triggerInView }) => {
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && triggerInView) {
      console.log("I'm in view", index, maxCount);
      triggerInView();
    }
  }, [inView]);
  return (
    <li
      className='transition-all lg:hover:ring-4 ring-brand-red'
      ref={index + 1 === maxCount - 1 ? ref : null}
    >
      <Link href={item.uri}>
        <a className='p-2 lg:p-3 grid gap-5 grid-cols-[80px,1fr] lg:grid-cols-[80px,1fr,100px] bg-white cursor-pointer'>
          <figure className='relative w-20 h-20 bg-black/10'>
            {item.featuredImage && (
              <Image
                src={item.featuredImage.node.mediaItemUrl}
                layout='fill'
                objectFit='cover'
              />
            )}
          </figure>

          <div className='flex items-center'>
            <h3 className='text-sm lg:text-base'>{item.title}</h3>
          </div>
          <div className='items-center hidden font-semibold uppercase lg:flex text-brand-red'>
            Läs mer
          </div>
        </a>
      </Link>
    </li>
  );
};
export default ResultsItem;
