// SEO Types
export interface RecipeSEO {
  breadcrumbs: Array<{
    text: string;
    url: string;
  }>;
  canonical: string;
  cornerstone: boolean;
  focuskw: string;
  metaDesc: string;
  metaKeywords: string;
  metaRobotsNofollow: string;
  metaRobotsNoindex: string;
  opengraphAuthor: string;
  opengraphDescription: string;
  opengraphImage?: {
    altText: string;
    mediaItemUrl: string;
  };
  opengraphModifiedTime: string;
  opengraphPublishedTime: string;
  opengraphPublisher: string;
  opengraphSiteName: string;
  opengraphTitle: string;
  opengraphType: string;
  opengraphUrl: string;
  readingTime: number;
  title: string;
  twitterDescription: string;
  twitterImage?: {
    altText: string;
    mediaItemUrl: string;
  };
  twitterTitle: string;
}

// Media Types
export interface MediaDetails {
  width: number;
  height: number;
}

export interface MediaItem {
  altText: string;
  title?: string;
  id?: string;
  mediaItemUrl: string;
  mediaDetails: MediaDetails;
}

export interface FeaturedImage {
  node: MediaItem;
}

// Unit Types
export interface Unit {
  name: string;
}

// Ingredient Types
export interface Ingredient {
  antal: string;
  enhet: Unit;
  namn: string;
}

export interface RecipePart {
  rubrik: string;
  ingredienser: Ingredient[];
}

export interface RecipeStep {
  instruktion: string;
}

// Author Types
export interface Author {
  slug: string;
  name: string;
  id: string;
}

// Category Types
export interface RecipeCategory {
  id: string;
  slug: string;
  uri?: string;
  name: string;
}

export interface RecipeCategorySimple {
  slug: string;
  name: string;
}

// Chef Types
export interface Chef {
  name: string;
  slug: string;
  id: string;
}

// Drink Types
export interface DrinkType {
  name: string;
}

export interface Packaging {
  name: string;
}

export interface DrinkACF {
  dryckestyper: DrinkType[];
  forpackningar: Packaging[];
}

export interface Drink {
  id: string;
  slug: string;
  title: string;
  acf_drinks: DrinkACF;
  featuredImage: FeaturedImage;
}

// Time Types
export interface RecipeTime {
  cookingTime: string;
  prepTime: string;
}

// Gallery Types
export interface GalleryImage {
  kortBeskrivning: string;
  img: {
    altText: string;
    id: string;
    mediaItemUrl: string;
    mediaDetails: MediaDetails;
  };
}

// Nutrition Types
export interface Nutrition {
  energKcal: number;
  fett: number;
  fieldGroupName: string;
  kolhydrater: number;
  protein: number;
}

// Main ACF Recipe Types
export interface RecipeACF {
  recepieCategories: RecipeCategory[] | RecipeCategorySimple[];
  desc: string;
  processen: string;
  recipeAverageRating: number;
  recipeRatingCount: number;
  ingredienserOvrigt: string;
  antalPortioner: number;
  receptdelar: RecipePart[];
  beskrivningStegForSteg: RecipeStep[];
  skrivetAv: Author[];
  kok: Chef;
  passandeDrycker: Drink[];
  time: RecipeTime;
  bilder: GalleryImage[];
  nutritions: Nutrition;
}

// Main Recipe Type
export interface Recipe {
  title?: string;
  modifiedGmt?: string;
  seo?: RecipeSEO;
  featuredImage?: FeaturedImage;
  acf_recipe?: RecipeACF;
}

// Query Response Type
export interface RecipeResponse {
  recipe: Recipe;
}
