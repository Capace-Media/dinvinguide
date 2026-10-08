"use client";
import type { Episode } from "./types";

interface VideoProps {
  episode: Episode;
}

const Video = ({ episode }: VideoProps) => {
  const videoId = episode.acf_episode?.videoId;

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onClick={() =>
          window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank")
        }
      ></iframe>
    </div>
  );
};

export default Video;
