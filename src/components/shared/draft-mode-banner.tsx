"use client";

import Link from "next/link";

interface DraftModeBannerProps {
  isEnabled: boolean;
}

export default function DraftModeBanner({ isEnabled }: DraftModeBannerProps) {
  if (!isEnabled) return null;

  return (
    <div className="fixed bottom-0 left-0 z-20 flex w-full items-center justify-center gap-3 bg-white py-4">
      <p>Förhandsgranskning</p>
      <Link href="/api/disable-draft" className="btn">
        Lämna
      </Link>
    </div>
  );
}
