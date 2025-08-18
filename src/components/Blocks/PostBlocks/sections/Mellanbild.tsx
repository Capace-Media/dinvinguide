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

interface MellanbildContent {
  img?: ImageData;
  iGalleri?: boolean; // Based on GraphQL query structure
}

interface MellanbildProps {
  content: MellanbildContent;
}

const Mellanbild = ({ content }: MellanbildProps) => {
  // Simply return null if no image - don't render anything
  if (!content?.img?.mediaItemUrl) {
    return null;
  }

  const { img } = content;

  // Fallback dimensions if mediaDetails is missing
  const width = img.mediaDetails?.width || 800;
  const height = img.mediaDetails?.height || 600;

  // Generate alt text with fallback
  const altText = img.altText || "Bild från DinVinGuide";

  return (
    <section className="py-[2rem]">
      <div className="relative row contain-sm">
        <div className="relative flex justify-center">
          <Image
            src={img.mediaItemUrl}
            width={width}
            height={height}
            alt={altText}
            className="max-w-full h-auto"
            priority={false} // Enable lazy loading
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "100%",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Mellanbild;
