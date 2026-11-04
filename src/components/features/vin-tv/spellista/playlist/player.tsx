import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { EpisodeEdge, VinTvOptions } from "./types";
import Video from "./video";

interface PlayerProps {
  episodes: readonly EpisodeEdge[];
  currentEpisode: number;
  handlePlaylist: (episodeIndex: number | null) => void;
  // Not passed yet: without it the billboard is skipped (0 s delay).
  billboard?: VinTvOptions | null;
}

const Player = ({
  episodes,
  currentEpisode,
  handlePlaylist,
  billboard,
}: PlayerProps) => {
  const [episodeIndex, setEpisodeIndex] = useState(currentEpisode);
  const [isAd, setIsAd] = useState(false);
  const maxIndex = episodes.length - 1;
  const billboardDelay = billboard?.vintvBillboardDelay ?? 0;
  const handlePreviousVideo = () => {
    setEpisodeIndex((prev) => prev - 1);
  };
  const handleNextVideo = () => {
    setEpisodeIndex((prev) => prev + 1);
  };
  const playAd = useCallback(() => {
    setIsAd(true);
    const adTimer = setTimeout(() => {
      setIsAd(false);
    }, billboardDelay * 1000);
    return () => clearTimeout(adTimer);
  }, [billboardDelay]);
  useEffect(() => {
    // Show the billboard every time the episode changes.
    playAd();
  }, [episodeIndex, playAd]);

  const episode = episodes[episodeIndex].node;

  return (
    <>
      <div className="fixed top-0 left-0 z-50 h-screen w-screen bg-white">
        <button
          type="button"
          aria-label="Stäng spelaren"
          className="fixed top-5 right-5 cursor-pointer text-black"
          onClick={() => handlePlaylist(null)}
        >
          <X className="size-10" aria-hidden />
        </button>

        <div className="flex h-full w-full items-center justify-center">
          <div className="mx-auto w-full max-w-2xl md:max-w-4xl lg:max-w-6xl">
            {isAd ? (
              <div className="text-center">
                <h2>Videon presenteras av</h2>
                <a
                  href={billboard?.vintvBillboardLink ?? undefined}
                  target="_blank"
                  className="relative mx-auto block h-56 w-full max-w-3xl"
                  rel="noreferrer"
                >
                  {billboard?.vintvBillboardBild?.mediaItemUrl && (
                    <Image
                      src={billboard.vintvBillboardBild.mediaItemUrl}
                      fill
                      style={{ objectFit: "contain" }}
                      priority
                      alt="Annons"
                    />
                  )}
                </a>
                <p>Videon spelar snart</p>
              </div>
            ) : (
              <div className="text-center">
                <Video episode={episode} />
                <p className="mt-4 text-[12px]">
                  <span>Fungerar inte videon? </span>
                  <a
                    className="hover:text-brand-bronze"
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${episode.acf_episode?.videoId}`}
                    rel="noreferrer"
                  >
                    klicka här för att se den på Youtube
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="fixed bottom-0 left-0 flex w-screen items-center justify-between p-5">
          {episodeIndex !== 0 ? (
            <button
              className="flex items-center space-x-3 rounded-sm bg-black/10 px-3 py-1 hover:bg-black/20 md:px-5 md:py-3"
              onClick={() => handlePreviousVideo()}
            >
              <ArrowLeft className="size-5" aria-hidden />
              <span>Föregående</span>
            </button>
          ) : (
            <div />
          )}
          {episodeIndex !== maxIndex && (
            <button
              className="flex items-center space-x-3 rounded-sm bg-black/10 px-3 py-1 hover:bg-black/20 md:px-5 md:py-3"
              onClick={() => handleNextVideo()}
            >
              <span>Nästa</span>
              <ArrowRight className="size-5" aria-hidden />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Player;
