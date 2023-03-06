import parse from "html-react-parser";
const Content = ({ content }) => {
  const handleImageError = (event) => {
    try {
      event.target.remove();
      //event.target.onerror = null; // remove the error handler to prevent an infinite loop
      //event.target.src = "https://example.com/placeholder.jpg"; // replace with placeholder image URL
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };
  return (
    <div className="mx-auto prose-sm lg:prose row max-w-prose">
      {content &&
        parse(content, {
          replace: (domNode) => {
            if (domNode.name === "figure") {
              domNode.attribs.width = "100%";
              domNode.attribs.style = "display:block;";
            }
            if (domNode.name === "img") {
              domNode.attribs.src = domNode?.attribs?.src?.replace(
                /^.*\/app\/uploads\//,
                "https://media.dinvinguide.se/wp-content/uploads/"
              );

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
            }
          },
        })}
    </div>
  );
};

export default Content;
