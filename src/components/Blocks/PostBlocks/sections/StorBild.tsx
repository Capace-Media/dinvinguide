import Image from "next/image";

interface StorBildProps {
  content: any;
}

const StorBild = ({ content }: StorBildProps) => {
  return (
    <section className="relative flex justify-center w-full row py-[2rem]">
      {content?.img?.mediaItemUrl && (
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
      )}
      {/* {content && content.iGalleri && (
        <button
          style={{ transform: "translateX(-50%)" }}
          className="border-2 border-brand-red text-brand-red rounded box-border absolute block px-4 py-2 bottom-5 md:bottom-14 transform left-[50%] hover:text-white hover:bg-brand-red"
          onClick={() => handleGallery(content.img.mediaItemUrl)}
        >
          Visa galleri
        </button>
      )} */}
    </section>
  );
};

export default StorBild;
