"use client";
import dynamic from "next/dynamic";

export const componentsMap: any = {
  Brodtext: dynamic(() => import("./sections/brodtext"), {
    ssr: false,
  }),
  Citat: dynamic(() => import("./sections/citat"), {
    ssr: false,
  }),
  ExtraPuff: dynamic(() => import("./sections/extra-puff"), {
    ssr: false,
  }),

  Mellanbild: dynamic(() => import("./sections/mellanbild"), {
    ssr: false,
  }),
  StorBild: dynamic(() => import("./sections/stor-bild"), {
    ssr: false,
  }),
  Faktalada: dynamic(() => import("./sections/faktalada"), {
    ssr: false,
  }),
  Video: dynamic(() => import("./sections/video"), {
    ssr: false,
  }),
};

export const extractComponentKey = (fieldGroupName: string): string => {
  return fieldGroupName?.split("_").pop() || "";
};
