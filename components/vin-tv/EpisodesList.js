import EpisodeCard from './EpisodeCard';

const EpisodesList = ({ episodes, handlePlaylist }) => {
  return (
    <ul className='space-y-3 contain-sm row'>
      {episodes.map(({ node: episode }, index) => (
        <EpisodeCard
          key={episode.title}
          handlePlaylist={handlePlaylist}
          index={index}
          episode={episode}
        />
      ))}
    </ul>
  );
};

export default EpisodesList;
