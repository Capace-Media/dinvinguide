export type ParamsProps = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string };
};

export type PageParamsProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | any | undefined | null;
  }>;
  params: Promise<{ slug: string }>;
};

// ── Shared WordPress types ──────────────────────────────────

export interface WPPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  endCursor: string;
  startCursor: string;
  total?: number;
}

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

export interface Author {
  slug: string;
  name: string;
  id?: string;
}
