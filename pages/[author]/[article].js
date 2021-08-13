import { getArticle, getArticlePaths } from '../../lib/api/articles';

import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PossibleFragmentSpreadsRule } from 'graphql';
import { renderSection } from '../../utils/acf';

export default function Article({ data }) {
  const { article } = data;
  console.log(article);

  return (
    <article>
      <div className='row max-w-7xl mx-auto w-[85%]'>
        <div className='relative h-[200px] lg:h-[600px]'>
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
          <p className='mt-10'>{article.acf_posts.ingress}</p>
        </div>
      </div>
      <div>
        {article.acf_posts.sektioner.map((section) => {
          return renderSection(section);
        })}
      </div>
    </article>
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
