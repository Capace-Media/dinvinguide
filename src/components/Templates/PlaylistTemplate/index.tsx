import Newsletter from "@/components/shared/newsletter/newsletter";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdTop from "@/shared/components/ads/default/top";
import { Suspense } from "react";
import { getPlaylist } from "@/lib/api/playlists/get-playlists";
import { notFound } from "next/navigation";
import EpisodeList from "./EpisodeList";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

const PlaylistTemplate = async ({ params, searchParams }: Props) => {
  const { slug } = params;
  const posts = await getPlaylist(`/spellistor/${slug}`);

  if (!posts) {
    return notFound();
  }

  const { video, setting } = posts;

  return (
    <>
      {/* <PageHero data={data} links={links} guide={"Vinskolan"} /> */}
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      <div className="layout bg-white">
        <EpisodeList
          data={video?.episodes?.edges}
          playlist={video}
          settings={setting}
        />
      </div>
      <Newsletter />
    </>
  );
};

export default PlaylistTemplate;
