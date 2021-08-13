import Image from 'next/image';
import { useState } from 'react';
export default function Ad({ ads, position }) {
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
      <div>Annons:</div>
      <div className='mt-5'>
        <div className='w-[980px] h-[200px] relative'>{renderAd()}</div>
      </div>
    </div>
  );
}
