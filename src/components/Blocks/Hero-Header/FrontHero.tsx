"use client";

import { ArrowRight } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import handleParsed from "@/lib/utils/handleParse";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface FrontHeroProps {
  data?: any;
}

const FrontHero: React.FC<FrontHeroProps> = ({ data }) => {
  return (
    <div className="layout w-full py-18.25 xl:pt-43 bg-white">
      <div className="grid xl:grid-cols-2 order-last xl:order-first ">
        <div className="flex flex-col justify-between min-h-115.25">
          <div className="flex flex-col gap-6 max-w-150">
            <div className="front-parse">
              {data?.content && handleParsed(data?.content)}
            </div>
            <ul className="font-main text-brand-primary uppercase flex whitespace-nowrap flex-wrap gap-4 font-medium">
              <li className="">
                <Button asChild>
                  <Link href="/guide">Alla Guider</Link>
                </Button>
              </li>
              <li>
                <Link
                  className={cn(
                    buttonVariants({ variant: "link", size: "link" })
                  )}
                  href="/druvguiden"
                >
                  Druvor
                </Link>
              </li>
              <li>
                <Link
                  className={cn(
                    buttonVariants({ variant: "link", size: "link" })
                  )}
                  href="/vinatlas"
                >
                  Vinatlas
                </Link>
              </li>
              <li>
                <Link
                  className={cn(
                    buttonVariants({ variant: "link", size: "link" })
                  )}
                  href="/vinskolan"
                >
                  Vinskolan
                </Link>
              </li>
              <li>
                <Link
                  className={cn(
                    buttonVariants({ variant: "link", size: "link" })
                  )}
                  href="/ordlistan"
                >
                  Ordlistan
                </Link>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <Link
              href="/recept/receptbanken"
              className="lg:hover:underline italic text-brand-secondary flex items-center gap-3"
            >
              Besök vår receptbank <ArrowRight />
            </Link>
          </div>
        </div>

        <div className="w-full  order-first h-92.5 relative xl:order-last lg:h-130">
          <div className="absolute w-[85%] bottom-0 left-0 h-75 lg:h-107.5 z-10">
            {data?.featuredImage?.node?.mediaItemUrl && (
              <div className="relative w-full h-full">
                <Image
                  src={data?.featuredImage?.node?.mediaItemUrl}
                  alt={
                    data?.featuredImage?.node?.altText
                      ? data.featuredImage.node.altText
                      : "Bild från DinVinguide"
                  }
                  width={data?.featuredImage?.node?.mediaDetails?.width}
                  height={data?.featuredImage?.node?.mediaDetails?.height}
                  sizes="(max-width: 1280px) 80vw, (max-width: 1790px) 39vw, 688px"
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>
          <div className="bg-brand-primary w-[85%] h-75 lg:h-107.5 top-0 absolute right-0"></div>
        </div>
      </div>
    </div>
  );
};

export default FrontHero;
