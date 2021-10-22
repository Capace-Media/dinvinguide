import Blocks from '../common/content/Blocks';
import BreadCrumbs from '../common/BreadCrumbs/Breadcrumbs';
import Image from 'next/dist/client/image';
import Link from 'next/dist/client/link';
import List from '../common/lists/List';
import { NextSeo } from 'next-seo';
import OldContent from '../common/content/OldContent';
import parse from 'html-react-parser';
const PostPageTemplate = ({ data }) => {
  const { page, ads } = data;
  return (
    <>
      <NextSeo title={page.title} />
      <article>
        <BreadCrumbs
          crumbs={[
            { text: 'Skribenter', href: '/skribenter' },
            {
              text: page.author.node.name,
              href: '/' + page.author.node.nicename,
            },
            { current: true, text: page.title, href: page.uri },
          ]}
        />
        <div className='grid row contain-sm'>
          {page.featuredImage && (
            <div className='relative aspect-w-1 aspect-h-1 lg:aspect-w-16 lg:aspect-h-9'>
              <Image
                src={page.featuredImage.node.mediaItemUrl}
                layout='fill'
                objectFit='cover'
                priority
              />
            </div>
          )}
        </div>
        <div className='max-w-4xl mx-auto w-[85%]'>
          <div className='text-center'>
            <Link href={`/${page.author.node.nicename}`}>
              <a className='inline-block mb-3 '>
                Skriven av{' '}
                <span className='underline'>{page.author.node.name}</span>
              </a>
            </Link>
            <h1 className='text-brand-red'>{page.title}</h1>
            <p className='mx-auto mt-10 mb-20 prose lg:prose-xl'>
              {parse(page.acf_posts.ingress)}
            </p>
          </div>
        </div>

        <div>
          {page.acf_posts.sektioner && page.acf_posts.sektioner.length > 0 && (
            <Blocks ads={ads} blocks={page.acf_posts.sektioner} />
          )}
          {page.content && (
            <div className='contain-sm rich-text'>
              {ReactHtmlParser(page.content)}
            </div>
          )}
          {page.acf_oldcontent && page.acf_oldcontent.oldContentAcf && (
            <OldContent content={page.acf_oldcontent.oldContentAcf} />
          )}
        </div>
      </article>
      <div className='row max-w-4xl mx-auto w-[85%] text-center flex flex-col items-center lg:text-left lg:grid lg:grid-cols-[100px,1fr] gap-10 mt-5 lg:mt-10'>
        <div className='relative w-24 h-24 mb-10 overflow-hidden rounded-full lg:mb-0'>
          {page?.author?.node?.acf_user?.bild?.mediaItemUrl && (
            <Image
              src={page.author.node.acf_user.bild.mediaItemUrl}
              layout='fill'
              objectFit='cover'
            />
          )}
        </div>

        <div className=''>
          <h3 className='mb-3 text-xl text-brand-red lg:text-3xl'>
            {page.author.node.name}
          </h3>
          <p className='text-base'>
            {page.author.node.acf_user.kortBeskrivning}
          </p>
          <Link href={`/${page.author.node.nicename}`}>
            <a className='inline-block mt-4 text-brand-red'>
              Läs mer om {page.author.node.firstName}
            </a>
          </Link>
        </div>
      </div>
      {page.acf_posts.lasMer && (
        <List
          array={page.acf_posts.lasMer}
          search={false}
          heading='Läs mer'
          columns={3}
          subtitle='author.node.name'
        />
      )}
    </>
  );
};

export default PostPageTemplate;
