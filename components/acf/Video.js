const Video = ({ url }) => {
  const isLocal = url.includes('media.dinvinguide.se');
  const isYoutube = url.includes('youtube');
  if (isLocal) {
    const type = url.split('.')[3];
    return (
      <div className='mx-auto prose max-w-prose'>
        <div className='aspect-w-16 aspect-h-9'>
          <video controls>
            <source src={url} type={`video/${type}`} />
          </video>
        </div>
      </div>
    );
  }
  if (isYoutube) {
    const id = url.split('=')[1];
    return (
      <div className='mx-auto prose max-w-prose'>
        <div className='aspect-w-16 aspect-h-9'>
          <iframe
            width='100%'
            height='auto'
            src={`https://www.youtube.com/embed/${id}`}
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
      </div>
    );
  }
  return null;
};
export default Video;
