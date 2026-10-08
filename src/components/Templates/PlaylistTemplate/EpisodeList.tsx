"use client";
import { useEffect, useState } from "react";
import EpisodeCard from "./EpisodeCard";
import Player from "./Player";

interface EpisodeListProps {
  data: any;
  playlist?: any;
  settings?: any;
}

const EpisodeList = ({ data, playlist, settings }: EpisodeListProps) => {
  const [playerOpen, setPlayerOpen] = useState(false);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  const handlePlaylist = (episodeIndex: number) => {
    if (episodeIndex !== null) {
      setPlayerOpen(true);
      setCurrentEpisodeIndex(episodeIndex);
    } else {
      setPlayerOpen(false);
    }
  };
  useEffect(() => {
    if (playerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [playerOpen]);
  return (
    <>
      {data ? (
        <ul className="space-y-3">
          {data?.map(({ node: episode }: any, index: number) => (
            <EpisodeCard
              key={episode.title}
              handlePlaylist={handlePlaylist}
              index={index}
              episode={episode}
            />
          ))}
        </ul>
      ) : null}
      {playerOpen && (
        <Player
          handlePlaylist={handlePlaylist}
          currentEpisode={currentEpisodeIndex}
          playlist={playlist}
          settings={settings}
        />
      )}
    </>
  );
};

export default EpisodeList;
