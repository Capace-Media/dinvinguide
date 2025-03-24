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
