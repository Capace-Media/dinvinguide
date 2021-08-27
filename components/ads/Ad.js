import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

export default function Ad({ ads, position, triggerInView, triggerOnce }) {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: triggerOnce,
  });
  useEffect(() => {
    if (triggerInView && inView) {
      triggerInView();
    }
  }, [inView]);
  const renderAd = () => {
    if (!ads[position].current.desktop) {
      return (
        <Image
          src={ads[position].fallback.desktop}
          layout='fill'
          objectFit='contain'
        />
      );
    }
    return (
      <Image
        src={ads[position].current.desktop}
        layout='fill'
        objectFit='contain'
      />
    );
  };

  return (
    <div className='flex flex-col items-center'>
      <div ref={triggerInView ? ref : null}>Annons:</div>
      <div className='mt-5'>
        <div className='w-[980px] h-[200px] relative'>{renderAd()}</div>
      </div>
    </div>
  );
}
