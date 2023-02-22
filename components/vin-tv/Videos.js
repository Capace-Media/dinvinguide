import { useEffect, useState } from "react";

//import Image from "next/image";
import Ad from "../ads/Ad";
import ClientAd from "../ads/ClientAd";
import Player from "./Player";
import VideoCard from "./VideoCard";

const Videos = ({ episodes, settings }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filterString, setFilterString] = useState("");
  const [maxNodes, setMaxNodes] = useState(12);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [playerVideo, setPlayerVideo] = useState(0);
  const chunkSize = 16;

  useEffect(() => {
    let filterTimeout;
    filterTimeout = setTimeout(() => {
      setFilterString(searchInput.toLowerCase());
    }, 300);
    return () => clearTimeout(filterTimeout);
  }, [searchInput]);

  const onLast = () => {
    setMaxNodes((prev) => prev + 12);
  };
  const onClick = (index) => {
    setPlayerVideo(index);
    setPlayerOpen(true);
  };
  const handlePlaylist = (episodeIndex) => {
    if (episodeIndex !== null) {
      setPlayerOpen(true);
      setPlayerVideo(episodeIndex);
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
      <div className="text-center contain ">
        <h2 className="text-3xl text-brand-red">Videos</h2>
      </div>
      <div>
        <div className="text-center contain row">
          <input
            type="text"
            value={searchInput}
            placeholder="Sök..."
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full max-w-lg px-5 py-3 rounded-sm"
          />
        </div>
      </div>
      <ul className="grid gap-3 pb-10 contain md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {episodes
          .filter(({ node: e }) => {
            if (!filterString) {
              return true;
            } else {
              if (e.title.toLowerCase().includes(filterString)) {
                return true;
              } else {
                return false;
              }
            }
          })
          .map(({ node: episode }, index) => {
            if (index < maxNodes) {
              if ((index + 1) % chunkSize === 0) {
                return (
                  <>
                    <VideoCard
                      key={index + 2}
                      video={episode}
                      last={index + 1 === maxNodes ? true : false}
                      onLast={onLast}
                      index={index}
                      handlePlaylist={handlePlaylist}
                    />
                    <li className="col-span-full row">
                      <ClientAd position="mid" />
                    </li>
                  </>
                );
              } else {
                return (
                  <VideoCard
                    key={index + 1}
                    video={episode}
                    last={index + 1 === maxNodes ? true : false}
                    onLast={onLast}
                    index={index}
                    handlePlaylist={handlePlaylist}
                  />
                );
              }
            }
          })}
      </ul>
      {playerOpen && (
        <Player
          playlist={episodes}
          handlePlaylist={handlePlaylist}
          currentEpisode={playerVideo}
          settings={settings}
        />
      )}
    </>
  );
};

export default Videos;
