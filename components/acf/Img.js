import Image from 'next/image';

export default function Img({ content, style }) {
  if (content && content.img && content.img.mediaDetails) {
    if (!style && content.img) {
      return (
        <div className='row contain'>
          <div className='relative flex justify-center'>
            <Image
              src={content.img.mediaItemUrl}
              width={content.img.mediaDetails.width}
              height={content.img.mediaDetails.height}
            />
          </div>
        </div>
      );
    }
    if (style === 'full') {
      return (
        <div className='flex justify-center w-full row'>
          <Image
            src={content.img.mediaItemUrl}
            width={content.img.mediaDetails.width}
            height={content.img.mediaDetails.height}
          />
        </div>
      );
    }
  }
  return null;
}
