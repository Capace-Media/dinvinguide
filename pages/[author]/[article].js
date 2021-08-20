import { getArticle, getArticlePaths } from '../../lib/api/articles';

import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReadMorePosts from '../../components/article/ReadMorePosts';
import { renderSection } from '../../utils/acf';

export default function Article({ data }) {
  const { article } = data;

  return (
    <Fragment>
      <article>
        <div className='row max-w-7xl mx-auto w-[85%] grid'>
          <div className='relative aspect-w-1 aspect-h-1 lg:aspect-w-16 lg:aspect-h-9'>
            <Image
              src={article.featuredImage.node.mediaItemUrl}
              layout='fill'
              objectFit='cover'
            />
          </div>
        </div>
        <div className='max-w-4xl mx-auto w-[85%]'>
          <div className='text-center'>
            <Link href={`/${article.author.node.nicename}`}>
              <a className='mb-3 inline-block '>
                Skriven av{' '}
                <span className='underline'>{article.author.node.name}</span>
              </a>
            </Link>
            <h1 className='text-brand-red'>{article.title}</h1>
            <p className='mt-10 text-lg mb-20'>{article.acf_posts.ingress}</p>
          </div>
        </div>
        <div>
          {article.acf_posts.sektioner.map((section) => renderSection(section))}
        </div>
      </article>
      <div className='row max-w-4xl mx-auto w-[85%] text-center flex flex-col items-center lg:text-left lg:grid lg:grid-cols-[100px,1fr] gap-10 mt-5 lg:mt-10'>
        <div className='relative rounded-full overflow-hidden w-24 h-24 mb-10 lg:mb-0'>
          <Image
            src={article.author.node.acf_user.bild.mediaItemUrl}
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div className=''>
          <h3 className='text-brand-red text-xl lg:text-3xl mb-3'>
            {article.author.node.name}
          </h3>
          <p className='text-base'>
            {article.author.node.acf_user.kortBeskrivning}
          </p>
          <Link href={`/${article.author.node.nicename}`}>
            <a className='text-brand-red mt-4 inline-block'>
              Läs mer om {article.author.node.firstName}
            </a>
          </Link>
        </div>
      </div>

      <ReadMorePosts posts={article.acf_posts.lasMer} />
    </Fragment>
  );
}
export const getStaticPaths = async (props) => {
  const paths = await getArticlePaths();

  return {
    paths,
    fallback: 'blocking',
  };
};
export const getStaticProps = async ({ params }) => {
  const article = await getArticle(params.article);
  return {
    props: {
      data: { article },
    },
  };
};
