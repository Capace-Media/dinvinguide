"use client";
import parse, { DOMNode, HTMLReactParserOptions } from "html-react-parser";

export default function handleParseClient(content?: string) {
  if (!content) return null;

  const options: HTMLReactParserOptions = {
    replace: (node: DOMNode | any) => {
      if (node.type !== "tag") return;

      const { name, attribs = {} } = node;

      if (name === "img" && attribs.src) {
        let src: string = attribs.src;

        src = src.replace(
          /^.*\/app\/uploads\//,
          "https://cloud.dinvinguide.se/wp-content/uploads/"
        );
        if (src.startsWith("http://")) src = src.replace("http://", "https://");
        if (src.includes("https://media."))
          src = src.replace("https://media.", "https://cloud.");
        if (src.startsWith("https://dinvinguide.se/")) {
          src = src.replace(
            "https://dinvinguide.se/",
            "https://cloud.dinvinguide.se/"
          );
        }

        node.attribs.src = src;
        node.attribs.style = "max-width: 100%; height: auto;";
        return;
      }

      if (name === "a" && attribs.href) {
        let href: string = attribs.href;

        const hasProtocol =
          href.startsWith("http://") || href.startsWith("https://");
        if (!hasProtocol && href.includes("www.")) {
          href = `https://${href}`;
        }
        if (href.startsWith("http://www.") && !href.startsWith("https://")) {
          href = href.replace("http://www.", "https://");
        }
        node.attribs.href = href;

        const isInternal =
          href.startsWith("/") ||
          href.includes("dinvinguide.se/") ||
          href.includes("www.dinvinguide.se/") ||
          href.includes("dryckeslistan.se/");

        if (!isInternal) {
          node.attribs.target = "_blank";
          node.attribs.rel = "noreferrer";
        }
        return;
      }
    },
  };

  const parsed = parse(content, options);

  return parsed;
}
