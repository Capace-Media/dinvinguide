import parse, { DOMNode } from "html-react-parser";
import Image from "next/image";

export default function handleParse(content?: string, parseClasses?: string) {
  const thContents: any = [];
  let thIndex = 0;
  if (!content) {
    return null;
  }
  return (
    <div className={parseClasses ? parseClasses : "parsed"}>
      {content &&
        parse(content, {
          replace: (domNode: DOMNode | any) => {
            if (domNode.name === "tr") {
              thIndex = 0;
              return;
            }

            if (domNode.name === "th") {
              thContents[thIndex] = domNode.children[0]?.data;
              thIndex++;
              return;
            }

            if (domNode.name === "a") {
              const imgChild = Array.from(domNode.children).find(
                (childNode: any) => childNode?.name === "img"
              );

              if (imgChild) {
                if (domNode?.attribs?.href.includes("/app/uploads/")) {
                  const originalString = domNode.attribs.href;
                  domNode.attribs.href = originalString.replace(
                    /^.*\/app\/uploads\//,
                    "https://media.dinvinguide.se/wp-content/uploads/"
                  );
                }
                if (
                  domNode?.attribs?.href?.includes("http://") &&
                  !domNode?.attribs?.href?.includes("https://")
                ) {
                  domNode.attribs.href = domNode.attribs.href.replace(
                    "http://",
                    "https://"
                  );
                }
              }

              if (domNode?.attribs?.href?.includes("cloud.dinvinguide.se")) {
                domNode.attribs.href = domNode.attribs.href.replace(
                  "cloud.dinvinguide.se",
                  "dinvinguide.se"
                );
              }

              if (
                !domNode?.attribs?.href?.includes("https://dinvinguide.se/") &&
                !domNode?.attribs?.href?.includes("www.dinvinguide.se/") &&
                !domNode?.attribs?.href?.includes("dryckeslistan.se/") &&
                domNode?.attribs?.href?.charAt(0) !== "/"
              ) {
                domNode.attribs.target = "_blank";
                domNode.attribs.rel = "noreferrer";
              }

              if (
                !domNode?.attribs?.href?.includes("https://") &&
                !domNode?.attribs?.href?.includes("http://") &&
                domNode?.attribs?.href?.includes("www.")
              ) {
                domNode.attribs.href = `https://${domNode.attribs.href}`;
              }

              if (
                domNode?.attribs?.href?.includes("http://www.") &&
                !domNode?.attribs?.href?.includes("https://")
              ) {
                domNode.attribs.href = domNode.attribs.href.replace(
                  "http://www.",
                  "https://"
                );
              }
            }

            if (domNode.name === "img") {
              if (!domNode?.attribs?.alt) {
                domNode.attribs.alt = "Bild från DinVinGuide";
              }
              domNode.attribs.src = domNode.attribs.src.replace(
                /^.*\/app\/uploads\//,
                "https://cloud.dinvinguide.se/wp-content/uploads/"
              );
              if (
                !domNode.attribs.src.includes("https://") &&
                domNode.attribs.src.includes("http://")
              ) {
                domNode.attribs.src = domNode.attribs.src.replace(
                  "http://",
                  "https://"
                );
              }

              if (domNode.attribs.src.includes("https://media.")) {
                domNode.attribs.src = domNode.attribs.src.replace(
                  "https://media.",
                  "https://cloud."
                );
              }

              // Check if the image is inside a paragraph
              const isInsideParagraph = domNode.parent?.name === "p";

              const imageComponent = (
                <Image
                  unoptimized
                  src={domNode.attribs.src}
                  alt={
                    domNode?.attribs?.alt
                      ? domNode.attribs.alt
                      : "Bild från DinVinguide.se"
                  }
                  width={domNode?.attribs?.width ? domNode.attribs.width : 300}
                  height={
                    domNode?.attribs?.height ? domNode.attribs.height : 300
                  }
                  style={{
                    maxWidth: `${domNode?.attribs?.width}px`,
                    maxHeight: `${domNode?.attribs?.height}px`,
                    width: `${domNode?.attribs?.width}px`,
                    height: `${domNode?.attribs?.height}px`,
                    objectFit: "cover",
                  }}
                  className={domNode.attribs.class}
                  sizes={domNode?.attribs?.sizes}
                />
              );

              // If inside paragraph, return Image directly, otherwise wrap in div
              return isInsideParagraph ? (
                imageComponent
              ) : (
                <div
                  className={domNode.attribs.class}
                  style={{
                    maxWidth: `${domNode?.attribs?.width}px`,
                    maxHeight: `${domNode?.attribs?.height}px`,
                    position: "relative",
                  }}
                >
                  {imageComponent}
                </div>
              );
            }

            // Add new handling for paragraphs containing div elements
            if (domNode.name === "p") {
              // Check if paragraph contains any div elements
              const hasDiv = domNode.children?.some(
                (child: any) =>
                  child.name === "div" ||
                  (child.name === "a" &&
                    child.children?.some((c: any) => c.name === "div"))
              );

              if (hasDiv) {
                // Instead of wrapping in a paragraph, return the content directly
                return domNode.children.map((child: any, index: number) => {
                  if (typeof child === "string" || child.type === "text") {
                    return <span key={index}>{child.data}</span>;
                  }
                  return parse(child.data || "");
                });
              }
            }
          },
        })}
    </div>
  );
}
