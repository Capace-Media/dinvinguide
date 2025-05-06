"use client";

import { getBottomDlAds } from "@/actions/ads/dl";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import DlAd, { DlAdSkeleton } from ".";

export default function DlBottom() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["bottomDlAds"],
    queryFn: getBottomDlAds,
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
