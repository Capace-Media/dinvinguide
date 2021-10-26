import { useEffect, useState } from 'react';

import BritFlag from '../../public/images/BRITFlag.png';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../public/dvg-logo.svg';
import SweFlag from '../../public/images/SWEFlag.png';
import { useRouter } from 'next/dist/client/router';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const links = [
    { content: 'Skribenter', href: '/skribenter' },
    { content: 'Guide', href: '/guide' },
    {
      content: (
        <Image
          width={300}
          height={65}
          objectFit='contain'
          src={Logo}
          priority
          className='cursor-pointer'
        />
      ),
      href: '/',
      mobile: true,
    },
    { content: 'Recept', href: '/recept' },
    { content: 'Topplistor', href: '/dryckeslistan' },
  ];

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.pathname]);

  return (
    <>
      <header className='fixed top-0 left-0 z-50 w-screen font-bold uppercase bg-brand-bg font-display'>
        <div className='flex items-center justify-end pt-2 space-x-2 contain lg:hidden lg:w-24'>
          <a
            href='http://translate.google.com/translate?sl=auto&tl=en&js=n&prev=_t&hl=en&ie=UTF-8&u=https%3A%2F%2Fdinvinguide.se%2F&act=url'
            className='w-7 lg:w-10'
          >
            <Image src={BritFlag} priority />
          </a>
          <a href='https://dinvinguide.se' className='w-7 lg:w-10'>
            <Image src={SweFlag} priority />
          </a>
        </div>
        <nav className='flex items-center justify-between lg:py-5 contain'>
          <div className='items-center hidden space-x-2 lg:flex lg:w-24'>
            <a
              href='http://translate.google.com/translate?sl=auto&tl=en&js=n&prev=_t&hl=en&ie=UTF-8&u=https%3A%2F%2Fdinvinguide.se%2F&act=url'
              className='w-5 lg:w-10'
            >
              <Image src={BritFlag} priority />
            </a>
            <a href='https://dinvinguide.se' className='w-5 lg:w-10'>
              <Image src={SweFlag} priority />
            </a>
          </div>
          <div className='flex items-center lg:flex-1 justify-evenly'>
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  key={link.href}
                  className={
                    link.mobile ? 'inherit lg:inherit' : 'hidden lg:flex'
                  }
                >
                  {link.content}
                </a>
              </Link>
            ))}
          </div>
          <div className='flex items-center justify-end w-24 space-x-2 lg:space-x-0'>
            <Link href='/sok'>
              <a>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  className='w-8 h-8 fill-current text-brand-gray'
                >
                  <path d='M0 0h24v24H0V0z' fill='none' />
                  <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
                </svg>
              </a>
            </Link>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='block w-8 h-8 cursor-pointer lg:hidden'
              onClick={() => setMobileMenuOpen(true)}
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
            </svg>
          </div>
        </nav>
      </header>
      {mobileMenuOpen && (
        <div className='fixed top-0 left-0 z-50 w-screen h-screen bg-brand-bg'>
          <div className='flex items-center justify-end p-5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='block w-8 h-8 cursor-pointer lg:hidden'
              onClick={() => setMobileMenuOpen(false)}
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' />
            </svg>
          </div>
          <div className='p-5 text-center'>
            <ul className='space-y-3 text-xl font-semibold uppercase'>
              <li>
                <Link href='/'>
                  <a className=''>Hem</a>
                </Link>
              </li>
              {links.map((link, i) => {
                if (i !== 2) {
                  return (
                    <li>
                      <Link href={link.href}>
                        <a className=''>{link.content}</a>
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
