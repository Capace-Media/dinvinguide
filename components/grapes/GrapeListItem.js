import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
const GrapeListItem = ({ grape, last, incrementNodes }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  useEffect(() => {
    if (inView) {
      incrementNodes();
    }
  }, [inView]);
  return (
    <li
      ref={last ? ref : null}
      key={grape.uri}
      className='relative overflow-hidden bg-black group'
    >
      <Link href={grape.uri}>
        <a>
          <figure className='relative transition-all aspect-w-16 aspect-h-10 opacity-60 group-hover:scale-110'>
            {grape.featuredImage && (
              <Image
                src={grape.featuredImage.node.mediaItemUrl}
                layout='fill'
                objectFit='cover'
              />
            )}
          </figure>
          <div className='absolute top-0 left-0 p-5 text-white'>
            <div className='px-3 border-l-4 border-brand-bronze'>
              <h3>{grape.title}</h3>
              <p className='text-sm'>{grape.acf_grape.druvtyp.name}</p>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default GrapeListItem;
