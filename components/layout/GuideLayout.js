import Link from 'next/link';
const GuideLayout = ({ children }) => {
  return (
    <>
      <div className='pb-0 text-center row contain'>
        <h2 className='text-brand-red'>Guider</h2>
      </div>
      <div className='grid gap-1 lg:gap-1 lg:grid-cols-4 row contain'>
        <Link href='/druvguiden'>
          <a className='flex items-center justify-center block p-5 lg:p-10 bg-brand-red text-brand-bg'>
            <span className='py-3 font-semibold text-center uppercase border-t-4 border-b-4 border-brand-bg'>
              Druvguiden
            </span>
          </a>
        </Link>
        <Link href='/vinguide/vinatlas'>
          <a className='flex items-center justify-center block p-5 lg:p-10 bg-brand-red text-brand-bg'>
            <span className='py-3 font-semibold text-center uppercase border-t-4 border-b-4 border-brand-bg'>
              Vinatlas
            </span>
          </a>
        </Link>
        <Link href='/'>
          <a className='flex items-center justify-center block p-5 lg:p-10 bg-brand-red text-brand-bg'>
            <span className='py-3 font-semibold text-center uppercase border-t-4 border-b-4 border-brand-bg'>
              Vinskola
            </span>
          </a>
        </Link>
        <Link href='/'>
          <a className='flex items-center justify-center block p-5 lg:p-10 bg-brand-red text-brand-bg'>
            <span className='py-3 font-semibold text-center uppercase border-t-4 border-b-4 border-brand-bg'>
              Vin TV
            </span>
          </a>
        </Link>
      </div>
      {children}
    </>
  );
};

export default GuideLayout;
