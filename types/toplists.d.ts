export interface TopListMediaDetails {
  width: number;
  height: number;
}

export interface TopListMedia {
  title: string;
  mediaItemUrl: string;
  mediaDetails: TopListMediaDetails;
  altText: string;
}

export interface TopListImage {
  desktop: TopListMedia;
  mobile: TopListMedia;
}

export interface TopListACF {
  slogan: string;
  toplistImg: TopListImage;
}

export interface TopListPackaging {
  nodes: {
    name: string;
  }[];
}

export interface TopList {
  id: string;
  title: string;
  slug: string;
  acf_toplists: TopListACF;
  forpackningar: TopListPackaging;
}

export interface TopListsResponse {
  page: {
    acf_topplistor: {
      aktivaTopplistor: TopList[];
    };
  };
}
