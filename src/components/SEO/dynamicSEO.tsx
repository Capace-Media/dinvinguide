import { MetaInfo } from "../../../types/MetaInfoTypes";
import { SEO } from "../../../types/page";

interface DynamicSeoProps {
  seo: SEO;
  previousMeta: MetaInfo;
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
    title: seo?.title || previousMeta.title,
    description: seo?.metaDesc || previousMeta.description,
    alternates: {
      canonical: uri,
    },
    keywords: seo?.metaKeywords ? [seo.metaKeywords] : previousMeta.keywords,
    authors: author
      ? [
          {
            name: author?.title,
            url: author?.slug,
          },
        ]
      : previousMeta?.authors,
    openGraph: {
      title: seo?.opengraphTitle || seo?.title || previousMeta.title,
      description:
        seo?.opengraphDescription ||
        seo?.metaDesc ||
        previousMeta.openGraph.description,
      url: uri,
      siteName: seo?.opengraphSiteName || previousMeta.openGraph.siteName,

      images: [
        {
          url:
            img?.url ||
            seo?.opengraphImage?.mediaItemUrl ||
            previousMeta?.openGraph?.images[0]?.url,
          width: 800,
          height: 600,
          alt:
            img?.alt ||
            seo?.opengraphImage?.altText ||
            previousMeta?.openGraph?.images[0]?.alt,
        },
        {
          url:
            img?.url ||
            seo?.opengraphImage?.mediaItemUrl ||
            previousMeta?.openGraph?.images[1]?.url,
          width: 1800,
          height: 1600,
          alt:
            img?.alt ||
            seo?.opengraphImage?.altText ||
            previousMeta?.openGraph?.images[1]?.alt,
        },
      ],
      locale: "sv_SE",
      type: "website",
    },
  };

  return data;
};
