import { Skeleton } from "@/components/ui/skeleton";

export function NewsletterSkeleton() {
  return (
    <section aria-busy="true" aria-label="Laddar nyhetsbrev">
      <div className="layout h-2 bg-white md:h-6 lg:h-10"></div>
      <div className="contain layout grid gap-10 bg-[#F6F6F6] md:grid-cols-2 md:gap-16 lg:gap-20">
        <Skeleton className="h-75 rounded-none lg:h-120.5" />
        <div className="flex flex-col justify-center gap-4 py-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
      <div className="layout h-2 bg-white md:h-6 lg:h-10"></div>
    </section>
  );
}
