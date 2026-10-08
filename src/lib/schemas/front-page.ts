import { z } from "zod";

// WPGraphQL lists can contain nulls or union members we didn't select
// (`{}`), so validate each entry and drop the ones that don't match.
const listOf = <T extends z.ZodType>(itemSchema: T) =>
  z
    .array(z.unknown())
    .nullish()
    .transform((items) =>
      (items ?? []).flatMap((item) => {
        const parsed = itemSchema.safeParse(item);
        return parsed.success ? [parsed.data] : [];
      })
    );

const mediaItemSchema = z.object({
  altText: z.string().nullish(),
  mediaItemUrl: z.string(),
  mediaDetails: z
    .object({
      width: z.number().nullish(),
      height: z.number().nullish(),
    })
    .nullish(),
});

const featuredImageSchema = z.object({ node: mediaItemSchema }).nullish();

const frontPagePostSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  modifiedGmt: z.string().nullish(),
  acf_posts: z.object({ ingress: z.string().nullish() }).nullish(),
  author: z
    .object({
      node: z.object({
        name: z.string().nullish(),
        slug: z.string().nullish(),
      }),
    })
    .nullish(),
  featuredImage: featuredImageSchema,
});

const drinktipSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  featuredImage: featuredImageSchema,
  acf_dryckestips: z
    .object({
      betyget: z.number().nullish(),
      dryckestyper: z.string().nullish(),
      forpackningar: z.string().nullish(),
    })
    .nullish(),
});

const frontPageRecipeSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  featuredImage: featuredImageSchema,
  acf_recipe: z
    .object({
      recepieCategories: listOf(z.object({ name: z.string(), slug: z.string() })),
      skrivetAv: listOf(z.object({ name: z.string() })),
    })
    .nullish(),
});

export const frontPageSchema = z.object({
  page: z.object({
    content: z.string().nullish(),
    seo: z
      .object({
        title: z.string().nullish(),
        metaDesc: z.string().nullish(),
      })
      .nullish(),
    featuredImage: featuredImageSchema,
    GQL_frontPageFields: z
      .object({
        highlightedArticles: listOf(frontPagePostSchema),
        highlightedDryckestips: listOf(drinktipSchema),
        highlightedRecept: listOf(frontPageRecipeSchema),
      })
      .nullish(),
  }),
  recipePage: z
    .object({
      page_content: z.object({ intro: z.string().nullish() }).nullish(),
    })
    .nullish(),
  posts: z.object({ nodes: listOf(frontPagePostSchema) }).nullish(),
  drinktips: z.object({ nodes: listOf(drinktipSchema) }).nullish(),
  recipes: z.object({ nodes: listOf(frontPageRecipeSchema) }).nullish(),
});

export type FrontPage = Readonly<z.infer<typeof frontPageSchema>>;
export type FrontPagePost = Readonly<z.infer<typeof frontPagePostSchema>>;
export type Drinktip = Readonly<z.infer<typeof drinktipSchema>>;
export type FrontPageRecipe = Readonly<z.infer<typeof frontPageRecipeSchema>>;
