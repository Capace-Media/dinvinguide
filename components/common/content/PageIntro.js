import Ad from '../../ads/Ad';
import BreadCrumbs from '../BreadCrumbs/Breadcrumbs';
import Image from 'next/image';
import Intro from './Intro';

const PageIntro = ({ title, text, ads, crumbs, type, image, alt }) => {
  return (
    <>
      {ads && (
        <div className='mb-10'>
          <Ad ads={ads} position='top' priority />
        </div>
      )}
      {crumbs && <BreadCrumbs crumbs={crumbs} />}
      <div className='text-center contain-sm row'>
        {image && (
          <figure className='relative mb-10 aspect-w-16 aspect-h-9'>
            <Image src={image} layout='fill' objectFit='cover' alt={alt} />
          </figure>
        )}
        {type && <p className='mb-5'>{type}</p>}
        <h1 className='mb-5 break-words text-brand-red'>{title}</h1>
        {text && <Intro content={text} />}
      </div>
    </>
  );
};

export default PageIntro;
