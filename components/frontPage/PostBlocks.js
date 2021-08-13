import Image from 'next/image';
import Link from 'next/link';
export default function PostBlocks({ items }) {
  console.log(items);
  const containerClasses = `group relative flex items-start justify-center bg-black p-5 overflow-hidden`;
  const contentClasses = `z-20 border-l-4 border-brand-bronze px-2 w-full`;
  const titleClasses = `uppercase font-bold`;
  const subTitleClasses = ``;
  const renderBlock = (item, index) => {
    if (index === 0) {
      return (
        <Link href={'/'}>
          <a className={`col-span-2 row-span-2 ${containerClasses}`}>
            <div className='absolute top-0 left-0 w-full h-full z-10 opacity-70 transform transition-all group-hover:scale-[1.1]'>
              <Image src={item.image} layout='fill' objectFit='cover' />
            </div>
            <div className={`${contentClasses}`}>
              <h2 className={`${titleClasses}`}>{item.title}</h2>
              {item.subTitle && (
                <p className={` ${subTitleClasses}`}>{item.subTitle}</p>
              )}
            </div>
          </a>
        </Link>
      );
    }
    if (index === 1) {
      return (
        <Link href='/'>
          <a className={`col-span-1 row-span-2 ${containerClasses}`}>
            <div className='absolute top-0 left-0 w-full h-full z-10 opacity-70 transform transition-all group-hover:scale-[1.1]'>
              <Image src={item.image} layout='fill' objectFit='cover' />
            </div>
            <div className={`${contentClasses}`}>
              <h2 className={`${titleClasses}`}>{item.title}</h2>
              {item.subTitle && (
                <p className={` ${subTitleClasses}`}>{item.subTitle}</p>
              )}
            </div>
          </a>
        </Link>
      );
    }
    if (index === 4) {
      return (
        <Link href='/'>
          <a className={`col-span-1 row-span-2 ${containerClasses}`}>
            <div className='absolute top-0 left-0 w-full h-full z-10 opacity-70 transform transition-all group-hover:scale-[1.1]'>
              <Image src={item.image} layout='fill' objectFit='cover' />
            </div>
            <div className={`${contentClasses}`}>
              <h2 className={`${titleClasses}`}>{item.title}</h2>
              {item.subTitle && (
                <p className={` ${subTitleClasses}`}>{item.subTitle}</p>
              )}
            </div>
          </a>
        </Link>
      );
    }
    if (index === 6) {
      return (
        <Link href='/'>
          <a className={`col-span-2 row-span-2 ${containerClasses}`}>
            <div className='absolute top-0 left-0 w-full h-full z-10 opacity-70 transform transition-all group-hover:scale-[1.1]'>
              <Image src={item.image} layout='fill' objectFit='cover' />
            </div>
            <div className={`${contentClasses}`}>
              <h2 className={`${titleClasses}`}>{item.title}</h2>
              {item.subTitle && (
                <p className={` ${subTitleClasses}`}>{item.subTitle}</p>
              )}
            </div>
          </a>
        </Link>
      );
    }
    if (index === 8) {
      return (
        <Link href='/'>
          <a className={`col-span-2 row-span-2 ${containerClasses}`}>
            <div className='absolute top-0 left-0 w-full h-full z-10 opacity-70 transform transition-all group-hover:scale-[1.1]'>
              <Image src={item.image} layout='fill' objectFit='cover' />
            </div>
            <div className={`${contentClasses}`}>
              <h2 className={`${titleClasses}`}>{item.title}</h2>
              {item.subTitle && (
                <p className={` ${subTitleClasses}`}>{item.subTitle}</p>
              )}
            </div>
          </a>
        </Link>
      );
    }
    if (index === 9) {
      return (
        <Link href='/'>
          <a className={`col-span-1 row-span-2 ${containerClasses}`}>
            <div className='absolute top-0 left-0 w-full h-full z-10 opacity-70 transform transition-all group-hover:scale-[1.1]'>
              <Image src={item.image} layout='fill' objectFit='cover' />
            </div>
            <div className={`${contentClasses}`}>
              <h2 className={`${titleClasses}`}>{item.title}</h2>
              {item.subTitle && (
                <p className={` ${subTitleClasses}`}>{item.subTitle}</p>
              )}
            </div>
          </a>
        </Link>
      );
    }
    if (index === 12) {
      return (
        <Link href='/'>
          <a className={`col-span-1 row-span-2 ${containerClasses}`}>
            <div className='absolute top-0 left-0 w-full h-full z-10 opacity-70 transform transition-all group-hover:scale-[1.1]'>
              <Image src={item.image} layout='fill' objectFit='cover' />
            </div>
            <div className={`${contentClasses}`}>
              <h2 className={`${titleClasses}`}>{item.title}</h2>
              {item.subTitle && (
                <p className={` ${subTitleClasses}`}>{item.subTitle}</p>
              )}
            </div>
          </a>
        </Link>
      );
    }
    if (index === 14) {
      return (
        <Link href='/'>
          <a className={`col-span-2 row-span-2 ${containerClasses}`}>
            <div className='absolute top-0 left-0 w-full h-full z-10 opacity-70 transform transition-all group-hover:scale-[1.1]'>
              <Image src={item.image} layout='fill' objectFit='cover' />
            </div>
            <div className={`${contentClasses}`}>
              <h2 className={`${titleClasses}`}>{item.title}</h2>
              {item.subTitle && (
                <p className={` ${subTitleClasses}`}>{item.subTitle}</p>
              )}
            </div>
          </a>
        </Link>
      );
    }

    return (
      <Link href='/'>
        <a className={`h-56 row-span-1 col-span-1 ${containerClasses}`}>
          <div className='absolute top-0 left-0 w-full h-full z-10 opacity-70 transform transition-all group-hover:scale-[1.1]'>
            <Image src={item.image} layout='fill' objectFit='cover' />
          </div>
          <div className={`${contentClasses}`}>
            <h2 className={`${titleClasses}`}>{item.title}</h2>
            {item.subTitle && (
              <p className={` ${subTitleClasses}`}>{item.subTitle}</p>
            )}
          </div>
        </a>
      </Link>
    );
  };
  return (
    <div className='contain grid grid-cols-4 text-white gap-2'>
      {items.map((item, index) => renderBlock(item, index))}
    </div>
  );
}
