import Image from 'next/image';
const PlaylistCard = ({ playlist }) => {
  return (
    <li className='relative grid grid-cols-[1fr,2fr] overflow-hidden bg-white rounded-sm group'>
      <figure className='flex items-center justify-center aspect-w-16 aspect-h-9'>
        <Image
          src={playlist.acf_tvSpellistor.thumbnail}
          layout='fill'
          objectFit='cover'
        />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          className='m-1 text-white fill-current w-7 h-7'
        >
          <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 13.5v-7c0-.41.47-.65.8-.4l4.67 3.5c.27.2.27.6 0 .8l-4.67 3.5c-.33.25-.8.01-.8-.4z' />
        </svg>
      </figure>
      <div className='flex flex-col justify-center p-5'>
        <h3 className='font-semibold normal-case line-clamp-1'>
          {playlist.name}
        </h3>
        <p className='text-sm text-black/60'>
          <span>{playlist.episodes.edges.length} videos</span>
        </p>
      </div>
    </li>
  );
};

export default PlaylistCard;
