interface VideoProps {
  content: any; // You might want to define a more specific type for content
}

const Video = ({ content }: VideoProps) => {
  if (!content.url) {
    return null;
  }

  // Function to determine if the URL is from YouTube
  const isYouTubeUrl = (url: string): boolean => {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return pattern.test(url);
  };

  // Render different components based on the type of video URL
  const renderVideoContent = (url: string) => {
    if (isYouTubeUrl(url)) {
      // For YouTube URLs, use an iframe
      const embedUrl = url.includes("youtu.be")
        ? url.replace("youtu.be", "www.youtube.com/embed")
        : url.replace("watch?v=", "embed/");

      return (
        <iframe
          className="w-full aspect-video"
          src={embedUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    } else {
      // For direct video links, use a video tag
      return (
        <video className="w-full aspect-video" controls preload="none">
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  return content && content.url ? (
    renderVideoContent(content.url)
  ) : (
    <div>No video content available.</div>
  );
};

export default Video;
