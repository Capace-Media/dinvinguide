import { CirclePlay } from "lucide-react";
import Image from "next/image";
import type { Episode } from "./types";

interface EpisodeCardProps {
  episode: Episode;
  index: number;
  onSelect: (index: number) => void;
}

const EpisodeCard = ({ episode, index, onSelect }: EpisodeCardProps) => {
  const thumbnail = episode.acf_episode?.thumbnail;
  const videoId = episode.acf_episode?.videoId;

  return (
    <li
      onClick={() => onSelect(index)}
      className="group cursor-pointer hover:ring-2 transition-all ring-brand-red relative grid md:gap-5 md:grid-cols-[150px_1fr_100px] lg:grid-cols-[250px_1fr_100px] bg-white rounded-sm overflow-hidden"
    >
      <figure className="relative">
        {thumbnail && (
          <Image
            src={thumbnail}
            fill
            style={{ objectFit: "cover" }}
            alt={episode.title ?? ""}
          />
        )}
        {!thumbnail && videoId ? (
          <Image
            src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
            fill
            style={{ objectFit: "cover" }}
            alt={episode.title ?? ""}
          />
        ) : null}
      </figure>
      <div className="flex flex-col justify-center p-5 lg:p-5">
        <h2 className="text-base normal-case lg:text-xl md:line-clamp-1 text-brand-red">
          {episode.title}
        </h2>
      </div>
      <div className="absolute top-3 left-3 md:top-0 md:left-0 md:relative md:p-5 md:flex md:items-center md:justify-center">
        <CirclePlay
          className="m-1 text-white md:text-brand-red size-7"
          aria-hidden
        />
      </div>
    </li>
  );
};

export default EpisodeCard;
