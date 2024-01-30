import Newsletter from "@/app/components/Newsletter";
import Ads from "@/app/components/ads";
import AuthorPost from "@/components/Blocks/skribenter/Posts/post";
import PaginationForGuides from "@/components/Pagination/Guider";
import Posts from "@/components/Pagination/Posts";
import { getPage } from "@/lib/queries/getPage";
import { getSchoolPosts } from "@/lib/queries/getSchoolPosts";
import WP from "@/lib/wp";
import { notFound } from "next/navigation";
import links from "../GuideTemplate/guideLinks.json";
import PageHero from "../HeroHeaders/PageHero";
import EpisodeCard from "./EpisodeCard";
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

  // if (!posts) {
  //   return notFound();
  // }

  return (
    <>
      {/* <PageHero data={data} links={links} guide={"Vinskolan"} /> */}
      <Ads pageType="default" position="TOP" />
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
