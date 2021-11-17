import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
const SEO = ({ title, description, image }) => {
  const router = useRouter();
  console.log(router);
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={
        router.asPath !== '/'
          ? `https://dinvinguide.se${router.asPath}`
          : 'https://dinvinguide.se'
      }
      openGraph={{
        title: title,
        description: description,
        url:
          router.asPath !== '/'
            ? `https://dinvinguide.se${router.asPath}`
            : 'https://dinvinguide.se',
        images: [
          {
            width: image?.mediaDetails?.width,
            height: image?.mediaDetails?.height,
            url: image?.mediaItemUrl || '/images/dinvinguide-image.png',
            alt: image?.altText ? image.altText : title,
          },
        ],
      }}
    />
  );
};
export default SEO;
