"use client";

import handleParsed from "@/lib/utils/handleParse";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface FrontHeroProps {
  data?: any;
}

type ImageData = {
  altText: string;
  mediaItemUrl: string;
  id: string;
};

const FrontHero: React.FC<FrontHeroProps> = ({ data }) => {
  const { featuredImage, GQL_frontPageFields } = data || {};

  const shuffledImages = React.useMemo(() => {
    const initialImages: ImageData[] = GQL_frontPageFields?.heroBild || [];
    return shuffleArray(initialImages);
  }, [GQL_frontPageFields]);

  const [images, setImages] = useState<ImageData[]>(shuffledImages);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => {
      clearInterval(interval); // Cleanup on component unmount
    };
  }, [images]);
  return (
    <div className="layout w-full py-6">
      <div className="grid md:grid-cols-2 order-last md:order-first">
        <div className="flex flex-col gap-6 ">
          <div>{handleParsed(data?.content)}</div>
          <ul className="font-main text-brand-primary uppercase flex whitespace-nowrap flex-wrap gap-4 font-medium">
            <li className="bg-brand-primary text-white px-3 py-2">
              <Link href="/guide">Alla Guider</Link>
            </li>
            <li className="flex flex-col justify-center items-center">
              <Link href="/druvguiden">Druvor</Link>
              <span className="w-full h-[2px] block bg-brand-primary"></span>
            </li>
            <li className="flex flex-col justify-center items-center">
              <Link href="/vinguide/vinatlas">Vinatlas</Link>
              <span className="w-full h-[2px] block bg-brand-primary"></span>
            </li>
            <li className="flex flex-col justify-center items-center">
              <Link href="/skolor">Vinskola</Link>
              <span className="w-full h-[2px] block bg-brand-primary"></span>
            </li>
            <li className="flex flex-col justify-center items-center">
              <Link href="/guide/ordlista">Ordlista</Link>
              <span className="w-full h-[2px] block bg-brand-primary"></span>
            </li>
          </ul>
        </div>

        <div className="w-full  order-first h-[370px] relative md:order-last lg:h-[520px]">
          <div className="absolute w-[85%] bottom-0 left-0 h-[300px] lg:h-[430px] z-10">
            {/* {data?.featuredImage?.node?.mediaItemUrl && (
              <Image
                src={data?.featuredImage?.node?.mediaItemUrl}
                alt={data?.featuredImage?.node?.altText}
                fill
                style={{
                  objectFit: "cover",
                }}
                sizes="(min-width: 1880px) 687px, (min-width: 1040px) calc(38.17vw - 23px), (min-width: 780px) calc(42.5vw - 38px), (min-width: 380px) calc(85vw - 27px), calc(25vw + 189px)"
                priority
              />
            )} */}

            <Image
              src={images[currentIndex].mediaItemUrl}
              alt={images[currentIndex].altText}
              fill
              style={{
                objectFit: "cover",
              }}
              sizes="(min-width: 1880px) 687px, (min-width: 1040px) calc(38.17vw - 23px), (min-width: 780px) calc(42.5vw - 38px), (min-width: 380px) calc(85vw - 27px), calc(25vw + 189px)"
            />
          </div>
          <div className="bg-brand-primary w-[85%] h-[300px] lg:h-[430px] top-0 absolute right-0"></div>
        </div>
      </div>
    </div>
  );
};

function shuffleArray(array: ImageData[]): ImageData[] {
  let newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]]; // Swap elements
  }
  return newArr;
}

export default FrontHero;
