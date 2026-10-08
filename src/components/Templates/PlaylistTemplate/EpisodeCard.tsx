import handleParse from "@/lib/utils/handleParse";
import Image from "next/image";
const EpisodeCard = ({ episode, index, handlePlaylist }: any) => {
  return (
    <li
      onClick={() => handlePlaylist(index)}
      className="group cursor-pointer hover:ring-2 transition-all ring-brand-red relative grid md:gap-5 md:grid-cols-[150px_1fr_100px] lg:grid-cols-[250px_1fr_100px] bg-white rounded-sm overflow-hidden"
    >
      <figure className="relative">
        {episode?.acf_episode?.thumbnail && (
          <Image
            src={episode.acf_episode.thumbnail}
            layout="fill"
            objectFit="cover"
            alt={episode.title}
          />
        )}
        {!episode?.acf_episode?.thumbnail && episode?.acf_episode?.videoId ? (
          <Image
            src={`https://img.youtube.com/vi/${episode?.acf_episode?.videoId}/mqdefault.jpg`}
            layout="fill"
            objectFit="cover"
            alt={episode.title}
          />
        ) : null}
      </figure>
      <div className="flex flex-col justify-center p-5 lg:p-5">
        <h2 className="text-base normal-case lg:text-xl md:line-clamp-1 text-brand-red">
          {episode?.title}
        </h2>
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
