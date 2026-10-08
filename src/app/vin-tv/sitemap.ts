import { getPlaylistSitemap } from "@/lib/api/sitemaps/get-sitemaps";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const playlists = await getPlaylistSitemap();

  return playlists.map((playlist) => ({
    url: `${baseUrl}/vin-tv/spellistan/${playlist.slug}`,
    priority: 0.1,
  }));
}
