import Image from 'next/image';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import { getAuthors } from '../lib/api/authors';
export default function SkribenterPage({ data }) {
  const { authors } = data;
  console.log(authors);
  return (
    <div className='contain'>
      <h1 className='row text-center text-brand-red'>Redaktionen</h1>
      <div className='row space-y-10'>
        {authors.map((author) => {
          return (
            <div className='grid lg:grid-cols-[1fr,3fr] gap-10 lg:gap-20'>
              <div>
                <div className='relative aspect-w-1 aspect-h-1 rounded-full overflow-hidden'>
                  <Image
                    src={author.acf_user.bild.mediaItemUrl}
                    layout='fill'
                    objectFit='cover'
                  />
                </div>
              </div>
              <div>
                <h2 className='mb-5'>{author.name}</h2>
                <p style={{ whiteSpace: 'break-spaces' }}>
                  {ReactHtmlParser(author.description)}
                </p>
                <Link href={'/' + author.slug}>
                  <a className='px-8 py-3 rounded mt-5 inline-block bg-brand-red text-brand-bg uppercase'>
                    Se artiklar
                  </a>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const authors = await getAuthors();

  return {
    props: {
      data: {
        authors,
      },
    },
  };
};
