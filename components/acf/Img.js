import Image from 'next/image';

export default function Img({ content, style }) {
  if (!style && content.img) {
    return (
      <div className='row max-w-4xl mx-auto w-[85%]'>
        <div className='aspect-w-1 aspect-h-1 lg:aspect-w-16 lg:aspect-h-10'>
          <Image
            src={content.img.mediaItemUrl}
            layout='fill'
            objectFit='cover'
          />
        </div>
      </div>
    );
  }
  if (style === 'full') {
    console.log(content);
    return (
      <div className='contain aspect-w-1 aspect-h-1 lg:aspect-w-16 lg:aspect-h-9 row'>
        <Image
          src={content.img.mediaItemUrl}
          layout='fill'
          objectFit='contain'
        />
      </div>
    );
  }
  return null;
}
