"use client";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface PaginationForGuidesProps {
  promise: any;
  idString: any;
  page?: any;
  uri: string;
}

// The fields a card reads. Grape cards also carry `acf_grape`.
export interface GuideCardItem {
  node?: {
    id?: string;
    slug?: string | null;
    title?: string | null;
    featuredImage?: {
      node?: {
        mediaItemUrl?: string | null;
        altText?: string | null;
      } | null;
    } | null;
    acf_grape?: { druvtyp?: { name?: string | null } | null } | null;
  } | null;
}

export function GuideCard({ item, uri }: { item: GuideCardItem; uri: string }) {
  return (
    <li className="group lg:duration-200 lg:ease-in-out lg:hover:-translate-y-[7px]">
      <Link
        href={`${uri}/${item?.node?.slug}`}
        aria-label={`Läs mer om ${item?.node?.title}`}
      >
        <div className="relative h-[200px] w-full bg-[#F5F5F5]">
          {item?.node?.featuredImage?.node?.mediaItemUrl && (
            <Image
              unoptimized
              src={item.node.featuredImage.node.mediaItemUrl}
              alt={
                item?.node?.featuredImage?.node?.altText
                  ? item.node.featuredImage.node.altText
                  : `bild på ${item?.node?.acf_grape?.druvtyp?.name ?? item?.node?.title}`
              }
              fill
              style={{
                objectFit: "cover",
                borderRadius: "5px 5px 0px 0px",
              }}
            />
          )}
        </div>
        <div className="h-[69px] w-full rounded-b-[10px] bg-[#F5F5F5] p-2">
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
}

export function GuideCardSkeleton() {
  return (
    <li>
      <Skeleton className="h-[200px] w-full rounded-b-none" />
      <div className="h-[69px] w-full rounded-b-[10px] bg-[#F5F5F5] p-2">
        <Skeleton className="h-5 w-3/4" />
      </div>
    </li>
  );
}

const PaginationForGuides = ({
  promise,
  idString,
  uri,
}: PaginationForGuidesProps) => {
  return (
    <ul id={idString} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {promise?.map((item: any) => (
        <GuideCard key={item?.node?.id} item={item} uri={uri} />
      ))}
    </ul>
  );
};

export default PaginationForGuides;
