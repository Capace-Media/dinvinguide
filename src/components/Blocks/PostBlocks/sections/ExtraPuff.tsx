import HandleImage from "@/app/components/image";
import Image from "next/image";
import Link from "next/link";

interface ExtraPuffProps {
  content: any;
}

const ExtraPuff = ({ content }: ExtraPuffProps) => {
  const data = content && content?.extraPuff && content?.extraPuff[0];
  console.log("data =====>", data);

  return (
    <section>
      <div className="relative w-full h-[330px]">
        <Link href={`/recept/receptbanken/${data?.slug}`} className="relative">
          <HandleImage
            srcProp={data?.featuredImage?.node?.mediaItemUrl}
            altProp={data?.featuredImage?.node?.altText}
            objectFitProp="cover"
            classesProp="relative w-full h-full recipe-overlay"
          />
          <div className="absolute top-0 right-0 text-white p-4 flex gap-2"></div>
          <div className="absolute bottom-0 pointer-events-none left-0 p-4 lg:w-[70%] z-10 text-white">
            {data?.acf_data?.skrivetAv && (
              <p className="md:text-[12px] md:uppercase text-[12px]">
                {data.acf_data.skrivetAv[0].name}
              </p>
            )}
            {data?.title && (
              <h2 className="md:text-[18px] leading-6 text-[16px] lowercase font-sub">
                {data.title}
              </h2>
            )}
          </div>
        </Link>
      </div>
    </section>
  );
};

export default ExtraPuff;
