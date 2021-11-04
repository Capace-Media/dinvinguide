import BreadCrumbs from '../common/BreadCrumbs/Breadcrumbs';
import Image from 'next/dist/client/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import Text from '../acf/Text';
const GrapePageTemplate = ({ data }) => {
  const { page } = data;
  return (
    <>
      <NextSeo title={page.seo.title} description={page.seo.metaDesc} />
      <BreadCrumbs
        crumbs={[
          { text: 'Druvor', href: '/druvguiden' },
          { current: true, text: page.title, href: page.uri },
        ]}
      />

      <div className='contain-sm row'>
        {page.featuredImage && (
          <div className='w-full aspect-w-1 aspect-h-1 lg:aspect-w-16 lg:aspect-h-9'>
            <Image
              src={page.featuredImage.node.mediaItemUrl}
              layout='fill'
              objectFit='cover'
              alt={
                page.featuredImage.node.altText
                  ? page.featuredImage.node.altText
                  : page.seo.title
              }
            />
          </div>
        )}

        <div className='row '>
          <h1 className='text-center text-brand-red'>{page.title}</h1>
          <Text content={page.acf_grape} />
          <div className='text-center'>
            <Link href='/druvguiden'>
              <a className='underline '>Till alla druvor</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default GrapePageTemplate;
