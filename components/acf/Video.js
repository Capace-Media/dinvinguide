const Video = ({ url }) => {
  const isLocal = url.includes('media.dinvinguide.se');
  const isYoutube = url.includes('youtube') || url.includes('youtu.be');
  if (isLocal) {
    const type = url.split('.')[3];
    return (
      <div className='py-5 mx-auto prose max-w-prose'>
        <div className='aspect-w-16 aspect-h-9'>
          <video controls>
            <source src={url} type={`video/${type}`} />
          </video>
        </div>
      </div>
    );
  }
  if (isYoutube) {
    const split = url.split('/');
    const id = split[split.length - 1];
    console.log('YT ID =>', id);
    return (
      <div className='py-5 mx-auto prose max-w-prose'>
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
