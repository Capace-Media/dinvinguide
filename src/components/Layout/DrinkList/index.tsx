"use client";
import Image from "next/image";

import useWindowSize from "@/hooks/useWindowSize";
import leftImg from "../../../../public/Images/left_dl_bg.png";
import rightImg from "../../../../public/Images/right_dl_bg.png";

const DrinkListLayout = ({ children }: { children: React.ReactNode }) => {
  const width = useWindowSize();
  const mobileBreakpoint = 768;
  return (
    <div className="layout bg-white relative overflow-hidden">
      {width && width > mobileBreakpoint && (
        <div className="absolute z-5 -left-16 top-104">
          <div className="relative w-[30vw] lg:h-600 md:h-400  hidden md:block">
            <Image
              src={leftImg}
              alt="dekoration bilder"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      )}
      {children}
      {width && width > mobileBreakpoint && (
        <div className="absolute z-5 -right-16 top-104">
          <div className="relative w-[30vw]  lg:h-600 md:h-400 hidden md:block">
            <Image
              src={rightImg}
              alt="dekoration bilder"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DrinkListLayout;
