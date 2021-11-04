import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
export default function ReadMorePosts({ posts }) {
  console.log(posts);
  return (
    <div className='text-center contain row'>
      {posts && (
        <Fragment>
          <h2 className='mb-10 text-brand-red'>Läs mer</h2>
          <div className='grid gap-5 lg:grid-cols-3'>
            {posts.map((post) => {
              return (
                <Link key={post.title} href={post.uri ? post.uri : ''}>
                  <a className='relative block h-56 overflow-hidden bg-black group lg:h-96'>
                    <div className='relative h-56 transition-all transform lg:h-96 opacity-70 group-hover:scale-110'>
                      {post.featuredImage && (
                        <Image
                          src={post.featuredImage.node.mediaItemUrl}
                          layout='fill'
                          objectFit='cover'
                          alt={
                            post.featuredImage.node.altText
                              ? post.featuredImage.node.altText
                              : post.tile
                          }
                        />
                      )}
                    </div>
                    <div className='absolute top-0 left-0 z-20 w-full p-5 text-left text-white'>
                      <div className='px-2 border-l-4 border-brand-bronze'>
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
