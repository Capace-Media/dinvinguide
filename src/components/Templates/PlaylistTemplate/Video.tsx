"use client";
import { useState } from "react";

const Video = ({ episode }: any) => {
  const [isPlayable, setIsPlayable] = useState(true);

  function onPlayerError(event: any) {
    if (event.data === 150 || event.data === 100) {
      setIsPlayable(false);
    }
  }
  return (
    <div>
      {isPlayable && (
        <>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${episode.node.acf_episode.videoId}?rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onError={onPlayerError}
            onClick={() =>
              window.open(
                `https://www.youtube.com/watch?v=${episode.node.acf_episode.videoId}`,
                "_blank"
              )
            }
          ></iframe>
        </>
      )}
      {!isPlayable && <div>This video is not playable.</div>}
    </div>
  );
};

export default Video;
