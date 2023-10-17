export interface SEO {
  breadcrumbs: any[]; // Adjust as needed
  canonical: string;
  cornerstone: boolean;
  focuskw: string;
  metaDesc: string;
  metaKeywords: string;
  metaRobotsNofollow: string;
  metaRobotsNoindex: string;
  opengraphAuthor: string;
  opengraphDescription: string;
  opengraphImage: OpenGraphImage;
  opengraphModifiedTime: string;
  opengraphPublishedTime: string;
  opengraphPublisher: string;
  opengraphSiteName: string;
  opengraphTitle: string;
  opengraphType: string | undefined;
  opengraphUrl: string;
  readingTime: number;
  title: string;
  twitterDescription: string;
  twitterImage: null | string; // Adjust type accordingly
  twitterTitle: string;
}
