import { BreadcrumbJsonLd } from 'next-seo';
import { Fragment } from 'react';
import Link from 'next/link';

export default function BreadCrumbs({ crumbs }) {
  return (
    <Fragment>
      <div className='flex justify-center py-5 contain'>
        <ul className='flex text-xs lg:text-sm' aria-label='breadcrumbs'>
          {crumbs.map((crumb, i) => (
            <li
              key={crumb.text}
              className={`group items-center ${
                crumb.current ? 'text-black' : 'text-brand-red'
              } ${crumbs.length > 2 && i === 0 ? 'hidden lg:flex' : 'flex'}`}
            >
              <Link href={crumb.href}>
                <a className='line-clamp-1'>{crumb.text}</a>
              </Link>

              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                className='w-4 h-4 lg:mx-2 group-last:hidden'
              >
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z' />
              </svg>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
}
