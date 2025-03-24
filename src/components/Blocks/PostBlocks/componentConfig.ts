"use client";
import dynamic from "next/dynamic";

export const componentsMap: any = {
  Brodtext: dynamic(() => import("./sections/Brodtext"), {
    ssr: false,
  }),
  Citat: dynamic(() => import("./sections/Citat"), {
    ssr: false,
  }),
  ExtraPuff: dynamic(() => import("./sections/ExtraPuff"), {
    ssr: false,
  }),

  Mellanbild: dynamic(() => import("./sections/Mellanbild"), {
    ssr: false,
  }),
  StorBild: dynamic(() => import("./sections/StorBild"), {
    ssr: false,
  }),
  Faktalada: dynamic(() => import("./sections/Faktalada"), {
    ssr: false,
  }),
  Video: dynamic(() => import("./sections/Video"), {
    ssr: false,
  }),
};

export const extractComponentKey = (fieldGroupName: string): string => {
  return fieldGroupName?.split("_").pop() || "";
};
