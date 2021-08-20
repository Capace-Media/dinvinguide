import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
export default function ReadMorePosts({ posts }) {
  console.log(posts);
  return (
    <div className='contain row text-center'>
      {posts && (
        <Fragment>
          <h2 className='text-brand-red mb-10'>Läs mer</h2>
          <div className='grid lg:grid-cols-3  gap-5'>
            {posts.map((post) => {
              return (
                <Link href={post.uri ? post.uri : ''}>
                  <a className='group bg-black relative h-56 lg:h-96 block overflow-hidden'>
                    <div className='relative h-56 lg:h-96 opacity-70 transform group-hover:scale-110 transition-all'>
                      {post.featuredImage && (
                        <Image
                          src={post.featuredImage.node.mediaItemUrl}
                          layout='fill'
                          objectFit='cover'
                        />
                      )}
                    </div>
                    <div className='absolute top-0 left-0 text-white text-left z-20  w-full p-5'>
                      <div className='border-l-4 border-brand-bronze px-2'>
                        <h3>{post.title}</h3>
                        <p className='mt-1'>{post?.author?.node.name}</p>
                      </div>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        </Fragment>
      )}
    </div>
  );
}
