import { useEffect, useState } from 'react';

import Blocks from '../common/content/Blocks';
import BreadCrumbs from '../common/BreadCrumbs/Breadcrumbs';
import Content from '../common/content/content';
import Image from 'next/dist/client/image';
import Link from 'next/dist/client/link';
import List from '../common/lists/List';
import OldContent from '../common/content/OldContent';
import SEO from '../common/SEO';
import Video from '../acf/Video';
import parse from 'html-react-parser';

const PostPageTemplate = ({ data }) => {
  const { page } = data;
  const [isGallery, setIsGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  let galleryImages = [];
  page?.acf_posts?.flerBilder?.forEach((img) => {
    galleryImages.push(img.mediaItemUrl);
  });
  page?.acf_posts?.sektioner
    .filter(
      (section) =>
        section.fieldGroupName.toLowerCase().includes('bild') &&
        section.iGalleri &&
        section.img &&
        section.img.mediaItemUrl
    )
    .forEach((img) => {
      galleryImages.push(img.img.mediaItemUrl);
    });

  const handleGallery = (index) => {
    if (Number.isInteger(index)) {
      setGalleryIndex(index ? index : 0);
    } else {
      const imgIndex = galleryImages.indexOf(index);

      setGalleryIndex(imgIndex);
    }
    setIsGallery(!isGallery);
  };
  const handleNextImage = () => {
    setGalleryIndex((prev) => prev + 1);
  };
  const handlePrevImage = () => {
    setGalleryIndex((prev) => prev - 1);
  };
  useEffect(() => {
    if (isGallery) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  });
  console.log(page.seo);
  return (
    <>
      <SEO
        title={page?.seo?.title}
        description={page?.seo?.metaDesc}
        image={page?.featuredImage?.node}
      />

      <article>
        <BreadCrumbs
          crumbs={[
            { text: 'Skribenter', href: '/skribenter' },
            {
              text: page?.author?.node?.name,
              href: '/' + page?.author?.node?.nicename,
            },
            { current: true, text: page?.title, href: page?.uri },
          ]}
        />
        <div className='grid row contain-sm'>
          {page.featuredImage && (
            <div className='relative aspect-w-1 aspect-h-1 lg:aspect-w-16 lg:aspect-h-9'>
              <Image
                src={page.featuredImage.node.mediaItemUrl}
                layout='fill'
                objectFit='cover'
                priority
                alt={
                  page?.featuredImage?.node?.altText
                    ? page?.featuredImage?.node?.altText
                    : page?.seo?.title
                }
              />
            </div>
          )}
        </div>
        <div className='max-w-4xl mx-auto w-[85%]'>
          <div className='text-center'>
            <Link href={`/${page?.author?.node?.nicename}`}>
              <a className='inline-block mb-3 '>
                Skriven av{' '}
                <span className='underline'>{page?.author?.node?.name}</span>
              </a>
            </Link>
            <h1 className='text-brand-red'>{page?.title}</h1>
            <p className='mx-auto mt-10 mb-20 prose lg:prose-xl'>
              {parse(page?.acf_posts?.ingress)}
            </p>
          </div>
        </div>

        <div>
          {page?.acf_posts?.sektioner &&
            page?.acf_posts?.sektioner?.length > 0 && (
              <Blocks
                ad
                blocks={page?.acf_posts?.sektioner}
                handleGallery={handleGallery}
              />
            )}
          {page?.content && (
            <div id='content' className='contain-sm rich-text'>
              <Content content={page?.content} />
            </div>
          )}
          {page?.acf_oldcontent && page?.acf_oldcontent?.oldContentAcf && (
            <OldContent
              id='old-content'
              content={page?.acf_oldcontent?.oldContentAcf}
            />
          )}
        </div>
      </article>
      <div className='row max-w-4xl mx-auto w-[85%] text-center flex flex-col items-center lg:text-left lg:grid lg:grid-cols-[100px,1fr] gap-10 mt-5 lg:mt-10'>
        <div className='relative w-24 h-24 mb-10 overflow-hidden rounded-full lg:mb-0'>
          {page?.author?.node?.acf_user?.bild?.mediaItemUrl && (
            <Image
              src={page?.author?.node?.acf_user?.bild?.mediaItemUrl}
              layout='fill'
              objectFit='cover'
              alt={
                page?.author?.node?.acf_user?.bild?.altText
                  ? page?.author?.node?.acf_user?.bild?.altText
                  : page?.author?.node?.name
              }
            />
          )}
        </div>

        <div className=''>
          <h3 className='mb-3 text-xl text-brand-red lg:text-3xl'>
            {page.author.node.name}
          </h3>
          <p className='text-base'>
            {page.author?.node?.acf_user?.kortBeskrivning}
          </p>
          <Link href={`/${page?.author?.node?.nicename}`}>
            <a className='inline-block mt-4 text-brand-red'>
              Läs mer om {page?.author?.node?.firstName}
            </a>
          </Link>
        </div>
      </div>
      {page?.acf_posts?.lasMer && (
        <List
          array={page?.acf_posts?.lasMer}
          search={false}
          heading='Läs mer'
          columns={3}
          subtitle='author.node.name'
        />
      )}
      {isGallery && (
        <div
          className={`fixed top-0 left-0 w-screen h-screen bg-[#181818] text-white z-50`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            className='fixed z-50 w-8 h-8 cursor-pointer fill-current top-5 right-5'
            onClick={() => setIsGallery(false)}
          >
            <path d='M0 0h24v24H0V0z' fill='none' />
            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' />
          </svg>
          <div className='w-full h-full p-5 md:p-10'>
            <figure className='relative w-full h-full'>
              <Image
                src={galleryImages[galleryIndex]}
                layout='fill'
                objectFit='contain'
                alt={`Current gallery image`}
              />
            </figure>
            {galleryIndex < galleryImages?.length - 1 && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                className='fill-current fixed top-[50%] right-5 w-12 h-12'
                onClick={() => handleNextImage()}
              >
                <g>
                  <path d='M0,0h24v24H0V0z' fill='none' />
                </g>
                <g>
                  <polygon points='6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12' />
                </g>
              </svg>
            )}
            {galleryIndex !== 0 && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                className='fill-current fixed top-[50%] left-5 rotate-180 w-12 h-12'
                onClick={() => handlePrevImage()}
              >
                <g>
                  <path d='M0,0h24v24H0V0z' fill='none' />
                </g>
                <g>
                  <polygon points='6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12' />
                </g>
              </svg>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PostPageTemplate;
