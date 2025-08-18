import Image from "next/image";

// Define proper TypeScript interfaces
interface MediaDetails {
  width: number;
  height: number;
}

interface ImageData {
  mediaItemUrl: string;
  altText?: string;
  mediaDetails?: MediaDetails;
}

interface StorBildContent {
  img?: ImageData;
  iGalleri?: boolean;
}

interface StorBildProps {
  content: StorBildContent;
}

const StorBild = ({ content }: StorBildProps) => {
  // Early return if no image data
  if (!content?.img?.mediaItemUrl) {
    return null;
  }

  const { img } = content;

  // Fallback dimensions if mediaDetails is missing
  const width = img.mediaDetails?.width || 1200;
  const height = img.mediaDetails?.height || 800;

  // Generate alt text with proper fallback logic
  const altText = img.altText || "Bild från DinVinGuide";

  return (
    <section className="py-[2rem]">
      <div className="relative row">
        <div className="relative flex justify-center w-full">
          <Image
            src={img.mediaItemUrl}
            width={width}
            height={height}
            alt={altText}
            className="max-w-full h-auto"
            priority={false} // Enable lazy loading
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "100%",
            }}
          />
        </div>

        {/* Gallery button - uncomment and implement when needed */}
        {/* {content.iGalleri && (
          <button
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2 
                       border-2 border-brand-red text-brand-red rounded 
                       px-4 py-2 hover:text-white hover:bg-brand-red 
                       transition-colors duration-200 md:bottom-14"
            onClick={() => handleGallery(img.mediaItemUrl)}
          >
            Visa galleri
          </button>
        )} */}
      </div>
    </section>
  );
};

export default StorBild;
