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
    case 'Drink':
      return <DrinkPuff content={data} />;
      break;
    default:
      return <div>Hello</div>;
      break;
  }
}

const GrapePuff = ({ content }) => {
  return (
    <div className='row'>
      <div
        className={`grid  bg-white/50 max-w-5xl mx-auto w-[85%] gap-5 lg:gap-10 ${
          content.featuredImage ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
        }`}
      >
        <div className='flex flex-col items-center justify-center p-5 text-center lg:p-10'>
          <p className='mb-3 text-brand-red'>Druva</p>
          <Link href={content.uri}>
            <a className=''>
              <h3 className='mb-5 text-xl lg:text-3xl'>{content.title}</h3>
            </a>
          </Link>
          <Link href={content.uri}>
            <a className='inline-block '>Läs mer</a>
          </Link>
        </div>
        {content.featuredImage && (
          <Link href={content.uri}>
            <a className='relative block h-56 lg:min-h-[300px] lg:h-auto'>
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

const RecipePuff = ({ content }) => {
  return (
    <div className='row'>
      <div
        className={`grid  bg-white/50 max-w-5xl mx-auto w-[85%] gap-10 ${
          content.featuredImage ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
        }`}
      >
        <div className='flex flex-col items-center justify-center p-5 text-center lg:p-10 '>
          <p className='mb-3 text-brand-red'>Recept</p>
          <Link href={content.uri}>
            <a className=''>
              <h3 className='mb-5 text-xl lg:text-3xl'>{content.title}</h3>
            </a>
          </Link>
          <div>
            {content && (
              <div className='flex flex-wrap justify-center mb-3 space-x-1 text-xs lg:space-x-2 lg:text-base'>
                <strong>Passar till:</strong>
                {content.passarTills.edges.map(({ node: item }, index) => {
                  if (index <= 3) {
                    return (
                      <span className="after:content-[','] last:after:content-['']">
                        {item.name}
                      </span>
                    );
                  }
                })}
                {content.passarTills.edges.length >= 3 && <span>m.fl.</span>}
              </div>
            )}
          </div>
          <Link href={content.uri}>
            <a className='inline-block font-semibold text-brand-red'>Läs mer</a>
          </Link>
        </div>
        {content.featuredImage && (
          <Link href={content.uri}>
            <a className='relative block h-56 lg:h-[350px]'>
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

const DrinkPuff = ({ content }) => {
  return (
    <div className='row'>
      <div
        className={`grid bg-white/50 max-w-5xl mx-auto w-[85%] gap-5 lg:gap-10 ${
          content.featuredImage ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
        }`}
      >
        <div className='flex flex-col items-center justify-center text-center lg:p-10'>
          <p className='mb-3 text-brand-red'>
            {content.drinkTypes.edges.length > 0
              ? content.drinkTypes.edges[0].node.name
              : 'Dryck'}
          </p>
          <Link href={content.uri}>
            <a className=''>
              <h3 className='mb-5 text-xl lg:text-3xl'>{content.title}</h3>
            </a>
          </Link>
          <Link href={content.uri}>
            <a className='inline-block '>Läs mer</a>
          </Link>
        </div>
        {content.featuredImage && (
          <Link href={content.uri}>
            <a className='relative block h-56 lg:h-56'>
              <Image
                src={content.featuredImage.node.mediaItemUrl}
                layout='fill'
                objectFit='contain'
              />
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};
