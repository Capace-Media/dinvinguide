import { cache } from "react";
import { frontPageSchema } from "../schemas/front-page";
import type { FrontPage } from "../schemas/front-page";
import WP from "../wp";
import { IMAGE_CONTENT } from "./globals";
import { POSTS_CONTENT } from "./posts";

const DRINKTIP_CONTENT = `
  id
  title
  slug
  featuredImage {
    node {
      ${IMAGE_CONTENT}
    }
  }
  acf_dryckestips {
    betyget
    dryckestyper
    forpackningar
  }
`;

const RECIPE_CONTENT = `
  id
  title
  slug
  featuredImage {
    node {
      ${IMAGE_CONTENT}
    }
  }
  acf_recipe {
    recepieCategories {
      name
      slug
    }
    skrivetAv {
      name
    }
  }
`;

const FRONT_PAGE = `
query GET_FRONT_PAGE {
  page(id: "/", idType: URI) {
    content
    seo {
      title
      metaDesc
    }
    featuredImage {
      node {
        ${IMAGE_CONTENT}
      }
    }
    GQL_frontPageFields {
      highlightedArticles {
        ... on Post {
          ${POSTS_CONTENT}
        }
      }
      highlightedDryckestips {
        ... on Drinktip {
          ${DRINKTIP_CONTENT}
        }
      }
      highlightedRecept {
        ... on Recipe {
          ${RECIPE_CONTENT}
        }
      }
    }
  }
  recipePage: page(id: "recept", idType: URI) {
    page_content {
      intro
    }
  }
  posts(first: 8, where: { authorNotIn: [50] }) {
    nodes {
      ${POSTS_CONTENT}
    }
  }
  drinktips(first: 4) {
    nodes {
      ${DRINKTIP_CONTENT}
    }
  }
  recipes(first: 7) {
    nodes {
      ${RECIPE_CONTENT}
    }
  }
}
`;

// Cached per request so `generateMetadata` and the page share one fetch.
export const getFrontPage = cache(async (): Promise<FrontPage | null> => {
  const res: unknown = await WP(FRONT_PAGE, "");
  const data =
    typeof res === "object" && res !== null && "data" in res
      ? res.data
      : undefined;

  const parsed = frontPageSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Invalid front page response:", parsed.error.issues);
    return null;
  }

  return parsed.data;
});
