import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
//import { useRouter } from 'next/dist/client/router';
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((r) => r.json());

const desktopContainer = `h-full relative hidden md:block w-full  text-center`;
const mobileContainer = `h-full relative block md:hidden w-full  text-center`;
const ClientAd = React.memo(({ position, type = "default" }) => {
  const router = useRouter();

  const { data } = useSWR(
    !router.isPreview ? `/api/ads/${type}/${position}` : null,
    fetcher
  );

  if (router.isPreview) {
    return (
      <div className="flex items-center justify-center h-72 md:h-52 contain">
        No ads during preview
      </div>
    );
  }
  if (!data) {
    return (
      <div className="flex items-center justify-center h-72 md:h-52 contain">
        <span className="flex items-center space-x-3">
          <figure className="w-6 h-6 border-2 rounded-full border-brand-red/40 border-t-brand-red animate-spin" />
          <p>Hämtar annons</p>
        </span>
      </div>
    );
  }
  return (
    <>
      <div className="flex items-center justify-center h-64 max-w-4xl mx-auto md:h-52 contain">
        <a
          href={data.href}
          target="_blank"
          rel="noreferrer"
          className={`${desktopContainer}`}
        >
          <Image
            src={data.desktop}
            layout="fill"
            objectFit="contain"
            alt={data.title}
          />
        </a>
        <a
          href={data.href}
          target="_blank"
          rel="noreferrer"
          className={`${mobileContainer}`}
        >
          <Image
            src={data.mobile}
            layout="fill"
            objectFit="contain"
            alt={data.title}
            className="hidden lg:block"
          />
        </a>
      </div>
    </>
  );
});
ClientAd.displayName = "ClientAd";
export default ClientAd;
