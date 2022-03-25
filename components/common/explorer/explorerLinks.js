import Image from 'next/image';
import Link from 'next/link';
import explorerImages from '../../../data/explorerimages.json';
const ExplorerLinks = () => {
  return (
    <div className='grid gap-2 mt-10 mb-2 lg:mt-20 lg:grid-cols-2 contain'>
      <Link href='/dryckesutforskaren'>
        <a className='relative overflow-hidden bg-black aspect-w-16 aspect-h-9 group'>
          <figure className='transition-all opacity-70 group-hover:scale-110'>
            <Image
              src={explorerImages.bildDryckesutforskaren.mediaItemUrl}
              layout='fill'
              objectFit='cover'
              alt='Dryckesutforskaren'
            />
          </figure>
          <div className='p-5 lg:p-10'>
            <h3 className='pl-5 text-white border-l-4 lg:text-2xl border-brand-bronze'>
              Dryckesutforskaren
            </h3>
          </div>
        </a>
      </Link>
      <Link href='/recept'>
        <a className='relative overflow-hidden bg-black aspect-w-16 aspect-h-9 group'>
          <figure className='transition-all opacity-70 group-hover:scale-110'>
            <Image
              src={explorerImages.bildReceptutforskaren.mediaItemUrl}
              layout='fill'
              objectFit='cover'
              alt='Receptutforskaren'
            />
          </figure>
          <div className='p-5 lg:p-10'>
            <h3 className='pl-5 text-white border-l-4 lg:text-2xl border-brand-bronze'>
              Receptutforskaren
            </h3>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ExplorerLinks;
