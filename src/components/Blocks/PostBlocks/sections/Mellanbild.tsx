import Image from "next/image";

interface MellanbildProps {
  content: any;
}

const Mellanbild = ({ content }: MellanbildProps) => {
  return (
    <section className="py-[2rem]">
      <div className="relative row contain-sm">
        <div className="relative flex justify-center">
          <Image
            src={content.img.mediaItemUrl}
            width={content.img.mediaDetails.width}
            height={content.img.mediaDetails.height}
            alt={
              content.img.mediaItemUrl.altText
                ? content.img.mediaItemUrl.altText
                : "Bild från DinVinGuide"
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Mellanbild;
