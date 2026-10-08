import { getPlaylist } from "@/lib/api/playlists/get-playlists";
import { notFound } from "next/navigation";
import Newsletter from "@/components/shared/newsletter/newsletter";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdTop from "@/shared/components/ads/default/top";
import { Suspense } from "react";
import EpisodeList from "@/components/features/vin-tv/spellista/playlist/episode-list";

type Props = {
  params: Promise<{ slug: string }>;
};

const Playlist = async (props: Props) => {
  const params = await props.params;
  const playlist = await getPlaylist(`/spellistor/${params.slug}`);

  if (!playlist) {
    notFound();
  }

  return (
    <>
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      <div className="layout bg-white">
        <EpisodeList playlist={playlist.video} />
      </div>
      <Newsletter />
    </>
  );
};

export default Playlist;
