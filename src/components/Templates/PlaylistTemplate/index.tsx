import Newsletter from "@/app/_components/Newsletter";
import { BannerSkeleton } from "@/app/_components/ads/banner";
import AdTop from "@/app/_components/ads/default/top";
import { Suspense } from "react";
import WP from "@/lib/wp";
import { notFound } from "next/navigation";
import EpisodeList from "./EpisodeList";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

async function getPlaylist(id: string) {
  const res = await WP(
    `query fetchPlaylist($id: ID!) {
      acfOptionsInstallningarTv {
        tvOptionsPage {
          vintvTitle
          vintvIngress
          vintvBillboardBild {
            mediaItemUrl
          }
          vintvBillboardDelay
          vintvBillboardLink
          vintvBillboardLinkWindow
          vintvBillboardShow
          vintvBillboardText
        }
      }
    playlist(idType: URI, id: $id) {
      name
      slug
      description
      acf_tvSpellistor {
        thumbnail
      }
      seo {
        metaDesc
        title
        opengraphTitle
        opengraphDescription
        opengraphImage {
          mediaItemUrl
        }
      }
      episodes {
        edges {
          node {
            id
            title
            seo {
              metaDesc
              title
              opengraphTitle
              opengraphDescription
              opengraphImage {
                mediaItemUrl
              }
            }
            acf_episode {
              thumbnail
              beskrivning
              videoId
            }
          }
        }
      }
      acf_tvSpellistor {
        desc
      }
    }
  }`,
    null,
    { id }
  );

  const data = res?.data?.playlist;

  const settings = res?.data?.acfOptionsInstallningarTv;
  return { video: data, setting: settings };
}

const PlaylistTemplate = async ({ params, searchParams }: Props) => {
  const { slug } = params;
  const posts = await getPlaylist(`/spellistor/${slug}`);

  const { video, setting } = posts;

  if (!posts) {
    return notFound();
  }

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
