import parse, { DOMNode, HTMLReactParserOptions } from "html-react-parser";
import Image from "next/image";

// Helper function to check if a node contains block elements (recursively)
function containsBlockElements(node: any): boolean {
  if (!node || !node.children) return false;

  const blockElements = [
    "div",
    "section",
    "article",
    "ul",
    "ol",
    "table",
    "blockquote",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
  ];

  for (const child of node.children) {
    if (child.name && blockElements.includes(child.name)) {
      return true;
    }
    // Recursively check children
    if (containsBlockElements(child)) {
      return true;
    }
  }
  return false;
}

export default function handleParse(
  content?: string,
  parseClasses?: string,
  noWrapper?: boolean
) {
  const thContents: any = [];
  let thIndex = 0;
  if (!content) {
    return null;
  }

  // Skip preprocessing entirely - let html-react-parser handle it with strict options
  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode | any) => {
      // Force all problematic nesting to be valid
      if (domNode.name === "p" && domNode.children) {
        // Check if p contains ANY block elements (even nested ones)
        if (containsBlockElements(domNode)) {
          return (
            <div className={domNode.attribs?.class}>{domNode.children}</div>
          );
        }
      }

      // Convert div inside inline elements to span
      if (domNode.name === "div" && domNode.parent) {
        const inlineParents = [
          "a",
          "span",
          "strong",
          "em",
          "b",
          "i",
          "u",
          "code",
        ];
        if (inlineParents.includes(domNode.parent.name)) {
          return (
            <span className={domNode.attribs?.class}>{domNode.children}</span>
          );
        }
      }

      // ... rest of your existing image/link logic ...
      if (domNode.name === "img") {
        // Just fix the src URL and let Next.js handle the rest
        let src = domNode.attribs.src;

        // Fix URL if needed
        src = src.replace(
          /^.*\/app\/uploads\//,
          "https://cloud.dinvinguide.se/wp-content/uploads/"
        );
        if (src.includes("http://") && !src.includes("https://")) {
          src = src.replace("http://", "https://");
        }
        if (src.includes("https://media.")) {
          src = src.replace("https://media.", "https://cloud.");
        }
        // Transform dinvinguide.se to cloud.dinvinguide.se
        if (src.includes("https://dinvinguide.se/")) {
          src = src.replace(
            "https://dinvinguide.se/",
            "https://cloud.dinvinguide.se/"
          );
        }

        // Parse width and height, provide defaults if not available
        const width = domNode.attribs.width
          ? parseInt(domNode.attribs.width)
          : 800;
        const height = domNode.attribs.height
          ? parseInt(domNode.attribs.height)
          : 600;

        // Check if the image is inside a paragraph
        const isInsideParagraph = domNode.parent?.name === "p";

        // Check if we're inside an inline parent element
        const inlineParents = [
          "a",
          "span",
          "strong",
          "em",
          "b",
          "i",
          "u",
          "code",
        ];
        const isInsideInlineElement =
          domNode.parent && inlineParents.includes(domNode.parent.name);

        const imageComponent = (
          <Image
            unoptimized
            src={src}
            alt={domNode.attribs.alt || "Bild från DinVinguide"}
            width={width || 300}
            height={height || 300}
            loading="lazy"
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

        // If inside paragraph, return Image directly
        // If inside inline element, wrap in span, otherwise wrap in div
        if (isInsideParagraph) {
          return imageComponent;
        } else if (isInsideInlineElement) {
          return (
            <span
              className={domNode.attribs.class}
              style={{
                maxWidth: `${domNode?.attribs?.width}px`,
                maxHeight: `${domNode?.attribs?.height}px`,
                position: "relative",
                display: "inline-block",
              }}
            >
              {imageComponent}
            </span>
          );
        } else {
          return (
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
              "https://cloud.dinvinguide.se/wp-content/uploads/"
            );
          } else if (
            domNode?.attribs?.href?.includes(
              "dinvinguide.se/wp-content/uploads/"
            ) &&
            !domNode?.attribs?.href?.includes("cloud.dinvinguide.se")
          ) {
            // Only transform if it doesn't already have cloud.dinvinguide.se
            domNode.attribs.href = domNode.attribs.href.replace(
              "dinvinguide.se/wp-content/uploads/",
              "cloud.dinvinguide.se/wp-content/uploads/"
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
    },
  };

  const parsedContent = parse(content, options);

  return noWrapper ? (
    parsedContent
  ) : (
    <div className={parseClasses ? parseClasses : "parsed"}>
      {parsedContent}
    </div>
  );
}
