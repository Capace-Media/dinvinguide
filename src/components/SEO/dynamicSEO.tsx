import { MetaInfo } from "../../../types/MetaInfoTypes";
import { SEO } from "../../../types/page";

interface DynamicSeoProps {
  seo: SEO;
  previousMeta?: MetaInfo;
  author?: any;
  uri?: string;
  img?: any;
}

export const dynamicSeo = async ({
  seo,
  previousMeta,
  author,
  uri,
  img,
}: DynamicSeoProps) => {
  const data = {
    title: seo?.title,
    description: seo?.metaDesc,
    alternates: {
      canonical: uri,
    },
    authors: author
      ? [
          {
            name: author?.title,
            url: author?.slug,
          },
        ]
      : undefined,
    openGraph: {
      title: seo?.opengraphTitle || seo?.title,
      description: seo?.opengraphDescription || seo?.metaDesc || undefined,
      url: uri,
      siteName: seo?.opengraphSiteName,

      images: [
        {
          url: img?.url || seo?.opengraphImage?.mediaItemUrl || undefined,
          width: 800,
          height: 600,
          alt: img?.alt || seo?.opengraphImage?.altText || undefined,
        },
        {
          url: img?.url || seo?.opengraphImage?.mediaItemUrl || undefined,
          width: 1800,
          height: 1600,
          alt: img?.alt || seo?.opengraphImage?.altText || undefined,
        },
      ],
      locale: "sv_SE",
      type: "website",
    },
  };

  return data;
};
