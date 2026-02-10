// author types
import type { MediaItem } from "./Global";
import type { PostNode } from "./posts";

export interface AuthorACF {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  email?: string;
  bild?: MediaItem;
}

export interface SkribentACF extends AuthorACF {
  bildExtra?: MediaItem;
}

export interface MedarbetareACF extends AuthorACF {
  kortBeskrivning?: string;
}

interface AuthorBase {
  name: string;
  slug: string;
  id: string;
  description: string;
  posts: {
    nodes: PostNode[];
  };
}

export interface Skribent extends AuthorBase {
  acf_user: SkribentACF;
}

export interface Medarbetare extends AuthorBase {
  acf_user: MedarbetareACF;
}

// AUTHORS query response
export interface AuthorsData {
  acfOptionsSkribenter: {
    acf_skribenter: {
      skribenter: Skribent[];
      medarbetare: Medarbetare[];
    };
  };
}
