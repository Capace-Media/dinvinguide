import { NextSeo } from 'next-seo';

const SEO = ({ title, description, image }) => {
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title: title + 'DinVinguide',
        description: description,
        images: [
          {
            width: image?.mediaDetails?.width,
            height: image?.mediaDetails?.height,
            url: image?.mediaItemUrl,
            alt: image?.altText ? image.altText : title,
          },
        ],
      }}
    />
  );
};
export default SEO;
