import Ad from '../ads/Ad';
import BreadCrumbs from '../common/BreadCrumbs/Breadcrumbs';
import Image from 'next/image';
import Link from 'next/link';
import List from '../common/lists/List';
import { useState } from 'react';

const AuthorPageTemplate = ({ data }) => {
  const incrementNum = 24;
  const [isReadMore, setIsReadMore] = useState(false);
  const [maxCount, setMaxCount] = useState(25);
  const { ads, author, posts } = data;
  const postArray = posts.map(({ node: post }) => post);
  return (
    <>
      <BreadCrumbs
        crumbs={[
          { text: 'Skribenter', href: '/skribenter' },
          { text: author.name, href: '/' + author.slug, current: true },
        ]}
      />
      <div className='text-center contain section'>
        <div className='relative mx-auto overflow-hidden rounded-full w-52 h-52 row'>
          <Image
            src={author.acf_user.bild.mediaItemUrl}
            layout='fill'
            objectFit='cover'
            priority
          />
        </div>
        <h1 className='row'>{author.name}</h1>
        <p
          style={{ whiteSpace: 'break-spaces' }}
          className={`max-w-prose prose mx-auto ${
            isReadMore ? 'line-clamp-none' : 'line-clamp-3'
          }`}
        >
          {author.description}
        </p>
        <button
          onClick={() => setIsReadMore(!isReadMore)}
          className='font-semibold row text-brand-red'
        >
          {isReadMore ? 'Läs mindre' : 'Läs mer'}
        </button>
        <div className='flex justify-center'>
          <div className='flex space-x-5'>
            {author.acf_user.facebook && (
              <a href={author.acf_user.facebook} target='_blank'>
                <svg
                  width='100%'
                  height='100%'
                  viewBox='0 0 1024 1018'
                  version='1.1'
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6 fill-current text-brand-red'
                >
                  <path d='M1024,512c0,-282.77 -229.23,-512 -512,-512c-282.77,0 -512,229.23 -512,512c0,255.554 187.231,467.37 432,505.78l0,-357.78l-130,0l0,-148l130,0l0,-112.8c0,-128.32 76.438,-199.2 193.39,-199.2c56.017,0 114.61,10 114.61,10l0,126l-64.562,0c-63.603,0 -83.438,39.467 -83.438,79.957l0,96.043l142,0l-22.7,148l-119.3,0l0,357.78c244.769,-38.41 432,-250.226 432,-505.78Z' />
                </svg>
              </a>
            )}
            {author.acf_user.instagram && (
              <a href={author.acf_user.instagram} target='_blank'>
                <svg
                  width='100%'
                  height='100%'
                  viewBox='0 0 504 504'
                  version='1.1'
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6 fill-current text-brand-red'
                >
                  <g>
                    <path d='M251.921,0c-68.418,0 -76.997,0.29 -103.867,1.516c-26.814,1.224 -45.127,5.482 -61.152,11.71c-16.566,6.438 -30.615,15.052 -44.62,29.057c-14.005,14.005 -22.619,28.054 -29.057,44.62c-6.228,16.024 -10.486,34.337 -11.71,61.151c-1.226,26.87 -1.515,35.449 -1.515,103.867c0,68.417 0.289,76.996 1.515,103.866c1.224,26.814 5.482,45.127 11.71,61.151c6.438,16.566 15.052,30.615 29.057,44.621c14.005,14.005 28.054,22.619 44.62,29.057c16.025,6.227 34.338,10.486 61.152,11.709c26.87,1.226 35.449,1.516 103.867,1.516c68.417,0 76.996,-0.29 103.866,-1.516c26.814,-1.223 45.127,-5.482 61.151,-11.709c16.566,-6.438 30.615,-15.052 44.621,-29.057c14.005,-14.006 22.619,-28.055 29.057,-44.621c6.227,-16.024 10.486,-34.337 11.709,-61.151c1.226,-26.87 1.516,-35.449 1.516,-103.866c0,-68.418 -0.29,-76.997 -1.516,-103.867c-1.223,-26.814 -5.482,-45.127 -11.709,-61.151c-6.438,-16.566 -15.052,-30.615 -29.057,-44.62c-14.006,-14.005 -28.055,-22.619 -44.621,-29.057c-16.024,-6.228 -34.337,-10.486 -61.151,-11.71c-26.87,-1.226 -35.449,-1.516 -103.866,-1.516Zm0,45.392c67.265,-0 75.233,0.256 101.797,1.468c24.562,1.121 37.901,5.225 46.778,8.674c11.759,4.57 20.151,10.03 28.966,18.845c8.816,8.815 14.275,17.208 18.845,28.966c3.45,8.877 7.554,22.216 8.674,46.778c1.212,26.564 1.469,34.532 1.469,101.798c0,67.265 -0.257,75.233 -1.469,101.797c-1.12,24.562 -5.224,37.901 -8.674,46.778c-4.57,11.759 -10.029,20.151 -18.845,28.966c-8.815,8.816 -17.207,14.275 -28.966,18.845c-8.877,3.45 -22.216,7.554 -46.778,8.674c-26.56,1.212 -34.527,1.469 -101.797,1.469c-67.271,0 -75.237,-0.257 -101.798,-1.469c-24.562,-1.12 -37.901,-5.224 -46.778,-8.674c-11.759,-4.57 -20.151,-10.029 -28.967,-18.845c-8.815,-8.815 -14.275,-17.207 -18.844,-28.966c-3.45,-8.877 -7.554,-22.216 -8.675,-46.778c-1.212,-26.564 -1.468,-34.532 -1.468,-101.797c-0,-67.266 0.256,-75.234 1.468,-101.798c1.121,-24.562 5.225,-37.901 8.675,-46.778c4.569,-11.758 10.029,-20.151 18.844,-28.966c8.816,-8.815 17.208,-14.275 28.967,-18.845c8.877,-3.449 22.216,-7.553 46.778,-8.674c26.564,-1.212 34.532,-1.468 101.798,-1.468Z' />
                    <path d='M251.921,335.894c-46.378,-0 -83.974,-37.596 -83.974,-83.973c0,-46.378 37.596,-83.974 83.974,-83.974c46.377,-0 83.973,37.596 83.973,83.974c0,46.377 -37.596,83.973 -83.973,83.973Zm0,-213.338c-71.447,-0 -129.365,57.918 -129.365,129.365c-0,71.446 57.918,129.364 129.365,129.364c71.446,0 129.364,-57.918 129.364,-129.364c0,-71.447 -57.918,-129.365 -129.364,-129.365Z' />
                    <path d='M416.627,117.445c0,16.696 -13.535,30.23 -30.231,30.23c-16.695,0 -30.23,-13.534 -30.23,-30.23c-0,-16.696 13.535,-30.23 30.23,-30.23c16.696,-0 30.231,13.534 30.231,30.23Z' />
                  </g>
                </svg>
              </a>
            )}
            {author.acf_user.twitter && (
              <a href={author.acf_user.twitter} target='_blank'>
                <svg
                  width='100%'
                  height='100%'
                  viewBox='0 0 247 201'
                  version='1.1'
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6 fill-current text-brand-red'
                >
                  <path
                    id='white_background'
                    d='M220.95,49.793c0.15,2.17 0.15,4.34 0.15,6.53c-0,66.73 -50.8,143.69 -143.69,143.69l-0,-0.04c-27.44,0.04 -54.31,-7.82 -77.41,-22.64c3.99,0.48 8,0.72 12.02,0.73c22.74,0.02 44.83,-7.61 62.72,-21.66c-21.61,-0.41 -40.56,-14.5 -47.18,-35.07c7.57,1.46 15.37,1.16 22.8,-0.87c-23.56,-4.76 -40.51,-25.46 -40.51,-49.5l-0,-0.64c7.02,3.91 14.88,6.08 22.92,6.32c-22.19,-14.83 -29.03,-44.35 -15.63,-67.43c25.64,31.55 63.47,50.73 104.08,52.76c-4.07,-17.54 1.49,-35.92 14.61,-48.25c20.34,-19.12 52.33,-18.14 71.45,2.19c11.31,-2.23 22.15,-6.38 32.07,-12.26c-3.77,11.69 -11.66,21.62 -22.2,27.93c10.01,-1.18 19.79,-3.86 29,-7.95c-6.78,10.16 -15.32,19.01 -25.2,26.16Z'
                  />
                </svg>
              </a>
            )}
            {author.acf_user.email && (
              <a href={'mailto:' + author.acf_user.email} target='_blank'>
                <svg
                  width='100%'
                  height='100%'
                  viewBox='0 0 20 16'
                  version='1.1'
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6 fill-current text-brand-red'
                >
                  <path d='M18,0l-16,0c-1.1,0 -1.99,0.9 -1.99,2l-0.01,12c-0,1.1 0.9,2 2,2l16,0c1.1,0 2,-0.9 2,-2l0,-12c0,-1.1 -0.9,-2 -2,-2Zm0,4l-8,5l-8,-5l0,-2l8,5l8,-5l0,2Z' />
                </svg>
              </a>
            )}
          </div>
        </div>
        <div className='row'>
          <Ad ads={ads} position='top' />
        </div>
        <div className='row'>
          <h2>
            {`${author.firstName}${
              author.firstName.substring(
                author.firstName.length - 1,
                author.firstName.length
              ) === 's'
                ? ''
                : 's'
            }`}{' '}
            artiklar
          </h2>
        </div>
        <div className='contain'>
          {posts.map(({ node: post }, index) => {
            console.log(post);
            if (index === 0) {
              return (
                <Link href={post.uri}>
                  <a className='relative block w-full overflow-hidden bg-black group aspect-w-1 aspect-h-1 lg:aspect-w-16 lg:aspect-h-9 '>
                    <Image
                      src={
                        post.featuredImage
                          ? post.featuredImage.node.mediaItemUrl
                          : '/images/recipe-placeholder'
                      }
                      layout='fill'
                      objectFit='cover'
                      className='transition-all transform group-hover:scale-110 opacity-70'
                    />
                    <div className='absolute top-0 left-0 p-5 m-2 text-left'>
                      <div className='px-2 border-l-4 lg:px-5 border-brand-bronze'>
                        <h4 className='text-white uppercase lg:text-3xl'>
                          {post.title}
                        </h4>
                        <p className='text-white'>{author.name}</p>
                      </div>
                    </div>
                  </a>
                </Link>
              );
            }
          })}
        </div>
        <div className='mt-10 text-left'>
          <List
            array={postArray}
            ads={ads}
            columns={3}
            subtitle='author.node.name'
          />
        </div>
      </div>
    </>
  );
};

export default AuthorPageTemplate;
{
}
