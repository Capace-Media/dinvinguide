import BCLogo from '../../public/images/bestchampagne-logo-black.png';
import DryckeslistanLogo from '../../public/images/dryckeslistanlogo-1.png';
import Footer from './footer';
import Header from './header';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';

export default function Layout({ children }) {
  const router = useRouter();
  useEffect(() => {
    fetch('/api/preview/exit');
  }, []);
  return (
    <>
      <Header />
      <div className='contain flex justify-center mt-[111px] space-x-3'>
        <div>
          <Image src={BCLogo} priority />
        </div>
        <div>|</div>
        <div>
          <Image src={DryckeslistanLogo} priority />
        </div>
      </div>
      <main className='pattern'>{children}</main>
      <Footer />
      {router.isPreview && (
        <div className='fixed bottom-0 left-0 w-screen py-2 text-center text-white uppercase bg-black'>
          Förhandsgranskning
        </div>
      )}
    </>
  );
}
