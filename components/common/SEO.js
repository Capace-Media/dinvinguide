import { NextSeo } from 'next-seo';

const SEO = ({ title, description, image }) => {
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title: title,
        description: description,
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
