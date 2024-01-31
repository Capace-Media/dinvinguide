import { WPnext } from "@/lib/wp";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const posts = await WPnext(`
  query MyQuery2 {
    playlists(first: 50) {
      nodes {
        slug

      }
    }
  }
  `);

  const playlist = posts?.data?.playlists?.nodes;

  const playlistURL =
    playlist?.map((post: any) => {
      return {
        url: `${baseUrl}/vin-tv/spellistan/${post?.slug}`,

        priority: 0.1,
      };
    }) ?? [];

  return [...playlistURL];
}
