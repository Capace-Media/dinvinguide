import ExplorerLinks from '../../components/common/explorer/explorerLinks';
import Link from 'next/link';
const GuidePage = () => {
  return (
    <>
      <div className='text-center row contain'>
        <h1 className='text-brand-red'>Guider</h1>
      </div>
      <div className='grid grid-cols-4 gap-5 row contain'>
        <Link href='/'>
          <a className='flex items-center justify-center block p-10 bg-brand-red text-brand-bg'>
            <span className='py-3 font-semibold text-center uppercase border-t-4 border-b-4 border-brand-bg'>
              Druvguiden
            </span>
          </a>
        </Link>
        <Link href='/'>
          <a className='flex items-center justify-center block p-10 bg-brand-red text-brand-bg'>
            <span className='py-3 font-semibold text-center uppercase border-t-4 border-b-4 border-brand-bg'>
              Vinatlas
            </span>
          </a>
        </Link>
        <Link href='/'>
          <a className='flex items-center justify-center block p-10 bg-brand-red text-brand-bg'>
            <span className='py-3 font-semibold text-center uppercase border-t-4 border-b-4 border-brand-bg'>
              Vinskola
            </span>
          </a>
        </Link>
        <Link href='/'>
          <a className='flex items-center justify-center block p-10 bg-brand-red text-brand-bg'>
            <span className='py-3 font-semibold text-center uppercase border-t-4 border-b-4 border-brand-bg'>
              Vin TV
            </span>
          </a>
        </Link>
      </div>
      <ExplorerLinks />
    </>
  );
};

export default GuidePage;
