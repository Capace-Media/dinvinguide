import BCLogo from '../../public/images/bestchampagne-logo-black.png';
import DryckeslistanLogo from '../../public/images/dryckeslistanlogo-1.png';
import Footer from './footer';
import Header from './header';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

export default function Layout({ children }) {
  const router = useRouter();
  const handleExitPreview = async () => {
    const res = await fetch('/api/preview/exit');
    window.location.reload();
  };

  return (
    <>
      <Header />
      <div className='contain flex justify-center mt-[111px] space-x-3'>
        <a href='https://bestchampagne.se' target='noreferrer'>
          <Image src={BCLogo} priority alt='BestChampagne Logo' />
        </a>

        <div>|</div>
        <Link href='/dryckeslistan'>
          <a>
            <Image src={DryckeslistanLogo} priority alt='Dryckeslistan Logo' />
          </a>
        </Link>
      </div>
      <main className='pattern'>{children}</main>
      <Footer />
      {router.isPreview && (
        <div className='fixed bottom-0 left-0 z-50 flex items-center justify-center w-screen py-2 space-x-3 text-sm text-center text-white uppercase bg-black lg:space-x-10 lg:text-base'>
          <p>Förhandsgranskning</p>
          <span
            className='px-3 py-1 font-semibold text-black bg-white rounded cursor-pointer lg:px-4 lg:py-2'
            onClick={() => handleExitPreview()}
          >
            Lämna
          </span>
        </div>
      )}
    </>
  );
}
