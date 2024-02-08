import Image from "next/image";

interface ParseImageProps {
  domNode: any;
}

const ParseImage = ({ domNode }: ParseImageProps) => {
  return (
    <div
      className={domNode.attribs.class}
      style={{
        width: `${domNode?.attribs?.width}px`,

        height: `${domNode?.attribs?.height}px`,
        position: "relative",
      }}
    >
      {domNode?.attribs?.src && (
        <Image
          src={domNode.attribs.src}
          alt={
            domNode?.attribs?.alt
              ? domNode.attribs.alt
              : "Bild från DinVinguide.se"
          }
          width={domNode?.attribs?.width ? domNode.attribs.width : 300}
          height={domNode?.attribs?.height ? domNode.attribs.height : 300}
          style={{
            width: `${domNode?.attribs?.width}px`,

            height: `${domNode?.attribs?.height}px`,

            objectFit: "cover",
          }}
          className={domNode.attribs.class}
          sizes={domNode?.attribs?.sizes}
          // onError={(e: any) => console.error("Did I get error", e.target.id)}
        />
      )}
    </div>
  );
};

export default ParseImage;
