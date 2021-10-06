import { ARTICLES } from '../../../lib/fragments/articles';
import Ad from '../../../components/ads/Ad';
import Image from 'next/image';
import Link from 'next/link';
import List from '../../../components/common/lists/List';
import MoreArticles from '../../../components/article/MoreArticles/MoreArticles';
import { PAGE_SINGLE } from '../../../lib/fragments/pages';
import ReactHtmlParser from 'react-html-parser';
import ReadMorePosts from '../../../components/article/ReadMorePosts';
import { getAds } from '../../../lib/api/ads';
import { renderSection } from '../../../utils/acf';
import wpFetch from '../../../lib/wpFetch';

const SingleAtlasPage = ({ page, ads, articles }) => {
  return (
    <>
      <div className='text-center contain-sm row'>
        {page.featuredImage && (
          <figure className='relative aspect-w-16 aspect-h-9'>
            <Image
              src={page.featuredImage.node.mediaItemUrl}
              layout='fill'
              objectFit='cover'
            />
          </figure>
        )}
        <p className='pt-10'>
          Skriven av{' '}
          <Link href={`/${page.author.node.nicename}`}>
            <a className='underline'>Magnus Reuterdahl</a>
          </Link>
        </p>
        <h1 className='mt-5 mb-5 text-brand-red'>{page.title}</h1>
        {ReactHtmlParser(page.acf_posts.ingress)}
      </div>

      <Ad ads={ads} position='top' />
      <div className='contain-sm row'>
        {page.acf_posts.sektioner &&
          page.acf_posts.sektioner.map((section) => renderSection(section))}
        {page.content && (
          <div className='rich-text'>{ReactHtmlParser(page.content)}</div>
        )}
      </div>

      <ReadMorePosts posts={page.acf_posts.lasMer} />

      <List
        array={articles}
        subtitle='author.node.nicename'
        search={false}
        columns={3}
        heading='Läs mer'
      />
    </>
  );
};

export default SingleAtlasPage;

export const getStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [],
  };
};
export const getStaticProps = async (context) => {
  const resolved = await Promise.all([
    wpFetch(PAGE_SINGLE, {
      id: 'vinguide/vinatlas/' + context.params.slug.join('/'),
    }),
    getAds(),
    wpFetch(ARTICLES, { type: 'posts', limit: 6 }),
  ]);
  const articles = resolved[2].map(({ node: article }) => article);
  if (!resolved[0]) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      page: resolved[0].page,
      ads: resolved[1],
      articles: articles,
    },
  };
};
