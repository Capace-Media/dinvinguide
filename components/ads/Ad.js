import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

export default function Ad({
  ads,
  position,

  triggerOnce,
  priority,
}) {
  const [isSmall, setIsSmall] = useState(true);

  const renderAd = (device) => {
    if (!ads[position].current[device]) {
      return (
        <a
          href={ads[position].fallback.href}
          target='_blank'
          className='block w-full h-full'
          rel='noreferrer'
        >
          <Image
            src={ads[position].fallback[device]}
            layout='fill'
            objectFit='contain'
            priority={priority ? true : false}
            alt='Annons'
          />
        </a>
      );
    }
    return (
      <a
        href={ads[position].current.href}
        target='_blank'
        className='block w-full h-full'
        rel='noreferrer'
      >
        <Image
          src={ads[position].current[device]}
          layout='fill'
          objectFit='contain'
          priority={priority ? true : false}
          alt='Annons'
        />
      </a>
    );
  };
  useEffect(() => {
    setIsSmall(window.innerWidth < 600 ? true : false);
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <div>Annons:</div>
      <div className='mt-5'>
        {isSmall ? (
          <div className='relative block w-[280px] h-64 lg:hidden'>
            {renderAd('mobile')}
          </div>
        ) : (
          <div className='hidden lg:block w-[980px] h-[200px] relative'>
            {renderAd('desktop')}
          </div>
        )}
      </div>
    </div>
  );
}
