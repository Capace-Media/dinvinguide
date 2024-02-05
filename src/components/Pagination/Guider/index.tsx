"use client";
import { scrollToPosts } from "@/lib/utils/scrollToPosts";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

interface PaginationForGuidesProps {
  promise: any;
  idString: any;
  page?: any;
  uri: string;
}

const PaginationForGuides = ({
  promise,
  idString,
  page,
  uri,
}: PaginationForGuidesProps) => {
  // useEffect(() => {
  //   if (idString && page) {
  //     scrollToPosts(idString);
  //   }
  // }, [page]);
  return (
    <ul id={idString} className="grid md:grid-cols-2 gap-4 lg:grid-cols-4">
      {promise &&
        promise.map((item: any) => {
          return (
            <li
              key={item?.node?.id}
              className="group lg:hover:-translate-y-[7px] lg:ease-in-out lg:duration-200"
            >
              <Link
                href={`${uri}/${item?.node?.slug}`}
                aria-label={`Läs mer om ${item?.node?.title}`}
              >
                <div className="relative h-[200px] w-full bg-[#F5F5F5]">
                  {item?.node?.featuredImage?.node?.mediaItemUrl && (
                    <Image
                      src={item.node.featuredImage.node.mediaItemUrl}
                      alt={
                        item?.node?.featuredImage?.node?.altText
                          ? item.node.featuredImage.node.altText
                          : `bild på ${item?.node?.acf_grape?.druvtyp?.name}`
                      }
                      fill
                      style={{
                        objectFit: "cover",
                        borderRadius: "5px 5px 0px 0px",
                      }}
                    />
                  )}
                </div>
                <div className="h-[69px] w-full bg-[#F5F5F5] p-2 rounded-b-[10px]">
                  <p className="text-[12px]">
                    {item?.node?.acf_grape?.druvtyp?.name &&
                      item.node.acf_grape.druvtyp.name}
                  </p>
                  <h3 className="text-[18px] md:group-hover:underline">
                    {item?.node?.title}
                  </h3>
                </div>
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default PaginationForGuides;
