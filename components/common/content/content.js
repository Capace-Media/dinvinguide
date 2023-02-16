import parse from "html-react-parser";
const Content = ({ content }) => {
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
                "/app/uploads/",
                "https://media.dinvinguide.se/wp-content/uploads/"
              );
            }
            if (domNode.name === "a") {
              if (
                !domNode?.attribs?.href?.includes("https://") &&
                domNode?.attribs?.href?.includes("www.")
              ) {
                let url = domNode?.attribs?.href;
                const string = "https://";
                const newString = url.replace("www.", string);
                return (domNode.attribs.href = `${newString}`);
              }
              if (
                !domNode?.attribs?.href?.includes("dinvinguide.se/") &&
                !domNode?.attribs?.href?.includes("dryckeslistan.se/") &&
                domNode?.attribs?.href?.charAt(0) !== "/"
              ) {
                console.log("domNode ==>", domNode);
                domNode.attribs.target = "_blank";
              }
            }
          },
        })}
    </div>
  );
};

export default Content;
