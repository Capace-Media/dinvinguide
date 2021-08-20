import Image from 'next/image';
import Link from 'next/link';
export default function Puff({ content }) {
  const data = content && content.extraPuff && content.extraPuff[0];

  switch (data.__typename) {
    case 'Grape':
      return <GrapePuff content={data} />;
      break;
    case 'Recipe':
      return <RecipePuff content={data} />;
    default:
      return <div>Hello</div>;
      break;
  }
}

const GrapePuff = ({ content }) => {
  console.log(content);
  return (
    <div className='row'>
      <div
        className={`grid p-5 lg:p-10 bg-white/50 max-w-5xl mx-auto w-[85%] gap-5 lg:gap-10 ${
          content.featuredImage ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
        }`}
      >
        <div className='text-center flex flex-col items-center justify-center '>
          <p className='text-brand-red mb-3'>Druva</p>
          <Link href={content.uri}>
            <a className=''>
              <h3 className='text-xl lg:text-3xl mb-5'>{content.title}</h3>
            </a>
          </Link>
          <Link href={content.uri}>
            <a className='inline-block '>Läs mer</a>
          </Link>
        </div>
        <div className='relative h-56'>
          <Image
            src={content.featuredImage.node.mediaItemUrl}
            layout='fill'
            objectFit='cover'
          />
        </div>
      </div>
    </div>
  );
};

const RecipePuff = ({ content }) => {
  console.log(content);
  return (
    <div className='row'>
      <div
        className={`grid p-5 lg:p-10 bg-white/50 max-w-5xl mx-auto w-[85%] gap-10 ${
          content.featuredImage ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
        }`}
      >
        <div className='text-center flex flex-col items-center justify-center '>
          <p className='text-brand-red mb-3'>Recept</p>
          <Link href={content.uri}>
            <a className=''>
              <h3 className='text-xl lg:text-3xl mb-5'>{content.title}</h3>
            </a>
          </Link>
          <div>
            {content.acf_recipe && (
              <div className='space-x-1 lg:space-x-2 flex flex-wrap justify-center mb-3 text-xs lg:text-base'>
                <strong>Passar till:</strong>
                {content.acf_recipe.passarTill.map((item, index) => {
                  if (index <= 3) {
                    return (
                      <span className="after:content-[','] last:after:content-['']">
                        {item.name}
                      </span>
                    );
                  }
                })}
                {content.acf_recipe.passarTill.length >= 3 && (
                  <span>m.fl.</span>
                )}
              </div>
            )}
          </div>
          <Link href={content.uri}>
            <a className='inline-block text-brand-red font-semibold'>Läs mer</a>
          </Link>
        </div>
        {content.featuredImage && (
          <Link href={content.uri}>
            <a className='relative h-56 lg:h-auto block'>
              <Image
                src={content.featuredImage.node.mediaItemUrl}
                layout='fill'
                objectFit='cover'
              />
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};
