import WP from "@/lib/wp";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const posts = await WP(`
  query getPosts {
      posts(first: 1000) {
        nodes {
          slug
          modifiedGmt
          author {
            node {
              slug
            }
          }
        }
      }
    }
  `);

  const articles = posts?.data?.posts?.nodes;

  const articlesURL =
    articles?.map((post: any) => {
      return {
        url: `${baseUrl}/skribenter/${post?.author?.node?.slug}/${post?.slug}`,
        lastModified: post.modifiedGmt,
        priority: 0.5,
      };
    }) ?? [];

  return [
    {
      url: `${baseUrl}/skribenter/fredrikschelin`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/skribenter/anders`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/skribenter/sofiaander`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/skribenter/magnus`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/skribenter/jesper`,
      lastModified: new Date(),
      priority: 1,
    },
    ...articlesURL,
  ];
}
