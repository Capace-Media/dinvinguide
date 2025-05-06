"use client";

import { getMidDlAds } from "@/actions/ads/dl";
import { useQuery } from "@tanstack/react-query";
import DlAd, { DlAdSkeleton } from "./index";
export default function DlMid() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["midDlAds"],
    queryFn: getMidDlAds,
  });

  console.log(data);

  if (isLoading) return <DlAdSkeleton />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <DlAd data={data} />
    </>
  );
}
