"use client";
import Image from "next/image";

import useWindowSize from "@/hooks/useWindowSize";
import leftImg from "../../../../public/Images/left_dl_bg.png";
import rightImg from "../../../../public/Images/right_dl_bg.png";

const DrinkListLayout = ({ children }: { children: React.ReactNode }) => {
  const width = useWindowSize();
  const mobileBreakpoint = 768;
  return (
    <div className="layout relative overflow-hidden bg-white">
      {width && width > mobileBreakpoint && (
        <div className="absolute top-104 -left-16 z-5">
          <div className="relative hidden w-[30vw] md:block md:h-400 lg:h-600">
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
        <div className="absolute top-104 -right-16 z-5">
          <div className="relative hidden w-[30vw] md:block md:h-400 lg:h-600">
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
