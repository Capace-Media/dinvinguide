import Image from 'next/image';
import Link from 'next/link';
const AtlasListItem = ({ post }) => {
  return (
    <li className='relative overflow-hidden bg-black group'>
      <Link href={post.uri}>
        <a>
          <figure className='relative transition aspect-w-16 aspect-h-10 opacity-60 group-hover:scale-110'>
            {post.featuredImage && (
              <Image
                src={post.featuredImage.node.mediaItemUrl}
                layout='fill'
                objectFit='cover'
              />
            )}
          </figure>
          <div className='absolute top-0 left-0 z-30 p-5 text-white'>
            <div className='px-3 border-l-4 border-brand-bronze'>
              <h3>{post.title}</h3>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default AtlasListItem;
