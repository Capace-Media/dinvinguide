import Link from 'next/link';
import { NextSeo } from 'next-seo';
const links = [
  { label: 'Artiklar', href: '/debug' },
  { label: 'Drycker', href: '/debug/drycker' },
  { label: 'Dryckestips', href: '/debug/dryckestips' },
  { label: 'Recept', href: '/debug/recept' },
  { label: 'Sidor', href: '/debug/sidor' },
];
const DebugNav = () => {
  return (
    <>
      <NextSeo noindex={true} />
      <div className='flex items-center justify-center space-x-5 contain row'>
        {links.map((link) => (
          <Link href={link.href}>
            <a>{link.label}</a>
          </Link>
        ))}
      </div>
    </>
  );
};

export default DebugNav;
