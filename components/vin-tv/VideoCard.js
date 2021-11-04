import Image from 'next/image';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
const VideoCard = ({ video, last, onLast, handlePlaylist, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  useEffect(() => {
    if (inView) {
      onLast();
    }
  }, [inView, onLast, last]);
  return (
    <li
      ref={last ? ref : null}
      className='overflow-hidden transition-all bg-white rounded cursor-pointer group hover:ring-2 ring-brand-red '
      onClick={() => handlePlaylist(index)}
    >
      <figure className='relative aspect-w-16 aspect-h-9'>
        <Image
          src={video.acf_episode.thumbnail}
          layout='fill'
          objectFit='cover'
          alt={video.title}
        />
      </figure>
      <div className='p-4'>
        <h3 className='text-sm normal-case lg:text-base'>{video.title}</h3>
      </div>
    </li>
  );
};

export default VideoCard;
