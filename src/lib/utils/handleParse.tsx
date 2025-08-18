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

        // Return simple img tag - let CSS handle styling
        return (
          <img
            src={src}
            alt={domNode.attribs.alt || "Bild från DinVinGuide"}
            className={domNode.attribs.class}
            width={domNode.attribs.width}
            height={domNode.attribs.height}
            loading="lazy"
            decoding="async"
          />
        );
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
