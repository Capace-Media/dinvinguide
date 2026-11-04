"use client";

import { ArrowRight } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
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
    <div className="layout w-full bg-white py-17">
      <div className="order-last grid xl:order-first xl:grid-cols-2">
        <div className="flex min-h-115.25 flex-col justify-between">
          <div className="flex max-w-150 flex-col gap-6">
            <div className="front-parse">
              {data?.content && handleParsed(data?.content)}
            </div>
            <ul className="flex flex-wrap gap-4 font-main font-medium whitespace-nowrap text-brand-primary uppercase">
              <li className="">
                <Link className={buttonVariants()} href="/guide">
                  Alla Guider
                </Link>
              </li>
              <li>
                <Link
                  className={cn(
                    buttonVariants({ variant: "link", size: "link" }),
                  )}
                  href="/druvguiden"
                >
                  Druvor
                </Link>
              </li>
              <li>
                <Link
                  className={cn(
                    buttonVariants({ variant: "link", size: "link" }),
                  )}
                  href="/vinatlas"
                >
                  Vinatlas
                </Link>
              </li>
              <li>
                <Link
                  className={cn(
                    buttonVariants({ variant: "link", size: "link" }),
                  )}
                  href="/vinskolan"
                >
                  Vinskolan
                </Link>
              </li>
              <li>
                <Link
                  className={cn(
                    buttonVariants({ variant: "link", size: "link" }),
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
              className="flex items-center gap-3 text-brand-secondary italic lg:hover:underline"
            >
              Besök vår receptbank <ArrowRight />
            </Link>
          </div>
        </div>

        <div className="relative order-first h-92.5 w-full lg:h-130 xl:order-last">
          <div className="absolute bottom-0 left-0 z-10 h-75 w-[85%] lg:h-107.5">
            {data?.featuredImage?.node?.mediaItemUrl && (
              <div className="relative h-full w-full">
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
                  loading="eager"
                  fetchPriority="high"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
          <div className="absolute top-0 right-0 h-75 w-[85%] bg-brand-primary lg:h-107.5"></div>
        </div>
      </div>
    </div>
  );
};

export default FrontHero;
