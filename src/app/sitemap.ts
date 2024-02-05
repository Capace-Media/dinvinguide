export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/dryckesutforskaren`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/recept`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/guide`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/skribenter`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/dryckeslistan`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/dryckestips`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/artiklar`,
      lastModified: new Date(),
      priority: 1,
    },
  ];
}
