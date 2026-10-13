import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import type { SearchRecord } from "@/lib/search/search-records";
import { SEARCH_TYPE_LABELS } from "./search-query";

export function SearchResultItem({ hit }: { hit: SearchRecord }) {
  return (
    <li>
      <Link
        href={hit.url}
        className="flex items-start gap-4 rounded-md p-2 hover:bg-accent"
      >
        <div className="relative size-14 shrink-0">
          {hit.image && (
            <Image
              src={hit.image.url}
              alt={hit.image.alt}
              fill
              sizes="56px"
              className="object-contain"
            />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {SEARCH_TYPE_LABELS[hit.type]}
          </p>
          <p className="font-sub">{hit.title}</p>
          {hit.excerpt && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {hit.excerpt}
            </p>
          )}
        </div>
      </Link>
    </li>
  );
}

export function SearchResultItemSkeleton() {
  return (
    <li className="flex items-start gap-4 p-2">
      <Skeleton className="size-14 shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-full" />
      </div>
    </li>
  );
}
