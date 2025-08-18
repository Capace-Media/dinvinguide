"use client";

import { getTopDlAds } from "@/actions/ads/dl";
import { useQuery } from "@tanstack/react-query";
import DlAd, { DlAdSkeleton } from "./index";
export default function DlTop() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["topDlAds"],
    queryFn: getTopDlAds,
  });

  if (isLoading) return <DlAdSkeleton />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <DlAd data={data} />
    </>
  );
}
