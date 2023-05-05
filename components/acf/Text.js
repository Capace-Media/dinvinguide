import parse from "html-react-parser";
export default function Text({ content }) {
  const handleImageError = (event) => {
    try {
      event.target.remove();
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };
  const altText = "Bild från Dinvinguide";
  return (
    <div className="row max-w-prose mx-auto w-[85%] prose-sm lg:prose ">
      {content.text &&
        parse(content.text, {
          replace: (domNode) => {
            if (domNode.name === "figure") {
              domNode.attribs.width = "100%";
              domNode.attribs.style = "display:block;";
            }
            if (domNode.name === "img") {
              domNode.attribs.src = domNode.attribs.src.replace(
                "/app/uploads/",
                "https://media.dinvinguide.se/wp-content/uploads/"
              );
            }
            if (domNode.name === "img") {
              if (!domNode?.attribs?.alt) {
                domNode.attribs.alt = altText
                  ? altText
                  : "Bild från DinVinGuide";
              }
              domNode.attribs.src = domNode?.attribs?.src?.replace(
                /^.*\/app\/uploads\//,
                "https://media.dinvinguide.se/wp-content/uploads/"
              );
              if (
                !domNode?.attribs?.src?.includes("https://") &&
                domNode?.attribs?.src?.includes("http://")
              ) {
                let url = domNode?.attribs?.src;

                const string = "https://";
                const newString = url.replace("http://", string);
                return (domNode.attribs.src = `${newString}`);
              }

              domNode.attribs.onError = handleImageError;
            }
            if (domNode.name === "a") {
              const imgChild = Array.from(domNode.children).find(
                (childNode) => childNode.name === "img"
              );
              if (imgChild) {
                if (domNode?.attribs?.href.includes("/app/uploads/")) {
                  const originalString = domNode.attribs.href;
                  const newString = originalString.replace(
                    /^.*\/app\/uploads\//,
                    "https://media.dinvinguide.se/wp-content/uploads/"
                  );
                  return (domNode.attribs.href = `${newString}`);
                }
                if (
                  domNode?.attribs?.href?.includes("http://") &&
                  !domNode?.attribs?.href?.includes("https://")
                ) {
                  let url = domNode?.attribs?.href;
                  const string = "https://";
                  const newString = url.replace("http://", string);
                  return (domNode.attribs.href = `${newString}`);
                }
                domNode.attribs.onError = handleImageError;
              }
              if (
                !domNode?.attribs?.href?.includes("dinvinguide.se/") &&
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
                let url = domNode?.attribs?.href;
                const string = "https://";
                const newString = url.replace("www.", string);
                return (domNode.attribs.href = `${newString}`);
              }
              if (
                domNode?.attribs?.href?.includes("http://") &&
                !domNode?.attribs?.href?.includes("https://")
              ) {
                let url = domNode?.attribs?.href;
                const string = "https://";
                const newString = url.replace("http://", string);
                return (domNode.attribs.href = `${newString}`);
              }
            }
          },
        })}
    </div>
  );
}
