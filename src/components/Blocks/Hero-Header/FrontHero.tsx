"use client";

import handleParsed from "@/lib/utils/handleParse";

import Image from "next/image";

interface FrontHeroProps {
  data?: any;
}

const FrontHero = ({ data }: FrontHeroProps) => {
  return (
    <div className="layout flex flex-col">
      <div className="relative min-h-[245px] max-w-[375px] ">
        <div className="absolute z-10 bottom-0 left-0">
          {data?.featuredImage?.node?.mediaItemUrl && (
            <Image
              src={data?.featuredImage?.node?.mediaItemUrl}
              alt={data?.featuredImage?.node?.altText}
              style={{
                width: "300px",
                height: "200px",
              }}
              width={500}
              height={500}
              priority
            />
          )}
        </div>
        <div className="bg-brand-primary w-[250px] h-[200px] absolute top-0 right-0"></div>
      </div>
      <div>{handleParsed(data?.content)}</div>
    </div>
  );
};

export default FrontHero;
