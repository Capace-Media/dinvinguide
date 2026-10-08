/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type AdImageFieldsFragment = { mediaItemUrl: string | null, id: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null };

export type AdToppbannerFieldsFragment = { id: string, title: string | null, acf_ads: { link: string | null, desktop: { mediaItemUrl: string | null, id: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null, mobile: { mediaItemUrl: string | null, id: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null };

export type AdMittenbannerFieldsFragment = { id: string, title: string | null, acf_ads: { link: string | null, desktop: { mediaItemUrl: string | null, id: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null, mobile: { mediaItemUrl: string | null, id: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null };

export type AdSidobannerFieldsFragment = { id: string, title: string | null, acf_ads: { link: string | null, desktop: { mediaItemUrl: string | null, id: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null, mobile: { mediaItemUrl: string | null, id: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null };

export type DefaultAdsQueryVariables = Exact<{ [key: string]: never; }>;


export type DefaultAdsQuery = { options: { settings: { top: Array<{ banner: Array<{ id: string, title: string | null, acf_ads: { link: string | null, desktop: { mediaItemUrl: string | null, id: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null, mobile: { mediaItemUrl: string | null, id: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null } | null> | null } | null> | null, mid: Array<{ banner: Array<{ id: string, title: string | null, acf_ads: { link: string | null, desktop: { mediaItemUrl: string | null, id: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null, mobile: { mediaItemUrl: string | null, id: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null } | null> | null } | null> | null, bottom: Array<{ banner: Array<{ id: string, title: string | null, acf_ads: { link: string | null, desktop: { mediaItemUrl: string | null, id: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null, mobile: { mediaItemUrl: string | null, id: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null } | null> | null } | null> | null, fallback: Array<{ id: string, title: string | null, acf_ads: { link: string | null, desktop: { mediaItemUrl: string | null, id: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null, mobile: { mediaItemUrl: string | null, id: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null } | null> | null } | null } | null };

export type DlAdsQueryVariables = Exact<{ [key: string]: never; }>;


export type DlAdsQuery = { options: { settings: { top: Array<{ banner: Array<{ id: string, title: string | null, acf_ads: { link: string | null, desktop: { mediaItemUrl: string | null, id: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null, mobile: { mediaItemUrl: string | null, id: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null } | null> | null } | null> | null, mid: Array<{ banner: Array<{ id: string, title: string | null, acf_ads: { link: string | null, desktop: { mediaItemUrl: string | null, id: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null, mobile: { mediaItemUrl: string | null, id: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null } | null> | null } | null> | null, bottom: Array<{ banner: Array<{ id: string, title: string | null, acf_ads: { link: string | null, desktop: { mediaItemUrl: string | null, id: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null, mobile: { mediaItemUrl: string | null, id: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null } | null> | null } | null> | null, fallback: Array<{ id: string, title: string | null, acf_ads: { link: string | null, desktop: { mediaItemUrl: string | null, id: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null, mobile: { mediaItemUrl: string | null, id: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null } | null> | null } | null } | null };

export type AuthorQueryVariables = Exact<{
  id: string | number;
  search?: string | null | undefined;
}>;


export type AuthorQuery = { user: { username: string | null, name: string | null, firstName: string | null, description: string | null, seo: { metaDesc: string | null, title: string | null, social: { facebook: string | null, instagram: string | null, linkedIn: string | null, mySpace: string | null, soundCloud: string | null, pinterest: string | null, twitter: string | null, wikipedia: string | null, youTube: string | null } | null } | null, acf_user: { email: string | null, extratitel: string | null, facebook: string | null, instagram: string | null, kortBeskrivning: string | null, twitter: string | null, bildExtra: { title: string | null, altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null, bild: { title: string | null, altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null, posts: { pageInfo: { total: number | null } } | null } | null };

export type AuthorsQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthorsQuery = { acfOptionsSkribenter: { acf_skribenter: { skribenter: Array<{ name: string | null, slug: string | null, id: string, description: string | null, posts: { nodes: Array<{ id: string, title: string | null, slug: string | null, modifiedGmt: string | null, acf_posts: { ingress: string | null } | null, author: { node: { name: string | null, slug: string | null } } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }> } | null, acf_user: { instagram: string | null, facebook: string | null, twitter: string | null, email: string | null, bildExtra: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null, bild: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null } | null> | null, medarbetare: Array<{ name: string | null, slug: string | null, id: string, description: string | null, posts: { nodes: Array<{ id: string, title: string | null, slug: string | null, modifiedGmt: string | null, acf_posts: { ingress: string | null } | null, author: { node: { name: string | null, slug: string | null } } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }> } | null, acf_user: { instagram: string | null, facebook: string | null, twitter: string | null, email: string | null, kortBeskrivning: string | null, bild: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null } | null> | null } | null } | null };

export type DrinkTipsQueryVariables = Exact<{
  after?: string | null | undefined;
  before?: string | null | undefined;
  first?: number | null | undefined;
  last?: number | null | undefined;
}>;


export type DrinkTipsQuery = { drinktips: { pageInfo: { endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null, total: number | null }, edges: Array<{ node: { title: string | null, slug: string | null, uri: string | null, drinktipId: number, id: string, modifiedGmt: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, acf_dryckestips: { potentielltBetyg: number | null, betyget: number | null, dryckestyper: string | null, forpackningar: string | null, pris: string | null, passarTillRecept: Array<{ id: string, title: string | null, uri: string | null } | null> | null } | null } }> } | null };

export type DrinkTipQueryVariables = Exact<{
  id: string | number;
}>;


export type DrinkTipQuery = { drinktip: { title: string | null, date: string | null, id: string, slug: string | null, uri: string | null, modifiedGmt: string | null, seo: { canonical: string | null, cornerstone: boolean | null, focuskw: string | null, metaDesc: string | null, metaKeywords: string | null, metaRobotsNofollow: string | null, metaRobotsNoindex: string | null, opengraphAuthor: string | null, opengraphDescription: string | null, opengraphModifiedTime: string | null, opengraphPublishedTime: string | null, opengraphPublisher: string | null, opengraphSiteName: string | null, opengraphTitle: string | null, opengraphType: string | null, opengraphUrl: string | null, readingTime: number | null, title: string | null, twitterDescription: string | null, twitterTitle: string | null, breadcrumbs: Array<{ text: string | null, url: string | null } | null> | null, opengraphImage: { altText: string | null, mediaItemUrl: string | null } | null, twitterImage: { altText: string | null, mediaItemUrl: string | null } | null } | null, leverantorer_to_drink: { leverantorer: Array<{ id: string, title: string | null, slug: string | null, databaseId: number } | null> | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, acf_dryckestips: { potentielltBetyg: number | null, betyget: number | null, pris: string | null, dryckestyper: string | null, ekologiskt: boolean | null, forpackningar: string | null, recension: string | null, bolagetAdress: string | null, knappUrl: string | null, beskrivning: string | null } | null } | null };

export type DrinkFieldsFragment = { title: string | null, uri: string | null, date: string | null, acf_drinks: { bolagetAdress: string | null, beskrivning: string | null, betyg: number | null, ekologiskt: boolean | null, omprovning: boolean | null, vagn: boolean | null, recension: string | null, pris: string | null, potentielltBetyg: number | null, dryckestyper: { slug: string | null, name: string | null } | null, passarTillRecept: Array<{ id: string, slug: string | null, title: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, acf_recipe: { desc: string | null } | null } | null> | null, forpackningar: { name: string | null } | null } | null, featuredImage: { node: { id: string, altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null };

export type DrinkQueryVariables = Exact<{
  id: string | number;
}>;


export type DrinkQuery = { drink: { slug: string | null, modifiedGmt: string | null, title: string | null, uri: string | null, date: string | null, seo: { canonical: string | null, cornerstone: boolean | null, focuskw: string | null, metaDesc: string | null, metaKeywords: string | null, metaRobotsNofollow: string | null, metaRobotsNoindex: string | null, opengraphAuthor: string | null, opengraphDescription: string | null, opengraphModifiedTime: string | null, opengraphPublishedTime: string | null, opengraphPublisher: string | null, opengraphSiteName: string | null, opengraphTitle: string | null, opengraphType: string | null, opengraphUrl: string | null, readingTime: number | null, title: string | null, twitterDescription: string | null, twitterTitle: string | null, breadcrumbs: Array<{ text: string | null, url: string | null } | null> | null, opengraphImage: { altText: string | null, mediaItemUrl: string | null } | null, twitterImage: { altText: string | null, mediaItemUrl: string | null } | null } | null, leverantorer_to_drink: { leverantorer: Array<{ id: string, title: string | null, slug: string | null, databaseId: number } | null> | null } | null, acf_drinks: { bolagetAdress: string | null, beskrivning: string | null, betyg: number | null, ekologiskt: boolean | null, omprovning: boolean | null, vagn: boolean | null, recension: string | null, pris: string | null, potentielltBetyg: number | null, dryckestyper: { slug: string | null, name: string | null } | null, passarTillRecept: Array<{ id: string, slug: string | null, title: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, acf_recipe: { desc: string | null } | null } | null> | null, forpackningar: { name: string | null } | null } | null, featuredImage: { node: { id: string, altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } | null };

export type PreviewDrinkQueryVariables = Exact<{
  id: string | number;
}>;


export type PreviewDrinkQuery = { drink: { title: string | null, uri: string | null, date: string | null, preview: { node: { title: string | null, uri: string | null, date: string | null, acf_drinks: { bolagetAdress: string | null, beskrivning: string | null, betyg: number | null, ekologiskt: boolean | null, omprovning: boolean | null, vagn: boolean | null, recension: string | null, pris: string | null, potentielltBetyg: number | null, dryckestyper: { slug: string | null, name: string | null } | null, passarTillRecept: Array<{ id: string, slug: string | null, title: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, acf_recipe: { desc: string | null } | null } | null> | null, forpackningar: { name: string | null } | null } | null, featuredImage: { node: { id: string, altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } } | null, acf_drinks: { bolagetAdress: string | null, beskrivning: string | null, betyg: number | null, ekologiskt: boolean | null, omprovning: boolean | null, vagn: boolean | null, recension: string | null, pris: string | null, potentielltBetyg: number | null, dryckestyper: { slug: string | null, name: string | null } | null, passarTillRecept: Array<{ id: string, slug: string | null, title: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, acf_recipe: { desc: string | null } | null } | null> | null, forpackningar: { name: string | null } | null } | null, featuredImage: { node: { id: string, altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } | null };

export type DrinksQueryVariables = Exact<{
  after?: string | null | undefined;
  before?: string | null | undefined;
  first?: number | null | undefined;
  last?: number | null | undefined;
}>;


export type DrinksQuery = { drinks: { pageInfo: { endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null, total: number | null }, edges: Array<{ cursor: string | null, node: { slug: string | null, title: string | null, id: string, acf_drinks: { dryckestyper: { name: string | null } | null, forpackningar: { name: string | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } }> } | null };

export type ToplistPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type ToplistPathsQuery = { pageBy: { id: string, acf_topplistor: { aktivaTopplistor: Array<{ __typename: 'Toplist', uri: string | null, slug: string | null, modifiedGmt: string | null } | null> | null } | null } | null };

export type ToplistsQueryVariables = Exact<{ [key: string]: never; }>;


export type ToplistsQuery = { pageBy: { id: string, acf_topplistor: { aktivaTopplistor: Array<{ __typename: 'Toplist', id: string, uri: string | null, title: string | null, slug: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, seo: { canonical: string | null, cornerstone: boolean | null, focuskw: string | null, metaDesc: string | null, metaKeywords: string | null, metaRobotsNofollow: string | null, metaRobotsNoindex: string | null, opengraphAuthor: string | null, opengraphDescription: string | null, opengraphModifiedTime: string | null, opengraphPublishedTime: string | null, opengraphPublisher: string | null, opengraphSiteName: string | null, opengraphTitle: string | null, opengraphType: string | null, opengraphUrl: string | null, readingTime: number | null, title: string | null, twitterDescription: string | null, twitterTitle: string | null, breadcrumbs: Array<{ text: string | null, url: string | null } | null> | null, opengraphImage: { altText: string | null, mediaItemUrl: string | null } | null, twitterImage: { altText: string | null, mediaItemUrl: string | null } | null } | null, acf_toplists: { ekologiskt: boolean | null, maxAntal: number | null, slogan: string | null, dryckestyper: Array<{ name: string | null } | null> | null, forpackningar: Array<{ name: string | null } | null> | null } | null } | null> | null } | null } | null };

export type ToplistDrinksQueryVariables = Exact<{
  afterYear: number;
  afterMonth: number;
  afterDay: number;
  beforeYear: number;
  beforeMonth: number;
  beforeDay: number;
  batch: number;
  cursor: string;
}>;


export type ToplistDrinksQuery = { drinks: { pageInfo: { hasNextPage: boolean, endCursor: string | null }, edges: Array<{ node: { id: string, date: string | null, uri: string | null, title: string | null, slug: string | null, leverantorer_to_drink: { leverantorer: Array<{ id: string, title: string | null, slug: string | null, databaseId: number } | null> | null } | null, acf_drinks: { ekologiskt: boolean | null, betyg: number | null, pris: string | null, recension: string | null, beskrivning: string | null, dryckestyper: { name: string | null } | null, forpackningar: { name: string | null } | null, passarTillRecept: Array<{ title: string | null, slug: string | null, uri: string | null } | null> | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } }> } | null };

export type ImageFieldsFragment = { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null };

export type SeoFieldsFragment = { canonical: string | null, cornerstone: boolean | null, focuskw: string | null, metaDesc: string | null, metaKeywords: string | null, metaRobotsNofollow: string | null, metaRobotsNoindex: string | null, opengraphAuthor: string | null, opengraphDescription: string | null, opengraphModifiedTime: string | null, opengraphPublishedTime: string | null, opengraphPublisher: string | null, opengraphSiteName: string | null, opengraphTitle: string | null, opengraphType: string | null, opengraphUrl: string | null, readingTime: number | null, title: string | null, twitterDescription: string | null, twitterTitle: string | null, breadcrumbs: Array<{ text: string | null, url: string | null } | null> | null, opengraphImage: { altText: string | null, mediaItemUrl: string | null } | null, twitterImage: { altText: string | null, mediaItemUrl: string | null } | null };

export type TaxonomySeoFieldsFragment = { canonical: string | null, cornerstone: boolean | null, focuskw: string | null, metaDesc: string | null, metaKeywords: string | null, metaRobotsNofollow: string | null, metaRobotsNoindex: string | null, opengraphAuthor: string | null, opengraphDescription: string | null, opengraphModifiedTime: string | null, opengraphPublishedTime: string | null, opengraphPublisher: string | null, opengraphSiteName: string | null, opengraphTitle: string | null, opengraphType: string | null, opengraphUrl: string | null, title: string | null, twitterDescription: string | null, twitterTitle: string | null, breadcrumbs: Array<{ text: string | null, url: string | null } | null> | null, opengraphImage: { altText: string | null, mediaItemUrl: string | null } | null, twitterImage: { altText: string | null, mediaItemUrl: string | null } | null };

export type PostCardFieldsFragment = { id: string, title: string | null, slug: string | null, modifiedGmt: string | null, acf_posts: { ingress: string | null } | null, author: { node: { name: string | null, slug: string | null } } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null };

export type GrapeQueryVariables = Exact<{
  id: string | number;
}>;


export type GrapeQuery = { grape: { id: string, slug: string | null, title: string | null, seo: { canonical: string | null, cornerstone: boolean | null, focuskw: string | null, metaDesc: string | null, metaKeywords: string | null, metaRobotsNofollow: string | null, metaRobotsNoindex: string | null, opengraphAuthor: string | null, opengraphDescription: string | null, opengraphModifiedTime: string | null, opengraphPublishedTime: string | null, opengraphPublisher: string | null, opengraphSiteName: string | null, opengraphTitle: string | null, opengraphType: string | null, opengraphUrl: string | null, readingTime: number | null, title: string | null, twitterDescription: string | null, twitterTitle: string | null, breadcrumbs: Array<{ text: string | null, url: string | null } | null> | null, opengraphImage: { altText: string | null, mediaItemUrl: string | null } | null, twitterImage: { altText: string | null, mediaItemUrl: string | null } | null } | null, acf_grape: { kortBeskrivning: string | null, text: string | null, druvtyp: { name: string | null, slug: string | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null } } | null } | null };

export type GrapeSlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type GrapeSlugsQuery = { grapes: { nodes: Array<{ slug: string | null }> } | null };

type GrapeCardFields_GrapeToGrapeConnection_Fragment = { edges: Array<{ node: { id: string, title: string | null, slug: string | null, acf_grape: { druvtyp: { name: string | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null, total: number | null } };

type GrapeCardFields_GrapeTypeToGrapeConnection_Fragment = { edges: Array<{ node: { id: string, title: string | null, slug: string | null, acf_grape: { druvtyp: { name: string | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null, total: number | null } };

type GrapeCardFields_RootQueryToGrapeConnection_Fragment = { edges: Array<{ node: { id: string, title: string | null, slug: string | null, acf_grape: { druvtyp: { name: string | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null, total: number | null } };

export type GrapeCardFieldsFragment =
  | GrapeCardFields_GrapeToGrapeConnection_Fragment
  | GrapeCardFields_GrapeTypeToGrapeConnection_Fragment
  | GrapeCardFields_RootQueryToGrapeConnection_Fragment
;

export type GrapesQueryVariables = Exact<{
  last?: number | null | undefined;
  first?: number | null | undefined;
  before?: string | null | undefined;
  after?: string | null | undefined;
  search?: string | null | undefined;
}>;


export type GrapesQuery = { grapes: { edges: Array<{ node: { id: string, title: string | null, slug: string | null, acf_grape: { druvtyp: { name: string | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null, total: number | null } } | null };

export type GrapesByTypeQueryVariables = Exact<{
  id: string | number;
  last?: number | null | undefined;
  first?: number | null | undefined;
  before?: string | null | undefined;
  after?: string | null | undefined;
  search?: string | null | undefined;
}>;


export type GrapesByTypeQuery = { grapeType: { name: string | null, grapes: { edges: Array<{ node: { id: string, title: string | null, slug: string | null, acf_grape: { druvtyp: { name: string | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null, total: number | null } } | null } | null };

export type ChildPagesQueryVariables = Exact<{
  parent: string | number;
  after?: string | null | undefined;
  before?: string | null | undefined;
  first?: number | null | undefined;
  last?: number | null | undefined;
  search?: string | null | undefined;
}>;


export type ChildPagesQuery = { pages: { edges: Array<{ node: { id: string, uri: string | null, slug: string | null, title: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null, total: number | null } } | null };

export type AuthorFieldsFragment = { username: string | null, nicename: string | null, slug: string | null, name: string | null, description: string | null, acf_user: { email: string | null, facebook: string | null, instagram: string | null, kortBeskrivning: string | null, bild: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null };

export type PageQueryVariables = Exact<{
  id: string | number;
}>;


export type PageQuery = { page: { slug: string | null, title: string | null, content: string | null, page_content: { intro: string | null } | null, acf_explorer: { slogan: string | null } | null, author: { node: { username: string | null, nicename: string | null, slug: string | null, name: string | null, description: string | null, acf_user: { email: string | null, facebook: string | null, instagram: string | null, kortBeskrivning: string | null, bild: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null } } | null, seo: { canonical: string | null, cornerstone: boolean | null, focuskw: string | null, metaDesc: string | null, metaKeywords: string | null, metaRobotsNofollow: string | null, metaRobotsNoindex: string | null, opengraphAuthor: string | null, opengraphDescription: string | null, opengraphModifiedTime: string | null, opengraphPublishedTime: string | null, opengraphPublisher: string | null, opengraphSiteName: string | null, opengraphTitle: string | null, opengraphType: string | null, opengraphUrl: string | null, readingTime: number | null, title: string | null, twitterDescription: string | null, twitterTitle: string | null, breadcrumbs: Array<{ text: string | null, url: string | null } | null> | null, opengraphImage: { altText: string | null, mediaItemUrl: string | null } | null, twitterImage: { altText: string | null, mediaItemUrl: string | null } | null } | null, featuredImage: { node: { title: string | null, altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } | null };

export type FrontPageDrinktipFieldsFragment = { __typename: 'Drinktip', id: string, title: string | null, slug: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, acf_dryckestips: { betyget: number | null, dryckestyper: string | null, forpackningar: string | null } | null };

export type FrontPageRecipeFieldsFragment = { __typename: 'Recipe', id: string, title: string | null, slug: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, acf_recipe: { recepieCategories: Array<{ name: string | null, slug: string | null } | null> | null, skrivetAv: Array<{ name: string | null } | null> | null } | null };

export type FrontPageQueryVariables = Exact<{ [key: string]: never; }>;


export type FrontPageQuery = { page: { content: string | null, seo: { title: string | null, metaDesc: string | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, GQL_frontPageFields: { highlightedArticles: Array<{ __typename: 'Post', id: string, title: string | null, slug: string | null, modifiedGmt: string | null, acf_posts: { ingress: string | null } | null, author: { node: { name: string | null, slug: string | null } } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } | null> | null, highlightedDryckestips: Array<{ __typename: 'Drinktip', id: string, title: string | null, slug: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, acf_dryckestips: { betyget: number | null, dryckestyper: string | null, forpackningar: string | null } | null } | null> | null, highlightedRecept: Array<{ __typename: 'Recipe', id: string, title: string | null, slug: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, acf_recipe: { recepieCategories: Array<{ name: string | null, slug: string | null } | null> | null, skrivetAv: Array<{ name: string | null } | null> | null } | null } | null> | null } | null } | null, recipePage: { page_content: { intro: string | null } | null } | null, posts: { nodes: Array<{ __typename: 'Post', id: string, title: string | null, slug: string | null, modifiedGmt: string | null, acf_posts: { ingress: string | null } | null, author: { node: { name: string | null, slug: string | null } } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }> } | null, drinktips: { nodes: Array<{ __typename: 'Drinktip', id: string, title: string | null, slug: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, acf_dryckestips: { betyget: number | null, dryckestyper: string | null, forpackningar: string | null } | null }> } | null, recipes: { nodes: Array<{ __typename: 'Recipe', id: string, title: string | null, slug: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, acf_recipe: { recepieCategories: Array<{ name: string | null, slug: string | null } | null> | null, skrivetAv: Array<{ name: string | null } | null> | null } | null }> } | null };

export type RecipePageQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipePageQuery = { page: { page_content: { intro: string | null } | null } | null, recipes: { nodes: Array<{ title: string | null, slug: string | null, id: string, modifiedGmt: string | null, featuredImage: { node: { title: string | null, altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, acf_recipe: { recepieCategories: Array<{ id: string, name: string | null, slug: string | null } | null> | null, skrivetAv: Array<{ name: string | null, id: string, slug: string | null } | null> | null } | null }> } | null };

export type TopListsQueryVariables = Exact<{ [key: string]: never; }>;


export type TopListsQuery = { page: { acf_topplistor: { aktivaTopplistor: Array<{ __typename: 'Toplist', id: string, title: string | null, slug: string | null, acf_toplists: { slogan: string | null, toplistImg: { desktop: { title: string | null, altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null, mobile: { title: string | null, altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null } | null, forpackningar: { nodes: Array<{ name: string | null }> } | null } | null> | null } | null } | null };

type LinkedCardImage_Drink_Fragment = { featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null };

type LinkedCardImage_Drinktip_Fragment = { featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null };

type LinkedCardImage_Episode_Fragment = { featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null };

type LinkedCardImage_Glossary_Fragment = { featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null };

type LinkedCardImage_Grape_Fragment = { featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null };

type LinkedCardImage_LeverantR_Fragment = { featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null };

type LinkedCardImage_Page_Fragment = { featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null };

type LinkedCardImage_Post_Fragment = { featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null };

type LinkedCardImage_Recipe_Fragment = { featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null };

type LinkedCardImage_SpiritTip_Fragment = { featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null };

type LinkedCardImage_Toplist_Fragment = { featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null };

export type LinkedCardImageFragment =
  | LinkedCardImage_Drink_Fragment
  | LinkedCardImage_Drinktip_Fragment
  | LinkedCardImage_Episode_Fragment
  | LinkedCardImage_Glossary_Fragment
  | LinkedCardImage_Grape_Fragment
  | LinkedCardImage_LeverantR_Fragment
  | LinkedCardImage_Page_Fragment
  | LinkedCardImage_Post_Fragment
  | LinkedCardImage_Recipe_Fragment
  | LinkedCardImage_SpiritTip_Fragment
  | LinkedCardImage_Toplist_Fragment
;

export type WineAtlasPageQueryVariables = Exact<{
  id: string | number;
}>;


export type WineAtlasPageQuery = { page: { title: string | null, content: string | null, id: string, uri: string | null, slug: string | null, modifiedGmt: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, author: { node: { username: string | null, nicename: string | null, slug: string | null, name: string | null, description: string | null, acf_user: { email: string | null, facebook: string | null, instagram: string | null, kortBeskrivning: string | null, bild: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null } } | null, acf_overviewPage: { ingress: string | null } | null, acf_posts: { sektioner: Array<
        | { text: string | null, fieldGroupName: string | null }
        | { fieldGroupName: string | null, text: string | null }
        | { fieldGroupName: string | null, extraPuff: Array<
            | { title: string | null, slug: string | null, uri: string | null, drinkTypes: { edges: Array<{ node: { name: string | null } }> } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
            | { title: string | null, slug: string | null, uri: string | null, acf_grape: { kortBeskrivning: string | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
            | { title: string | null, slug: string | null, uri: string | null, passarTills: { edges: Array<{ node: { name: string | null } }> } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
            | Record<PropertyKey, never>
           | null> | null }
        | { text: string | null, fieldGroupName: string | null }
        | { fieldGroupName: string | null, iGalleri: boolean | null, img: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null }
        | { fieldGroupName: string | null, iGalleri: boolean | null, img: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null }
        | Record<PropertyKey, never>
       | null> | null } | null } | null };

export type PlaylistQueryVariables = Exact<{
  id: string | number;
}>;


export type PlaylistQuery = { acfOptionsInstallningarTv: { tvOptionsPage: { vintvTitle: string | null, vintvIngress: string | null, vintvBillboardDelay: number | null, vintvBillboardLink: string | null, vintvBillboardLinkWindow: boolean | null, vintvBillboardShow: boolean | null, vintvBillboardText: string | null, vintvBillboardBild: { mediaItemUrl: string | null } | null } | null } | null, playlist: { name: string | null, slug: string | null, description: string | null, acf_tvSpellistor: { thumbnail: string | null, desc: string | null } | null, seo: { metaDesc: string | null, title: string | null, opengraphTitle: string | null, opengraphDescription: string | null, opengraphImage: { mediaItemUrl: string | null } | null } | null, episodes: { edges: Array<{ node: { id: string, title: string | null, seo: { metaDesc: string | null, title: string | null, opengraphTitle: string | null, opengraphDescription: string | null, opengraphImage: { mediaItemUrl: string | null } | null } | null, acf_episode: { thumbnail: string | null, beskrivning: string | null, videoId: string | null } | null } }> } | null } | null };

export type PostBodyFieldsFragment = { acf_posts: { ingress: string | null, lasMer: Array<
      | { __typename: 'Grape', id: string, title: string | null, slug: string | null, uri: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
      | { __typename: 'Page', id: string, title: string | null, slug: string | null, uri: string | null, author: { node: { name: string | null } } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
      | { __typename: 'Post', uri: string | null, id: string, title: string | null, slug: string | null, modifiedGmt: string | null, author: { node: { nicename: string | null, name: string | null, slug: string | null } } | null, acf_posts: { ingress: string | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
      | { __typename: 'Recipe', id: string, title: string | null, slug: string | null, uri: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
     | null> | null, sektioner: Array<
      | { text: string | null, fieldGroupName: string | null }
      | { fieldGroupName: string | null, text: string | null }
      | { fieldGroupName: string | null, extraPuff: Array<
          | { __typename: 'Drink', title: string | null, slug: string | null, uri: string | null, drinkTypes: { edges: Array<{ node: { name: string | null } }> } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
          | { __typename: 'Drinktip', title: string | null, slug: string | null, uri: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, acf_dryckestips: { dryckestyper: string | null, forpackningar: string | null } | null }
          | { __typename: 'Grape', title: string | null, slug: string | null, uri: string | null, acf_grape: { kortBeskrivning: string | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
          | { __typename: 'Recipe', title: string | null, slug: string | null, uri: string | null, acf_recipe: { desc: string | null } | null, passarTills: { edges: Array<{ node: { name: string | null } }> } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
         | null> | null }
      | { text: string | null, fieldGroupName: string | null }
      | { fieldGroupName: string | null, iGalleri: boolean | null, img: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null }
      | { fieldGroupName: string | null, iGalleri: boolean | null, img: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null }
      | { fieldGroupName: string | null, url: string | null }
      | Record<PropertyKey, never>
     | null> | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, author: { node: { username: string | null, nicename: string | null, slug: string | null, name: string | null, description: string | null, acf_user: { email: string | null, facebook: string | null, instagram: string | null, kortBeskrivning: string | null, bild: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null } } | null };

export type PostQueryVariables = Exact<{
  id: string | number;
}>;


export type PostQuery = { post: { title: string | null, slug: string | null, uri: string | null, content: string | null, modifiedGmt: string | null, seo: { canonical: string | null, cornerstone: boolean | null, focuskw: string | null, metaDesc: string | null, metaKeywords: string | null, metaRobotsNofollow: string | null, metaRobotsNoindex: string | null, opengraphAuthor: string | null, opengraphDescription: string | null, opengraphModifiedTime: string | null, opengraphPublishedTime: string | null, opengraphPublisher: string | null, opengraphSiteName: string | null, opengraphTitle: string | null, opengraphType: string | null, opengraphUrl: string | null, readingTime: number | null, title: string | null, twitterDescription: string | null, twitterTitle: string | null, breadcrumbs: Array<{ text: string | null, url: string | null } | null> | null, opengraphImage: { altText: string | null, mediaItemUrl: string | null } | null, twitterImage: { altText: string | null, mediaItemUrl: string | null } | null } | null, acf_oldcontent: { oldContentAcf: string | null } | null, acf_posts: { ingress: string | null, lasMer: Array<
        | { __typename: 'Grape', id: string, title: string | null, slug: string | null, uri: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
        | { __typename: 'Page', id: string, title: string | null, slug: string | null, uri: string | null, author: { node: { name: string | null } } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
        | { __typename: 'Post', uri: string | null, id: string, title: string | null, slug: string | null, modifiedGmt: string | null, author: { node: { nicename: string | null, name: string | null, slug: string | null } } | null, acf_posts: { ingress: string | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
        | { __typename: 'Recipe', id: string, title: string | null, slug: string | null, uri: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
       | null> | null, sektioner: Array<
        | { text: string | null, fieldGroupName: string | null }
        | { fieldGroupName: string | null, text: string | null }
        | { fieldGroupName: string | null, extraPuff: Array<
            | { __typename: 'Drink', title: string | null, slug: string | null, uri: string | null, drinkTypes: { edges: Array<{ node: { name: string | null } }> } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
            | { __typename: 'Drinktip', title: string | null, slug: string | null, uri: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, acf_dryckestips: { dryckestyper: string | null, forpackningar: string | null } | null }
            | { __typename: 'Grape', title: string | null, slug: string | null, uri: string | null, acf_grape: { kortBeskrivning: string | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
            | { __typename: 'Recipe', title: string | null, slug: string | null, uri: string | null, acf_recipe: { desc: string | null } | null, passarTills: { edges: Array<{ node: { name: string | null } }> } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
           | null> | null }
        | { text: string | null, fieldGroupName: string | null }
        | { fieldGroupName: string | null, iGalleri: boolean | null, img: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null }
        | { fieldGroupName: string | null, iGalleri: boolean | null, img: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null }
        | { fieldGroupName: string | null, url: string | null }
        | Record<PropertyKey, never>
       | null> | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, author: { node: { username: string | null, nicename: string | null, slug: string | null, name: string | null, description: string | null, acf_user: { email: string | null, facebook: string | null, instagram: string | null, kortBeskrivning: string | null, bild: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null } } | null } | null };

export type PreviewPostFieldsFragment = { title: string | null, slug: string | null, uri: string | null, modifiedGmt: string | null, acf_posts: { ingress: string | null, lasMer: Array<
      | { __typename: 'Grape', id: string, title: string | null, slug: string | null, uri: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
      | { __typename: 'Page', id: string, title: string | null, slug: string | null, uri: string | null, author: { node: { name: string | null } } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
      | { __typename: 'Post', uri: string | null, id: string, title: string | null, slug: string | null, modifiedGmt: string | null, author: { node: { nicename: string | null, name: string | null, slug: string | null } } | null, acf_posts: { ingress: string | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
      | { __typename: 'Recipe', id: string, title: string | null, slug: string | null, uri: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
     | null> | null, sektioner: Array<
      | { text: string | null, fieldGroupName: string | null }
      | { fieldGroupName: string | null, text: string | null }
      | { fieldGroupName: string | null, extraPuff: Array<
          | { __typename: 'Drink', title: string | null, slug: string | null, uri: string | null, drinkTypes: { edges: Array<{ node: { name: string | null } }> } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
          | { __typename: 'Drinktip', title: string | null, slug: string | null, uri: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, acf_dryckestips: { dryckestyper: string | null, forpackningar: string | null } | null }
          | { __typename: 'Grape', title: string | null, slug: string | null, uri: string | null, acf_grape: { kortBeskrivning: string | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
          | { __typename: 'Recipe', title: string | null, slug: string | null, uri: string | null, acf_recipe: { desc: string | null } | null, passarTills: { edges: Array<{ node: { name: string | null } }> } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
         | null> | null }
      | { text: string | null, fieldGroupName: string | null }
      | { fieldGroupName: string | null, iGalleri: boolean | null, img: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null }
      | { fieldGroupName: string | null, iGalleri: boolean | null, img: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null }
      | { fieldGroupName: string | null, url: string | null }
      | Record<PropertyKey, never>
     | null> | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, author: { node: { username: string | null, nicename: string | null, slug: string | null, name: string | null, description: string | null, acf_user: { email: string | null, facebook: string | null, instagram: string | null, kortBeskrivning: string | null, bild: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null } } | null };

export type PreviewPostQueryVariables = Exact<{
  id: string | number;
}>;


export type PreviewPostQuery = { post: { title: string | null, slug: string | null, uri: string | null, modifiedGmt: string | null, preview: { node: { title: string | null, slug: string | null, uri: string | null, modifiedGmt: string | null, acf_posts: { ingress: string | null, lasMer: Array<
            | { __typename: 'Grape', id: string, title: string | null, slug: string | null, uri: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
            | { __typename: 'Page', id: string, title: string | null, slug: string | null, uri: string | null, author: { node: { name: string | null } } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
            | { __typename: 'Post', uri: string | null, id: string, title: string | null, slug: string | null, modifiedGmt: string | null, author: { node: { nicename: string | null, name: string | null, slug: string | null } } | null, acf_posts: { ingress: string | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
            | { __typename: 'Recipe', id: string, title: string | null, slug: string | null, uri: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
           | null> | null, sektioner: Array<
            | { text: string | null, fieldGroupName: string | null }
            | { fieldGroupName: string | null, text: string | null }
            | { fieldGroupName: string | null, extraPuff: Array<
                | { __typename: 'Drink', title: string | null, slug: string | null, uri: string | null, drinkTypes: { edges: Array<{ node: { name: string | null } }> } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
                | { __typename: 'Drinktip', title: string | null, slug: string | null, uri: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, acf_dryckestips: { dryckestyper: string | null, forpackningar: string | null } | null }
                | { __typename: 'Grape', title: string | null, slug: string | null, uri: string | null, acf_grape: { kortBeskrivning: string | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
                | { __typename: 'Recipe', title: string | null, slug: string | null, uri: string | null, acf_recipe: { desc: string | null } | null, passarTills: { edges: Array<{ node: { name: string | null } }> } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
               | null> | null }
            | { text: string | null, fieldGroupName: string | null }
            | { fieldGroupName: string | null, iGalleri: boolean | null, img: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null }
            | { fieldGroupName: string | null, iGalleri: boolean | null, img: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null }
            | { fieldGroupName: string | null, url: string | null }
            | Record<PropertyKey, never>
           | null> | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, author: { node: { username: string | null, nicename: string | null, slug: string | null, name: string | null, description: string | null, acf_user: { email: string | null, facebook: string | null, instagram: string | null, kortBeskrivning: string | null, bild: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null } } | null } } | null, acf_posts: { ingress: string | null, lasMer: Array<
        | { __typename: 'Grape', id: string, title: string | null, slug: string | null, uri: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
        | { __typename: 'Page', id: string, title: string | null, slug: string | null, uri: string | null, author: { node: { name: string | null } } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
        | { __typename: 'Post', uri: string | null, id: string, title: string | null, slug: string | null, modifiedGmt: string | null, author: { node: { nicename: string | null, name: string | null, slug: string | null } } | null, acf_posts: { ingress: string | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
        | { __typename: 'Recipe', id: string, title: string | null, slug: string | null, uri: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
       | null> | null, sektioner: Array<
        | { text: string | null, fieldGroupName: string | null }
        | { fieldGroupName: string | null, text: string | null }
        | { fieldGroupName: string | null, extraPuff: Array<
            | { __typename: 'Drink', title: string | null, slug: string | null, uri: string | null, drinkTypes: { edges: Array<{ node: { name: string | null } }> } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
            | { __typename: 'Drinktip', title: string | null, slug: string | null, uri: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, acf_dryckestips: { dryckestyper: string | null, forpackningar: string | null } | null }
            | { __typename: 'Grape', title: string | null, slug: string | null, uri: string | null, acf_grape: { kortBeskrivning: string | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
            | { __typename: 'Recipe', title: string | null, slug: string | null, uri: string | null, acf_recipe: { desc: string | null } | null, passarTills: { edges: Array<{ node: { name: string | null } }> } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
           | null> | null }
        | { text: string | null, fieldGroupName: string | null }
        | { fieldGroupName: string | null, iGalleri: boolean | null, img: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null }
        | { fieldGroupName: string | null, iGalleri: boolean | null, img: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null }
        | { fieldGroupName: string | null, url: string | null }
        | Record<PropertyKey, never>
       | null> | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, author: { node: { username: string | null, nicename: string | null, slug: string | null, name: string | null, description: string | null, acf_user: { email: string | null, facebook: string | null, instagram: string | null, kortBeskrivning: string | null, bild: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null } } | null } | null };

export type PostsQueryVariables = Exact<{
  after?: string | null | undefined;
  before?: string | null | undefined;
  search?: string | null | undefined;
  first?: number | null | undefined;
  last?: number | null | undefined;
  authorNotIn?: Array<string | number | null | undefined> | string | number | null | undefined;
  year?: number | null | undefined;
  authorName?: string | null | undefined;
}>;


export type PostsQuery = { posts: { pageInfo: { hasNextPage: boolean, hasPreviousPage: boolean, endCursor: string | null, total: number | null, startCursor: string | null }, edges: Array<{ node: { id: string, title: string | null, slug: string | null, modifiedGmt: string | null, acf_posts: { ingress: string | null } | null, author: { node: { name: string | null, slug: string | null } } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } }> } | null };

export type PostPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostPathsQuery = { posts: { nodes: Array<{ slug: string | null, author: { node: { slug: string | null } } | null }> } | null };

type SchoolPostFields_Ad_Fragment = { __typename: 'Ad', id: string, uri: string | null, slug: string | null, modifiedGmt: string | null };

type SchoolPostFields_Drink_Fragment = { __typename: 'Drink', id: string, uri: string | null, slug: string | null, modifiedGmt: string | null };

type SchoolPostFields_Drinktip_Fragment = { __typename: 'Drinktip', id: string, uri: string | null, slug: string | null, modifiedGmt: string | null };

type SchoolPostFields_Episode_Fragment = { __typename: 'Episode', id: string, uri: string | null, slug: string | null, modifiedGmt: string | null };

type SchoolPostFields_Glossary_Fragment = { __typename: 'Glossary', id: string, uri: string | null, slug: string | null, modifiedGmt: string | null };

type SchoolPostFields_Grape_Fragment = { __typename: 'Grape', id: string, uri: string | null, slug: string | null, modifiedGmt: string | null };

type SchoolPostFields_LeverantR_Fragment = { __typename: 'LeverantR', id: string, uri: string | null, slug: string | null, modifiedGmt: string | null };

type SchoolPostFields_MediaItem_Fragment = { __typename: 'MediaItem', id: string, uri: string | null, slug: string | null, modifiedGmt: string | null };

type SchoolPostFields_Page_Fragment = { __typename: 'Page', id: string, uri: string | null, slug: string | null, modifiedGmt: string | null };

type SchoolPostFields_Post_Fragment = { __typename: 'Post', id: string, uri: string | null, slug: string | null, modifiedGmt: string | null };

type SchoolPostFields_Recipe_Fragment = { __typename: 'Recipe', id: string, uri: string | null, slug: string | null, modifiedGmt: string | null };

type SchoolPostFields_SpiritTip_Fragment = { __typename: 'SpiritTip', id: string, uri: string | null, slug: string | null, modifiedGmt: string | null };

type SchoolPostFields_Toplist_Fragment = { __typename: 'Toplist', id: string, uri: string | null, slug: string | null, modifiedGmt: string | null };

export type SchoolPostFieldsFragment =
  | SchoolPostFields_Ad_Fragment
  | SchoolPostFields_Drink_Fragment
  | SchoolPostFields_Drinktip_Fragment
  | SchoolPostFields_Episode_Fragment
  | SchoolPostFields_Glossary_Fragment
  | SchoolPostFields_Grape_Fragment
  | SchoolPostFields_LeverantR_Fragment
  | SchoolPostFields_MediaItem_Fragment
  | SchoolPostFields_Page_Fragment
  | SchoolPostFields_Post_Fragment
  | SchoolPostFields_Recipe_Fragment
  | SchoolPostFields_SpiritTip_Fragment
  | SchoolPostFields_Toplist_Fragment
;

export type SchoolPostsQueryVariables = Exact<{
  id: string | number;
}>;


export type SchoolPostsQuery = { page: { acf_overviewPage: { sidor: Array<
        | { __typename: 'Page', title: string | null, id: string, uri: string | null, slug: string | null, modifiedGmt: string | null, acf_posts: { ingress: string | null } | null, author: { node: { name: string | null } } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
        | { __typename: 'Post', title: string | null, id: string, uri: string | null, slug: string | null, modifiedGmt: string | null, acf_posts: { ingress: string | null } | null, author: { node: { name: string | null } } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
       | null> | null } | null } | null };

export type SearchQueryVariables = Exact<{
  search?: string | null | undefined;
}>;


export type SearchQuery = { drinktips: { nodes: Array<{ title: string | null, slug: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }> } | null, recipes: { nodes: Array<{ title: string | null, slug: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }> } | null, posts: { nodes: Array<{ title: string | null, slug: string | null, author: { node: { slug: string | null } } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }> } | null, drinks: { nodes: Array<{ title: string | null, slug: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }> } | null, grapes: { nodes: Array<{ title: string | null, slug: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }> } | null };

export type RecipeFieldsFragment = { title: string | null, featuredImage: { node: { title: string | null, altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, acf_recipe: { desc: string | null, processen: string | null, recipeAverageRating: number | null, recipeRatingCount: number | null, ingredienserOvrigt: string | null, antalPortioner: string | null, receptdelar: Array<{ rubrik: string | null, ingredienser: Array<{ antal: number | null, namn: string | null, enhet: { name: string | null } | null } | null> | null } | null> | null, beskrivningStegForSteg: Array<{ instruktion: string | null } | null> | null, skrivetAv: Array<{ slug: string | null, name: string | null, id: string } | null> | null, recepieCategories: Array<{ id: string, slug: string | null, uri: string | null, name: string | null } | null> | null, kok: Array<{ name: string | null, slug: string | null, id: string } | null> | null, passandeDrycker: Array<{ id: string, slug: string | null, title: string | null, acf_drinks: { dryckestyper: { name: string | null } | null, forpackningar: { name: string | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } | null> | null, time: { cookingTime: number | null, prepTime: number | null } | null, bilder: Array<{ kortBeskrivning: string | null, img: { id: string, altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null> | null, nutritions: { energKcal: string | null, fett: string | null, fieldGroupName: string | null, kolhydrater: string | null, protein: string | null } | null } | null };

export type RecipeQueryVariables = Exact<{
  id: string | number;
}>;


export type RecipeQuery = { recipe: { slug: string | null, modifiedGmt: string | null, title: string | null, seo: { canonical: string | null, cornerstone: boolean | null, focuskw: string | null, metaDesc: string | null, metaKeywords: string | null, metaRobotsNofollow: string | null, metaRobotsNoindex: string | null, opengraphAuthor: string | null, opengraphDescription: string | null, opengraphModifiedTime: string | null, opengraphPublishedTime: string | null, opengraphPublisher: string | null, opengraphSiteName: string | null, opengraphTitle: string | null, opengraphType: string | null, opengraphUrl: string | null, readingTime: number | null, title: string | null, twitterDescription: string | null, twitterTitle: string | null, breadcrumbs: Array<{ text: string | null, url: string | null } | null> | null, opengraphImage: { altText: string | null, mediaItemUrl: string | null } | null, twitterImage: { altText: string | null, mediaItemUrl: string | null } | null } | null, featuredImage: { node: { title: string | null, altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, acf_recipe: { desc: string | null, processen: string | null, recipeAverageRating: number | null, recipeRatingCount: number | null, ingredienserOvrigt: string | null, antalPortioner: string | null, receptdelar: Array<{ rubrik: string | null, ingredienser: Array<{ antal: number | null, namn: string | null, enhet: { name: string | null } | null } | null> | null } | null> | null, beskrivningStegForSteg: Array<{ instruktion: string | null } | null> | null, skrivetAv: Array<{ slug: string | null, name: string | null, id: string } | null> | null, recepieCategories: Array<{ id: string, slug: string | null, uri: string | null, name: string | null } | null> | null, kok: Array<{ name: string | null, slug: string | null, id: string } | null> | null, passandeDrycker: Array<{ id: string, slug: string | null, title: string | null, acf_drinks: { dryckestyper: { name: string | null } | null, forpackningar: { name: string | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } | null> | null, time: { cookingTime: number | null, prepTime: number | null } | null, bilder: Array<{ kortBeskrivning: string | null, img: { id: string, altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null> | null, nutritions: { energKcal: string | null, fett: string | null, fieldGroupName: string | null, kolhydrater: string | null, protein: string | null } | null } | null } | null };

export type PreviewRecipeQueryVariables = Exact<{
  id: string | number;
}>;


export type PreviewRecipeQuery = { recipe: { title: string | null, preview: { node: { title: string | null, featuredImage: { node: { title: string | null, altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, acf_recipe: { desc: string | null, processen: string | null, recipeAverageRating: number | null, recipeRatingCount: number | null, ingredienserOvrigt: string | null, antalPortioner: string | null, receptdelar: Array<{ rubrik: string | null, ingredienser: Array<{ antal: number | null, namn: string | null, enhet: { name: string | null } | null } | null> | null } | null> | null, beskrivningStegForSteg: Array<{ instruktion: string | null } | null> | null, skrivetAv: Array<{ slug: string | null, name: string | null, id: string } | null> | null, recepieCategories: Array<{ id: string, slug: string | null, uri: string | null, name: string | null } | null> | null, kok: Array<{ name: string | null, slug: string | null, id: string } | null> | null, passandeDrycker: Array<{ id: string, slug: string | null, title: string | null, acf_drinks: { dryckestyper: { name: string | null } | null, forpackningar: { name: string | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } | null> | null, time: { cookingTime: number | null, prepTime: number | null } | null, bilder: Array<{ kortBeskrivning: string | null, img: { id: string, altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null> | null, nutritions: { energKcal: string | null, fett: string | null, fieldGroupName: string | null, kolhydrater: string | null, protein: string | null } | null } | null } } | null, featuredImage: { node: { title: string | null, altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, acf_recipe: { desc: string | null, processen: string | null, recipeAverageRating: number | null, recipeRatingCount: number | null, ingredienserOvrigt: string | null, antalPortioner: string | null, receptdelar: Array<{ rubrik: string | null, ingredienser: Array<{ antal: number | null, namn: string | null, enhet: { name: string | null } | null } | null> | null } | null> | null, beskrivningStegForSteg: Array<{ instruktion: string | null } | null> | null, skrivetAv: Array<{ slug: string | null, name: string | null, id: string } | null> | null, recepieCategories: Array<{ id: string, slug: string | null, uri: string | null, name: string | null } | null> | null, kok: Array<{ name: string | null, slug: string | null, id: string } | null> | null, passandeDrycker: Array<{ id: string, slug: string | null, title: string | null, acf_drinks: { dryckestyper: { name: string | null } | null, forpackningar: { name: string | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } | null> | null, time: { cookingTime: number | null, prepTime: number | null } | null, bilder: Array<{ kortBeskrivning: string | null, img: { id: string, altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null } | null> | null, nutritions: { energKcal: string | null, fett: string | null, fieldGroupName: string | null, kolhydrater: string | null, protein: string | null } | null } | null } | null };

export type RecipeSlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipeSlugsQuery = { recipes: { nodes: Array<{ slug: string | null }> } | null };

export type RecipeCardFieldsFragment = { id: string, title: string | null, slug: string | null, guestWriter: { nodes: Array<{ name: string | null }> } | null, acf_recipe: { recipeAverageRating: number | null, recepieCategories: Array<{ slug: string | null, name: string | null } | null> | null, skrivetAv: Array<{ name: string | null } | null> | null, time: { cookingTime: number | null, prepTime: number | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null };

type RecipeListFields_EnhetToRecipeConnection_Fragment = { edges: Array<{ node: { id: string, title: string | null, slug: string | null, guestWriter: { nodes: Array<{ name: string | null }> } | null, acf_recipe: { recipeAverageRating: number | null, recepieCategories: Array<{ slug: string | null, name: string | null } | null> | null, skrivetAv: Array<{ name: string | null } | null> | null, time: { cookingTime: number | null, prepTime: number | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null, total: number | null } };

type RecipeListFields_GuestWriterToRecipeConnection_Fragment = { edges: Array<{ node: { id: string, title: string | null, slug: string | null, guestWriter: { nodes: Array<{ name: string | null }> } | null, acf_recipe: { recipeAverageRating: number | null, recepieCategories: Array<{ slug: string | null, name: string | null } | null> | null, skrivetAv: Array<{ name: string | null } | null> | null, time: { cookingTime: number | null, prepTime: number | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null, total: number | null } };

type RecipeListFields_PassarTillToRecipeConnection_Fragment = { edges: Array<{ node: { id: string, title: string | null, slug: string | null, guestWriter: { nodes: Array<{ name: string | null }> } | null, acf_recipe: { recipeAverageRating: number | null, recepieCategories: Array<{ slug: string | null, name: string | null } | null> | null, skrivetAv: Array<{ name: string | null } | null> | null, time: { cookingTime: number | null, prepTime: number | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null, total: number | null } };

type RecipeListFields_RecipeCategoryToRecipeConnection_Fragment = { edges: Array<{ node: { id: string, title: string | null, slug: string | null, guestWriter: { nodes: Array<{ name: string | null }> } | null, acf_recipe: { recipeAverageRating: number | null, recepieCategories: Array<{ slug: string | null, name: string | null } | null> | null, skrivetAv: Array<{ name: string | null } | null> | null, time: { cookingTime: number | null, prepTime: number | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null, total: number | null } };

type RecipeListFields_RecipeCuisineToRecipeConnection_Fragment = { edges: Array<{ node: { id: string, title: string | null, slug: string | null, guestWriter: { nodes: Array<{ name: string | null }> } | null, acf_recipe: { recipeAverageRating: number | null, recepieCategories: Array<{ slug: string | null, name: string | null } | null> | null, skrivetAv: Array<{ name: string | null } | null> | null, time: { cookingTime: number | null, prepTime: number | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null, total: number | null } };

type RecipeListFields_RecipeToRecipeConnection_Fragment = { edges: Array<{ node: { id: string, title: string | null, slug: string | null, guestWriter: { nodes: Array<{ name: string | null }> } | null, acf_recipe: { recipeAverageRating: number | null, recepieCategories: Array<{ slug: string | null, name: string | null } | null> | null, skrivetAv: Array<{ name: string | null } | null> | null, time: { cookingTime: number | null, prepTime: number | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null, total: number | null } };

type RecipeListFields_RootQueryToRecipeConnection_Fragment = { edges: Array<{ node: { id: string, title: string | null, slug: string | null, guestWriter: { nodes: Array<{ name: string | null }> } | null, acf_recipe: { recipeAverageRating: number | null, recepieCategories: Array<{ slug: string | null, name: string | null } | null> | null, skrivetAv: Array<{ name: string | null } | null> | null, time: { cookingTime: number | null, prepTime: number | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null, total: number | null } };

export type RecipeListFieldsFragment =
  | RecipeListFields_EnhetToRecipeConnection_Fragment
  | RecipeListFields_GuestWriterToRecipeConnection_Fragment
  | RecipeListFields_PassarTillToRecipeConnection_Fragment
  | RecipeListFields_RecipeCategoryToRecipeConnection_Fragment
  | RecipeListFields_RecipeCuisineToRecipeConnection_Fragment
  | RecipeListFields_RecipeToRecipeConnection_Fragment
  | RecipeListFields_RootQueryToRecipeConnection_Fragment
;

export type RecipesQueryVariables = Exact<{
  after?: string | null | undefined;
  before?: string | null | undefined;
  first?: number | null | undefined;
  last?: number | null | undefined;
  search?: string | null | undefined;
}>;


export type RecipesQuery = { recipes: { edges: Array<{ node: { id: string, title: string | null, slug: string | null, guestWriter: { nodes: Array<{ name: string | null }> } | null, acf_recipe: { recipeAverageRating: number | null, recepieCategories: Array<{ slug: string | null, name: string | null } | null> | null, skrivetAv: Array<{ name: string | null } | null> | null, time: { cookingTime: number | null, prepTime: number | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null, total: number | null } } | null };

export type RecipesByCategoryQueryVariables = Exact<{
  id: string | number;
  after?: string | null | undefined;
  before?: string | null | undefined;
  first?: number | null | undefined;
  last?: number | null | undefined;
  search?: string | null | undefined;
}>;


export type RecipesByCategoryQuery = { recipeCategory: { recipes: { edges: Array<{ node: { id: string, title: string | null, slug: string | null, guestWriter: { nodes: Array<{ name: string | null }> } | null, acf_recipe: { recipeAverageRating: number | null, recepieCategories: Array<{ slug: string | null, name: string | null } | null> | null, skrivetAv: Array<{ name: string | null } | null> | null, time: { cookingTime: number | null, prepTime: number | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null, total: number | null } } | null } | null };

export type ChefRecipesQueryVariables = Exact<{
  id: string | number;
  after?: string | null | undefined;
  before?: string | null | undefined;
  first?: number | null | undefined;
  last?: number | null | undefined;
  search?: string | null | undefined;
}>;


export type ChefRecipesQuery = { guestWriter: { name: string | null, recipes: { edges: Array<{ node: { id: string, title: string | null, slug: string | null, guestWriter: { nodes: Array<{ name: string | null }> } | null, acf_recipe: { recipeAverageRating: number | null, recepieCategories: Array<{ slug: string | null, name: string | null } | null> | null, skrivetAv: Array<{ name: string | null } | null> | null, time: { cookingTime: number | null, prepTime: number | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null, total: number | null } } | null } | null };

export type DrinkRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type DrinkRecipesQuery = { recipeCategory: { recipes: { nodes: Array<{ id: string, title: string | null, slug: string | null, guestWriter: { nodes: Array<{ name: string | null }> } | null, acf_recipe: { recipeAverageRating: number | null, recepieCategories: Array<{ slug: string | null, name: string | null } | null> | null, skrivetAv: Array<{ name: string | null } | null> | null, time: { cookingTime: number | null, prepTime: number | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }> } | null } | null };

export type RecipeCategoryQueryVariables = Exact<{
  id: string | number;
}>;


export type RecipeCategoryQuery = { recipeCategory: { name: string | null, slug: string | null, seo: { canonical: string | null, cornerstone: boolean | null, focuskw: string | null, metaDesc: string | null, metaKeywords: string | null, metaRobotsNofollow: string | null, metaRobotsNoindex: string | null, opengraphAuthor: string | null, opengraphDescription: string | null, opengraphModifiedTime: string | null, opengraphPublishedTime: string | null, opengraphPublisher: string | null, opengraphSiteName: string | null, opengraphTitle: string | null, opengraphType: string | null, opengraphUrl: string | null, title: string | null, twitterDescription: string | null, twitterTitle: string | null, breadcrumbs: Array<{ text: string | null, url: string | null } | null> | null, opengraphImage: { altText: string | null, mediaItemUrl: string | null } | null, twitterImage: { altText: string | null, mediaItemUrl: string | null } | null } | null } | null };

export type RecipeCategoryChildrenQueryVariables = Exact<{
  id: string | number;
  first?: number | null | undefined;
}>;


export type RecipeCategoryChildrenQuery = { recipeCategory: { children: { nodes: Array<{ slug: string | null }> } | null } | null };

export type FeaturedRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type FeaturedRecipesQuery = { page: { featured_recipes: { rubrik: string | null, utvaldaRecept: Array<{ __typename: 'Recipe', id: string, title: string | null, slug: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null } } | null, acf_recipe: { skrivetAv: Array<{ name: string | null } | null> | null } | null } | null> | null } | null } | null };

export type GrapeSitemapQueryVariables = Exact<{ [key: string]: never; }>;


export type GrapeSitemapQuery = { grapes: { nodes: Array<{ slug: string | null, modifiedGmt: string | null }> } | null };

export type DrinkSitemapQueryVariables = Exact<{ [key: string]: never; }>;


export type DrinkSitemapQuery = { drinks: { nodes: Array<{ slug: string | null, modifiedGmt: string | null }> } | null };

export type DrinkTipSitemapQueryVariables = Exact<{ [key: string]: never; }>;


export type DrinkTipSitemapQuery = { drinktips: { nodes: Array<{ slug: string | null, modifiedGmt: string | null }> } | null };

export type WordSitemapQueryVariables = Exact<{ [key: string]: never; }>;


export type WordSitemapQuery = { glossaries: { nodes: Array<{ slug: string | null, modifiedGmt: string | null }> } | null };

export type RecipeSitemapQueryVariables = Exact<{
  first: number;
  after?: string | null | undefined;
}>;


export type RecipeSitemapQuery = { recipes: { pageInfo: { hasNextPage: boolean, endCursor: string | null }, nodes: Array<{ slug: string | null, modifiedGmt: string | null }> } | null };

export type PostSitemapQueryVariables = Exact<{ [key: string]: never; }>;


export type PostSitemapQuery = { posts: { nodes: Array<{ slug: string | null, modifiedGmt: string | null, author: { node: { slug: string | null } } | null }> } | null };

export type PlaylistSitemapQueryVariables = Exact<{ [key: string]: never; }>;


export type PlaylistSitemapQuery = { playlists: { nodes: Array<{ slug: string | null }> } | null };

export type WineAtlasSitemapQueryVariables = Exact<{
  parent: string | number;
}>;


export type WineAtlasSitemapQuery = { pages: { nodes: Array<{ slug: string | null, modifiedGmt: string | null, children: { nodes: Array<
          | { slug: string | null, modifiedGmt: string | null }
          | { slug: string | null, modifiedGmt: string | null }
          | { slug: string | null, modifiedGmt: string | null }
          | { slug: string | null, modifiedGmt: string | null }
          | { slug: string | null, modifiedGmt: string | null }
          | { slug: string | null, modifiedGmt: string | null }
          | { slug: string | null, modifiedGmt: string | null }
          | { slug: string | null, modifiedGmt: string | null }
          | { slug: string | null, modifiedGmt: string | null }
          | { slug: string | null, modifiedGmt: string | null }
          | { slug: string | null, modifiedGmt: string | null }
          | { slug: string | null, modifiedGmt: string | null }
          | { slug: string | null, modifiedGmt: string | null }
        > } | null }> } | null };

export type WineSchoolSitemapQueryVariables = Exact<{
  parent: string | number;
}>;


export type WineSchoolSitemapQuery = { pages: { nodes: Array<{ slug: string | null, modifiedGmt: string | null }> } | null };

export type SuppliersQueryVariables = Exact<{
  after?: string | null | undefined;
  before?: string | null | undefined;
  first?: number | null | undefined;
  last?: number | null | undefined;
}>;


export type SuppliersQuery = { suppliers: { pageInfo: { endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null }, edges: Array<{ node: { excerpt: string | null, id: string, slug: string | null, title: string | null, featuredImage: { node: { id: string, altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } }> } | null };

export type SupplierQueryVariables = Exact<{
  id: string | number;
}>;


export type SupplierQuery = { leverantR: { title: string | null, content: string | null, excerpt: string | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, drycker_to_leverantor: { drycker: Array<
        | { __typename: 'Drink', id: string, title: string | null, slug: string | null, acf_drinks: { dryckestyper: { name: string | null } | null, forpackningar: { name: string | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
        | { __typename: 'Drinktip', id: string, title: string | null, slug: string | null, acf_dryckestips: { potentielltBetyg: number | null, betyget: number | null, dryckestyper: string | null, forpackningar: string | null, pris: string | null, passarTillRecept: Array<{ id: string, title: string | null, uri: string | null } | null> | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
        | Record<PropertyKey, never>
       | null> | null } | null } | null };

export type WordQueryVariables = Exact<{
  id: string | number;
}>;


export type WordQuery = { glossary: { id: string, content: string | null, title: string | null, modifiedGmt: string | null, slug: string | null, seo: { canonical: string | null, cornerstone: boolean | null, focuskw: string | null, metaDesc: string | null, metaKeywords: string | null, metaRobotsNofollow: string | null, metaRobotsNoindex: string | null, opengraphAuthor: string | null, opengraphDescription: string | null, opengraphModifiedTime: string | null, opengraphPublishedTime: string | null, opengraphPublisher: string | null, opengraphSiteName: string | null, opengraphTitle: string | null, opengraphType: string | null, opengraphUrl: string | null, readingTime: number | null, title: string | null, twitterDescription: string | null, twitterTitle: string | null, breadcrumbs: Array<{ text: string | null, url: string | null } | null> | null, opengraphImage: { altText: string | null, mediaItemUrl: string | null } | null, twitterImage: { altText: string | null, mediaItemUrl: string | null } | null } | null, featuredImage: { node: { altText: string | null, mediaItemUrl: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, GQL_Word_Content: { relateradTermer: Array<{ id: string, slug: string | null, title: string | null } | null> | null, hurAndvandsOrdet: { alternativ1: string | null, alternativ2: string | null, alternativ3: string | null } | null } | null } | null };

export type WordsByLetterQueryVariables = Exact<{
  id: string | number;
  after?: string | null | undefined;
  before?: string | null | undefined;
  first?: number | null | undefined;
  last?: number | null | undefined;
}>;


export type WordsByLetterQuery = { letter: { glossaries: { pageInfo: { hasNextPage: boolean, endCursor: string | null, hasPreviousPage: boolean, startCursor: string | null, total: number | null }, edges: Array<{ node: { slug: string | null, title: string | null, id: string } }> } | null } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const AdImageFieldsFragmentDoc = new TypedDocumentString(`
    fragment AdImageFields on MediaItem {
  mediaItemUrl
  id
  altText
  mediaDetails {
    width
    height
  }
}
    `, {"fragmentName":"AdImageFields"}) as unknown as TypedDocumentString<AdImageFieldsFragment, unknown>;
export const AdToppbannerFieldsFragmentDoc = new TypedDocumentString(`
    fragment AdToppbannerFields on Ad {
  id
  title
  acf_ads {
    link
    desktop: toppbanner {
      ...AdImageFields
    }
    mobile: mobilbanner {
      ...AdImageFields
    }
  }
}
    fragment AdImageFields on MediaItem {
  mediaItemUrl
  id
  altText
  mediaDetails {
    width
    height
  }
}`, {"fragmentName":"AdToppbannerFields"}) as unknown as TypedDocumentString<AdToppbannerFieldsFragment, unknown>;
export const AdMittenbannerFieldsFragmentDoc = new TypedDocumentString(`
    fragment AdMittenbannerFields on Ad {
  id
  title
  acf_ads {
    link
    desktop: mittenbanner {
      ...AdImageFields
    }
    mobile: mobilbanner {
      ...AdImageFields
    }
  }
}
    fragment AdImageFields on MediaItem {
  mediaItemUrl
  id
  altText
  mediaDetails {
    width
    height
  }
}`, {"fragmentName":"AdMittenbannerFields"}) as unknown as TypedDocumentString<AdMittenbannerFieldsFragment, unknown>;
export const AdSidobannerFieldsFragmentDoc = new TypedDocumentString(`
    fragment AdSidobannerFields on Ad {
  id
  title
  acf_ads {
    link
    desktop: sidobanner {
      ...AdImageFields
    }
    mobile: mobilbanner {
      ...AdImageFields
    }
  }
}
    fragment AdImageFields on MediaItem {
  mediaItemUrl
  id
  altText
  mediaDetails {
    width
    height
  }
}`, {"fragmentName":"AdSidobannerFields"}) as unknown as TypedDocumentString<AdSidobannerFieldsFragment, unknown>;
export const ImageFieldsFragmentDoc = new TypedDocumentString(`
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
    `, {"fragmentName":"ImageFields"}) as unknown as TypedDocumentString<ImageFieldsFragment, unknown>;
export const DrinkFieldsFragmentDoc = new TypedDocumentString(`
    fragment DrinkFields on Drink {
  title
  uri
  date
  acf_drinks {
    dryckestyper {
      slug
      name
    }
    passarTillRecept {
      ... on Recipe {
        id
        slug
        title
        featuredImage {
          node {
            ...ImageFields
          }
        }
        acf_recipe {
          desc
        }
      }
    }
    bolagetAdress
    beskrivning
    betyg
    ekologiskt
    forpackningar {
      name
    }
    omprovning
    vagn
    recension
    pris
    potentielltBetyg
  }
  featuredImage {
    node {
      id
      ...ImageFields
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}`, {"fragmentName":"DrinkFields"}) as unknown as TypedDocumentString<DrinkFieldsFragment, unknown>;
export const SeoFieldsFragmentDoc = new TypedDocumentString(`
    fragment SeoFields on PostTypeSEO {
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
  readingTime
  title
  twitterDescription
  twitterImage {
    altText
    mediaItemUrl
  }
  twitterTitle
}
    `, {"fragmentName":"SeoFields"}) as unknown as TypedDocumentString<SeoFieldsFragment, unknown>;
export const TaxonomySeoFieldsFragmentDoc = new TypedDocumentString(`
    fragment TaxonomySeoFields on TaxonomySEO {
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
}
    `, {"fragmentName":"TaxonomySeoFields"}) as unknown as TypedDocumentString<TaxonomySeoFieldsFragment, unknown>;
export const GrapeCardFieldsFragmentDoc = new TypedDocumentString(`
    fragment GrapeCardFields on GrapeConnection {
  edges {
    node {
      id
      title
      slug
      acf_grape {
        druvtyp {
          name
        }
      }
      featuredImage {
        node {
          ...ImageFields
        }
      }
    }
  }
  pageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
    total
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}`, {"fragmentName":"GrapeCardFields"}) as unknown as TypedDocumentString<GrapeCardFieldsFragment, unknown>;
export const FrontPageDrinktipFieldsFragmentDoc = new TypedDocumentString(`
    fragment FrontPageDrinktipFields on Drinktip {
  __typename
  id
  title
  slug
  featuredImage {
    node {
      ...ImageFields
    }
  }
  acf_dryckestips {
    betyget
    dryckestyper
    forpackningar
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}`, {"fragmentName":"FrontPageDrinktipFields"}) as unknown as TypedDocumentString<FrontPageDrinktipFieldsFragment, unknown>;
export const FrontPageRecipeFieldsFragmentDoc = new TypedDocumentString(`
    fragment FrontPageRecipeFields on Recipe {
  __typename
  id
  title
  slug
  featuredImage {
    node {
      ...ImageFields
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
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}`, {"fragmentName":"FrontPageRecipeFields"}) as unknown as TypedDocumentString<FrontPageRecipeFieldsFragment, unknown>;
export const LinkedCardImageFragmentDoc = new TypedDocumentString(`
    fragment LinkedCardImage on NodeWithFeaturedImage {
  featuredImage {
    node {
      ...ImageFields
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}`, {"fragmentName":"LinkedCardImage"}) as unknown as TypedDocumentString<LinkedCardImageFragment, unknown>;
export const PostCardFieldsFragmentDoc = new TypedDocumentString(`
    fragment PostCardFields on Post {
  id
  title
  slug
  modifiedGmt: dateGmt
  acf_posts {
    ingress
  }
  author {
    node {
      name
      slug
    }
  }
  featuredImage {
    node {
      ...ImageFields
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}`, {"fragmentName":"PostCardFields"}) as unknown as TypedDocumentString<PostCardFieldsFragment, unknown>;
export const AuthorFieldsFragmentDoc = new TypedDocumentString(`
    fragment AuthorFields on User {
  username
  nicename
  slug
  name
  description
  acf_user {
    email
    facebook
    instagram
    kortBeskrivning
    bild {
      ...ImageFields
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}`, {"fragmentName":"AuthorFields"}) as unknown as TypedDocumentString<AuthorFieldsFragment, unknown>;
export const PostBodyFieldsFragmentDoc = new TypedDocumentString(`
    fragment PostBodyFields on Post {
  acf_posts {
    ingress
    lasMer {
      ... on Post {
        __typename
        uri
        ...PostCardFields
        author {
          node {
            nicename
          }
        }
      }
      ... on Grape {
        __typename
        id
        title
        slug
        uri
        featuredImage {
          node {
            ...ImageFields
          }
        }
      }
      ... on Recipe {
        __typename
        id
        title
        slug
        uri
        featuredImage {
          node {
            ...ImageFields
          }
        }
      }
      ... on Page {
        __typename
        id
        title
        slug
        uri
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            ...ImageFields
          }
        }
      }
    }
    sektioner {
      ... on Post_AcfPosts_Sektioner_ExtraPuff {
        fieldGroupName
        extraPuff {
          ... on Drinktip {
            __typename
            title
            slug
            uri
            featuredImage {
              node {
                ...ImageFields
              }
            }
            acf_dryckestips {
              dryckestyper
              forpackningar
            }
          }
          ... on Grape {
            __typename
            title
            slug
            uri
            acf_grape {
              kortBeskrivning
            }
            featuredImage {
              node {
                ...ImageFields
              }
            }
          }
          ... on Drink {
            __typename
            title
            slug
            uri
            drinkTypes {
              edges {
                node {
                  name
                }
              }
            }
            featuredImage {
              node {
                ...ImageFields
              }
            }
          }
          ... on Recipe {
            __typename
            title
            slug
            uri
            acf_recipe {
              desc
            }
            passarTills {
              edges {
                node {
                  name
                }
              }
            }
            featuredImage {
              node {
                ...ImageFields
              }
            }
          }
        }
      }
      ... on Post_AcfPosts_Sektioner_Video {
        fieldGroupName
        url
      }
      ... on Post_AcfPosts_Sektioner_Brodtext {
        text
        fieldGroupName
      }
      ... on Post_AcfPosts_Sektioner_Citat {
        fieldGroupName
        text
      }
      ... on Post_AcfPosts_Sektioner_Mellanbild {
        fieldGroupName
        iGalleri
        img {
          ...ImageFields
        }
      }
      ... on Post_AcfPosts_Sektioner_StorBild {
        fieldGroupName
        iGalleri
        img {
          ...ImageFields
        }
      }
      ... on Post_AcfPosts_Sektioner_Faktalada {
        text
        fieldGroupName
      }
    }
  }
  featuredImage {
    node {
      ...ImageFields
    }
  }
  author {
    node {
      ...AuthorFields
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
fragment PostCardFields on Post {
  id
  title
  slug
  modifiedGmt: dateGmt
  acf_posts {
    ingress
  }
  author {
    node {
      name
      slug
    }
  }
  featuredImage {
    node {
      ...ImageFields
    }
  }
}
fragment AuthorFields on User {
  username
  nicename
  slug
  name
  description
  acf_user {
    email
    facebook
    instagram
    kortBeskrivning
    bild {
      ...ImageFields
    }
  }
}`, {"fragmentName":"PostBodyFields"}) as unknown as TypedDocumentString<PostBodyFieldsFragment, unknown>;
export const PreviewPostFieldsFragmentDoc = new TypedDocumentString(`
    fragment PreviewPostFields on Post {
  title
  slug
  uri
  modifiedGmt
  ...PostBodyFields
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
fragment PostCardFields on Post {
  id
  title
  slug
  modifiedGmt: dateGmt
  acf_posts {
    ingress
  }
  author {
    node {
      name
      slug
    }
  }
  featuredImage {
    node {
      ...ImageFields
    }
  }
}
fragment AuthorFields on User {
  username
  nicename
  slug
  name
  description
  acf_user {
    email
    facebook
    instagram
    kortBeskrivning
    bild {
      ...ImageFields
    }
  }
}
fragment PostBodyFields on Post {
  acf_posts {
    ingress
    lasMer {
      ... on Post {
        __typename
        uri
        ...PostCardFields
        author {
          node {
            nicename
          }
        }
      }
      ... on Grape {
        __typename
        id
        title
        slug
        uri
        featuredImage {
          node {
            ...ImageFields
          }
        }
      }
      ... on Recipe {
        __typename
        id
        title
        slug
        uri
        featuredImage {
          node {
            ...ImageFields
          }
        }
      }
      ... on Page {
        __typename
        id
        title
        slug
        uri
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            ...ImageFields
          }
        }
      }
    }
    sektioner {
      ... on Post_AcfPosts_Sektioner_ExtraPuff {
        fieldGroupName
        extraPuff {
          ... on Drinktip {
            __typename
            title
            slug
            uri
            featuredImage {
              node {
                ...ImageFields
              }
            }
            acf_dryckestips {
              dryckestyper
              forpackningar
            }
          }
          ... on Grape {
            __typename
            title
            slug
            uri
            acf_grape {
              kortBeskrivning
            }
            featuredImage {
              node {
                ...ImageFields
              }
            }
          }
          ... on Drink {
            __typename
            title
            slug
            uri
            drinkTypes {
              edges {
                node {
                  name
                }
              }
            }
            featuredImage {
              node {
                ...ImageFields
              }
            }
          }
          ... on Recipe {
            __typename
            title
            slug
            uri
            acf_recipe {
              desc
            }
            passarTills {
              edges {
                node {
                  name
                }
              }
            }
            featuredImage {
              node {
                ...ImageFields
              }
            }
          }
        }
      }
      ... on Post_AcfPosts_Sektioner_Video {
        fieldGroupName
        url
      }
      ... on Post_AcfPosts_Sektioner_Brodtext {
        text
        fieldGroupName
      }
      ... on Post_AcfPosts_Sektioner_Citat {
        fieldGroupName
        text
      }
      ... on Post_AcfPosts_Sektioner_Mellanbild {
        fieldGroupName
        iGalleri
        img {
          ...ImageFields
        }
      }
      ... on Post_AcfPosts_Sektioner_StorBild {
        fieldGroupName
        iGalleri
        img {
          ...ImageFields
        }
      }
      ... on Post_AcfPosts_Sektioner_Faktalada {
        text
        fieldGroupName
      }
    }
  }
  featuredImage {
    node {
      ...ImageFields
    }
  }
  author {
    node {
      ...AuthorFields
    }
  }
}`, {"fragmentName":"PreviewPostFields"}) as unknown as TypedDocumentString<PreviewPostFieldsFragment, unknown>;
export const SchoolPostFieldsFragmentDoc = new TypedDocumentString(`
    fragment SchoolPostFields on ContentNode {
  __typename
  id
  uri
  slug
  modifiedGmt
}
    `, {"fragmentName":"SchoolPostFields"}) as unknown as TypedDocumentString<SchoolPostFieldsFragment, unknown>;
export const RecipeFieldsFragmentDoc = new TypedDocumentString(`
    fragment RecipeFields on Recipe {
  title
  featuredImage {
    node {
      title
      ...ImageFields
    }
  }
  acf_recipe {
    desc
    processen
    recipeAverageRating
    recipeRatingCount
    ingredienserOvrigt
    antalPortioner
    receptdelar {
      rubrik
      ingredienser {
        antal
        enhet {
          name
        }
        namn
      }
    }
    beskrivningStegForSteg {
      instruktion
    }
    skrivetAv {
      slug
      name
      id
    }
    recepieCategories {
      id
      slug
      uri
      name
    }
    kok {
      name
      slug
      id
    }
    passandeDrycker {
      ... on Drink {
        id
        slug
        title
        acf_drinks {
          dryckestyper {
            name
          }
          forpackningar {
            name
          }
        }
        featuredImage {
          node {
            ...ImageFields
          }
        }
      }
    }
    time {
      cookingTime
      prepTime
    }
    bilder {
      kortBeskrivning
      img {
        id
        ...ImageFields
      }
    }
    nutritions {
      energKcal
      fett
      fieldGroupName
      kolhydrater
      protein
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}`, {"fragmentName":"RecipeFields"}) as unknown as TypedDocumentString<RecipeFieldsFragment, unknown>;
export const RecipeCardFieldsFragmentDoc = new TypedDocumentString(`
    fragment RecipeCardFields on Recipe {
  guestWriter {
    nodes {
      name
    }
  }
  acf_recipe {
    recepieCategories {
      slug
      name
    }
    skrivetAv {
      name
    }
    time {
      cookingTime
      prepTime
    }
    recipeAverageRating
  }
  id
  title
  slug
  featuredImage {
    node {
      ...ImageFields
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}`, {"fragmentName":"RecipeCardFields"}) as unknown as TypedDocumentString<RecipeCardFieldsFragment, unknown>;
export const RecipeListFieldsFragmentDoc = new TypedDocumentString(`
    fragment RecipeListFields on RecipeConnection {
  edges {
    node {
      ...RecipeCardFields
    }
  }
  pageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
    total
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
fragment RecipeCardFields on Recipe {
  guestWriter {
    nodes {
      name
    }
  }
  acf_recipe {
    recepieCategories {
      slug
      name
    }
    skrivetAv {
      name
    }
    time {
      cookingTime
      prepTime
    }
    recipeAverageRating
  }
  id
  title
  slug
  featuredImage {
    node {
      ...ImageFields
    }
  }
}`, {"fragmentName":"RecipeListFields"}) as unknown as TypedDocumentString<RecipeListFieldsFragment, unknown>;
export const DefaultAdsDocument = new TypedDocumentString(`
    query DefaultAds {
  options: acfOptionsAnnonsplaceringar {
    settings: acf_adsettings {
      top: adToppbanner {
        banner {
          ...AdToppbannerFields
        }
      }
      mid: adMittenbanner {
        banner {
          ...AdMittenbannerFields
        }
      }
      bottom: adSidobanner {
        banner {
          ...AdSidobannerFields
        }
      }
      fallback: fallbackannons {
        ...AdToppbannerFields
      }
    }
  }
}
    fragment AdImageFields on MediaItem {
  mediaItemUrl
  id
  altText
  mediaDetails {
    width
    height
  }
}
fragment AdToppbannerFields on Ad {
  id
  title
  acf_ads {
    link
    desktop: toppbanner {
      ...AdImageFields
    }
    mobile: mobilbanner {
      ...AdImageFields
    }
  }
}
fragment AdMittenbannerFields on Ad {
  id
  title
  acf_ads {
    link
    desktop: mittenbanner {
      ...AdImageFields
    }
    mobile: mobilbanner {
      ...AdImageFields
    }
  }
}
fragment AdSidobannerFields on Ad {
  id
  title
  acf_ads {
    link
    desktop: sidobanner {
      ...AdImageFields
    }
    mobile: mobilbanner {
      ...AdImageFields
    }
  }
}`) as unknown as TypedDocumentString<DefaultAdsQuery, DefaultAdsQueryVariables>;
export const DlAdsDocument = new TypedDocumentString(`
    query DlAds {
  options: acfOptionsAnnonsplaceringar {
    settings: acf_adsettings {
      top: adToppbannerDl {
        banner {
          ...AdToppbannerFields
        }
      }
      mid: adMittenbannerDl {
        banner {
          ...AdMittenbannerFields
        }
      }
      bottom: adSidobannerDl {
        banner {
          ...AdToppbannerFields
        }
      }
      fallback: fallbackannonsDl {
        ...AdToppbannerFields
      }
    }
  }
}
    fragment AdImageFields on MediaItem {
  mediaItemUrl
  id
  altText
  mediaDetails {
    width
    height
  }
}
fragment AdToppbannerFields on Ad {
  id
  title
  acf_ads {
    link
    desktop: toppbanner {
      ...AdImageFields
    }
    mobile: mobilbanner {
      ...AdImageFields
    }
  }
}
fragment AdMittenbannerFields on Ad {
  id
  title
  acf_ads {
    link
    desktop: mittenbanner {
      ...AdImageFields
    }
    mobile: mobilbanner {
      ...AdImageFields
    }
  }
}`) as unknown as TypedDocumentString<DlAdsQuery, DlAdsQueryVariables>;
export const AuthorDocument = new TypedDocumentString(`
    query Author($id: ID!, $search: String) {
  user(id: $id, idType: USERNAME) {
    username
    name
    firstName
    description
    seo {
      metaDesc
      title
      social {
        facebook
        instagram
        linkedIn
        mySpace
        soundCloud
        pinterest
        twitter
        wikipedia
        youTube
      }
    }
    acf_user {
      email
      extratitel
      facebook
      instagram
      kortBeskrivning
      twitter
      bildExtra {
        title
        ...ImageFields
      }
      bild {
        title
        ...ImageFields
      }
    }
    posts(where: { search: $search }) {
      pageInfo {
        total
      }
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}`) as unknown as TypedDocumentString<AuthorQuery, AuthorQueryVariables>;
export const AuthorsDocument = new TypedDocumentString(`
    query Authors {
  acfOptionsSkribenter {
    acf_skribenter {
      skribenter {
        name
        slug
        id
        description
        posts(first: 4) {
          nodes {
            ...PostCardFields
          }
        }
        acf_user {
          bildExtra {
            ...ImageFields
          }
          instagram
          facebook
          twitter
          email
          bild {
            ...ImageFields
          }
        }
      }
      medarbetare {
        name
        slug
        id
        description
        posts(first: 4) {
          nodes {
            ...PostCardFields
          }
        }
        acf_user {
          instagram
          facebook
          twitter
          email
          kortBeskrivning
          bild {
            ...ImageFields
          }
        }
      }
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
fragment PostCardFields on Post {
  id
  title
  slug
  modifiedGmt: dateGmt
  acf_posts {
    ingress
  }
  author {
    node {
      name
      slug
    }
  }
  featuredImage {
    node {
      ...ImageFields
    }
  }
}`) as unknown as TypedDocumentString<AuthorsQuery, AuthorsQueryVariables>;
export const DrinkTipsDocument = new TypedDocumentString(`
    query DrinkTips($after: String, $before: String, $first: Int, $last: Int) {
  drinktips(after: $after, before: $before, first: $first, last: $last) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      total
    }
    edges {
      node {
        title
        slug
        uri
        drinktipId
        id
        modifiedGmt
        featuredImage {
          node {
            ...ImageFields
          }
        }
        acf_dryckestips {
          potentielltBetyg
          betyget
          dryckestyper
          forpackningar
          pris
          passarTillRecept {
            ... on Recipe {
              id
              title
              uri
            }
          }
        }
      }
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}`) as unknown as TypedDocumentString<DrinkTipsQuery, DrinkTipsQueryVariables>;
export const DrinkTipDocument = new TypedDocumentString(`
    query DrinkTip($id: ID!) {
  drinktip(idType: URI, id: $id) {
    seo {
      ...SeoFields
    }
    title
    date
    id
    slug
    uri
    modifiedGmt
    leverantorer_to_drink {
      leverantorer {
        ... on LeverantR {
          id
          title
          slug
          databaseId
        }
      }
    }
    featuredImage {
      node {
        ...ImageFields
      }
    }
    acf_dryckestips {
      potentielltBetyg
      betyget
      pris
      dryckestyper
      ekologiskt
      forpackningar
      recension
      bolagetAdress
      knappUrl
      beskrivning
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
fragment SeoFields on PostTypeSEO {
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
  readingTime
  title
  twitterDescription
  twitterImage {
    altText
    mediaItemUrl
  }
  twitterTitle
}`) as unknown as TypedDocumentString<DrinkTipQuery, DrinkTipQueryVariables>;
export const DrinkDocument = new TypedDocumentString(`
    query Drink($id: ID!) {
  drink(id: $id, idType: URI) {
    slug
    seo {
      ...SeoFields
    }
    modifiedGmt
    leverantorer_to_drink {
      leverantorer {
        ... on LeverantR {
          id
          title
          slug
          databaseId
        }
      }
    }
    ...DrinkFields
  }
}
    fragment DrinkFields on Drink {
  title
  uri
  date
  acf_drinks {
    dryckestyper {
      slug
      name
    }
    passarTillRecept {
      ... on Recipe {
        id
        slug
        title
        featuredImage {
          node {
            ...ImageFields
          }
        }
        acf_recipe {
          desc
        }
      }
    }
    bolagetAdress
    beskrivning
    betyg
    ekologiskt
    forpackningar {
      name
    }
    omprovning
    vagn
    recension
    pris
    potentielltBetyg
  }
  featuredImage {
    node {
      id
      ...ImageFields
    }
  }
}
fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
fragment SeoFields on PostTypeSEO {
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
  readingTime
  title
  twitterDescription
  twitterImage {
    altText
    mediaItemUrl
  }
  twitterTitle
}`) as unknown as TypedDocumentString<DrinkQuery, DrinkQueryVariables>;
export const PreviewDrinkDocument = new TypedDocumentString(`
    query PreviewDrink($id: ID!) {
  drink(idType: DATABASE_ID, id: $id) {
    ...DrinkFields
    preview {
      node {
        ...DrinkFields
      }
    }
  }
}
    fragment DrinkFields on Drink {
  title
  uri
  date
  acf_drinks {
    dryckestyper {
      slug
      name
    }
    passarTillRecept {
      ... on Recipe {
        id
        slug
        title
        featuredImage {
          node {
            ...ImageFields
          }
        }
        acf_recipe {
          desc
        }
      }
    }
    bolagetAdress
    beskrivning
    betyg
    ekologiskt
    forpackningar {
      name
    }
    omprovning
    vagn
    recension
    pris
    potentielltBetyg
  }
  featuredImage {
    node {
      id
      ...ImageFields
    }
  }
}
fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}`) as unknown as TypedDocumentString<PreviewDrinkQuery, PreviewDrinkQueryVariables>;
export const DrinksDocument = new TypedDocumentString(`
    query Drinks($after: String, $before: String, $first: Int, $last: Int) {
  drinks(after: $after, before: $before, first: $first, last: $last) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      total
    }
    edges {
      cursor
      node {
        slug
        title
        id
        acf_drinks {
          dryckestyper {
            name
          }
          forpackningar {
            name
          }
        }
        featuredImage {
          node {
            ...ImageFields
          }
        }
      }
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}`) as unknown as TypedDocumentString<DrinksQuery, DrinksQueryVariables>;
export const ToplistPathsDocument = new TypedDocumentString(`
    query ToplistPaths {
  pageBy(uri: "topplistor") {
    id
    acf_topplistor {
      aktivaTopplistor {
        ... on Toplist {
          __typename
          uri
          slug
          modifiedGmt
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<ToplistPathsQuery, ToplistPathsQueryVariables>;
export const ToplistsDocument = new TypedDocumentString(`
    query Toplists {
  pageBy(uri: "topplistor") {
    id
    acf_topplistor {
      aktivaTopplistor {
        ... on Toplist {
          __typename
          id
          uri
          title
          slug
          featuredImage {
            node {
              ...ImageFields
            }
          }
          seo {
            ...SeoFields
          }
          acf_toplists {
            ekologiskt
            maxAntal
            slogan
            dryckestyper {
              name
            }
            forpackningar {
              name
            }
          }
        }
      }
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
fragment SeoFields on PostTypeSEO {
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
  readingTime
  title
  twitterDescription
  twitterImage {
    altText
    mediaItemUrl
  }
  twitterTitle
}`) as unknown as TypedDocumentString<ToplistsQuery, ToplistsQueryVariables>;
export const ToplistDrinksDocument = new TypedDocumentString(`
    query ToplistDrinks($afterYear: Int!, $afterMonth: Int!, $afterDay: Int!, $beforeYear: Int!, $beforeMonth: Int!, $beforeDay: Int!, $batch: Int!, $cursor: String!) {
  drinks(
    where: {
      dateQuery: {
        after: { year: $afterYear, month: $afterMonth, day: $afterDay }
        before: { year: $beforeYear, month: $beforeMonth, day: $beforeDay }
      }
    }
    first: $batch
    after: $cursor
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        date
        uri
        title
        slug
        leverantorer_to_drink {
          leverantorer {
            ... on LeverantR {
              id
              title
              slug
              databaseId
            }
          }
        }
        acf_drinks {
          ekologiskt
          betyg
          pris
          recension
          beskrivning
          dryckestyper {
            name
          }
          forpackningar {
            name
          }
          passarTillRecept {
            ... on Recipe {
              title
              slug
              uri
            }
          }
        }
        featuredImage {
          node {
            ...ImageFields
          }
        }
      }
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}`) as unknown as TypedDocumentString<ToplistDrinksQuery, ToplistDrinksQueryVariables>;
export const GrapeDocument = new TypedDocumentString(`
    query Grape($id: ID!) {
  grape(id: $id, idType: URI) {
    id
    slug
    seo {
      ...SeoFields
    }
    acf_grape {
      kortBeskrivning
      text
      druvtyp {
        name
        slug
      }
    }
    title
    featuredImage {
      node {
        altText
        mediaItemUrl
      }
    }
  }
}
    fragment SeoFields on PostTypeSEO {
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
  readingTime
  title
  twitterDescription
  twitterImage {
    altText
    mediaItemUrl
  }
  twitterTitle
}`) as unknown as TypedDocumentString<GrapeQuery, GrapeQueryVariables>;
export const GrapeSlugsDocument = new TypedDocumentString(`
    query GrapeSlugs {
  grapes {
    nodes {
      slug
    }
  }
}
    `) as unknown as TypedDocumentString<GrapeSlugsQuery, GrapeSlugsQueryVariables>;
export const GrapesDocument = new TypedDocumentString(`
    query Grapes($last: Int, $first: Int, $before: String, $after: String, $search: String) {
  grapes(
    after: $after
    first: $first
    last: $last
    before: $before
    where: { search: $search }
  ) {
    ...GrapeCardFields
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
fragment GrapeCardFields on GrapeConnection {
  edges {
    node {
      id
      title
      slug
      acf_grape {
        druvtyp {
          name
        }
      }
      featuredImage {
        node {
          ...ImageFields
        }
      }
    }
  }
  pageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
    total
  }
}`) as unknown as TypedDocumentString<GrapesQuery, GrapesQueryVariables>;
export const GrapesByTypeDocument = new TypedDocumentString(`
    query GrapesByType($id: ID!, $last: Int, $first: Int, $before: String, $after: String, $search: String) {
  grapeType(id: $id, idType: SLUG) {
    name
    grapes(
      after: $after
      first: $first
      last: $last
      before: $before
      where: { search: $search }
    ) {
      ...GrapeCardFields
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
fragment GrapeCardFields on GrapeConnection {
  edges {
    node {
      id
      title
      slug
      acf_grape {
        druvtyp {
          name
        }
      }
      featuredImage {
        node {
          ...ImageFields
        }
      }
    }
  }
  pageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
    total
  }
}`) as unknown as TypedDocumentString<GrapesByTypeQuery, GrapesByTypeQueryVariables>;
export const ChildPagesDocument = new TypedDocumentString(`
    query ChildPages($parent: ID!, $after: String, $before: String, $first: Int, $last: Int, $search: String) {
  pages(
    where: { orderby: { field: TITLE, order: ASC }, parent: $parent, search: $search }
    after: $after
    before: $before
    first: $first
    last: $last
  ) {
    edges {
      node {
        id
        uri
        slug
        title
        featuredImage {
          node {
            ...ImageFields
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      total
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}`) as unknown as TypedDocumentString<ChildPagesQuery, ChildPagesQueryVariables>;
export const PageDocument = new TypedDocumentString(`
    query Page($id: ID!) {
  page(id: $id, idType: URI) {
    slug
    title
    content
    page_content {
      intro
    }
    acf_explorer {
      slogan
    }
    author {
      node {
        ...AuthorFields
      }
    }
    seo {
      ...SeoFields
    }
    featuredImage {
      node {
        title
        ...ImageFields
      }
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
fragment SeoFields on PostTypeSEO {
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
  readingTime
  title
  twitterDescription
  twitterImage {
    altText
    mediaItemUrl
  }
  twitterTitle
}
fragment AuthorFields on User {
  username
  nicename
  slug
  name
  description
  acf_user {
    email
    facebook
    instagram
    kortBeskrivning
    bild {
      ...ImageFields
    }
  }
}`) as unknown as TypedDocumentString<PageQuery, PageQueryVariables>;
export const FrontPageDocument = new TypedDocumentString(`
    query FrontPage {
  page(id: "/", idType: URI) {
    content
    seo {
      title
      metaDesc
    }
    featuredImage {
      node {
        ...ImageFields
      }
    }
    GQL_frontPageFields {
      highlightedArticles {
        ... on Post {
          __typename
          ...PostCardFields
        }
      }
      highlightedDryckestips {
        ...FrontPageDrinktipFields
      }
      highlightedRecept {
        ...FrontPageRecipeFields
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
      __typename
      ...PostCardFields
    }
  }
  drinktips(first: 4) {
    nodes {
      ...FrontPageDrinktipFields
    }
  }
  recipes(first: 7) {
    nodes {
      ...FrontPageRecipeFields
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
fragment PostCardFields on Post {
  id
  title
  slug
  modifiedGmt: dateGmt
  acf_posts {
    ingress
  }
  author {
    node {
      name
      slug
    }
  }
  featuredImage {
    node {
      ...ImageFields
    }
  }
}
fragment FrontPageDrinktipFields on Drinktip {
  __typename
  id
  title
  slug
  featuredImage {
    node {
      ...ImageFields
    }
  }
  acf_dryckestips {
    betyget
    dryckestyper
    forpackningar
  }
}
fragment FrontPageRecipeFields on Recipe {
  __typename
  id
  title
  slug
  featuredImage {
    node {
      ...ImageFields
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
}`) as unknown as TypedDocumentString<FrontPageQuery, FrontPageQueryVariables>;
export const RecipePageDocument = new TypedDocumentString(`
    query RecipePage {
  page(id: "recept", idType: URI) {
    page_content {
      intro
    }
  }
  recipes(first: 3) {
    nodes {
      title
      slug
      id
      modifiedGmt: dateGmt
      featuredImage {
        node {
          title
          ...ImageFields
        }
      }
      acf_recipe {
        recepieCategories {
          id
          name
          slug
        }
        skrivetAv {
          name
          id
          slug
        }
      }
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}`) as unknown as TypedDocumentString<RecipePageQuery, RecipePageQueryVariables>;
export const TopListsDocument = new TypedDocumentString(`
    query TopLists {
  page(id: "/topplistor", idType: URI) {
    acf_topplistor {
      aktivaTopplistor {
        ... on Toplist {
          __typename
          id
          title
          slug
          acf_toplists {
            slogan
            toplistImg {
              desktop {
                title
                ...ImageFields
              }
              mobile {
                title
                ...ImageFields
              }
            }
          }
          forpackningar {
            nodes {
              name
            }
          }
        }
      }
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}`) as unknown as TypedDocumentString<TopListsQuery, TopListsQueryVariables>;
export const WineAtlasPageDocument = new TypedDocumentString(`
    query WineAtlasPage($id: ID!) {
  page(id: $id, idType: URI) {
    title
    content
    id
    uri
    slug
    modifiedGmt
    featuredImage {
      node {
        ...ImageFields
      }
    }
    author {
      node {
        ...AuthorFields
      }
    }
    acf_overviewPage {
      ingress
    }
    acf_posts {
      sektioner {
        ... on Page_AcfPosts_Sektioner_ExtraPuff {
          fieldGroupName
          extraPuff {
            ... on Grape {
              title
              slug
              uri
              acf_grape {
                kortBeskrivning
              }
              ...LinkedCardImage
            }
            ... on Drink {
              title
              slug
              uri
              drinkTypes {
                edges {
                  node {
                    name
                  }
                }
              }
              ...LinkedCardImage
            }
            ... on Recipe {
              title
              slug
              uri
              passarTills {
                edges {
                  node {
                    name
                  }
                }
              }
              ...LinkedCardImage
            }
          }
        }
        ... on Page_AcfPosts_Sektioner_Brodtext {
          text
          fieldGroupName
        }
        ... on Page_AcfPosts_Sektioner_Citat {
          fieldGroupName
          text
        }
        ... on Page_AcfPosts_Sektioner_Mellanbild {
          fieldGroupName
          iGalleri
          img {
            ...ImageFields
          }
        }
        ... on Page_AcfPosts_Sektioner_StorBild {
          fieldGroupName
          iGalleri
          img {
            ...ImageFields
          }
        }
        ... on Page_AcfPosts_Sektioner_Faktalada {
          text
          fieldGroupName
        }
      }
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
fragment AuthorFields on User {
  username
  nicename
  slug
  name
  description
  acf_user {
    email
    facebook
    instagram
    kortBeskrivning
    bild {
      ...ImageFields
    }
  }
}
fragment LinkedCardImage on NodeWithFeaturedImage {
  featuredImage {
    node {
      ...ImageFields
    }
  }
}`) as unknown as TypedDocumentString<WineAtlasPageQuery, WineAtlasPageQueryVariables>;
export const PlaylistDocument = new TypedDocumentString(`
    query Playlist($id: ID!) {
  acfOptionsInstallningarTv {
    tvOptionsPage {
      vintvTitle
      vintvIngress
      vintvBillboardBild {
        mediaItemUrl
      }
      vintvBillboardDelay
      vintvBillboardLink
      vintvBillboardLinkWindow
      vintvBillboardShow
      vintvBillboardText
    }
  }
  playlist(idType: URI, id: $id) {
    name
    slug
    description
    acf_tvSpellistor {
      thumbnail
      desc
    }
    seo {
      metaDesc
      title
      opengraphTitle
      opengraphDescription
      opengraphImage {
        mediaItemUrl
      }
    }
    episodes {
      edges {
        node {
          id
          title
          seo {
            metaDesc
            title
            opengraphTitle
            opengraphDescription
            opengraphImage {
              mediaItemUrl
            }
          }
          acf_episode {
            thumbnail
            beskrivning
            videoId
          }
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<PlaylistQuery, PlaylistQueryVariables>;
export const PostDocument = new TypedDocumentString(`
    query Post($id: ID!) {
  post(idType: URI, id: $id) {
    title
    slug
    uri
    content
    modifiedGmt: dateGmt
    seo {
      ...SeoFields
    }
    acf_oldcontent {
      oldContentAcf
    }
    ...PostBodyFields
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
fragment SeoFields on PostTypeSEO {
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
  readingTime
  title
  twitterDescription
  twitterImage {
    altText
    mediaItemUrl
  }
  twitterTitle
}
fragment PostCardFields on Post {
  id
  title
  slug
  modifiedGmt: dateGmt
  acf_posts {
    ingress
  }
  author {
    node {
      name
      slug
    }
  }
  featuredImage {
    node {
      ...ImageFields
    }
  }
}
fragment AuthorFields on User {
  username
  nicename
  slug
  name
  description
  acf_user {
    email
    facebook
    instagram
    kortBeskrivning
    bild {
      ...ImageFields
    }
  }
}
fragment PostBodyFields on Post {
  acf_posts {
    ingress
    lasMer {
      ... on Post {
        __typename
        uri
        ...PostCardFields
        author {
          node {
            nicename
          }
        }
      }
      ... on Grape {
        __typename
        id
        title
        slug
        uri
        featuredImage {
          node {
            ...ImageFields
          }
        }
      }
      ... on Recipe {
        __typename
        id
        title
        slug
        uri
        featuredImage {
          node {
            ...ImageFields
          }
        }
      }
      ... on Page {
        __typename
        id
        title
        slug
        uri
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            ...ImageFields
          }
        }
      }
    }
    sektioner {
      ... on Post_AcfPosts_Sektioner_ExtraPuff {
        fieldGroupName
        extraPuff {
          ... on Drinktip {
            __typename
            title
            slug
            uri
            featuredImage {
              node {
                ...ImageFields
              }
            }
            acf_dryckestips {
              dryckestyper
              forpackningar
            }
          }
          ... on Grape {
            __typename
            title
            slug
            uri
            acf_grape {
              kortBeskrivning
            }
            featuredImage {
              node {
                ...ImageFields
              }
            }
          }
          ... on Drink {
            __typename
            title
            slug
            uri
            drinkTypes {
              edges {
                node {
                  name
                }
              }
            }
            featuredImage {
              node {
                ...ImageFields
              }
            }
          }
          ... on Recipe {
            __typename
            title
            slug
            uri
            acf_recipe {
              desc
            }
            passarTills {
              edges {
                node {
                  name
                }
              }
            }
            featuredImage {
              node {
                ...ImageFields
              }
            }
          }
        }
      }
      ... on Post_AcfPosts_Sektioner_Video {
        fieldGroupName
        url
      }
      ... on Post_AcfPosts_Sektioner_Brodtext {
        text
        fieldGroupName
      }
      ... on Post_AcfPosts_Sektioner_Citat {
        fieldGroupName
        text
      }
      ... on Post_AcfPosts_Sektioner_Mellanbild {
        fieldGroupName
        iGalleri
        img {
          ...ImageFields
        }
      }
      ... on Post_AcfPosts_Sektioner_StorBild {
        fieldGroupName
        iGalleri
        img {
          ...ImageFields
        }
      }
      ... on Post_AcfPosts_Sektioner_Faktalada {
        text
        fieldGroupName
      }
    }
  }
  featuredImage {
    node {
      ...ImageFields
    }
  }
  author {
    node {
      ...AuthorFields
    }
  }
}`) as unknown as TypedDocumentString<PostQuery, PostQueryVariables>;
export const PreviewPostDocument = new TypedDocumentString(`
    query PreviewPost($id: ID!) {
  post(idType: DATABASE_ID, id: $id) {
    ...PreviewPostFields
    preview {
      node {
        ...PreviewPostFields
      }
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
fragment PostCardFields on Post {
  id
  title
  slug
  modifiedGmt: dateGmt
  acf_posts {
    ingress
  }
  author {
    node {
      name
      slug
    }
  }
  featuredImage {
    node {
      ...ImageFields
    }
  }
}
fragment AuthorFields on User {
  username
  nicename
  slug
  name
  description
  acf_user {
    email
    facebook
    instagram
    kortBeskrivning
    bild {
      ...ImageFields
    }
  }
}
fragment PostBodyFields on Post {
  acf_posts {
    ingress
    lasMer {
      ... on Post {
        __typename
        uri
        ...PostCardFields
        author {
          node {
            nicename
          }
        }
      }
      ... on Grape {
        __typename
        id
        title
        slug
        uri
        featuredImage {
          node {
            ...ImageFields
          }
        }
      }
      ... on Recipe {
        __typename
        id
        title
        slug
        uri
        featuredImage {
          node {
            ...ImageFields
          }
        }
      }
      ... on Page {
        __typename
        id
        title
        slug
        uri
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            ...ImageFields
          }
        }
      }
    }
    sektioner {
      ... on Post_AcfPosts_Sektioner_ExtraPuff {
        fieldGroupName
        extraPuff {
          ... on Drinktip {
            __typename
            title
            slug
            uri
            featuredImage {
              node {
                ...ImageFields
              }
            }
            acf_dryckestips {
              dryckestyper
              forpackningar
            }
          }
          ... on Grape {
            __typename
            title
            slug
            uri
            acf_grape {
              kortBeskrivning
            }
            featuredImage {
              node {
                ...ImageFields
              }
            }
          }
          ... on Drink {
            __typename
            title
            slug
            uri
            drinkTypes {
              edges {
                node {
                  name
                }
              }
            }
            featuredImage {
              node {
                ...ImageFields
              }
            }
          }
          ... on Recipe {
            __typename
            title
            slug
            uri
            acf_recipe {
              desc
            }
            passarTills {
              edges {
                node {
                  name
                }
              }
            }
            featuredImage {
              node {
                ...ImageFields
              }
            }
          }
        }
      }
      ... on Post_AcfPosts_Sektioner_Video {
        fieldGroupName
        url
      }
      ... on Post_AcfPosts_Sektioner_Brodtext {
        text
        fieldGroupName
      }
      ... on Post_AcfPosts_Sektioner_Citat {
        fieldGroupName
        text
      }
      ... on Post_AcfPosts_Sektioner_Mellanbild {
        fieldGroupName
        iGalleri
        img {
          ...ImageFields
        }
      }
      ... on Post_AcfPosts_Sektioner_StorBild {
        fieldGroupName
        iGalleri
        img {
          ...ImageFields
        }
      }
      ... on Post_AcfPosts_Sektioner_Faktalada {
        text
        fieldGroupName
      }
    }
  }
  featuredImage {
    node {
      ...ImageFields
    }
  }
  author {
    node {
      ...AuthorFields
    }
  }
}
fragment PreviewPostFields on Post {
  title
  slug
  uri
  modifiedGmt
  ...PostBodyFields
}`) as unknown as TypedDocumentString<PreviewPostQuery, PreviewPostQueryVariables>;
export const PostsDocument = new TypedDocumentString(`
    query Posts($after: String, $before: String, $search: String, $first: Int, $last: Int, $authorNotIn: [ID] = [50], $year: Int, $authorName: String) {
  posts(
    first: $first
    last: $last
    after: $after
    before: $before
    where: {
      search: $search
      authorNotIn: $authorNotIn
      authorName: $authorName
      dateQuery: { year: $year }
    }
  ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      total
      startCursor
    }
    edges {
      node {
        ...PostCardFields
      }
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
fragment PostCardFields on Post {
  id
  title
  slug
  modifiedGmt: dateGmt
  acf_posts {
    ingress
  }
  author {
    node {
      name
      slug
    }
  }
  featuredImage {
    node {
      ...ImageFields
    }
  }
}`) as unknown as TypedDocumentString<PostsQuery, PostsQueryVariables>;
export const PostPathsDocument = new TypedDocumentString(`
    query PostPaths {
  posts {
    nodes {
      slug
      author {
        node {
          slug
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<PostPathsQuery, PostPathsQueryVariables>;
export const SchoolPostsDocument = new TypedDocumentString(`
    query SchoolPosts($id: ID!) {
  page(id: $id, idType: URI) {
    acf_overviewPage {
      sidor {
        ... on Post {
          ...SchoolPostFields
          title
          acf_posts {
            ingress
          }
          author {
            node {
              name
            }
          }
          featuredImage {
            node {
              ...ImageFields
            }
          }
        }
        ... on Page {
          ...SchoolPostFields
          title
          acf_posts {
            ingress
          }
          author {
            node {
              name
            }
          }
          featuredImage {
            node {
              ...ImageFields
            }
          }
        }
      }
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
fragment SchoolPostFields on ContentNode {
  __typename
  id
  uri
  slug
  modifiedGmt
}`) as unknown as TypedDocumentString<SchoolPostsQuery, SchoolPostsQueryVariables>;
export const SearchDocument = new TypedDocumentString(`
    query Search($search: String) {
  drinktips(where: { search: $search }) {
    nodes {
      title
      slug
      featuredImage {
        node {
          ...ImageFields
        }
      }
    }
  }
  recipes(where: { search: $search }) {
    nodes {
      title
      slug
      featuredImage {
        node {
          ...ImageFields
        }
      }
    }
  }
  posts(where: { search: $search }) {
    nodes {
      title
      slug
      author {
        node {
          slug
        }
      }
      featuredImage {
        node {
          ...ImageFields
        }
      }
    }
  }
  drinks(where: { search: $search }) {
    nodes {
      title
      slug
      featuredImage {
        node {
          ...ImageFields
        }
      }
    }
  }
  grapes(where: { search: $search }) {
    nodes {
      title
      slug
      featuredImage {
        node {
          ...ImageFields
        }
      }
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}`) as unknown as TypedDocumentString<SearchQuery, SearchQueryVariables>;
export const RecipeDocument = new TypedDocumentString(`
    query Recipe($id: ID!) {
  recipe(id: $id, idType: URI) {
    slug
    modifiedGmt
    seo {
      ...SeoFields
    }
    ...RecipeFields
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
fragment SeoFields on PostTypeSEO {
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
  readingTime
  title
  twitterDescription
  twitterImage {
    altText
    mediaItemUrl
  }
  twitterTitle
}
fragment RecipeFields on Recipe {
  title
  featuredImage {
    node {
      title
      ...ImageFields
    }
  }
  acf_recipe {
    desc
    processen
    recipeAverageRating
    recipeRatingCount
    ingredienserOvrigt
    antalPortioner
    receptdelar {
      rubrik
      ingredienser {
        antal
        enhet {
          name
        }
        namn
      }
    }
    beskrivningStegForSteg {
      instruktion
    }
    skrivetAv {
      slug
      name
      id
    }
    recepieCategories {
      id
      slug
      uri
      name
    }
    kok {
      name
      slug
      id
    }
    passandeDrycker {
      ... on Drink {
        id
        slug
        title
        acf_drinks {
          dryckestyper {
            name
          }
          forpackningar {
            name
          }
        }
        featuredImage {
          node {
            ...ImageFields
          }
        }
      }
    }
    time {
      cookingTime
      prepTime
    }
    bilder {
      kortBeskrivning
      img {
        id
        ...ImageFields
      }
    }
    nutritions {
      energKcal
      fett
      fieldGroupName
      kolhydrater
      protein
    }
  }
}`) as unknown as TypedDocumentString<RecipeQuery, RecipeQueryVariables>;
export const PreviewRecipeDocument = new TypedDocumentString(`
    query PreviewRecipe($id: ID!) {
  recipe(idType: DATABASE_ID, id: $id) {
    ...RecipeFields
    preview {
      node {
        ...RecipeFields
      }
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
fragment RecipeFields on Recipe {
  title
  featuredImage {
    node {
      title
      ...ImageFields
    }
  }
  acf_recipe {
    desc
    processen
    recipeAverageRating
    recipeRatingCount
    ingredienserOvrigt
    antalPortioner
    receptdelar {
      rubrik
      ingredienser {
        antal
        enhet {
          name
        }
        namn
      }
    }
    beskrivningStegForSteg {
      instruktion
    }
    skrivetAv {
      slug
      name
      id
    }
    recepieCategories {
      id
      slug
      uri
      name
    }
    kok {
      name
      slug
      id
    }
    passandeDrycker {
      ... on Drink {
        id
        slug
        title
        acf_drinks {
          dryckestyper {
            name
          }
          forpackningar {
            name
          }
        }
        featuredImage {
          node {
            ...ImageFields
          }
        }
      }
    }
    time {
      cookingTime
      prepTime
    }
    bilder {
      kortBeskrivning
      img {
        id
        ...ImageFields
      }
    }
    nutritions {
      energKcal
      fett
      fieldGroupName
      kolhydrater
      protein
    }
  }
}`) as unknown as TypedDocumentString<PreviewRecipeQuery, PreviewRecipeQueryVariables>;
export const RecipeSlugsDocument = new TypedDocumentString(`
    query RecipeSlugs {
  recipes {
    nodes {
      slug
    }
  }
}
    `) as unknown as TypedDocumentString<RecipeSlugsQuery, RecipeSlugsQueryVariables>;
export const RecipesDocument = new TypedDocumentString(`
    query Recipes($after: String, $before: String, $first: Int, $last: Int, $search: String) {
  recipes(
    after: $after
    before: $before
    first: $first
    last: $last
    where: { search: $search }
  ) {
    ...RecipeListFields
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
fragment RecipeCardFields on Recipe {
  guestWriter {
    nodes {
      name
    }
  }
  acf_recipe {
    recepieCategories {
      slug
      name
    }
    skrivetAv {
      name
    }
    time {
      cookingTime
      prepTime
    }
    recipeAverageRating
  }
  id
  title
  slug
  featuredImage {
    node {
      ...ImageFields
    }
  }
}
fragment RecipeListFields on RecipeConnection {
  edges {
    node {
      ...RecipeCardFields
    }
  }
  pageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
    total
  }
}`) as unknown as TypedDocumentString<RecipesQuery, RecipesQueryVariables>;
export const RecipesByCategoryDocument = new TypedDocumentString(`
    query RecipesByCategory($id: ID!, $after: String, $before: String, $first: Int, $last: Int, $search: String) {
  recipeCategory(id: $id, idType: URI) {
    recipes(
      after: $after
      before: $before
      first: $first
      last: $last
      where: { search: $search }
    ) {
      ...RecipeListFields
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
fragment RecipeCardFields on Recipe {
  guestWriter {
    nodes {
      name
    }
  }
  acf_recipe {
    recepieCategories {
      slug
      name
    }
    skrivetAv {
      name
    }
    time {
      cookingTime
      prepTime
    }
    recipeAverageRating
  }
  id
  title
  slug
  featuredImage {
    node {
      ...ImageFields
    }
  }
}
fragment RecipeListFields on RecipeConnection {
  edges {
    node {
      ...RecipeCardFields
    }
  }
  pageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
    total
  }
}`) as unknown as TypedDocumentString<RecipesByCategoryQuery, RecipesByCategoryQueryVariables>;
export const ChefRecipesDocument = new TypedDocumentString(`
    query ChefRecipes($id: ID!, $after: String, $before: String, $first: Int, $last: Int, $search: String) {
  guestWriter(id: $id, idType: URI) {
    name
    recipes(
      after: $after
      before: $before
      first: $first
      last: $last
      where: { search: $search }
    ) {
      ...RecipeListFields
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
fragment RecipeCardFields on Recipe {
  guestWriter {
    nodes {
      name
    }
  }
  acf_recipe {
    recepieCategories {
      slug
      name
    }
    skrivetAv {
      name
    }
    time {
      cookingTime
      prepTime
    }
    recipeAverageRating
  }
  id
  title
  slug
  featuredImage {
    node {
      ...ImageFields
    }
  }
}
fragment RecipeListFields on RecipeConnection {
  edges {
    node {
      ...RecipeCardFields
    }
  }
  pageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
    total
  }
}`) as unknown as TypedDocumentString<ChefRecipesQuery, ChefRecipesQueryVariables>;
export const DrinkRecipesDocument = new TypedDocumentString(`
    query DrinkRecipes {
  recipeCategory(id: "drycker", idType: SLUG) {
    recipes(first: 4) {
      nodes {
        ...RecipeCardFields
      }
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
fragment RecipeCardFields on Recipe {
  guestWriter {
    nodes {
      name
    }
  }
  acf_recipe {
    recepieCategories {
      slug
      name
    }
    skrivetAv {
      name
    }
    time {
      cookingTime
      prepTime
    }
    recipeAverageRating
  }
  id
  title
  slug
  featuredImage {
    node {
      ...ImageFields
    }
  }
}`) as unknown as TypedDocumentString<DrinkRecipesQuery, DrinkRecipesQueryVariables>;
export const RecipeCategoryDocument = new TypedDocumentString(`
    query RecipeCategory($id: ID!) {
  recipeCategory(id: $id, idType: URI) {
    name
    slug
    seo {
      ...TaxonomySeoFields
    }
  }
}
    fragment TaxonomySeoFields on TaxonomySEO {
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
}`) as unknown as TypedDocumentString<RecipeCategoryQuery, RecipeCategoryQueryVariables>;
export const RecipeCategoryChildrenDocument = new TypedDocumentString(`
    query RecipeCategoryChildren($id: ID!, $first: Int) {
  recipeCategory(id: $id, idType: SLUG) {
    children(first: $first) {
      nodes {
        slug
      }
    }
  }
}
    `) as unknown as TypedDocumentString<RecipeCategoryChildrenQuery, RecipeCategoryChildrenQueryVariables>;
export const FeaturedRecipesDocument = new TypedDocumentString(`
    query FeaturedRecipes {
  page(id: "/recept", idType: URI) {
    featured_recipes {
      rubrik
      utvaldaRecept {
        ... on Recipe {
          __typename
          id
          title
          slug
          featuredImage {
            node {
              altText
              mediaItemUrl
            }
          }
          acf_recipe {
            skrivetAv {
              name
            }
          }
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<FeaturedRecipesQuery, FeaturedRecipesQueryVariables>;
export const GrapeSitemapDocument = new TypedDocumentString(`
    query GrapeSitemap {
  grapes(first: 1000) {
    nodes {
      slug
      modifiedGmt
    }
  }
}
    `) as unknown as TypedDocumentString<GrapeSitemapQuery, GrapeSitemapQueryVariables>;
export const DrinkSitemapDocument = new TypedDocumentString(`
    query DrinkSitemap {
  drinks(first: 1000) {
    nodes {
      slug
      modifiedGmt
    }
  }
}
    `) as unknown as TypedDocumentString<DrinkSitemapQuery, DrinkSitemapQueryVariables>;
export const DrinkTipSitemapDocument = new TypedDocumentString(`
    query DrinkTipSitemap {
  drinktips(first: 1000) {
    nodes {
      slug
      modifiedGmt
    }
  }
}
    `) as unknown as TypedDocumentString<DrinkTipSitemapQuery, DrinkTipSitemapQueryVariables>;
export const WordSitemapDocument = new TypedDocumentString(`
    query WordSitemap {
  glossaries(first: 100) {
    nodes {
      slug
      modifiedGmt
    }
  }
}
    `) as unknown as TypedDocumentString<WordSitemapQuery, WordSitemapQueryVariables>;
export const RecipeSitemapDocument = new TypedDocumentString(`
    query RecipeSitemap($first: Int!, $after: String) {
  recipes(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      slug
      modifiedGmt
    }
  }
}
    `) as unknown as TypedDocumentString<RecipeSitemapQuery, RecipeSitemapQueryVariables>;
export const PostSitemapDocument = new TypedDocumentString(`
    query PostSitemap {
  posts(first: 1000) {
    nodes {
      slug
      modifiedGmt
      author {
        node {
          slug
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<PostSitemapQuery, PostSitemapQueryVariables>;
export const PlaylistSitemapDocument = new TypedDocumentString(`
    query PlaylistSitemap {
  playlists(first: 50) {
    nodes {
      slug
    }
  }
}
    `) as unknown as TypedDocumentString<PlaylistSitemapQuery, PlaylistSitemapQueryVariables>;
export const WineAtlasSitemapDocument = new TypedDocumentString(`
    query WineAtlasSitemap($parent: ID!) {
  pages(where: { parent: $parent }, first: 50) {
    nodes {
      slug
      modifiedGmt
      children(first: 50) {
        nodes {
          slug
          modifiedGmt
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<WineAtlasSitemapQuery, WineAtlasSitemapQueryVariables>;
export const WineSchoolSitemapDocument = new TypedDocumentString(`
    query WineSchoolSitemap($parent: ID!) {
  pages(where: { parent: $parent }, first: 40) {
    nodes {
      slug
      modifiedGmt
    }
  }
}
    `) as unknown as TypedDocumentString<WineSchoolSitemapQuery, WineSchoolSitemapQueryVariables>;
export const SuppliersDocument = new TypedDocumentString(`
    query Suppliers($after: String, $before: String, $first: Int, $last: Int) {
  suppliers: leverantRer(
    after: $after
    before: $before
    first: $first
    last: $last
  ) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    edges {
      node {
        excerpt
        id
        slug
        title
        featuredImage {
          node {
            id
            ...ImageFields
          }
        }
      }
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}`) as unknown as TypedDocumentString<SuppliersQuery, SuppliersQueryVariables>;
export const SupplierDocument = new TypedDocumentString(`
    query Supplier($id: ID!) {
  leverantR(id: $id, idType: SLUG) {
    title
    content
    excerpt
    featuredImage {
      node {
        ...ImageFields
      }
    }
    drycker_to_leverantor {
      drycker {
        ... on Drink {
          id
          title
          slug
          __typename
          acf_drinks {
            dryckestyper {
              name
            }
            forpackningar {
              name
            }
          }
          featuredImage {
            node {
              ...ImageFields
            }
          }
        }
        ... on Drinktip {
          id
          title
          slug
          __typename
          acf_dryckestips {
            potentielltBetyg
            betyget
            dryckestyper
            forpackningar
            pris
            passarTillRecept {
              ... on Recipe {
                id
                title
                uri
              }
            }
          }
          featuredImage {
            node {
              ...ImageFields
            }
          }
        }
      }
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}`) as unknown as TypedDocumentString<SupplierQuery, SupplierQueryVariables>;
export const WordDocument = new TypedDocumentString(`
    query Word($id: ID!) {
  glossary(id: $id, idType: URI) {
    id
    content
    title
    modifiedGmt
    slug
    seo {
      ...SeoFields
    }
    featuredImage {
      node {
        ...ImageFields
      }
    }
    GQL_Word_Content {
      relateradTermer {
        ... on Glossary {
          id
          slug
          title
        }
      }
      hurAndvandsOrdet {
        alternativ1
        alternativ2
        alternativ3
      }
    }
  }
}
    fragment ImageFields on MediaItem {
  altText
  mediaItemUrl
  mediaDetails {
    width
    height
  }
}
fragment SeoFields on PostTypeSEO {
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
  readingTime
  title
  twitterDescription
  twitterImage {
    altText
    mediaItemUrl
  }
  twitterTitle
}`) as unknown as TypedDocumentString<WordQuery, WordQueryVariables>;
export const WordsByLetterDocument = new TypedDocumentString(`
    query WordsByLetter($id: ID!, $after: String, $before: String, $first: Int, $last: Int) {
  letter(id: $id, idType: SLUG) {
    glossaries(after: $after, before: $before, first: $first, last: $last) {
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
        startCursor
        total
      }
      edges {
        node {
          slug
          title
          id
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<WordsByLetterQuery, WordsByLetterQueryVariables>;