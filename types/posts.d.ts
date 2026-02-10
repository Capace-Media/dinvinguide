// types for posts query
import type { WPPageInfo, FeaturedImage, Author } from "./Global";

export interface PostNode {
  id: string;
  title: string;
  slug: string;
  modifiedGmt: string;
  acf_posts: {
    ingress: string;
  };
  author: {
    node: Author;
  };
  featuredImage: FeaturedImage | null;
}

export interface PostEdge {
  node: PostNode;
}

// POSTS query response
export interface PostsData {
  posts: {
    pageInfo: WPPageInfo;
    edges: PostEdge[];
  };
}

// POSTS query variables
export interface PostsVariables {
  after?: string;
  before?: string;
  search?: string;
  first?: number;
  last?: number;
  authorNotIn?: string[];
  year?: number;
  authorName?: string;
}

// HIGHLIGHTED_POSTS query response
export interface HighlightedPostsData {
  posts: {
    nodes: PostNode[];
  };
  page: {
    GQL_frontPageFields: {
      highlightedArticles: PostNode[];
    };
  };
}
