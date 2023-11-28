import parse, { DOMNode } from "html-react-parser";
import Image from "next/image";
import Link from "next/link";

export default function handleParse(content?: string, parseClasses?: string) {
  const thContents: any = [];
  let thIndex = 0;
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
                "https://media.dinvinguide.se/wp-content/uploads/"
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

              return (
                <div
                  className={domNode.attribs.class}
                  style={{
                    width: `${domNode?.attribs?.width}px`,

                    height: `${domNode?.attribs?.height}px`,
                    position: "relative",
                  }}
                >
                  <Image
                    src={domNode.attribs.src}
                    alt={domNode.attribs.alt}
                    width={
                      domNode?.attribs?.width ? domNode.attribs.width : 300
                    }
                    height={
                      domNode?.attribs?.height ? domNode.attribs.height : 300
                    }
                    style={{
                      width: `${domNode?.attribs?.width}px`,

                      height: `${domNode?.attribs?.height}px`,

                      objectFit: "cover",
                    }}
                    className={domNode.attribs.class}
                    sizes={domNode?.attribs?.sizes}
                  />
                </div>
              );
            }
          },
        })}
    </div>
  );
}
