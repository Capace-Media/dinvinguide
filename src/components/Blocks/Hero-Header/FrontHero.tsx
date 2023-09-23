"use client";

import handleParsed from "@/lib/utils/handleParse";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FrontHeroProps {
  data?: any;
}

const FrontHero = ({ data }: FrontHeroProps) => {
  const [isMobile, setMobile] = useState<boolean>(false);

  const sizeValue = 768;

  const handleResize = (ref: any) => {
    if (ref?.innerWidth < sizeValue) {
      setMobile(true);
    } else setMobile(false);
  };

  useEffect(() => {
    if (window?.innerWidth < sizeValue) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    window.addEventListener("resize", () => handleResize(window));
    return () => removeEventListener("resize", handleResize);
  }, [setMobile, isMobile]);

  return (
    <div className="layout w-full py-6">
      {!isMobile ? (
        <div className="grid md:grid-cols-2 ">
          <div className="flex flex-col gap-6 bg-red-500">
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

          <div className=" relative h-[522px] w-full bg-green-500">
            <div className="absolute lg:center-y lg:right-[100px] md:top-[65px] md:w-[400px] md:h-[300px] lg:w-[650px] lg:h-[400px] z-10">
              {data?.featuredImage?.node?.mediaItemUrl && (
                <Image
                  src={data?.featuredImage?.node?.mediaItemUrl}
                  alt={data?.featuredImage?.node?.altText}
                  style={{
                    width: "650px",
                    height: "auto",
                  }}
                  width={500}
                  height={500}
                  priority
                />
              )}
            </div>
            <div className="bg-brand-primary md:w-[400px] md:h-[300px] lg:w-[600px] lg:h-[400px] absolute right-0"></div>
          </div>
        </div>
      ) : (
        <div className="layout flex flex-col gap-6">
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
          <div className="">{handleParsed(data?.content)}</div>

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
      )}
    </div>
  );
};

export default FrontHero;
