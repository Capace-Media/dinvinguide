import dynamic from "next/dynamic";

export const componentsMap: any = {
  Brodtext: dynamic(() => import("./sections/Brodtext"), {
    ssr: false,
  }),
};

export const extractComponentKey = (fieldGroupName: string): string => {
  return fieldGroupName.split("_").pop() || "";
};
