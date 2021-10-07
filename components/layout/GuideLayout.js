import Link from 'next/link';
const GuideLayout = ({ children }) => {
  const textClasses =
    'py-1 lg:py-3 text-xs lg:text-base font-semibold text-center uppercase border-t-2 border-b-2 lg:border-t-4 lg:border-b-4 border-brand-bg';
  return (
    <>
      <div className='pb-0 text-center row contain'>
        <h2 className='text-brand-red'>Guider</h2>
      </div>
      <div className='grid grid-cols-2 gap-1 lg:gap-1 lg:grid-cols-4 row contain'>
        <Link href='/druvguiden'>
          <a className='flex items-center justify-center block p-5 lg:p-10 bg-brand-red text-brand-bg'>
            <span className={textClasses}>Druvguiden</span>
          </a>
        </Link>
        <Link href='/vinguide/vinatlas'>
          <a className='flex items-center justify-center block p-5 lg:p-10 bg-brand-red text-brand-bg'>
            <span className={textClasses}>Vinatlas</span>
          </a>
        </Link>
        <Link href='/skolor'>
          <a className='flex items-center justify-center block p-5 lg:p-10 bg-brand-red text-brand-bg'>
            <span className={textClasses}>Vinskola</span>
          </a>
        </Link>
        <Link href='/vin-tv'>
          <a className='flex items-center justify-center block p-5 lg:p-10 bg-brand-red text-brand-bg'>
            <span className={textClasses}>Vin TV</span>
          </a>
        </Link>
      </div>
      {children}
    </>
  );
};

export default GuideLayout;
