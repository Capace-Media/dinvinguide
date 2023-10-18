export const isCustomPageSlug = (slug: string) => {
  const pagesToExclude = ["fredrikschelin", "sofiaander"];
  return pagesToExclude.includes(slug);
};
