import Image from 'next/image';
import React from 'react';
import useSWR from 'swr';
const fetcher = (url) => fetch(url).then((r) => r.json());

const desktopContainer = `h-44 relative hidden md:block contain row `;
const mobileContainer = `h-56 relative block md:hidden contain row`;
const ClientAd = React.memo(({ position, type = 'default' }) => {
  const { data } = useSWR(`/api/ads/${type}/${position}`, fetcher);
  console.log(data);
  if (!data) {
    return <div className={`${desktopContainer}`}>Loading...</div>;
  }
  return (
    <>
      <a
        href={data.href}
        target='_blank'
        rel='noreferrer'
        className={`${desktopContainer}`}
      >
        <Image
          src={data.desktop}
          layout='fill'
          objectFit='contain'
          alt={data.title}
        />
      </a>
      <a
        href={data.href}
        target='_blank'
        rel='noreferrer'
        className={`${mobileContainer}`}
      >
        <Image
          src={data.mobile}
          layout='fill'
          objectFit='contain'
          alt={data.title}
          className='hidden lg:block'
        />
      </a>
    </>
  );
});
ClientAd.displayName = 'ClientAd';
export default ClientAd;
