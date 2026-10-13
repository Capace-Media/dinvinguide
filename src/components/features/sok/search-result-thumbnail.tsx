import { ChefHat, Grape, Lightbulb, Newspaper, Wine, type LucideIcon } from "lucide-react";
import Image from "next/image";
import type { SearchRecord } from "@/lib/search/search-records";
import type { SearchType } from "@/lib/search/search-types";
import { cn } from "@/lib/utils";

const TYPE_ICONS: Readonly<Record<SearchType, LucideIcon>> = {
  post: Newspaper,
  recipe: ChefHat,
  drinktip: Lightbulb,
  drink: Wine,
  grape: Grape,
};

// Drinks are bottle shots on white; cropping them to a square cuts the label.
const isBottle = (type: SearchType) => type === "drink" || type === "drinktip";

export function SearchResultThumbnail({ hit }: { hit: SearchRecord }) {
  if (!hit.image) {
    const Icon = TYPE_ICONS[hit.type];
    // Same brand gradient as the missing-image state in `PostCard`.
    return (
      <div className="flex size-20 shrink-0 items-center justify-center rounded-md bg-linear-to-br from-brand-primary to-brand-secondary">
        <Icon className="size-8 text-white/70" aria-hidden />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative size-20 shrink-0 overflow-hidden rounded-md",
        isBottle(hit.type) && "bg-brand-light"
      )}
    >
      <Image
        src={hit.image.url}
        alt={hit.image.alt}
        fill
        sizes="80px"
        className={isBottle(hit.type) ? "object-contain p-1" : "object-cover"}
      />
    </div>
  );
}
