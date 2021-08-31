import BCLogo from '../../public/images/bestchampagne-logo-black.png';
import DryckeslistanLogo from '../../public/images/dryckeslistanlogo-1.png';
import Footer from './footer';
import { Fragment } from 'react';
import Header from './header';
import Image from 'next/image';

export default function Layout({ children }) {
  return (
    <Fragment>
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
    </Fragment>
  );
}
