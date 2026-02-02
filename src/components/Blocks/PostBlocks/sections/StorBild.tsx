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
        className="object-cover w-full h-full"
        sizes="(max-width: 1024px) 93vw, (max-width: 1790px) 50vw, 952px"
        priority={false}
      />
    </section>
  );
};

export default StorBild;
