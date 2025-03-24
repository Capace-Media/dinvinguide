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
export interface DrinkBase {
  id: string;
  title: string;
  slug: string;
  __typename: string;
  featuredImage: {
    node: {
      altText: string;
      mediaItemUrl: string;
    };
  };
}

export interface DrinkTip extends DrinkBase {
  __typename: "Drinktip";
  acf_dryckestips?: {
    potentielltBetyg?: string;
    betyget?: string;
    dryckestyper?: string;
    forpackningar?: string;
    pris?: string;
    passarTillRecept?: {
      id: string;
      title: string;
      uri: string;
    }[];
  };
}

export interface Drink extends DrinkBase {
  __typename?: "Drink";
  acf_drinks?: {
    dryckestyper?: {
      name?: string;
    };
    forpackningar?: {
      name?: string;
    };
  };
}

export interface SupplierDrinkConnection {
  drycker?: (Drink | DrinkTip)[];
}

export interface SupplierData {
  title: string;
  content?: string;
  excerpt?: string;
  drycker_to_leverantor?: SupplierDrinkConnection;
  featuredImage?: SupplierFeaturedImage;
}

export interface TSupplier {
  leverantR: SupplierData;
}
