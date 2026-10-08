"use client";
import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface HandleImageProps {
  classesProp?: string;
  srcProp?: string | null;
  altProp?: string | null;
  sizesProp?: string;
  objectFitProp?: "cover" | "contain";
  objectPositionProp?: string;
}

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
            unoptimized
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
            <Skeleton className="absolute inset-0 rounded-none" />
          )}
        </>
      )}
    </div>
  );
};

export default HandleImage;
