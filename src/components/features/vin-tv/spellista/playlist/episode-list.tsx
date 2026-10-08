"use client";
import { useEffect, useState } from "react";
import EpisodeCard from "./episode-card";
import Player from "./player";
import type { Playlist, VinTvOptions } from "./types";

interface EpisodeListProps {
  playlist: Playlist;
  billboard?: VinTvOptions | null;
}

const EpisodeList = ({ playlist, billboard }: EpisodeListProps) => {
  const [playerOpen, setPlayerOpen] = useState(false);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const episodes = playlist.episodes?.edges;

  const handlePlaylist = (episodeIndex: number | null) => {
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
      {episodes ? (
        <ul className="space-y-3">
          {episodes.map(({ node: episode }, index) => (
            <EpisodeCard
              key={episode.title}
              onSelect={handlePlaylist}
              index={index}
              episode={episode}
            />
          ))}
        </ul>
      ) : null}
      {playerOpen && episodes && (
        <Player
          handlePlaylist={handlePlaylist}
          currentEpisode={currentEpisodeIndex}
          episodes={episodes}
          billboard={billboard}
        />
      )}
    </>
  );
};

export default EpisodeList;
