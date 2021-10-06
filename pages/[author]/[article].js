import {
  ARTICLE_SINGLE,
  ARTICLE_SINGLE_PREVIEW,
} from '../../lib/fragments/articles';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import { getArticle, getArticlePaths } from '../../lib/api/articles';

import BreadCrumbs from '../../components/common/BreadCrumbs/Breadcrumbs';
import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import List from '../../components/common/lists/List';
import ReactHtmlParser from 'react-html-parser';
import ReadMorePosts from '../../components/article/ReadMorePosts';
import { renderSection } from '../../utils/acf';
import wpFetch from '../../lib/wpFetch';

export default function Article({ article }) {
  console.log(article);
  return (
    <Fragment>
      <NextSeo title={article.title} />
      <article>
        <BreadCrumbs
          crumbs={[
            { text: 'Skribenter', href: '/skribenter' },
            {
              text: article.author.node.name,
              href: '/' + article.author.node.nicename,
            },
            { current: true, text: article.title, href: article.uri },
          ]}
        />
        <div className='grid row contain-sm'>
          {article.featuredImage && (
            <div className='relative aspect-w-1 aspect-h-1 lg:aspect-w-16 lg:aspect-h-9'>
              <Image
                src={article.featuredImage.node.mediaItemUrl}
                layout='fill'
                objectFit='cover'
                priority
              />
            </div>
          )}
        </div>
        <div className='max-w-4xl mx-auto w-[85%]'>
          <div className='text-center'>
            <Link href={`/${article.author.node.nicename}`}>
              <a className='inline-block mb-3 '>
                Skriven av{' '}
                <span className='underline'>{article.author.node.name}</span>
              </a>
            </Link>
            <h1 className='text-brand-red'>{article.title}</h1>
            <p className='mt-10 mb-20 text-lg'>{article.acf_posts.ingress}</p>
          </div>
        </div>

        <div>
          {article.acf_posts.sektioner &&
          article.acf_posts.sektioner.length > 0 ? (
            article.acf_posts.sektioner.map((section) => renderSection(section))
          ) : (
            <div className='contain-sm rich-text'>
              {ReactHtmlParser(article.content)}
            </div>
          )}
        </div>
      </article>
      <div className='row max-w-4xl mx-auto w-[85%] text-center flex flex-col items-center lg:text-left lg:grid lg:grid-cols-[100px,1fr] gap-10 mt-5 lg:mt-10'>
        <div className='relative w-24 h-24 mb-10 overflow-hidden rounded-full lg:mb-0'>
          {article?.author?.node?.acf_user?.bild?.mediaItemUrl && (
            <Image
              src={article.author.node.acf_user.bild.mediaItemUrl}
              layout='fill'
              objectFit='cover'
            />
          )}
        </div>

        <div className=''>
          <h3 className='mb-3 text-xl text-brand-red lg:text-3xl'>
            {article.author.node.name}
          </h3>
          <p className='text-base'>
            {article.author.node.acf_user.kortBeskrivning}
          </p>
          <Link href={`/${article.author.node.nicename}`}>
            <a className='inline-block mt-4 text-brand-red'>
              Läs mer om {article.author.node.firstName}
            </a>
          </Link>
        </div>
      </div>

      <List
        array={article.acf_posts.lasMer}
        search={false}
        heading='Läs mer'
        columns={3}
        subtitle='author.node.name'
      />
    </Fragment>
  );
}
export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
export const getStaticProps = async (context) => {
  if (context.preview) {
    const data = await wpFetch(ARTICLE_SINGLE_PREVIEW, {
      id: context.params.article,
    });
    if (!data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        article: data.post.preview.node,
      },
    };
  } else {
    const data = await wpFetch(ARTICLE_SINGLE, {
      id: context.params.article,
    });
    if (!data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        article: data.post,
      },
    };
  }
};
