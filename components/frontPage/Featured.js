import Image from 'next/image';
import Link from 'next/link';
import LogoWhite from '../../public/images/dvg-logo-white.png';
export default function Featured({ items }) {
  const containerClasses = `group h-56   relative flex items-start justify-center bg-black p-5 overflow-hidden `;
  const contentClasses = `z-20 border-l-4 border-brand-bronze px-2 w-full`;
  const titleClasses = `text-lg uppercase font-semibold`;
  const subTitleClasses = ``;

  const renderBlock = (item, index) => {
    if (index === 0) {
      return (
        <div className='relative flex items-center justify-center p-5 bg-black h-96 lg:col-span-2 lg:row-span-2 lg:h-full'>
          <div className='absolute top-0 left-0 z-10 w-full h-full opacity-80'>
            {item.image && (
              <Image src={item.image} layout='fill' objectFit='cover' />
            )}
          </div>
          <div className={`z-20 text-5xl  font-semibold text-center`}>
            <h1 className='mb-3'>Välkommen till</h1>
            <Image src={LogoWhite} />
          </div>
        </div>
      );
    }
    if (index === 1) {
      return (
        <Link href={item.uri}>
          <a
            className={`lg:col-span-1 lg:row-span-2 ${containerClasses} lg:h-full`}
          >
            <div className='absolute top-0 left-0 w-full h-full z-10 opacity-70 transform transition-all group-hover:scale-[1.1]'>
              {item.image && (
                <Image src={item.image} layout='fill' objectFit='cover' />
              )}
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
        <Link
          href={
            item.authorSlug
              ? `/${item.authorSlug}/${item.slug}`
              : `/${item.slug}`
          }
        >
          <a
            className={`${containerClasses} lg:h-full lg:col-span-1 lg:row-span-2 `}
          >
            <div className='absolute top-0 left-0 w-full h-full z-10 opacity-70 transform transition-all group-hover:scale-[1.1]'>
              {item.image && (
                <Image src={item.image} layout='fill' objectFit='cover' />
              )}
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
        <Link
          href={
            item.authorSlug
              ? `/${item.authorSlug}/${item.slug}`
              : `/${item.slug}`
          }
        >
          <a
            className={`${containerClasses} lg:h-full lg:col-span-2 lg:row-span-2`}
          >
            <div className='absolute top-0 left-0 w-full h-full z-10 opacity-70 transform transition-all group-hover:scale-[1.1]'>
              {item.image && (
                <Image src={item.image} layout='fill' objectFit='cover' />
              )}
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
        <Link
          href={
            item.authorSlug
              ? `/${item.authorSlug}/${item.slug}`
              : `/${item.slug}`
          }
        >
          <a
            className={`lg:col-span-2 lg:row-span-2 lg:h-full ${containerClasses}`}
          >
            <div className='absolute top-0 left-0 w-full h-full z-10 opacity-70 transform transition-all group-hover:scale-[1.1]'>
              {item.image && (
                <Image src={item.image} layout='fill' objectFit='cover' />
              )}
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
        <Link
          href={
            item.authorSlug
              ? `/${item.authorSlug}/${item.slug}`
              : `/${item.slug}`
          }
        >
          <a
            className={`lg:h-full lg:col-span-1 lg:row-span-2 ${containerClasses}`}
          >
            <div className='absolute top-0 left-0 w-full h-full z-10 opacity-70 transform transition-all group-hover:scale-[1.1]'>
              {item.image && (
                <Image src={item.image} layout='fill' objectFit='cover' />
              )}
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
        <Link
          href={
            item.authorSlug
              ? `/${item.authorSlug}/${item.slug}`
              : `/${item.slug}`
          }
        >
          <a
            className={`lg:h-full lg:col-span-1 lg:row-span-2 ${containerClasses}`}
          >
            <div className='absolute top-0 left-0 w-full h-full z-10 opacity-70 transform transition-all group-hover:scale-[1.1]'>
              {item.image && (
                <Image src={item.image} layout='fill' objectFit='cover' />
              )}
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
        <Link
          href={
            item.authorSlug
              ? `/${item.authorSlug}/${item.slug}`
              : `/${item.slug}`
          }
        >
          <a
            className={`lg:h-full lg:col-span-2 lg:row-span-2 ${containerClasses}`}
          >
            <div className='absolute top-0 left-0 w-full h-full z-10 opacity-70 transform transition-all group-hover:scale-[1.1]'>
              {item.image && (
                <Image src={item.image} layout='fill' objectFit='cover' />
              )}
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
      <Link
        href={
          item.authorSlug ? `/${item.authorSlug}/${item.slug}` : `/${item.slug}`
        }
      >
        <a className={`h-56 lg:row-span-1 lg:col-span-1 ${containerClasses}`}>
          <div className='absolute top-0 left-0 w-full h-full z-10 opacity-70 transform transition-all group-hover:scale-[1.1]'>
            {item.image && (
              <Image src={item.image} layout='fill' objectFit='cover' />
            )}
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
    <div className='grid grid-cols-1 gap-2 text-white grid-cols contain lg:grid-cols-4'>
      {items.map((item, index) => renderBlock(item, index))}
    </div>
  );
}
