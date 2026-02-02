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
  iGalleri?: boolean;
}

interface MellanbildProps {
  content: MellanbildContent;
}

const Mellanbild = ({ content }: MellanbildProps) => {
  if (!content?.img?.mediaItemUrl) {
    return null;
  }

  const { img } = content;

  const altText = img.altText || "Bild från DinVinGuide";

  return (
    <section className="py-[2rem]">
      <Image
        src={img.mediaItemUrl}
        alt={altText}
        width={img.mediaDetails?.width}
        height={img.mediaDetails?.height}
        sizes="(max-width: 1024px) 93vw, (max-width: 1790px) 50vw, 952px"
        className="object-cover max-w-full h-full"
        priority={false}
      />
    </section>
  );
};

export default Mellanbild;
