import { cache } from "react";
import WP from "../wp";

// Taxonomy SEO has no `readingTime`, so this can't reuse the shared SEO fragment.
const TAXONOMY_SEO = `seo {
  breadcrumbs {
    text
    url
  }
  canonical
  cornerstone
  focuskw
  metaDesc
  metaKeywords
  metaRobotsNofollow
  metaRobotsNoindex
  opengraphAuthor
  opengraphDescription
  opengraphImage {
    altText
    mediaItemUrl
  }
  opengraphModifiedTime
  opengraphPublishedTime
  opengraphPublisher
  opengraphSiteName
  opengraphTitle
  opengraphType
  opengraphUrl
  title
  twitterDescription
  twitterImage {
    altText
    mediaItemUrl
  }
  twitterTitle
}`;

// `uri` is the category's WordPress URI, e.g. `/receptkategorier/maltider/frukost`.
// Shared by the category page and its generateMetadata, so one request per render.
export const getRecipeCategory = cache(async (uri: string) => {
  try {
    const res = await WP(
      `query getRecipeCategory($id: ID!) {
        recipeCategory(id: $id, idType: URI) {
          name
          slug
          ${TAXONOMY_SEO}
        }
      }`,
      null,
      { id: uri }
    );

    return res?.data?.recipeCategory ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
});
