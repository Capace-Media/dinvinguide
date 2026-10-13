import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import type { SearchRecord } from "@/lib/search/search-records";
import PrettyDate from "@/lib/utils/prettyDate";
import { SEARCH_TYPE_ITEM_LABELS } from "./search-query";
import { SearchResultThumbnail } from "./search-result-thumbnail";

export function SearchResultItem({ hit }: { hit: SearchRecord }) {
  return (
    <li className="border-b border-brand-light">
      <Link
        href={hit.url}
        className="group flex gap-4 rounded-lg p-3 transition-colors hover:bg-brand-beige focus-visible:bg-brand-beige"
      >
        <SearchResultThumbnail hit={hit} />
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-xs text-brand-gray">
            <span className="font-medium uppercase tracking-wide text-brand-secondary">
              {SEARCH_TYPE_ITEM_LABELS[hit.type]}
            </span>
            {hit.date && (
              <>
                <span aria-hidden> · </span>
                <time dateTime={hit.date}>{PrettyDate(hit.date)}</time>
              </>
            )}
          </p>
          <h3 className="line-clamp-2 text-lg leading-snug text-brand-dark group-hover:underline">
            {hit.title}
          </h3>
          {hit.excerpt && (
            <p className="line-clamp-2 text-sm text-brand-gray">{hit.excerpt}</p>
          )}
        </div>
      </Link>
    </li>
  );
}

export function SearchResultItemSkeleton() {
  return (
    <li className="flex gap-4 border-b border-brand-light p-3">
      <Skeleton className="size-20 shrink-0" />
      <div className="flex-1 space-y-2 pt-1">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </li>
  );
}
