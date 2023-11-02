"use client";
import Image from "next/image";
import { useState } from "react";

interface HandleImageProps {
  classesProp?: string;
  srcProp?: string | any;
  altProp?: string;
  sizesProp?: string | any;
  objectFitProp?: "cover" | "contain" | undefined;
  objectPositionProp?: string | undefined;
}

const SkeletonLoader = () => {
  return (
    <div className="aspect-square animate-pulse h-full w-full overflow-hidden bg-gray-400"></div>
  );
};

const HandleImage = ({
  classesProp,
  srcProp,
  altProp,
  sizesProp,
  objectFitProp,
  objectPositionProp,
}: HandleImageProps) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  return (
    <div className={classesProp}>
      {srcProp && (
        <>
          <Image
            fill
            src={srcProp}
            alt={altProp ? altProp : "Bild från DinVinguide"}
            sizes={sizesProp}
            onLoad={() => setImageLoaded(true)}
            style={{
              objectFit: objectFitProp,
              objectPosition: objectPositionProp,
            }}
          />
          {!imageLoaded && (
            <div className="absolute top-0 left-0 right-0 bottom-0">
              <SkeletonLoader />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HandleImage;
