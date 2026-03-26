"use client";

import Image from "next/image";

export default function DlAd({ data }: { data: any }) {
  return (
    <div className="bg-white layout contain">
      <div className="flex justify-center items-center">
        <div className="lg:hover:scale-[1.01] lg:hover:shadow-lg lg:duration-300 lg:ease-in-out block w-[280px] h-64 lg:w-[980px] lg:h-[200px]">
          <a
            href={data?.link}
            target="_blank"
            rel="noreferrer"
            className="block relative w-full h-full"
            aria-label={`Advertisement: ${data?.title}`}
          >
            <Image
              src={data?.desktop?.mediaItemUrl}
              alt={`Advertisement: ${data?.desktop?.altText || data?.title}`}
              fill
              sizes="(min-width: 1024px) 980px, 280px"
              style={{ objectFit: "contain" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export function DlAdSkeleton() {
  return (
    <div className="bg-white layout contain">
      <div className="flex justify-center items-center">
        <div className="block w-[280px] h-64 lg:w-[980px] lg:h-[200px] bg-brand-dl animate-pulse rounded-sm"></div>
      </div>
    </div>
  );
}
