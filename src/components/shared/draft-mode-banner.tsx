"use client";

import Link from "next/link";

interface DraftModeBannerProps {
  isEnabled: boolean;
}

export default function DraftModeBanner({ isEnabled }: DraftModeBannerProps) {
  if (!isEnabled) return null;

  return (
    <div className="fixed bottom-0 z-20 bg-white gap-3 py-4 left-0 w-full flex justify-center items-center">
      <p>Förhandsgranskning</p>
      <Link href="/api/disable-draft" className="btn">
        Lämna
      </Link>
    </div>
  );
}
