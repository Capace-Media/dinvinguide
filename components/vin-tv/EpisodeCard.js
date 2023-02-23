import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
const EpisodeCard = ({ episode, index, handlePlaylist }) => {
  return (
    <li
      onClick={() => handlePlaylist(index)}
      className="group cursor-pointer hover:ring-2 transition-all ring-brand-red relative grid md:gap-5 md:grid-cols-[150px,1fr,100px] lg:grid-cols-[250px,1fr,100px] bg-white rounded overflow-hidden"
    >
      <figure className="relative aspect-w-16 aspect-h-9">
        {episode?.acf_episode?.thumbnail && (
          <Image
            src={episode.acf_episode.thumbnail}
            layout="fill"
            objectFit="cover"
            alt={episode.title}
          />
        )}
      </figure>
      <div className="flex flex-col justify-center p-5 lg:p-5">
        <h2 className="text-base normal-case lg:text-xl md:line-clamp-1 text-brand-red">
          {episode.title}
        </h2>
        <div className="line-clamp-1">
          {parse(episode.acf_episode.beskrivning)[0]}
        </div>
      </div>
      <div className="absolute top-3 left-3 md:top-0 md:left-0 md:relative md:p-5 md:flex md:items-center md:justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="m-1 text-white fill-current md:text-brand-red w-7 h-7"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 13.5v-7c0-.41.47-.65.8-.4l4.67 3.5c.27.2.27.6 0 .8l-4.67 3.5c-.33.25-.8.01-.8-.4z" />
        </svg>
      </div>
    </li>
  );
};

export default EpisodeCard;
