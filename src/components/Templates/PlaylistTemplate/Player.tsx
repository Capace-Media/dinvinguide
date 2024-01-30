import { useCallback, useEffect, useState } from "react";

import Image from "next/image";
import Video from "./Video";

const Player = ({
  playlist,
  currentEpisode,
  handlePlaylist,
  settings,
}: any) => {
  const [episodeIndex, setEpisodeIndex] = useState(currentEpisode);
  const [isAd, setIsAd] = useState(false);
  const maxIndex = playlist?.episodes
    ? playlist?.episodes?.edges.length - 1
    : playlist?.length;
  const handlePreviousVideo = () => {
    setEpisodeIndex((prev: any) => prev - 1);
  };
  const handleNextVideo = () => {
    setEpisodeIndex((prev: any) => prev + 1);
  };
  const playAd = useCallback(() => {
    setIsAd(true);
    let adTimer: any;
    adTimer = setTimeout(() => {
      setIsAd(false);
    }, settings.vintvBillboardDelay * 1000);
    return () => clearTimeout(adTimer);
  }, [settings.vintvBillboardDelay]);
  useEffect(() => {
    //When changing video, play ad
    playAd();
  }, [episodeIndex, playAd]);

  let episodes = playlist.episodes
    ? playlist.episodes.edges[episodeIndex]
    : playlist[episodeIndex];

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="fixed w-10 h-10 text-black cursor-pointer fill-current top-5 right-5"
          onClick={() => handlePlaylist(null)}
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>

        <div className="flex items-center justify-center w-full h-full ">
          <div className="w-full max-w-2xl mx-auto md:max-w-4xl lg:max-w-6xl">
            {isAd ? (
              <div className="text-center">
                <h2>Videon presenteras av</h2>
                <a
                  href={settings.vintvBillboardLink}
                  target="_blank"
                  className="relative block w-full h-56 max-w-3xl mx-auto"
                  rel="noreferrer"
                >
                  {settings?.vintvBillboardBild?.mediaItemUrl && (
                    <Image
                      src={settings.vintvBillboardBild.mediaItemUrl}
                      layout="fill"
                      objectFit="contain"
                      priority
                      alt={
                        settings.vintvBillboardBild.altText
                          ? settings.vintvBillboardBild.altText
                          : "Annons"
                      }
                    />
                  )}
                </a>
                <p>Videon spelar snart</p>
              </div>
            ) : (
              <div className="text-center">
                <Video
                  episode={
                    playlist.episodes
                      ? playlist.episodes.edges[episodeIndex]
                      : playlist[episodeIndex]
                  }
                />
                <p className="mt-4 text-[12px]">
                  <span>Fungerar inte videon? </span>
                  <a
                    className=" hover:text-brand-bronze"
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${episodes.node.acf_episode.videoId}`}
                    rel="noreferrer"
                  >
                    klicka här för att se den på Youtube
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="fixed bottom-0 left-0 flex items-center justify-between w-screen p-5">
          {episodeIndex !== 0 ? (
            <button
              className="flex items-center px-3 py-1 space-x-3 rounded md:px-5 md:py-3 bg-black/10 hover:bg-black/20"
              onClick={() => handlePreviousVideo()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 rotate-180 fill-current"
              >
                <rect fill="none" height="24" width="24" />
                <path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" />
              </svg>
              <span>Föregående</span>
            </button>
          ) : (
            <div />
          )}
          {episodeIndex !== maxIndex && (
            <button
              className="flex items-center px-3 py-1 space-x-3 rounded md:px-5 md:py-3 bg-black/10 hover:bg-black/20"
              onClick={() => handleNextVideo()}
            >
              <span>Nästa</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current"
              >
                <rect fill="none" height="24" width="24" />
                <path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Player;
