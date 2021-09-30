import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const MoreArticlesListItem = ({ article, incrementNodes, last }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  useEffect(() => {
    if (inView) {
      incrementNodes();
    }
  }, [inView]);
  return (
    <Link href={`/`}>
      <a
        ref={last ? ref : null}
        className='relative overflow-hidden bg-black group'
      >
        <figure className='relative aspect-w-16 aspect-h-10 opacity-60'>
          {article.featuredImage && (
            <Image
              src={article.featuredImage.node.mediaItemUrl}
              layout='fill'
              objectFit='cover'
            />
          )}
        </figure>
        <div className='p-5'></div>
      </a>
    </Link>
  );
};

export default MoreArticlesListItem;
