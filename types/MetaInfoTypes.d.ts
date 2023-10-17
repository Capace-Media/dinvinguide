export interface Title {
  template: string;
  absolute: string;
}

export interface Author {
  name: string;
  url?: string;
}

export interface ThemeColor {
  color: string;
}

export interface Robots {
  basic: string;
  googleBot: string;
}

export interface Alternates {
  canonical: {
    url: string;
  };
  languages?: null | any[]; // Provide exact type if known
  media?: null | any[]; // Provide exact type if known
  types?: null | any[]; // Provide exact type if known
}

export interface OpenGraphImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface OpenGraph {
  title: Title;
  description: string;
  url: string;
  siteName: string;
  images: OpenGraphImage[];
  locale: string;
  type: string;
}

export interface Verification {
  other: {
    me: any[]; // Adjust with proper type if known
  };
}

export interface FormatDetection {
  email: boolean;
  address: boolean;
  telephone: boolean;
}

export interface MetaInfo {
  viewport: null | string;
  metadataBase: URL | null;
  title: Title;
  description: string;
  applicationName: string;
  authors: Author[];
  generator: string;
  keywords: string[];
  referrer: string;
  themeColor: ThemeColor[];
  colorScheme: string;
  creator: string;
  publisher: string;
  robots: Robots;
  manifest?: null | any;
  alternates: Alternates;
  icons?: null | any;
  openGraph: OpenGraph;
  twitter?: null | any;
  verification: Verification;
  appleWebApp?: null | any;
  formatDetection: FormatDetection;
  itunes?: null | any;
  abstract?: null | any;
  appLinks?: null | any;
  archives?: null | any;
  assets?: null | any;
  bookmarks?: null | any;
  category?: null | any;
  classification?: null | any;
  other: { [key: string]: any }; // Adjust type for 'other' based on its potential values
}
