import "server-only";
import { wpQuery } from "@/lib/wp/client";
import { PlaylistQuery } from "./queries";

// A Vin-TV playlist with its episodes, plus the Vin-TV settings (billboard
// etc.) from the options page.
export async function getPlaylist(uri: string) {
  const data = await wpQuery(PlaylistQuery, { id: uri });
  if (!data?.playlist) return null;

  return {
    video: data.playlist,
    setting: data.acfOptionsInstallningarTv,
  };
}
