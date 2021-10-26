import Image from 'next/image';

export default function Img({ content, style, handleGallery }) {
  console.log(content);
  if (content && content.img && content.img.mediaDetails) {
    if (!style && content.img) {
      return (
        <div className='relative row contain'>
          <div className='relative flex justify-center'>
            <Image
              src={content.img.mediaItemUrl}
              width={content.img.mediaDetails.width}
              height={content.img.mediaDetails.height}
            />
            {content && content.iGalleri && (
              <button
                style={{ transform: 'translateX(-50%)' }}
                className='border-2 border-brand-red text-brand-red rounded box-border absolute block px-4 py-2 bottom-10 md:bottom-20 transform left-[50%] hover:text-white hover:bg-brand-red'
                onClick={() => handleGallery(content.img.mediaItemUrl)}
              >
                Visa galleri
              </button>
            )}
          </div>
        </div>
      );
    }
    if (style === 'full') {
      return (
        <div className='relative flex justify-center w-full row'>
          <Image
            src={content.img.mediaItemUrl}
            width={content.img.mediaDetails.width}
            height={content.img.mediaDetails.height}
          />
          {content && content.iGalleri && (
            <button
              style={{ transform: 'translateX(-50%)' }}
              className='border-2 border-brand-red text-brand-red rounded box-border absolute block px-4 py-2 bottom-10 md:bottom-20 transform left-[50%] hover:text-white hover:bg-brand-red'
              onClick={() => handleGallery(content.img.mediaItemUrl)}
            >
              Visa galleri
            </button>
          )}
        </div>
      );
    }
  }
  return null;
}
