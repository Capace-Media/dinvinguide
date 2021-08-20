import BritFlag from '../../public/images/BRITFlag.png';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../public/dvg-logo.svg';
import SweFlag from '../../public/images/SWEFlag.png';
export default function Header() {
  const links = [
    { content: 'Skribenter', href: '/skribenter' },
    { content: 'Guide', href: '/' },
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
    },
    { content: 'Recept', href: '/' },
    { content: 'Topplistor', href: '/' },
  ];
  return (
    <header className='fixed top-0 left-0 w-screen bg-brand-bg z-50 font-display uppercase font-bold'>
      <nav className='contain py-5 flex items-center justify-between'>
        <div className='flex items-center space-x-2 w-24'>
          <a
            href='http://translate.google.com/translate?sl=auto&tl=en&js=n&prev=_t&hl=en&ie=UTF-8&u=https%3A%2F%2Fdinvinguide.se%2F&act=url'
            className='w-10'
          >
            <Image src={BritFlag} priority />
          </a>
          <a href='https://dinvinguide.se' className='w-10'>
            <Image src={SweFlag} priority />
          </a>
        </div>
        <div className='flex flex-1 items-center justify-evenly'>
          {links.map((link) => (
            <Link href={link.href}>{link.content}</Link>
          ))}
        </div>
        <div className='flex justify-end w-24'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 0 24 24'
            width='24px'
            className='text-brand-gray fill-current'
          >
            <path d='M0 0h24v24H0V0z' fill='none' />
            <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
          </svg>
        </div>
      </nav>
    </header>
  );
}
