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
    <li className="group ring-brand-red relative grid cursor-pointer overflow-hidden rounded-sm bg-white transition-all hover:ring-2 md:grid-cols-[150px_1fr_100px] md:gap-5 lg:grid-cols-[250px_1fr_100px]">
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
        <h2 className="text-brand-red text-base normal-case lg:text-xl">
          {/* The ::after covers the whole card, so a click anywhere selects the episode while keyboard users get a real button. */}
          <button
            type="button"
            onClick={() => onSelect(index)}
            className="block w-full cursor-pointer text-left after:absolute after:inset-0 after:z-10 md:line-clamp-1"
          >
            {episode.title}
          </button>
        </h2>
      </div>
      <div className="absolute top-3 left-3 md:relative md:top-0 md:left-0 md:flex md:items-center md:justify-center md:p-5">
        <CirclePlay
          className="md:text-brand-red m-1 size-7 text-white"
          aria-hidden
        />
      </div>
    </li>
  );
};

export default EpisodeCard;
