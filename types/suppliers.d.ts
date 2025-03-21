export interface SupplierPageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}

export interface SupplierFeaturedImage {
  node: {
    id: string;
    altText: string;
    mediaItemUrl: string;
  };
}

export interface SupplierNode {
  excerpt?: string;
  id: string;
  slug: string;
  title: string;
  featuredImage: SupplierFeaturedImage;
}

export interface SupplierEdge {
  node: SupplierNode;
}

export interface SuppliersData {
  pageInfo: SupplierPageInfo;
  edges: SupplierEdge[];
}

export interface TSuppliers {
  suppliers: SuppliersData;
}

export interface GetSuppliersParams {
  after?: string;
  before?: string;
  first?: number;
  last?: number;
}
