import PlaylistCard from './PlaylistCard';

const Playlists = ({ playlists }) => {
  return (
    <>
      <div className='text-center contain row'>
        <h2 className='text-3xl text-brand-red'>Spellistor</h2>
      </div>
      <ul className='grid gap-3 contain row md:grid-cols-2 lg:grid-cols-3'>
        {playlists
          .sort((a, b) => {
            if (a.node.episodes.edges.length < b.node.episodes.edges.length) {
              return 1;
            } else {
              return -1;
            }
          })
          .map(({ node: playlist }) => {
            if (playlist.episodes.edges.length !== 0) {
              return <PlaylistCard playlist={playlist} />;
            }
          })}
      </ul>
    </>
  );
};

export default Playlists;
