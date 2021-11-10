import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/dist/client/router';
import useSWR from 'swr';
const fetcher = (url) => fetch(url).then((r) => r.json());

const desktopContainer = `h-44 relative hidden md:block contain row text-center`;
const mobileContainer = `h-56 relative block md:hidden contain row text-center`;
const ClientAd = React.memo(({ position, type = 'default' }) => {
  const router = useRouter();
  console.log(router);
  const { data } = useSWR(
    !router.isPreview ? `/api/ads/${type}/${position}` : null,
    fetcher
  );
  console.log(data);
  if (router.isPreview) {
    return <div className={`${desktopContainer}`}>No ads during preview</div>;
  }
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
