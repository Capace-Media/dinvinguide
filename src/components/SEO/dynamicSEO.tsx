import type { Metadata } from "next";
import { MetaInfo } from "../../../types/MetaInfoTypes";

// The Yoast fields metadata reads. Both `SeoFields` (posts, pages) and
// `TaxonomySeoFields` (categories) satisfy it.
export interface SeoMeta {
  title?: string | null;
  metaDesc?: string | null;
  opengraphTitle?: string | null;
  opengraphDescription?: string | null;
  opengraphSiteName?: string | null;
  opengraphImage?: {
    mediaItemUrl?: string | null;
    altText?: string | null;
  } | null;
}

interface DynamicSeoProps {
  seo?: SeoMeta | null;
  previousMeta?: MetaInfo;
  author?: { title?: string | null; slug: string } | null;
  uri?: string;
  img?: { url?: string | null; alt?: string | null };
}

export const dynamicSeo = async ({
  seo,
  author,
  uri,
  img,
}: DynamicSeoProps): Promise<Metadata> => {
  const imageUrl = img?.url || seo?.opengraphImage?.mediaItemUrl || undefined;
  const imageAlt = img?.alt || seo?.opengraphImage?.altText || undefined;

  return {
    title: seo?.title,
    description: seo?.metaDesc,
    alternates: {
      canonical: uri,
    },
    authors: author
      ? [
          {
            name: author.title ?? undefined,
            url: author.slug,
          },
        ]
      : undefined,
    openGraph: {
      title: seo?.opengraphTitle || seo?.title || undefined,
      description: seo?.opengraphDescription || seo?.metaDesc || undefined,
      url: uri,
      siteName: seo?.opengraphSiteName ?? undefined,

      images: [
        {
          url: imageUrl ?? "",
          width: 800,
          height: 600,
          alt: imageAlt,
        },
        {
          url: imageUrl ?? "",
          width: 1800,
          height: 1600,
          alt: imageAlt,
        },
      ],
      locale: "sv_SE",
      type: "website",
    },
  };
};
